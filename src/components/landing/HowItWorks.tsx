import React from 'react';
import { PenTool, Sparkles, Palette, Share2, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: PenTool,
    title: 'Capture',
    description: 'Quickly jot down your ideas, thoughts, or content concepts in our intuitive note editor.',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'from-blue-50 to-cyan-50',
    borderColor: 'border-blue-200',
  },
  {
    icon: Sparkles,
    title: 'Generate',
    description: 'Let AI transform your notes into engaging, professional content with perfect tone and structure.',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'from-purple-50 to-pink-50',
    borderColor: 'border-purple-200',
  },
  {
    icon: Palette,
    title: 'Style',
    description: 'Format your text with beautiful Unicode styles - from elegant cursive to bold statements.',
    color: 'from-pink-500 to-rose-500',
    bgColor: 'from-pink-50 to-rose-50',
    borderColor: 'border-pink-200',
  },
  {
    icon: Share2,
    title: 'Share',
    description: 'Copy your perfectly formatted content and share it on LinkedIn to engage your audience.',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'from-green-50 to-emerald-50',
    borderColor: 'border-green-200',
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-700 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            Simple Process
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From idea to viral post in just four simple steps. No complexity, just results that drive engagement.
          </p>
        </div>
        
        {/* Steps */}
        <div className="relative">
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 via-pink-200 to-green-200 transform -translate-y-1/2"></div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="w-8 h-8 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center text-sm font-bold text-gray-600 group-hover:border-gray-400 transition-colors duration-300">
                    {index + 1}
                  </div>
                </div>
                
                {/* Card */}
                <div className={`relative bg-gradient-to-br ${step.bgColor} rounded-3xl p-8 border ${step.borderColor} group-hover:shadow-2xl transition-all duration-500 group-hover:scale-105 overflow-hidden`}>
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-4 right-4 w-20 h-20 bg-current rounded-full"></div>
                    <div className="absolute bottom-4 left-4 w-12 h-12 bg-current rounded-full"></div>
                  </div>
                  
                  {/* Icon */}
                  <div className={`relative w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Content */}
                  <div className="relative">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed mb-6">{step.description}</p>
                    
                    {/* Arrow for desktop */}
                    {index < steps.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-12 transform -translate-y-1/2">
                        <ArrowRight className="w-6 h-6 text-gray-300 group-hover:text-gray-500 transition-colors duration-300" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg cursor-pointer">
            <span>Ready to get started?</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </div>
        </div>
      </div>
    </section>
  );
};
