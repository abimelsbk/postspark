import React, { useState } from 'react';
import { Check, Star, Zap, Crown, Shield, ArrowRight } from 'lucide-react';
import { PLANS } from '../../types/billing';
import { billingService } from '../../utils/billingService';
import { useAuth } from '../../contexts/AuthContext';

interface PricingTableProps {
  onSelectPlan?: (planId: string, billingCycle: 'monthly' | 'annual') => void;
}

export const PricingTable: React.FC<PricingTableProps> = ({ onSelectPlan }) => {
  const { user } = useAuth();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const handleSelectPlan = (planId: string) => {
    if (onSelectPlan) {
      onSelectPlan(planId, billingCycle);
    }
  };

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
    return savings.amount > 0 ? `Save $${savings.amount} (${savings.percentage}%)` : null;
  };

  return (
    <div className="max-w-7xl mx-auto">
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
        {PLANS.map((plan) => {
          const Icon = getIcon(plan.id);
          const savings = getSavings(plan);
          const isCurrentPlan = user && user.plan === plan.id;
          
          return (
            <div
              key={plan.id}
              className={`relative group ${plan.popular ? 'lg:scale-105' : ''}`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center shadow-lg">
                    <Star className="w-4 h-4 mr-1 fill-current" />
                    Most Popular
                  </div>
                </div>
              )}

              {/* Card */}
              <div className={`relative bg-gradient-to-br ${plan.bgColor} rounded-3xl p-6 border-2 ${
                plan.popular ? 'border-purple-300' : plan.borderColor
              } group-hover:shadow-2xl transition-all duration-500 overflow-hidden h-full`}>
                
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-4 right-4 w-24 h-24 bg-current rounded-full"></div>
                  <div className="absolute bottom-4 left-4 w-16 h-16 bg-current rounded-full"></div>
                </div>

                {/* Content */}
                <div className="relative">
                  {/* Icon */}
                  <div className={`w-12 h-12 bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Plan Info */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="flex items-baseline mb-2">
                      <span className="text-3xl font-bold text-gray-900">
                        {formatPrice(plan)}
                      </span>
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
                  <div className="mb-6">
                    <ul className="space-y-2">
                      {plan.features.slice(0, 4).map((feature, index) => (
                        <li key={index} className="flex items-start text-sm">
                          <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
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
                    onClick={() => handleSelectPlan(plan.id)}
                    disabled={isCurrentPlan}
                    className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl ${
                      isCurrentPlan
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : plan.popular
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
                        : plan.id === 'free'
                        ? 'bg-gray-600 hover:bg-gray-700 text-white'
                        : 'bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {isCurrentPlan ? 'Current Plan' : plan.id === 'free' ? 'Get Started' : 'Upgrade Now'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Credit Costs Info */}
      <div className="mt-16 bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
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
  );
};
