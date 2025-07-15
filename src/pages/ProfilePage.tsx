import React, { useState } from 'react';
import { User, Mail, Calendar, Settings, Shield, CreditCard, ArrowLeft, Save, Edit, Plus } from 'lucide-react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { BillingDashboard } from '../components/billing/BillingDashboard';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'billing'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  // Redirect to landing page if user is not authenticated
  if (!user) {
    return <Navigate to="/" replace />;
  }

  const handleSave = () => {
    // In a real app, this would update the user profile
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleDeleteAccount = () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    );
    if (confirmed) {
      alert('Account deletion would be implemented here. Please contact support.');
    }
  };

  return (
    <div className="min-h-screen bg-accent-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center text-accent-600 hover:text-primary-500 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-accent-200 overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-accent-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-6 py-4 font-medium transition-colors ${
                  activeTab === 'profile'
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Profile Settings
              </button>
              <button
                onClick={() => setActiveTab('billing')}
                className={`px-6 py-4 font-medium transition-colors ${
                  activeTab === 'billing'
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Billing & Usage
              </button>
            </nav>
          </div>

          <div className="bg-gradient-to-r from-primary-500 to-purple-600 px-8 py-12">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                <User className="w-12 h-12 text-primary-500" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{user?.name}</h1>
                <p className="text-primary-100 mb-2">{user?.email}</p>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  user?.plan === 'super'
                    ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white'
                    : user?.plan === 'pro' 
                    ? 'bg-yellow-400 text-yellow-900' 
                    : 'bg-white text-primary-700'
                }`}>
                  {user?.plan === 'super' ? '⚡ Super User' : user?.plan === 'pro' ? '✨ Pro Plan' : 'Free Plan'}
                </span>
              </div>
            </div>
          </div>

          <div className="p-8">
            {activeTab === 'profile' ? (
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  Account Settings
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-accent-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors disabled:bg-accent-50 disabled:text-accent-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-accent-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors disabled:bg-accent-50 disabled:text-accent-600"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    {isEditing ? (
                      <>
                        <button
                          onClick={handleSave}
                          className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          Save Changes
                        </button>
                        <button
                          onClick={() => setIsEditing(false)}
                          className="bg-accent-200 hover:bg-accent-300 text-accent-700 px-4 py-2 rounded-lg transition-colors"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Profile
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Plan & Billing
                </h3>
                
                <div className="bg-accent-50 rounded-lg p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {user?.plan === 'super' ? 'Super User' : user?.plan === 'pro' ? 'Pro Plan' : 'Free Plan'}
                      </h4>
                      <p className="text-accent-600 text-sm">
                        {user?.plan === 'super' ? 'Unlimited access' : user?.plan === 'pro' ? '$29/month' : 'No cost'}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user?.plan === 'super'
                        ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700'
                        : user?.plan === 'pro' 
                        ? 'bg-green-100 text-green-700'
                        : 'bg-accent-200 text-accent-700'
                    }`}>
                      {user?.plan === 'super' ? '⚡ Super' : user?.plan === 'pro' ? 'Active' : 'Free'}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-accent-600">Notes Used</p>
                      <p className="font-semibold text-gray-900">
                        {user?.usage.notes}{user?.plan === 'free' && !user?.permissions?.unlimitedNotes ? '/3' : user?.plan === 'super' ? ' (∞)' : ''}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-accent-600">AI Generations</p>
                      <p className="font-semibold text-gray-900">
                        {user?.usage.aiGenerations}{user?.plan === 'free' && !user?.permissions?.unlimitedAI ? '/3' : user?.plan === 'super' ? ' (∞)' : ''}
                      </p>
                    </div>
                  </div>
                  
                  {user?.plan === 'super' && (
                    <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-3 mb-4">
                      <p className="text-purple-800 font-medium text-sm">⚡ Super User Permissions:</p>
                      <ul className="text-purple-700 text-xs mt-1 space-y-1">
                        <li>• Unlimited AI generations</li>
                        <li>• Unlimited note creation</li>
                        <li>• Admin dashboard access</li>
                        <li>• All premium features</li>
                      </ul>
                    </div>
                  )}
                  
                  <button
                    onClick={() => navigate('/pricing')}
                    className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                      user?.plan === 'super'
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
                        : user?.plan === 'pro'
                        ? 'bg-accent-200 text-accent-700 hover:bg-accent-300'
                        : 'bg-primary-500 text-white hover:bg-primary-600'
                    }`}
                  >
                    {user?.plan === 'super' ? 'Super User Settings' : user?.plan === 'pro' ? 'Manage Billing' : 'Upgrade to Pro'}
                  </button>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Security
                </h3>
                
                <div className="space-y-4">
                  <button className="w-full text-left p-4 border border-accent-200 rounded-lg hover:bg-accent-50 transition-colors">
                    <h4 className="font-medium text-gray-900 mb-1">Change Password</h4>
                    <p className="text-sm text-accent-600">Update your account password</p>
                  </button>
                  
                  <button className="w-full text-left p-4 border border-accent-200 rounded-lg hover:bg-accent-50 transition-colors">
                    <h4 className="font-medium text-gray-900 mb-1">Two-Factor Authentication</h4>
                    <p className="text-sm text-accent-600">Add extra security to your account</p>
                  </button>
                  
                  <button className="w-full text-left p-4 border border-accent-200 rounded-lg hover:bg-accent-50 transition-colors">
                    <h4 className="font-medium text-gray-900 mb-1">Download Data</h4>
                    <p className="text-sm text-accent-600">Export all your notes and data</p>
                  </button>
                </div>
              </div>
            </div>
            ) : (
              <BillingDashboard />
            )}
          </div>
        </div>

        {activeTab === 'profile' && (
          <div className="bg-white rounded-2xl shadow-sm border border-accent-200 overflow-hidden mt-8">
            <div className="p-8">
              <div className="border-t border-accent-200 pt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Danger Zone</h3>
                
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-red-900 mb-1">Delete Account</h4>
                      <p className="text-sm text-red-700">
                        Permanently delete your account and all associated data. This action cannot be undone.
                      </p>
                    </div>
                    <button
                      onClick={handleDeleteAccount}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors font-medium"
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
