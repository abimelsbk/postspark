import React from 'react';
import { PricingTable } from '../components/billing/PricingTable';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { billingService } from '../utils/billingService';
import { ArrowLeft } from 'lucide-react';

const PricingPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSelectPlan = (planId: string, billingCycle: 'monthly' | 'annual') => {
    if (!user) {
      navigate('/auth?mode=signup');
      return;
    }

    if (planId === 'free') {
      alert('You are already on the free plan!');
      return;
    }

    // Simulate subscription process
    try {
      billingService.subscribeToPlan(user.id, planId, billingCycle);
      alert(`Successfully subscribed to ${planId} plan!`);
      navigate('/dashboard');
    } catch (error) {
      alert('Subscription failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Flexible credit-based pricing that scales with your content creation needs
          </p>
        </div>

        <PricingTable onSelectPlan={handleSelectPlan} />
      </div>
    </div>
  );
};

export default PricingPage;
