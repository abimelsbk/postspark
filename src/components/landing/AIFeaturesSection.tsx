import React from 'react';
import { Brain, Calendar, BarChart3, Sparkles, ArrowRight, Zap, Clock, TrendingUp } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI Post Generator',
    description: 'Transform simple notes into engaging LinkedIn posts with advanced AI that understands professional tone and audience engagement.',
    highlights: [
      'Multiple content types (LinkedIn, Twitter, YouTube)',
      'Professional tone optimization',
      'Instant generation from notes',
      'Context-aware suggestions'
    ],
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'from-blue-50 to-cyan-50',
    borderColor: 'border-blue-200',
    demoImage: '🧠',
    stats: '10x faster content creation'
  },
  {
    icon: Calendar,
    title: 'Smart Scheduling',
    description: 'Schedule your content across LinkedIn and Twitter with optimal timing suggestions and automated publishing.',
    highlights: [
      'Multi-platform scheduling',
      'Optimal timing suggestions',
      'Calendar view & management',
      'Automated publishing'
    ],
    color: 'from-purple-500 to-pink-500',
    bgColor: 'from-purple-50 to-pink-50',
    borderColor: 'border-purple-200',
    demoImage: '📅',
    stats: 'Schedule weeks ahead'
  },
  {
    icon: BarChart3,
    title: 'Performance Analytics',
    description: 'Track engagement, analyze what works, and optimize your content strategy with detailed performance insights.',
    highlights: [
      'Engagement tracking',
      'Style performance analysis',
      'Audience insights',
      'Growth metrics'
    ],
    color: 'from-green-500 to-emerald-500',
    bgColor: 'from-green-50 to-emerald-50',
    borderColor: 'border-green-200',
    demoImage: '📊',
    stats: '300% engagement boost'
  }
];

export const AIFeaturesSection: React.FC = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-700 text-sm font-medium mb-6">
            <Zap className="w-4 h-4 mr-2" />
            AI-Powered Platform
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Complete content
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              creation suite
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Everything you need to create, schedule, and optimize your LinkedIn content. Powered by advanced AI and designed for professionals.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="group">
              <div className={`relative bg-gradient-to-br ${feature.bgColor} rounded-3xl p-8 border ${feature.borderColor} group-hover:shadow-2xl transition-all duration-500 group-hover:scale-105 overflow-hidden h-full`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-4 right-4 w-32 h-32 bg-current rounded-full"></div>
                  <div className="absolute bottom-4 left-4 w-20 h-20 bg-current rounded-full"></div>
                  <div className="absolute top-1/2 left-1/2 w-12 h-12 bg-current rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                </div>

                {/* Content */}
                <div className="relative">
                  {/* Icon & Demo */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-4xl">{feature.demoImage}</div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {feature.description}
                  </p>

                  {/* Highlights */}
                  <ul className="space-y-2 mb-6">
                    {feature.highlights.map((highlight, highlightIndex) => (
                      <li key={highlightIndex} className="flex items-center text-sm text-gray-700">
                        <div className="w-1.5 h-1.5 bg-current rounded-full mr-3 opacity-60"></div>
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  {/* Stats & CTA */}
                  <div className="flex items-center justify-between">
                    <div className={`inline-flex items-center px-3 py-1 bg-gradient-to-r ${feature.color} text-white rounded-full text-sm font-medium`}>
                      {feature.stats}
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-12 border border-blue-100">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="flex items-center justify-center mb-3">
                <Brain className="w-8 h-8 text-blue-500" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">1M+</div>
              <div className="text-gray-600">Posts Generated</div>
            </div>
            <div>
              <div className="flex items-center justify-center mb-3">
                <Clock className="w-8 h-8 text-purple-500" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">50K+</div>
              <div className="text-gray-600">Hours Saved</div>
            </div>
            <div>
              <div className="flex items-center justify-center mb-3">
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">300%</div>
              <div className="text-gray-600">Avg. Engagement Boost</div>
            </div>
            <div>
              <div className="flex items-center justify-center mb-3">
                <Sparkles className="w-8 h-8 text-pink-500" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">25+</div>
              <div className="text-gray-600">Text Styles</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
