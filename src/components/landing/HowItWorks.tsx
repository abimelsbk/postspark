import React from 'react';
import { PenTool, Sparkles, Palette, Share2 } from 'lucide-react';

const steps = [
  {
    icon: PenTool,
    title: 'Capture',
    description: 'Quickly jot down your ideas, thoughts, or content concepts in our simple note editor.',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
  },
  {
    icon: Sparkles,
    title: 'Generate',
    description: 'Let AI transform your notes into engaging, professional LinkedIn posts with perfect tone.',
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
  },
  {
    icon: Palette,
    title: 'Style',
    description: 'Format your text with beautiful Unicode styles - from elegant cursive to bold statements.',
    color: 'text-pink-500',
    bgColor: 'bg-pink-50',
  },
  {
    icon: Share2,
    title: 'Post',
    description: 'Copy your perfectly formatted content and share it on LinkedIn to engage your audience.',
    color: 'text-green-500',
    bgColor: 'bg-green-50',
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-accent-600 max-w-2xl mx-auto">
            From idea to viral post in just four simple steps. No complexity, just results.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className={`w-16 h-16 ${step.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200`}>
                <step.icon className={`w-8 h-8 ${step.color}`} />
              </div>
              
              <div className="relative">
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-accent-100 text-accent-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-accent-600 leading-relaxed">{step.description}</p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                  <div className="w-8 h-0.5 bg-accent-200"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};