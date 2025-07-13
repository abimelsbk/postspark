import React from 'react';
import { ArrowRight, Play, Sparkles, Star, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-32 left-20 animate-bounce-subtle">
        <div className="w-3 h-3 bg-blue-500 rounded-full opacity-60"></div>
      </div>
      <div className="absolute top-48 right-32 animate-bounce-subtle" style={{ animationDelay: '1s' }}>
        <div className="w-2 h-2 bg-purple-500 rounded-full opacity-60"></div>
      </div>
      <div className="absolute bottom-32 left-32 animate-bounce-subtle" style={{ animationDelay: '2s' }}>
        <div className="w-4 h-4 bg-pink-500 rounded-full opacity-60"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full text-primary-700 text-sm font-medium mb-8 animate-fade-in shadow-lg border border-white/20">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></div>
              <Sparkles className="w-4 h-4 mr-2 text-yellow-500" />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">
                AI-Powered Content Creation
              </span>
            </div>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 animate-fade-in leading-tight">
            <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
              Capture your thoughts.
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Craft viral posts.
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
              Share with style.
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto animate-fade-in leading-relaxed font-light">
            Transform your quick notes into engaging LinkedIn content with 
            <span className="font-semibold text-blue-600"> AI-powered generation</span> and 
            <span className="font-semibold text-purple-600"> stunning Unicode formatting</span>. 
            Perfect for busy professionals and content creators.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16 animate-slide-up">
            <button
              onClick={() => navigate('/auth?mode=signup')}
              className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg flex items-center transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-blue-500/25"
            >
              <span className="relative z-10">Start Creating Now</span>
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <button className="group flex items-center text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300">
              <div className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center mr-3 shadow-lg group-hover:shadow-xl transition-shadow duration-300 border border-white/20">
                <Play className="w-5 h-5 ml-1 text-blue-600" />
              </div>
              <span className="text-lg">Watch Demo</span>
            </button>
          </div>
          
          {/* Social Proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-16 text-gray-600">
            <div className="flex items-center">
              <div className="flex -space-x-2 mr-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full border-2 border-white"></div>
                ))}
              </div>
              <span className="text-sm font-medium">Trusted by 10,000+ creators</span>
            </div>
            <div className="flex items-center">
              <div className="flex text-yellow-400 mr-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-sm font-medium">4.9/5 rating</span>
            </div>
          </div>
          
          {/* Product Preview */}
          <div className="relative max-w-6xl mx-auto animate-fade-in">
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl transform scale-105"></div>
              
              {/* Main Container */}
              <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/20">
                {/* Browser Header */}
                <div className="bg-gray-50/80 backdrop-blur-sm px-6 py-4 border-b border-gray-200/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-500 text-sm">
                      <div className="w-4 h-4 bg-gray-300 rounded"></div>
                      <span>postspark.com</span>
                    </div>
                    <div className="w-16"></div>
                  </div>
                </div>
                
                {/* Content Area */}
                <div className="p-8 md:p-12">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* Left Side - Input */}
                    <div className="space-y-6">
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                          <Zap className="w-5 h-5 text-blue-500 mr-2" />
                          Your Idea
                        </h3>
                        <div className="space-y-3">
                          <div className="h-3 bg-gray-200 rounded-full w-3/4 animate-pulse"></div>
                          <div className="h-3 bg-gray-200 rounded-full w-1/2 animate-pulse"></div>
                          <div className="h-16 bg-blue-100 rounded-lg border-2 border-dashed border-blue-300 flex items-center justify-center">
                            <span className="text-blue-600 font-medium text-sm">✨ AI Magic Happens Here</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Right Side - Output */}
                    <div className="space-y-6">
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                          <Sparkles className="w-5 h-5 text-purple-500 mr-2" />
                          Viral Content
                        </h3>
                        <div className="space-y-3">
                          <div className="h-3 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full w-full"></div>
                          <div className="h-3 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full w-5/6"></div>
                          <div className="h-3 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full w-4/5"></div>
                          <div className="bg-white rounded-lg p-3 shadow-sm border">
                            <div className="text-xs text-gray-500 mb-1">LinkedIn Post Preview</div>
                            <div className="text-sm text-gray-700">🚀 Ready to share with the world!</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
