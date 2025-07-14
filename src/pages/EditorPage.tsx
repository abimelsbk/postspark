import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Save, 
  Send, 
  Calendar, 
  Sparkles, 
  Type, 
  Tag, 
  Plus,
  X,
  Copy,
  Check,
  Edit,
  Wand2,
  RotateCcw,
  Clock,
  Globe,
  Users
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { generateLinkedInPost } from '../utils/geminiApi';
import { TextFormatter } from '../components/editor/TextFormatter';
import { ScheduleModal } from '../components/scheduling/ScheduleModal';
import { billingService } from '../utils/billingService';
import { CreditTopUp } from '../components/billing/CreditTopUp';

interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const contentTypes = [
  { id: 'linkedin', label: 'LinkedIn Post', emoji: '💼', description: 'Professional networking content' },
  { id: 'tweet', label: 'X (Twitter)', emoji: '🐦', description: 'Short, punchy messages' },
  { id: 'youtube', label: 'YouTube Script', emoji: '🎥', description: 'Video content script' },
  { id: 'reel', label: 'Short/Reel Script', emoji: '📱', description: 'Short-form video content' },
  { id: 'instagram', label: 'Instagram Caption', emoji: '📸', description: 'Visual content captions' },
  { id: 'facebook', label: 'Facebook Post', emoji: '👥', description: 'Community-focused content' },
];

export const EditorPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  
  // Core state
  const [note, setNote] = useState<Note>({
    id: '',
    title: '',
    content: '',
    tags: [],
    createdAt: new Date(),
    updatedAt: new Date()
  });
  
  // UI state
  const [activeTab, setActiveTab] = useState<'manual' | 'ai'>('manual');
  const [selectedContentTypes, setSelectedContentTypes] = useState<string[]>(['linkedin']);
  const [newTag, setNewTag] = useState('');
  const [showTextFormatter, setShowTextFormatter] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  
  // AI Generation state
  const [generatedContent, setGeneratedContent] = useState<{ [key: string]: string }>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStatus, setGenerationStatus] = useState<'success' | 'fallback' | null>(null);
  const [generationMessage, setGenerationMessage] = useState<string>('');
  
  // Manual editing state
  const [manualContent, setManualContent] = useState('');
  const [originalContent, setOriginalContent] = useState('');
  const [enhancementOptions, setEnhancementOptions] = useState<string[]>([]);

  // Load existing note if editing
  useEffect(() => {
    if (id) {
      const savedNotes = JSON.parse(localStorage.getItem('postspark_notes') || '[]');
      const existingNote = savedNotes.find((n: Note) => n.id === id);
      if (existingNote) {
        const noteWithDates = {
          ...existingNote,
          createdAt: new Date(existingNote.createdAt),
          updatedAt: new Date(existingNote.updatedAt)
        };
        setNote(noteWithDates);
        setManualContent(noteWithDates.content);
        setOriginalContent(noteWithDates.content);
      }
    }
  }, [id]);

  const handleSaveNote = () => {
    if (!note.title.trim()) {
      alert('Please enter a title for your note');
      return;
    }

    // Check usage limits for free users
    if (user?.plan === 'free' && !user?.permissions?.unlimitedNotes) {
      const savedNotes = JSON.parse(localStorage.getItem('postspark_notes') || '[]');
      if (!id && savedNotes.length >= 3) {
        alert('You have reached the monthly limit of 3 notes. Upgrade to Pro for unlimited notes.');
        return;
      }
    }

    const updatedNote = {
      ...note,
      content: manualContent,
      updatedAt: new Date(),
      id: id || Date.now().toString()
    };

    const savedNotes = JSON.parse(localStorage.getItem('postspark_notes') || '[]');
    let updatedNotes;
    
    if (id) {
      updatedNotes = savedNotes.map((n: Note) => n.id === id ? updatedNote : n);
    } else {
      updatedNotes = [...savedNotes, updatedNote];
      
      // Update user usage count for free users
      if (user?.plan === 'free' && !user?.permissions?.unlimitedNotes) {
        const updatedUser = {
          ...user,
          usage: {
            ...user.usage,
            notes: user.usage.notes + 1
          }
        };
        localStorage.setItem('postspark_user', JSON.stringify(updatedUser));
      }
    }

    localStorage.setItem('postspark_notes', JSON.stringify(updatedNotes));
    setNote(updatedNote);
    
    if (!id) {
      navigate(`/editor/${updatedNote.id}`);
    }
  };

  const handleGenerateContent = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      alert('Please enter both a title and content before generating');
      return;
    }

    // Check AI generation limits for free users
    if (user?.plan === 'free' && user.usage.aiGenerations >= 3 && !user?.permissions?.unlimitedAI) {
      alert('You have reached the monthly limit of 3 AI generations. Upgrade to Pro for unlimited generations.');
      return;
    }

    setIsGenerating(true);
    setGenerationStatus(null);
    setGenerationMessage('');

    try {
      const newGeneratedContent: { [key: string]: string } = {};
      
      for (const contentType of selectedContentTypes) {
        const result = await generateLinkedInPost({
          title: note.title,
          content: note.content,
          tags: note.tags,
          contentType
        });
        
        newGeneratedContent[contentType] = result.content;
        
        if (result.status === 'fallback') {
          setGenerationStatus('fallback');
          setGenerationMessage(result.message || '');
        } else if (!generationStatus) {
          setGenerationStatus('success');
        }
      }
      
      setGeneratedContent(newGeneratedContent);
      
      // Update user usage count for free users
      if (user?.plan === 'free' && !user?.permissions?.unlimitedAI) {
        const updatedUser = {
          ...user,
          usage: {
            ...user.usage,
            aiGenerations: user.usage.aiGenerations + 1
          }
        };
        localStorage.setItem('postspark_user', JSON.stringify(updatedUser));
      }
      
    } catch (error) {
      console.error('Error generating content:', error);
      alert('Failed to generate content. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleEnhanceContent = async () => {
    if (!manualContent.trim()) {
      alert('Please enter some content to enhance');
      return;
    }

    if (user?.plan === 'free' && user.usage.aiGenerations >= 3 && !user?.permissions?.unlimitedAI) {
      alert('You have reached the monthly limit of 3 AI generations. Upgrade to Pro for unlimited generations.');
      return;
    }

    setIsGenerating(true);
    
    try {
      const result = await generateLinkedInPost({
        title: note.title,
        content: note.content,
        tags: note.tags,
        enhance: true,
        enhanceOptions: enhancementOptions,
        previousContent: manualContent
      });
      
      setManualContent(result.content);
      
      if (result.status === 'fallback') {
        setGenerationStatus('fallback');
        setGenerationMessage(result.message || '');
      } else {
        setGenerationStatus('success');
      }
      
      // Update user usage count for free users
      if (user?.plan === 'free' && !user?.permissions?.unlimitedAI) {
        const updatedUser = {
          ...user,
          usage: {
            ...user.usage,
            aiGenerations: user.usage.aiGenerations + 1
          }
        };
        localStorage.setItem('postspark_user', JSON.stringify(updatedUser));
      }
      
    } catch (error) {
      console.error('Error enhancing content:', error);
      alert('Failed to enhance content. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !note.tags.includes(newTag.trim())) {
      setNote(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setNote(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleContentTypeToggle = (contentType: string) => {
    setSelectedContentTypes(prev => 
      prev.includes(contentType)
        ? prev.filter(type => type !== contentType)
        : [...prev, contentType]
    );
  };

  const copyToClipboard = async (text: string, contentType: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(contentType);
      setTimeout(() => setCopiedText(null), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const handleInsertFormattedText = (formattedText: string) => {
    setManualContent(prev => prev + formattedText);
    setShowTextFormatter(false);
  };

  const handleScheduleContent = (scheduledDate: Date, visibility: 'PUBLIC' | 'CONNECTIONS', platform: string) => {
    // Save to ready-to-schedule
    const readyToSchedulePost = {
      id: Date.now().toString(),
      noteId: note.id,
      title: note.title,
      content: manualContent,
      contentType: platform,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const savedReadyPosts = JSON.parse(localStorage.getItem('postspark_ready_to_schedule') || '[]');
    const updatedReadyPosts = [...savedReadyPosts, readyToSchedulePost];
    localStorage.setItem('postspark_ready_to_schedule', JSON.stringify(updatedReadyPosts));

    setShowScheduleModal(false);
    alert('Content saved to ready-to-schedule! You can schedule it from the Scheduling page.');
  };

  const handleRevertToOriginal = () => {
    setManualContent(originalContent);
  };

  return (
    <div className="min-h-screen bg-accent-50">
      {/* Header */}
      <div className="bg-white border-b border-accent-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="p-2 text-accent-600 hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  {id ? 'Edit Note' : 'Create New Note'}
                </h1>
                <p className="text-sm text-accent-600">
                  {user?.plan === 'super' 
                    ? 'Unlimited AI generations (Super User)' :
                    user?.plan === 'free' 
                    ? `${user.usage.aiGenerations}/3 AI generations used this month`
                    : 'Unlimited AI generations'
                  }
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={handleSaveNote}
                className="flex items-center space-x-2 px-4 py-2 text-primary-700 bg-primary-100 hover:bg-primary-200 rounded-lg transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Save Note</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Part 1: Capture Your Idea */}
            <div className="bg-white rounded-2xl shadow-sm border border-accent-200 p-6">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">1</div>
                <h2 className="text-xl font-semibold text-gray-900">Capture Your Idea</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={note.title}
                    onChange={(e) => setNote(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter a catchy title for your content idea..."
                    className="w-full px-4 py-3 border border-accent-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content Ideas & Notes
                  </label>
                  <textarea
                    value={note.content}
                    onChange={(e) => setNote(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Jot down your thoughts, key points, experiences, or any content ideas..."
                    rows={6}
                    className="w-full px-4 py-3 border border-accent-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {note.tags.map((tag) => (
                      <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-700">
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                        <button
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-2 text-primary-500 hover:text-primary-700"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                      placeholder="Add tags (e.g., productivity, leadership, tech)"
                      className="flex-1 px-3 py-2 border border-accent-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    />
                    <button
                      onClick={handleAddTag}
                      className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Part 2: Develop Your Content */}
            <div className="bg-white rounded-2xl shadow-sm border border-accent-200 p-6">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">2</div>
                <h2 className="text-xl font-semibold text-gray-900">Develop Your Content</h2>
              </div>
              
              <p className="text-accent-600 mb-6">
                Choose to manually develop your idea or let AI generate content for all selected platforms.
              </p>

              {/* Options in Row */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Option A: Manual Development */}
                <div className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                  activeTab === 'manual' 
                    ? 'border-primary-500 bg-primary-50' 
                    : 'border-accent-200 hover:border-accent-300'
                }`}
                onClick={() => setActiveTab('manual')}>
                  <div className="flex items-center space-x-3 mb-3">
                    <Edit className="w-5 h-5 text-primary-500" />
                    <h3 className="font-semibold text-gray-900">Option A: Manual Development</h3>
                  </div>
                  <p className="text-sm text-accent-600">
                    Write and edit your content manually with AI enhancement options
                  </p>
                </div>

                {/* Option B: AI Generation */}
                <div className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                  activeTab === 'ai' 
                    ? 'border-primary-500 bg-primary-50' 
                    : 'border-accent-200 hover:border-accent-300'
                }`}
                onClick={() => setActiveTab('ai')}>
                  <div className="flex items-center space-x-3 mb-3">
                    <Sparkles className="w-5 h-5 text-primary-500" />
                    <h3 className="font-semibold text-gray-900">Option B: AI Generation</h3>
                  </div>
                  <p className="text-sm text-accent-600">
                    Let AI create optimized content for your selected platforms
                  </p>
                </div>
              </div>

              {/* Content based on selected option */}
              {activeTab === 'manual' ? (
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Manual Content Editor
                      </label>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setShowTextFormatter(true)}
                          className="flex items-center space-x-2 px-3 py-1 text-purple-600 bg-purple-100 hover:bg-purple-200 rounded-lg transition-colors text-sm"
                        >
                          <Type className="w-4 h-4" />
                          <span>Format Text</span>
                        </button>
                        {manualContent !== originalContent && (
                          <button
                            onClick={handleRevertToOriginal}
                            className="flex items-center space-x-2 px-3 py-1 text-accent-600 bg-accent-100 hover:bg-accent-200 rounded-lg transition-colors text-sm"
                          >
                            <RotateCcw className="w-4 h-4" />
                            <span>Revert</span>
                          </button>
                        )}
                      </div>
                    </div>
                    <textarea
                      value={manualContent}
                      onChange={(e) => setManualContent(e.target.value)}
                      placeholder="Start writing your content here..."
                      rows={12}
                      className="w-full px-4 py-3 border border-accent-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Enhancement Options:
                    </label>
                    <div className="space-y-2">
                      {[
                        { id: 'spelling', label: 'Fix Spelling Mistakes' },
                        { id: 'grammar', label: 'Fix Grammar Errors' },
                        { id: 'rephrase', label: 'Rephrase Content' }
                      ].map((option) => (
                        <label key={option.id} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={enhancementOptions.includes(option.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setEnhancementOptions(prev => [...prev, option.id]);
                              } else {
                                setEnhancementOptions(prev => prev.filter(opt => opt !== option.id));
                              }
                            }}
                            className="mr-3 text-primary-500 focus:ring-primary-500"
                          />
                          <span className="text-sm text-gray-700">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleEnhanceContent}
                    disabled={isGenerating || !manualContent.trim()}
                    className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Enhancing...
                      </>
                    ) : (
                      <>
                        <Wand2 className="w-5 h-5 mr-2" />
                        Enhance with AI
                      </>
                    )}
                  </button>

                  {/* Schedule Options */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Schedule Options:
                    </label>
                    <div className="grid md:grid-cols-2 gap-3">
                      <button
                        onClick={() => {
                          const readyToSchedulePost = {
                            id: Date.now().toString(),
                            noteId: note.id,
                            title: note.title,
                            content: manualContent,
                            contentType: 'linkedin',
                            createdAt: new Date(),
                            updatedAt: new Date()
                          };
                          const savedReadyPosts = JSON.parse(localStorage.getItem('postspark_ready_to_schedule') || '[]');
                          const updatedReadyPosts = [...savedReadyPosts, readyToSchedulePost];
                          localStorage.setItem('postspark_ready_to_schedule', JSON.stringify(updatedReadyPosts));
                          alert('Content saved to ready-to-schedule!');
                        }}
                        disabled={!manualContent.trim()}
                        className="flex items-center justify-center space-x-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Calendar className="w-4 h-4" />
                        <span>Ready to Schedule</span>
                      </button>
                      <button
                        onClick={() => setShowScheduleModal(true)}
                        disabled={!manualContent.trim()}
                        className="flex items-center justify-center space-x-2 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send className="w-4 h-4" />
                        <span>Schedule Now</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Platform Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Select Content Types to Generate:
                    </label>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {contentTypes.map((type) => (
                        <label key={type.id} className="flex items-center p-3 border border-accent-200 rounded-lg hover:bg-accent-50 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedContentTypes.includes(type.id)}
                            onChange={() => handleContentTypeToggle(type.id)}
                            className="mr-3 text-primary-500 focus:ring-primary-500"
                          />
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">{type.emoji}</span>
                            <div>
                              <p className="font-medium text-gray-900 text-sm">{type.label}</p>
                              <p className="text-xs text-accent-600">{type.description}</p>
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleGenerateContent}
                    disabled={isGenerating || selectedContentTypes.length === 0 || !note.title.trim() || !note.content.trim()}
                    className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 mr-2" />
                        Generate with AI
                      </>
                    )}
                  </button>

                  {user?.plan === 'free' && !user?.permissions?.unlimitedAI && (
                    <p className="text-sm text-accent-600 text-center">
                      {user.usage.aiGenerations}/3 AI generations used this month
                    </p>
                  )}
                  
                  {user?.plan === 'super' && (
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-3">
                      <p className="text-sm text-purple-700 text-center font-medium">
                        ⚡ Super User: Unlimited AI generations available
                      </p>
                    </div>
                  )}

                  {/* Generated Content Display */}
                  {Object.keys(generatedContent).length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Generated Content</h3>
                      
                      {generationStatus === 'fallback' && generationMessage && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                          <p className="text-yellow-800 text-sm">{generationMessage}</p>
                        </div>
                      )}
                      
                      {Object.entries(generatedContent).map(([contentType, content]) => {
                        const typeInfo = contentTypes.find(t => t.id === contentType);
                        return (
                          <div key={contentType} className="border border-accent-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center space-x-2">
                                <span className="text-lg">{typeInfo?.emoji}</span>
                                <h4 className="font-medium text-gray-900">{typeInfo?.label}</h4>
                              </div>
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => copyToClipboard(content, contentType)}
                                  className="p-2 text-accent-400 hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-colors"
                                  title="Copy to clipboard"
                                >
                                  {copiedText === contentType ? (
                                    <Check className="w-4 h-4 text-green-500" />
                                  ) : (
                                    <Copy className="w-4 h-4" />
                                  )}
                                </button>
                              </div>
                            </div>
                            <div className="bg-accent-50 rounded-lg p-3">
                              <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">
                                {content}
                              </pre>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm border border-accent-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => setShowTextFormatter(true)}
                  className="w-full flex items-center space-x-3 p-3 text-left bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
                >
                  <Type className="w-5 h-5 text-purple-500" />
                  <div>
                    <p className="font-medium text-purple-900">Unicode Formatter</p>
                    <p className="text-sm text-purple-700">Style your text with 25+ formats</p>
                  </div>
                </button>
                
                <button
                  onClick={() => setShowScheduleModal(true)}
                  disabled={!manualContent.trim() && Object.keys(generatedContent).length === 0}
                  className="w-full flex items-center space-x-3 p-3 text-left bg-green-50 hover:bg-green-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Clock className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="font-medium text-green-900">Schedule Content</p>
                    <p className="text-sm text-green-700">Plan your posts for optimal timing</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-white rounded-2xl shadow-sm border border-accent-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 Pro Tips</h3>
              <div className="space-y-3 text-sm text-accent-600">
                <p>• Use specific, descriptive titles for better AI generation</p>
                <p>• Add relevant tags to improve content targeting</p>
                <p>• Try different content types for various platforms</p>
                <p>• Use the Unicode formatter to make your posts stand out</p>
                <p>• Schedule posts during peak engagement hours</p>
              </div>
            </div>

            {/* Character Counts */}
            {(manualContent || Object.keys(generatedContent).length > 0) && (
              <div className="bg-white rounded-2xl shadow-sm border border-accent-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Character Counts</h3>
                <div className="space-y-3">
                  {manualContent && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-accent-600">Manual Content</span>
                      <span className="text-sm font-medium text-gray-900">{manualContent.length}</span>
                    </div>
                  )}
                  {Object.entries(generatedContent).map(([type, content]) => {
                    const typeInfo = contentTypes.find(t => t.id === type);
                    const limit = type === 'tweet' ? 280 : type === 'linkedin' ? 3000 : null;
                    const isOverLimit = limit && content.length > limit;
                    
                    return (
                      <div key={type} className="flex justify-between items-center">
                        <span className="text-sm text-accent-600">{typeInfo?.label}</span>
                        <span className={`text-sm font-medium ${isOverLimit ? 'text-red-500' : 'text-gray-900'}`}>
                          {content.length}{limit && `/${limit}`}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Text Formatter Modal */}
      {showTextFormatter && (
        <TextFormatter
          onClose={() => setShowTextFormatter(false)}
          onInsert={handleInsertFormattedText}
        />
      )}

      {/* Schedule Modal */}
      {showScheduleModal && (
        <ScheduleModal
          isOpen={showScheduleModal}
          onClose={() => setShowScheduleModal(false)}
          onSchedule={handleScheduleContent}
          content={manualContent || Object.values(generatedContent)[0] || ''}
          contentType="linkedin"
        />
      )}
    </div>
  );
};
