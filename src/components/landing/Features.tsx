import React from 'react';
import { Bot, Type, Zap, Shield, Users, BarChart3, Sparkles, ArrowUpRight } from 'lucide-react';

const features = [
  {
    icon: Bot,
    title: 'AI-Powered Content Generation',
    description: 'Transform simple notes into engaging LinkedIn posts with advanced AI that understands professional tone and audience engagement.',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'from-blue-50 to-cyan-50',
    borderColor: 'border-blue-200',
    stats: '10x faster content creation',
  },
  {
    icon: Type,
    title: '25+ Unicode Text Styles',
    description: 'Stand out with beautiful text formatting - from elegant cursive to bold statements, glitch effects, and emoji frames.',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'from-purple-50 to-pink-50',
    borderColor: 'border-purple-200',
    stats: '25+ unique styles',
  },
  {
    icon: Zap,
    title: 'Lightning Fast Workflow',
    description: 'From idea to post in seconds. Streamlined interface designed for busy professionals who need results quickly.',
    color: 'from-yellow-500 to-orange-500',
    bgColor: 'from-yellow-50 to-orange-50',
    borderColor: 'border-yellow-200',
    stats: 'Under 30 seconds',
  },
  {
    icon: Shield,
    title: 'Professional & Secure',
    description: 'Enterprise-grade security with professional templates that maintain your brand voice and credibility.',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'from-green-50 to-emerald-50',
    borderColor: 'border-green-200',
    stats: 'Bank-level security',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Share templates and collaborate with your team. Perfect for agencies and marketing departments.',
    color: 'from-indigo-500 to-blue-500',
    bgColor: 'from-indigo-50 to-blue-50',
    borderColor: 'border-indigo-200',
    stats: 'Unlimited team members',
  },
  {
    icon: BarChart3,
    title: 'Performance Insights',
    description: 'Track which styles and formats perform best for your audience with built-in analytics.',
    color: 'from-red-500 to-pink-500',
    bgColor: 'from-red-50 to-pink-50',
    borderColor: 'border-red-200',
    stats: 'Real-time analytics',
  },
];

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full text-purple-700 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            Powerful Features
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Everything you need to
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              create viral content
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Powerful tools and features designed to help you create compelling LinkedIn content that drives engagement and grows your professional presence.
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group relative">
              <div className={`relative bg-gradient-to-br ${feature.bgColor} rounded-3xl p-8 border ${feature.borderColor} group-hover:shadow-2xl transition-all duration-500 group-hover:scale-105 overflow-hidden h-full`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-4 right-4 w-24 h-24 bg-current rounded-full"></div>
                  <div className="absolute bottom-4 left-4 w-16 h-16 bg-current rounded-full"></div>
                  <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-current rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                </div>
                
                {/* Content */}
                <div className="relative">
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {feature.description}
                  </p>
                  
                  {/* Stats */}
                  <div className="flex items-center justify-between">
                    <div className={`inline-flex items-center px-3 py-1 bg-gradient-to-r ${feature.color} text-white rounded-full text-sm font-medium`}>
                      {feature.stats}
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Bottom Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-12 border border-blue-100">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to transform your content strategy?
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who've already elevated their LinkedIn presence with PostSpark.
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
              Start Your Free Trial
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
