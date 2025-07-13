import React from 'react';
import { Check, Star, Sparkles, Zap, Crown, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for getting started',
    icon: Sparkles,
    color: 'from-gray-500 to-gray-600',
    bgColor: 'from-gray-50 to-gray-100',
    borderColor: 'border-gray-200',
    features: [
      '3 notes per month',
      '3 AI generations',
      'Basic Unicode styles',
      'Standard support',
    ],
    limitations: [
      'Limited formatter styles',
      'No team collaboration',
    ],
    cta: 'Start Free',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: 'per month',
    description: 'For serious content creators',
    icon: Zap,
    color: 'from-blue-500 to-purple-600',
    bgColor: 'from-blue-50 to-purple-50',
    borderColor: 'border-blue-200',
    features: [
      'Unlimited notes',
      'Unlimited AI generations',
      'All 25+ Unicode styles',
      'Priority support',
      'Team collaboration',
      'Performance analytics',
      'Custom templates',
      'Export options',
    ],
    limitations: [],
    cta: 'Upgrade to Pro',
    popular: true,
  },
];

export const PricingSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-700 text-sm font-medium mb-6">
            <Crown className="w-4 h-4 mr-2" />
            Simple Pricing
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Simple, Transparent
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Pricing
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Start free and upgrade when you're ready. No hidden fees, no surprises. Just powerful tools to grow your content.
          </p>
        </div>
        
        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div key={index} className={`relative group ${plan.popular ? 'md:scale-105' : ''}`}>
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium flex items-center shadow-lg">
                    <Star className="w-4 h-4 mr-2 fill-current" />
                    Most Popular
                  </div>
                </div>
              )}
              
              {/* Card */}
              <div className={`relative bg-gradient-to-br ${plan.bgColor} rounded-3xl p-8 border-2 ${plan.popular ? 'border-blue-300' : plan.borderColor} group-hover:shadow-2xl transition-all duration-500 overflow-hidden`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-4 right-4 w-32 h-32 bg-current rounded-full"></div>
                  <div className="absolute bottom-4 left-4 w-20 h-20 bg-current rounded-full"></div>
                </div>
                
                {/* Content */}
                <div className="relative">
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                    <plan.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Plan Info */}
                  <div className="mb-8">
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-6">{plan.description}</p>
                    <div className="flex items-baseline mb-2">
                      <span className="text-6xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-600 ml-2">/{plan.period}</span>
                    </div>
                  </div>
                  
                  {/* Features */}
                  <div className="mb-8">
                    <ul className="space-y-4">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                            <Check className="w-4 h-4 text-green-600" />
                          </div>
                          <span className="text-gray-700 font-medium">{feature}</span>
                        </li>
                      ))}
                      {plan.limitations.map((limitation, limitationIndex) => (
                        <li key={limitationIndex} className="flex items-center opacity-50">
                          <div className="w-6 h-6 mr-3 flex-shrink-0 flex items-center justify-center">
                            <div className="w-4 h-0.5 bg-gray-400"></div>
                          </div>
                          <span className="text-gray-500">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* CTA Button */}
                  <button
                    onClick={() => navigate('/auth?mode=signup')}
                    className={`w-full py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl ${
                      plan.popular
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                        : 'bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Bottom Section */}
        <div className="text-center mt-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              All plans include
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div className="flex items-center justify-center">
                <Shield className="w-4 h-4 mr-2 text-green-500" />
                SSL Security
              </div>
              <div className="flex items-center justify-center">
                <Zap className="w-4 h-4 mr-2 text-blue-500" />
                Regular Backups
              </div>
              <div className="flex items-center justify-center">
                <Star className="w-4 h-4 mr-2 text-yellow-500" />
                Satisfaction Guarantee
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
