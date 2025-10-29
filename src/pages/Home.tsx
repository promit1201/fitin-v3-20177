import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import { HomeWorkouts } from '@/components/HomeWorkouts';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <HomeWorkouts />
      <Footer />
    </div>
  );
};

export default Home;
