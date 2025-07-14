import React, { useState, useEffect } from 'react';
import { CreditCard, Calendar, TrendingUp, Plus, Download, Clock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { billingService } from '../../utils/billingService';
import { UserBilling, CreditTransaction } from '../../types/billing';
import { CreditTopUp } from './CreditTopUp';
import { format } from 'date-fns';

export const BillingDashboard: React.FC = () => {
  const { user } = useAuth();
  const [billing, setBilling] = useState<UserBilling | null>(null);
  const [showTopUp, setShowTopUp] = useState(false);

  useEffect(() => {
    if (user) {
      // Check for monthly reset
      billingService.checkMonthlyReset(user.id);
      
      // Load billing data
      const billingData = billingService.getUserBilling(user.id);
      setBilling(billingData);
    }
  }, [user]);

  const refreshBilling = () => {
    if (user) {
      const billingData = billingService.getUserBilling(user.id);
      setBilling(billingData);
    }
  };

  const currentPlan = billing ? billingService.getPlan(billing.currentPlan) : null;

  if (!billing || !currentPlan) {
    return <div>Loading...</div>;
  }

  const creditUsagePercentage = currentPlan.credits > 0 
    ? Math.max(0, Math.min(100, (billing.credits / currentPlan.credits) * 100))
    : 0;

  const postUsagePercentage = currentPlan.monthlyPosts > 0
    ? Math.max(0, Math.min(100, (billing.monthlyPostsUsed / currentPlan.monthlyPosts) * 100))
    : 0;

  const recentTransactions = billing.billingHistory
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Current Plan Overview */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Current Plan</h2>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            currentPlan.id === 'free' ? 'bg-gray-100 text-gray-700' :
            currentPlan.id === 'starter' ? 'bg-blue-100 text-blue-700' :
            currentPlan.id === 'creator' ? 'bg-purple-100 text-purple-700' :
            'bg-pink-100 text-pink-700'
          }`}>
            {currentPlan.name}
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Credits */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-blue-900">Credits</h3>
              <button
                onClick={() => setShowTopUp(true)}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
              >
                <Plus className="w-4 h-4 mr-1" />
                Top Up
              </button>
            </div>
            <div className="mb-2">
              <div className="flex items-baseline">
                <span className="text-2xl font-bold text-blue-900">{billing.credits}</span>
                <span className="text-blue-700 ml-2">/ {currentPlan.credits} monthly</span>
              </div>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${creditUsagePercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Monthly Posts */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
            <h3 className="font-semibold text-green-900 mb-3">Monthly Posts</h3>
            <div className="mb-2">
              <div className="flex items-baseline">
                <span className="text-2xl font-bold text-green-900">{billing.monthlyPostsUsed}</span>
                <span className="text-green-700 ml-2">/ {currentPlan.monthlyPosts}</span>
              </div>
            </div>
            <div className="w-full bg-green-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${postUsagePercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Subscription Info */}
        {billing.subscription && (
          <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Subscription</h4>
                <p className="text-sm text-gray-600">
                  {billing.subscription.billingCycle === 'monthly' ? 'Monthly' : 'Annual'} billing
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Next billing</p>
                <p className="font-medium text-gray-900">
                  {format(new Date(billing.subscription.currentPeriodEnd), 'MMM d, yyyy')}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Usage Statistics */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">This Month</h3>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">AI Generations</span>
              <span className="font-medium">
                {billing.billingHistory.filter(tx => 
                  tx.action === 'ai_generation' && 
                  new Date(tx.createdAt).getMonth() === new Date().getMonth()
                ).length}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Posts Scheduled</span>
              <span className="font-medium">
                {billing.billingHistory.filter(tx => 
                  tx.action === 'schedule_post' && 
                  new Date(tx.createdAt).getMonth() === new Date().getMonth()
                ).length}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Credits Spent</h3>
            <CreditCard className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-2">
            {billing.billingHistory
              .filter(tx => tx.type === 'spent' && new Date(tx.createdAt).getMonth() === new Date().getMonth())
              .reduce((sum, tx) => sum + Math.abs(tx.amount), 0)
            }
          </div>
          <p className="text-sm text-gray-600">This month</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Next Reset</h3>
            <Calendar className="w-5 h-5 text-purple-500" />
          </div>
          <div className="text-lg font-bold text-gray-900 mb-2">
            {format(
              new Date(billing.lastCreditReset.getFullYear(), billing.lastCreditReset.getMonth() + 1, billing.lastCreditReset.getDate()),
              'MMM d'
            )}
          </div>
          <p className="text-sm text-gray-600">Credits & posts reset</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Recent Activity</h3>
          <button className="text-gray-500 hover:text-gray-700 text-sm flex items-center">
            <Download className="w-4 h-4 mr-1" />
            Export
          </button>
        </div>

        {recentTransactions.length === 0 ? (
          <div className="text-center py-8">
            <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-600">No recent activity</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{transaction.description}</p>
                  <p className="text-sm text-gray-600">
                    {format(new Date(transaction.createdAt), 'MMM d, yyyy • h:mm a')}
                  </p>
                </div>
                <div className={`font-semibold ${
                  transaction.type === 'spent' ? 'text-red-600' : 'text-green-600'
                }`}>
                  {transaction.type === 'spent' ? '-' : '+'}{Math.abs(transaction.amount)} credits
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Credit Top-up Modal */}
      <CreditTopUp
        isOpen={showTopUp}
        onClose={() => setShowTopUp(false)}
        onSuccess={refreshBilling}
      />
    </div>
  );
};
