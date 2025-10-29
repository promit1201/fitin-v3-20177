import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Dumbbell, 
  Apple, 
  TrendingUp, 
  MessageSquare, 
  Calendar,
  Award,
  ArrowRight
} from 'lucide-react';
import logo from '@/assets/fitin-final-logo.jpg';

const PremiumOnboarding = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Dumbbell,
      title: 'Custom Workout Plans',
      description: 'Personalized routines tailored to your fitness level and goals',
      color: 'text-primary'
    },
    {
      icon: Apple,
      title: 'Nutrition Guidance',
      description: '5-meal daily plans with macro tracking and calorie monitoring',
      color: 'text-green-500'
    },
    {
      icon: TrendingUp,
      title: 'Progress Tracking',
      description: 'Visual charts and logs to monitor your strength progression',
      color: 'text-blue-500'
    },
    {
      icon: Calendar,
      title: 'Workout Logging',
      description: 'Track every rep, set, and exercise to see your improvement',
      color: 'text-purple-500'
    },
    {
      icon: MessageSquare,
      title: '24/7 Trainer Support',
      description: 'Get answers and guidance from professional trainers anytime',
      color: 'text-orange-500'
    },
    {
      icon: Award,
      title: 'Achievement System',
      description: 'Stay motivated with streaks and milestone celebrations',
      color: 'text-yellow-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Header */}
      <div className="border-b border-border/50 bg-background/50 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center">
            <img src={logo} alt="FitIn" className="h-10 w-auto" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                Welcome to <span className="text-gradient">Premium!</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                You're now part of an exclusive community dedicated to transforming their fitness journey.
                Here's everything you can do with your premium membership.
              </p>
            </motion.div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <Card className="glass-card p-6 h-full hover:scale-105 transition-transform duration-300">
                  <div className={`${feature.color} mb-4`}>
                    <feature.icon className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="glass-card p-8 rounded-2xl text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Transform?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Your personalized fitness journey starts now. Access your custom workout plans,
              track your progress, and connect with expert trainers—all in one place.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate('/workout-planner')}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg"
              >
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/dashboard')}
                className="px-8 py-6 text-lg"
              >
                Go to Dashboard
              </Button>
            </div>
          </motion.div>

          {/* Help Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mt-8"
          >
            <p className="text-muted-foreground">
              Need help getting started?{' '}
              <button
                onClick={() => navigate('/contact')}
                className="text-primary hover:underline font-semibold"
              >
                Contact our support team
              </button>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default PremiumOnboarding;
