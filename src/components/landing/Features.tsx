import React from 'react';
import { Bot, Type, Zap, Shield, Users, BarChart3 } from 'lucide-react';

const features = [
  {
    icon: Bot,
    title: 'AI-Powered Content Generation',
    description: 'Transform simple notes into engaging LinkedIn posts with advanced AI that understands professional tone and audience engagement.',
    color: 'text-primary-500',
    bgColor: 'bg-primary-50',
  },
  {
    icon: Type,
    title: '20+ Unicode Text Styles',
    description: 'Stand out with beautiful text formatting - from elegant cursive to bold statements, glitch effects, and emoji frames.',
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
  },
  {
    icon: Zap,
    title: 'Lightning Fast Workflow',
    description: 'From idea to post in seconds. Streamlined interface designed for busy professionals who need results quickly.',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
  },
  {
    icon: Shield,
    title: 'Professional & Secure',
    description: 'Enterprise-grade security with professional templates that maintain your brand voice and credibility.',
    color: 'text-green-500',
    bgColor: 'bg-green-50',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Share templates and collaborate with your team. Perfect for agencies and marketing departments.',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
  },
  {
    icon: BarChart3,
    title: 'Performance Insights',
    description: 'Track which styles and formats perform best for your audience with built-in analytics.',
    color: 'text-red-500',
    bgColor: 'bg-red-50',
  },
];

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-accent-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
          <p className="text-xl text-accent-600 max-w-2xl mx-auto">
            Everything you need to create compelling LinkedIn content that drives engagement and grows your professional presence.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-200 group">
              <div className={`w-12 h-12 ${feature.bgColor} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-accent-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};