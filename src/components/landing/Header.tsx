import React from 'react';
import { Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-accent-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">PostSpark</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#how-it-works" className="text-accent-600 hover:text-primary-500 transition-colors">
              How It Works
            </a>
            <a href="#features" className="text-accent-600 hover:text-primary-500 transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-accent-600 hover:text-primary-500 transition-colors">
              Pricing
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/auth')}
              className="text-accent-600 hover:text-primary-500 transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/auth?mode=signup')}
              className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
            >
              Start Free
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};