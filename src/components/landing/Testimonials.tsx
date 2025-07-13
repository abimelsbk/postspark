import React from 'react';
import { Star, Quote, ArrowLeft, ArrowRight } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Marketing Director',
    company: 'TechFlow',
    avatar: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    content: 'PostSpark transformed my LinkedIn strategy completely. The AI generates posts that sound exactly like me, and the Unicode formatting makes my content stand out instantly. My engagement increased 300% in just two months!',
    rating: 5,
    metrics: '300% engagement increase',
  },
  {
    name: 'Marcus Johnson',
    role: 'CEO & Founder',
    company: 'GrowthLab',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    content: 'I was spending hours crafting LinkedIn posts every week. Now I capture ideas in seconds and let PostSpark handle the rest. The time savings alone paid for itself in the first month.',
    rating: 5,
    metrics: '10+ hours saved weekly',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Content Strategist',
    company: 'CreativeHub',
    avatar: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    content: 'The Unicode text formatter is a game-changer. My posts look professional yet creative, and clients always ask how I make my text look so unique. PostSpark gives me that competitive edge.',
    rating: 5,
    metrics: '5x more client inquiries',
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-pink-100 rounded-full text-pink-700 text-sm font-medium mb-6">
            <Star className="w-4 h-4 mr-2 fill-current" />
            Customer Stories
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Loved by content
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              creators worldwide
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join thousands of professionals who've transformed their LinkedIn presence and achieved remarkable results with PostSpark.
          </p>
        </div>
        
        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="group">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:scale-105 border border-white/20 relative overflow-hidden h-full">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                  <div className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                </div>
                
                {/* Content */}
                <div className="relative">
                  {/* Quote Icon */}
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <Quote className="w-6 h-6 text-white" />
                  </div>
                  
                  {/* Rating */}
                  <div className="flex items-center mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  {/* Content */}
                  <blockquote className="text-gray-700 leading-relaxed mb-6 text-lg">
                    "{testimonial.content}"
                  </blockquote>
                  
                  {/* Metrics */}
                  <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-4 mb-6 border border-green-200">
                    <div className="text-green-800 font-semibold text-sm">
                      📈 {testimonial.metrics}
                    </div>
                  </div>
                  
                  {/* Author */}
                  <div className="flex items-center">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full mr-4 object-cover border-2 border-white shadow-lg"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
                      <p className="text-gray-600 text-sm">{testimonial.role}</p>
                      <p className="text-blue-600 text-sm font-medium">{testimonial.company}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Stats Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 border border-white/20 shadow-lg">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">10,000+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">1M+</div>
              <div className="text-gray-600">Posts Generated</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">4.9/5</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">300%</div>
              <div className="text-gray-600">Avg. Engagement Boost</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
