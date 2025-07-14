import React, { useState } from 'react';
import { Check, Star, Sparkles, Zap, Crown, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PLANS } from '../../types/billing';
import { billingService } from '../../utils/billingService';

export const PricingSection: React.FC = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const getIcon = (planId: string) => {
    switch (planId) {
      case 'free': return Shield;
      case 'starter': return Zap;
      case 'creator': return Star;
      case 'creator-pro': return Crown;
      default: return Shield;
    }
  };

  const formatPrice = (plan: typeof PLANS[0]) => {
    if (plan.price.monthly === 0) return '$0';
    
    const price = billingCycle === 'monthly' ? plan.price.monthly : plan.price.annual;
    const period = billingCycle === 'monthly' ? '/month' : '/year';
    
    return `$${price}${period}`;
  };

  const getSavings = (plan: typeof PLANS[0]) => {
    if (billingCycle === 'monthly' || plan.price.monthly === 0) return null;
    
    const savings = billingService.getAnnualSavings(plan.id);
    return savings.amount > 0 ? `Save $${savings.amount}` : null;
  };

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
            Credit-Based Pricing
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Flexible, Scalable
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Pricing
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Pay for what you use with our credit-based system. Scale up or down based on your content creation needs.
          </p>
        </div>
        
        {/* Billing Toggle */}
        <div className="flex items-center justify-center mb-12">
          <div className="bg-gray-100 rounded-2xl p-1 flex items-center">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-3 rounded-xl font-medium transition-all relative ${
                billingCycle === 'annual'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Annual
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PLANS.map((plan, index) => {
            const Icon = getIcon(plan.id);
            const savings = getSavings(plan);
            
            return (
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
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Plan Info */}
                  <div className="mb-8">
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="flex items-baseline mb-2">
                      <span className="text-4xl font-bold text-gray-900">{formatPrice(plan)}</span>
                    </div>
                    {savings && (
                      <div className="text-green-600 text-sm font-medium">{savings}</div>
                    )}
                  </div>

                  {/* Key Metrics */}
                  <div className="mb-6 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Monthly Posts:</span>
                      <span className="font-medium text-gray-900">{plan.monthlyPosts}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Credits/Month:</span>
                      <span className="font-medium text-gray-900">{plan.credits}</span>
                    </div>
                  </div>
                  
                  {/* Features */}
                  <div className="mb-8">
                    <ul className="space-y-4">
                      {plan.features.slice(0, 4).map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                            <Check className="w-4 h-4 text-green-600" />
                          </div>
                          <span className="text-gray-700 font-medium">{feature}</span>
                        </li>
                      ))}
                      {plan.features.length > 4 && (
                        <li className="text-sm text-gray-500">
                          +{plan.features.length - 4} more features
                        </li>
                      )}
                    </ul>
                  </div>
                  
                  {/* CTA Button */}
                  <button
                    onClick={() => navigate('/auth?mode=signup')}
                    className={`w-full py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl ${
                      plan.popular
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                        : plan.id === 'free'
                        ? 'bg-gray-600 hover:bg-gray-700 text-white'
                        : 'bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {plan.id === 'free' ? 'Get Started' : 'Upgrade Now'}
                  </button>
                </div>
              </div>
            </div>
          );
          })}
        </div>
        
        {/* Credit Costs Info */}
        <div className="text-center mt-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Credit Usage Guide
            </h3>
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="text-2xl font-bold text-blue-600 mb-1">2</div>
                <div className="text-sm text-blue-800">AI Generation</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
                <div className="text-2xl font-bold text-green-600 mb-1">1</div>
                <div className="text-sm text-green-800">AI Enhance</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-xl border border-purple-200">
                <div className="text-2xl font-bold text-purple-600 mb-1">2</div>
                <div className="text-sm text-purple-800">Schedule Post</div>
              </div>
              <div className="text-center p-4 bg-pink-50 rounded-xl border border-pink-200">
                <div className="text-2xl font-bold text-pink-600 mb-1">8</div>
                <div className="text-sm text-pink-800">Carousel Generator</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div className="text-2xl font-bold text-gray-600 mb-1">Free</div>
                <div className="text-sm text-gray-800">Formatter</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
