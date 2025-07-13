import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Marketing Director',
    company: 'TechFlow',
    avatar: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    content: 'PostSpark transformed my LinkedIn strategy. The AI generates posts that sound exactly like me, and the Unicode formatting makes my content stand out instantly.',
    rating: 5,
  },
  {
    name: 'Marcus Johnson',
    role: 'CEO & Founder',
    company: 'GrowthLab',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    content: 'I was spending hours crafting LinkedIn posts. Now I capture ideas in seconds and let PostSpark handle the rest. My engagement has increased 300%.',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'Content Strategist',
    company: 'CreativeHub',
    avatar: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    content: 'The Unicode text formatter is a game-changer. My posts look professional yet creative, and clients always ask how I make my text look so unique.',
    rating: 5,
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-50 to-accent-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Loved by Content Creators</h2>
          <p className="text-xl text-accent-600 max-w-2xl mx-auto">
            Join thousands of professionals who've transformed their LinkedIn presence with PostSpark.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-accent-600 text-sm">{testimonial.role} at {testimonial.company}</p>
                </div>
              </div>
              
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <div className="relative">
                <Quote className="w-8 h-8 text-primary-200 absolute -top-2 -left-2" />
                <p className="text-accent-700 leading-relaxed pl-6">{testimonial.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};