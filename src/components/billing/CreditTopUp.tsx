import React, { useState } from 'react';
import { CreditCard, Plus, X, Check } from 'lucide-react';
import { TOP_UP_OPTIONS } from '../../types/billing';
import { billingService } from '../../utils/billingService';
import { useAuth } from '../../contexts/AuthContext';

interface CreditTopUpProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const CreditTopUp: React.FC<CreditTopUpProps> = ({ isOpen, onClose, onSuccess }) => {
  const { user } = useAuth();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [processing, setProcessing] = useState(false);

  const handlePurchase = async () => {
    if (!user || selectedOption === null) return;

    setProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const option = TOP_UP_OPTIONS[selectedOption];
      billingService.addCredits(
        user.id,
        option.credits,
        'purchased',
        `Top-up: ${option.credits} credits for $${option.price}`
      );

      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center">
            <CreditCard className="w-5 h-5 mr-2 text-primary-500" />
            Top Up Credits
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 mb-6">
          {TOP_UP_OPTIONS.map((option, index) => (
            <button
              key={index}
              onClick={() => setSelectedOption(index)}
              className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                selectedOption === index
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-900">
                    {option.credits} Credits
                  </div>
                  <div className="text-sm text-gray-600">
                    ${option.price} • ${(option.price / option.credits).toFixed(3)} per credit
                  </div>
                </div>
                <div className="flex items-center">
                  {option.popular && (
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full mr-2">
                      Best Value
                    </span>
                  )}
                  {selectedOption === index && (
                    <Check className="w-5 h-5 text-primary-500" />
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h4 className="font-medium text-blue-900 mb-2">What can you do with credits?</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• AI Generation: 2 credits</li>
            <li>• AI Enhance: 1 credit</li>
            <li>• Schedule Post: 2 credits</li>
            <li>• Carousel Generator: 8 credits</li>
            <li>• Export PDF: 1 credit</li>
          </ul>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 px-4 rounded-xl font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handlePurchase}
            disabled={selectedOption === null || processing}
            className="flex-1 bg-primary-500 hover:bg-primary-600 text-white py-3 px-4 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {processing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 mr-2" />
                Purchase Credits
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
