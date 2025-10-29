import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import OnboardingChatbot from '@/components/OnboardingChatbot';
import { HomeWorkouts } from '@/components/HomeWorkouts';

const Home = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <HomeWorkouts />
      <Footer />
      <OnboardingChatbot 
        isOpen={isChatbotOpen} 
        onClose={() => setIsChatbotOpen(false)} 
      />
    </div>
  );
};

export default Home;
