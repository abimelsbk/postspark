import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'your-gemini-api-key-here';
const genAI = new GoogleGenerativeAI(API_KEY);

export interface GenerationResult {
  content: string;
  status: 'success' | 'fallback';
  message?: string;
}

export interface GeneratePostOptions {
  title: string;
  content: string;
  tags: string[];
  contentType?: string;
  enhance?: boolean;
  enhanceOptions?: string[];
  previousContent?: string;
}

export const generateLinkedInPost = async (options: GeneratePostOptions): Promise<GenerationResult> => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    let prompt = '';
    
    if (options.enhance && options.previousContent) {
      if (options.enhanceOptions && options.enhanceOptions.length > 0) {
        // Specific enhancement options
        const enhancementTasks = options.enhanceOptions.map(option => {
          switch (option) {
            case 'spelling': return 'fix spelling mistakes';
            case 'grammar': return 'correct grammar errors';
            case 'rephrase': return 'rephrase for better clarity and engagement';
            default: return option;
          }
        }).join(', ');
        
        prompt = `
Please enhance the following content by: ${enhancementTasks}

Original Content:
${options.previousContent}

Requirements:
- Keep the same core message and meaning
- Apply only the requested enhancements
- Maintain the original tone and style
- Include relevant hashtags: ${options.tags.map(tag => `#${tag}`).join(' ')}

Enhanced Content:`;
      } else {
        // General enhancement prompt
        prompt = `
Please enhance and rephrase the following content while maintaining its core message and professional tone. Make it more engaging, add variety to the language, and improve the overall presentation:

Original Post:
${options.previousContent}

Requirements:
- Keep the same key points and message
- Use different phrasing and sentence structure
- Make it more engaging and professional
- Maintain appropriate LinkedIn tone
- Include relevant hashtags: ${options.tags.map(tag => `#${tag}`).join(' ')}
- Keep it concise but impactful (ideal length: 150-300 words)

Enhanced Content:`;
      }
    } else {
      // Content type specific generation
      const contentType = options.contentType || 'linkedin';
      let contentTypeInstructions = '';
      
      switch (contentType) {
        case 'linkedin':
          contentTypeInstructions = `
- Write in a professional yet engaging tone suitable for LinkedIn
- Structure with clear sections (hook, main content, call-to-action)
- Include relevant insights or takeaways
- Add appropriate emojis sparingly for visual appeal
- Keep it concise but valuable (ideal length: 150-300 words)
- Make it shareable and likely to generate engagement`;
          break;
        case 'tweet':
          contentTypeInstructions = `
- Keep it under 280 characters
- Make it punchy and engaging
- Use relevant hashtags (2-3 max)
- Include a clear call-to-action or thought-provoking question
- Use emojis strategically for visual appeal`;
          break;
        case 'youtube':
          contentTypeInstructions = `
- Create a compelling video script structure
- Include hook, main content, and strong call-to-action
- Add timestamps or sections for easy navigation
- Make it engaging for video format
- Include suggestions for visuals or demonstrations`;
          break;
        case 'reel':
          contentTypeInstructions = `
- Create a short, punchy script for 15-60 seconds
- Include visual cues and transitions
- Make it highly engaging and shareable
- Add trending hashtags and music suggestions
- Focus on quick, digestible content`;
          break;
        case 'instagram':
          contentTypeInstructions = `
- Create an engaging Instagram caption
- Use line breaks for readability
- Include relevant hashtags (10-15)
- Add a clear call-to-action
- Make it visually appealing with emojis`;
          break;
        case 'facebook':
          contentTypeInstructions = `
- Write in a conversational, community-focused tone
- Encourage comments and engagement
- Use storytelling elements
- Include relevant hashtags (3-5)
- Make it shareable and relatable`;
          break;
        default:
          contentTypeInstructions = `
- Write in an engaging, professional tone
- Structure the content clearly
- Include relevant insights
- Make it shareable and engaging`;
      }
      
      prompt = `
Create engaging ${contentType === 'linkedin' ? 'LinkedIn post' : contentType === 'tweet' ? 'Tweet' : contentType === 'youtube' ? 'YouTube script' : contentType === 'reel' ? 'Short/Reel script' : contentType === 'instagram' ? 'Instagram caption' : contentType === 'facebook' ? 'Facebook post' : 'social media content'} based on the following information:

Title: ${options.title}
Content/Context: ${options.content}
Tags: ${options.tags.join(', ')}

Requirements:
${contentTypeInstructions}
- Structure the post with clear sections (hook, main content, call-to-action)
- Include relevant insights or takeaways
- Add appropriate emojis sparingly for visual appeal
- Include relevant hashtags: ${options.tags.map(tag => `#${tag}`).join(' ')}

${contentType.charAt(0).toUpperCase() + contentType.slice(1)} Content:`;
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return {
      content: text.trim(),
      status: 'success'
    };
  } catch (error) {
    console.error('Error generating content with Gemini:', error);
    
    // Fallback to local generation if API fails
    const fallbackContent = generateFallbackContent(options);
    return {
      content: fallbackContent,
      status: 'fallback',
      message: 'AI model is currently overloaded. Using a simplified generation. Please try again later for full AI capabilities.'
    };
  }
};

// Fallback content generation (existing logic)
const generateFallbackContent = (options: GeneratePostOptions): string => {
  const { title, content, tags } = options;
  
  if (options.enhance && options.previousContent) {
    // Simple enhancement for fallback
    const enhanced = options.previousContent
      .replace(/\b(great|good|nice)\b/gi, 'exceptional')
      .replace(/\b(important|key)\b/gi, 'crucial')
      .replace(/\b(help|assist)\b/gi, 'empower')
      .replace(/\b(learn|study)\b/gi, 'discover');
    
    return `${enhanced}\n\n${tags.map(tag => `#${tag}`).join(' ')}`;
  }

  // Original fallback logic
  const contentLower = content.toLowerCase();
  
  const themes = {
    business: ['business', 'strategy', 'growth', 'revenue', 'profit', 'market', 'sales', 'customer'],
    tech: ['ai', 'technology', 'software', 'development', 'innovation', 'digital', 'automation', 'data'],
    leadership: ['team', 'leadership', 'management', 'culture', 'people', 'hiring', 'mentor', 'coach'],
    personal: ['journey', 'experience', 'learning', 'challenge', 'success', 'failure', 'growth', 'career'],
    product: ['product', 'launch', 'feature', 'user', 'design', 'feedback', 'iteration', 'improvement']
  };

  let detectedTheme = 'general';
  let maxMatches = 0;

  Object.entries(themes).forEach(([theme, keywords]) => {
    const matches = keywords.filter(keyword => contentLower.includes(keyword)).length;
    if (matches > maxMatches) {
      maxMatches = matches;
      detectedTheme = theme;
    }
  });

  const templates = {
    business: {
      hooks: ['💡 Here\'s what I learned about', '🚀 Excited to share insights on', '📈 The key to successful'],
      structure: ['Key insights:', 'What this means:', 'My takeaway:'],
      ctas: ['What\'s your experience with this?', 'Thoughts on this approach?', 'How do you handle this challenge?']
    },
    tech: {
      hooks: ['🔧 Just discovered something game-changing:', '⚡ The future of tech is here:', '💻 Breaking down the latest in'],
      structure: ['Technical highlights:', 'Why this matters:', 'Implementation notes:'],
      ctas: ['What tools are you using?', 'Have you tried this approach?', 'What\'s your tech stack preference?']
    },
    leadership: {
      hooks: ['👥 Leadership lesson learned:', '🎯 What great leaders do differently:', '💪 Building stronger teams through'],
      structure: ['The challenge:', 'The approach:', 'The results:'],
      ctas: ['How do you handle team challenges?', 'What\'s your leadership style?', 'Share your team-building tips!']
    },
    personal: {
      hooks: ['🌟 Personal reflection on', '📚 What I wish I knew earlier about', '🎯 My journey with'],
      structure: ['The situation:', 'What I learned:', 'Moving forward:'],
      ctas: ['Can you relate to this?', 'What\'s been your experience?', 'Share your journey below!']
    },
    product: {
      hooks: ['🎉 Excited to announce', '🔥 Product update that changes everything:', '✨ Behind the scenes of building'],
      structure: ['What we built:', 'Why it matters:', 'What\'s next:'],
      ctas: ['What features would you love to see?', 'How would you use this?', 'Feedback welcome!']
    },
    general: {
      hooks: ['💭 Thoughts on', '🚀 Sharing insights about', '📝 Quick reflection on'],
      structure: ['Key points:', 'Why this matters:', 'Final thoughts:'],
      ctas: ['What do you think?', 'Share your thoughts!', 'Let\'s discuss in the comments!']
    }
  };

  const template = templates[detectedTheme as keyof typeof templates];
  const hook = template.hooks[Math.floor(Math.random() * template.hooks.length)];
  const structureLabel = template.structure[Math.floor(Math.random() * template.structure.length)];
  const cta = template.ctas[Math.floor(Math.random() * template.ctas.length)];

  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 10);
  const keyPoints = sentences.slice(0, 3).map(s => s.trim());

  const hashtags = tags.map(tag => `#${tag}`).join(' ');

  let post = `${hook} ${title}!\n\n`;
  
  if (keyPoints.length > 0) {
    post += `${structureLabel}\n`;
    keyPoints.forEach((point, index) => {
      post += `${index + 1}. ${point}\n`;
    });
    post += '\n';
  }

  post += `This experience has taught me the importance of continuous learning and adaptation in today's fast-paced environment.\n\n`;
  post += `${cta} 👇\n\n`;
  post += hashtags;

  return post;
};