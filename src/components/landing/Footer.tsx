import React from 'react';
import { Sparkles, Twitter, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
        <div className="absolute top-32 right-20 w-20 h-20 bg-white rounded-full"></div>
        <div className="absolute bottom-20 left-1/3 w-16 h-16 bg-white rounded-full"></div>
        <div className="absolute bottom-32 right-10 w-24 h-24 bg-white rounded-full"></div>
      </div>

      <div className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Brand Section */}
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">PostSpark</span>
              </div>
              <p className="text-gray-300 max-w-md leading-relaxed mb-6 text-lg">
                Transform your LinkedIn presence with AI-powered content generation and beautiful Unicode formatting. 
                Perfect for professionals who want to stand out and drive engagement.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/20 transition-all duration-300 hover:scale-110">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/20 transition-all duration-300 hover:scale-110">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="#" className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/20 transition-all duration-300 hover:scale-110">
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </div>
            
            {/* Product Links */}
            <div>
              <h4 className="font-semibold mb-6 text-lg">Product</h4>
              <ul className="space-y-3">
                {[
                  { label: 'Features', href: '#features' },
                  { label: 'Pricing', href: '#pricing' },
                  { label: 'API', href: '#' },
                  { label: 'Integrations', href: '#' },
                  { label: 'Templates', href: '#' },
                ].map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-gray-300 hover:text-white transition-colors duration-300 hover:underline">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Support Links */}
            <div>
              <h4 className="font-semibold mb-6 text-lg">Support</h4>
              <ul className="space-y-3">
                {[
                  { label: 'Help Center', href: '#' },
                  { label: 'Contact Us', href: '#' },
                  { label: 'Privacy Policy', href: '#' },
                  { label: 'Terms of Service', href: '#' },
                  { label: 'Status', href: '#' },
                ].map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-gray-300 hover:text-white transition-colors duration-300 hover:underline">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Bottom Section */}
          <div className="border-t border-white/20 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <p className="text-gray-300 text-sm mb-4 md:mb-0">
                © 2025 PostSpark. All rights reserved.
              </p>
              <div className="flex items-center space-x-6">
                <p className="text-gray-300 text-sm flex items-center">
                  Made with <Heart className="w-4 h-4 text-red-400 mx-1 fill-current" /> for content creators worldwide
                </p>
                <button
                  onClick={scrollToTop}
                  className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
                >
                  <ArrowUp className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
