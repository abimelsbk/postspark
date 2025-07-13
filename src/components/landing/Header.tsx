import React, { useState, useEffect } from 'react';
import { Sparkles, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => navigate('/')}>
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"></div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              PostSpark
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { label: 'How It Works', href: '#how-it-works' },
              { label: 'Features', href: '#features' },
              { label: 'Pricing', href: '#pricing' },
              { label: 'Testimonials', href: '#testimonials' }
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="relative text-gray-600 hover:text-gray-900 transition-colors duration-300 font-medium group"
              >
                {item.label}
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </a>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => navigate('/auth')}
              className="text-gray-600 hover:text-gray-900 transition-colors duration-300 font-medium"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/auth?mode=signup')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Start Free
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors duration-300"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-lg">
            <div className="px-4 py-6 space-y-4">
              {[
                { label: 'How It Works', href: '#how-it-works' },
                { label: 'Features', href: '#features' },
                { label: 'Pricing', href: '#pricing' },
                { label: 'Testimonials', href: '#testimonials' }
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block text-gray-600 hover:text-gray-900 transition-colors duration-300 font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4 space-y-3">
                <button
                  onClick={() => {
                    navigate('/auth');
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-center text-gray-600 hover:text-gray-900 transition-colors duration-300 font-medium py-2"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    navigate('/auth?mode=signup');
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg"
                >
                  Start Free
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
