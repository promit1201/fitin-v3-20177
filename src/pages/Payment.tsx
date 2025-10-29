import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import logo from '@/assets/fitin-final-logo.jpg';

const Payment = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Header */}
      <div className="border-b border-border/50 bg-background/50 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/workout-planner')}
                className="text-muted-foreground hover:text-primary"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <img src={logo} alt="FitIn" className="h-10 w-auto" />
            </div>
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="text-muted-foreground hover:text-primary"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">
              <span className="text-gradient">Premium Personalized Plan</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Get started with your personalized fitness journey
            </p>
          </div>

          <div className="glass-card p-8 rounded-2xl mb-6">
            <h2 className="text-2xl font-bold mb-6">What's Included</h2>
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Conversation with Professional Trainer</h3>
                  <p className="text-sm text-muted-foreground">Personal consultation to understand your goals and fitness level</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Customize Workout and Diet Plan</h3>
                  <p className="text-sm text-muted-foreground">Fully customized plans based on your current physique and goals</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">24x7 Help with Our Trainer</h3>
                  <p className="text-sm text-muted-foreground">Continuous support and guidance whenever you need it</p>
                </div>
              </div>
            </div>

            <div className="border-t border-border/50 pt-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg">Monthly Subscription</span>
                <span className="text-3xl font-bold text-primary">₹2,999</span>
              </div>
              <p className="text-sm text-muted-foreground">Cancel anytime. No long-term commitments.</p>
            </div>

            <Button 
              className="w-full bg-yellow-500 text-black hover:bg-yellow-400 text-lg py-6"
              onClick={() => navigate('/premium-onboarding')}
            >
              Proceed to Payment Gateway
            </Button>

            <p className="text-xs text-muted-foreground text-center mt-4">
              Secure payment powered by Stripe. Your payment information is safe and encrypted.
            </p>
          </div>

          <div className="text-center">
            <Button
              variant="ghost"
              onClick={() => navigate('/workout-planner')}
              className="text-muted-foreground"
            >
              ← Back to Workout Planner
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Payment;
