import React from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-50 to-accent-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 bg-primary-100 rounded-full text-primary-700 text-sm font-medium mb-8 animate-fade-in">
            <span className="w-2 h-2 bg-primary-500 rounded-full mr-2 animate-pulse"></span>
            ✨ Transform ideas into viral LinkedIn posts
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 animate-fade-in leading-tight">
            Capture your thoughts.
            <br />
            <span className="text-primary-500">Craft beautiful posts.</span>
            <br />
            Share with style.
          </h1>
          
          <p className="text-xl text-accent-600 mb-8 max-w-2xl mx-auto animate-fade-in leading-relaxed">
            Turn your quick notes into engaging LinkedIn content with AI-powered generation 
            and stunning Unicode formatting. Perfect for busy professionals and content creators.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-slide-up">
            <button
              onClick={() => navigate('/auth?mode=signup')}
              className="bg-cta-400 hover:bg-cta-500 text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Start Capturing Ideas Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            
            <button className="flex items-center text-primary-500 hover:text-primary-600 font-medium transition-colors">
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </button>
          </div>
          
          <div className="relative max-w-4xl mx-auto animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-accent-200">
              <div className="bg-accent-50 px-6 py-4 border-b border-accent-200">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
              </div>
              <div className="p-8">
                <div className="space-y-4">
                  <div className="h-4 bg-accent-200 rounded w-3/4"></div>
                  <div className="h-4 bg-accent-200 rounded w-1/2"></div>
                  <div className="h-20 bg-primary-50 rounded-lg border-2 border-dashed border-primary-200 flex items-center justify-center">
                    <span className="text-primary-500 font-medium">✨ AI Magic Happens Here</span>
                  </div>
                  <div className="h-4 bg-accent-200 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};