import React from 'react';
import { Check, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for getting started',
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
    features: [
      'Unlimited notes',
      'Unlimited AI generations',
      'All 20+ Unicode styles',
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
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-accent-600 max-w-2xl mx-auto">
            Start free and upgrade when you're ready. No hidden fees, no surprises.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <div key={index} className={`relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-200 border-2 ${plan.popular ? 'border-primary-500 scale-105' : 'border-accent-200'}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-accent-600 mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-accent-600 ml-2">/{plan.period}</span>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-accent-700">{feature}</span>
                  </li>
                ))}
                {plan.limitations.map((limitation, limitationIndex) => (
                  <li key={limitationIndex} className="flex items-center opacity-50">
                    <div className="w-5 h-5 mr-3 flex-shrink-0 flex items-center justify-center">
                      <div className="w-3 h-0.5 bg-accent-400"></div>
                    </div>
                    <span className="text-accent-500">{limitation}</span>
                  </li>
                ))}
              </ul>
              
              <button
                onClick={() => navigate('/auth?mode=signup')}
                className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-200 ${
                  plan.popular
                    ? 'bg-primary-500 hover:bg-primary-600 text-white shadow-lg hover:shadow-xl hover:scale-105'
                    : 'bg-accent-100 hover:bg-accent-200 text-accent-700'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-accent-600">
            All plans include SSL security, regular backups, and our satisfaction guarantee.
          </p>
        </div>
      </div>
    </section>
  );
};