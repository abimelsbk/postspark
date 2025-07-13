import React from 'react';
import { Header } from '../components/landing/Header';
import { Hero } from '../components/landing/Hero';
import { HowItWorks } from '../components/landing/HowItWorks';
import { PostFormatterHighlights } from '../components/landing/PostFormatterHighlights';
import { AIFeaturesSection } from '../components/landing/AIFeaturesSection';
import { Features } from '../components/landing/Features';
import { PricingSection } from '../components/landing/PricingSection';
import { Testimonials } from '../components/landing/Testimonials';
import { Footer } from '../components/landing/Footer';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <HowItWorks />
      <PostFormatterHighlights />
      <AIFeaturesSection />
      <Features />
      <PricingSection />
      <Testimonials />
      <Footer />
    </div>
  );
};
