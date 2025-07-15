import React from 'react';
import { Bell, Settings, User, Sparkles } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const DashboardHeader: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  return (
    <header className="bg-white border-b border-accent-200 px-3 sm:px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-bold text-gray-900">PostSpark</span>
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <button className="p-2 text-accent-600 hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-colors hidden sm:block">
            <Bell className="w-5 h-5" />
          </button>
          
          <div className="relative group">
            <button className="flex items-center space-x-1 sm:space-x-2 p-2 text-accent-600 hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-colors">
              <User className="w-5 h-5" />
              <span className="hidden md:block font-medium text-sm">{user?.name}</span>
            </button>
            
            <div className="absolute right-0 top-full mt-2 w-44 sm:w-48 bg-white rounded-lg shadow-lg border border-accent-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="p-3 border-b border-accent-200">
                <p className="font-medium text-gray-900 text-sm truncate">{user?.name}</p>
                <p className="text-xs sm:text-sm text-accent-600 truncate">{user?.email}</p>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${
                  user?.plan === 'super' ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700' :
                  user?.plan === 'pro' ? 'bg-primary-100 text-primary-700' : 'bg-accent-100 text-accent-700'
                }`}>
                  {user?.plan === 'super' ? '⚡ Super' : user?.plan === 'pro' ? 'Pro' : 'Free'}
                </span>
              </div>
              <div className="p-2">
                <button
                  onClick={() => navigate('/profile')}
                  className="w-full text-left px-3 py-2 text-xs sm:text-sm text-accent-700 hover:bg-accent-50 rounded-lg transition-colors flex items-center"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </button>
                <button
                  onClick={() => navigate('/pricing')}
                  className="w-full text-left px-3 py-2 text-xs sm:text-sm text-accent-700 hover:bg-accent-50 rounded-lg transition-colors"
                >
                  {user?.plan === 'free' ? 'Upgrade' : user?.plan === 'super' ? 'Super Settings' : 'Billing'}
                </button>
                {user?.permissions?.adminAccess && (
                  <button
                    onClick={() => navigate('/admin')}
                    className="w-full text-left px-3 py-2 text-xs sm:text-sm text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                  >
                    Admin
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-xs sm:text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
