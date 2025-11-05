import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProfileSetup } from '@/components/premium/ProfileSetup';
import { CommunityLinks } from '@/components/premium/CommunityLinks';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Apple, Calendar, LogOut, TrendingUp, Camera } from 'lucide-react';
import fitinLogo from '@/assets/fitin-final-logo.jpg';
import gymBackground from '@/assets/gymimage2.jpg';

export default function PremiumDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [hasProfile, setHasProfile] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        navigate('/auth');
        return;
      }

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('height_cm, weight_kg, full_name')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;

      setUserName(profile?.full_name || 'User');
      setHasProfile(!!(profile?.height_cm && profile?.weight_kg));
    } catch (error) {
      console.error('Error checking auth:', error);
      toast({
        title: 'Error',
        description: 'Failed to load profile data.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!hasProfile) {
    return (
      <div
        className="min-h-screen bg-cover bg-center relative"
        style={{ backgroundImage: `url(${gymBackground})` }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10">
          <ProfileSetup onComplete={() => setHasProfile(true)} />
        </div>
      </div>
    );
  }

  const navigationCards = [
    {
      title: 'Nutrition Tracker',
      description: 'Track your daily meals and calories',
      icon: Apple,
      path: '/premium-nutrition-tracker',
      gradient: 'from-green-500 to-emerald-600',
    },
    {
      title: 'Progress Gallery',
      description: 'Upload and view your progress photos',
      icon: Camera,
      path: '/progress-gallery',
      gradient: 'from-purple-500 to-pink-600',
    },
    {
      title: 'Meal Planner',
      description: 'Plan your weekly meals',
      icon: Calendar,
      path: '/meal-planner',
      gradient: 'from-blue-500 to-cyan-600',
    },
  ];

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${gymBackground})` }}
    >
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={fitinLogo} alt="FitIn Logo" className="h-12 w-12 rounded-full" />
            <div>
              <h1 className="text-2xl font-bold text-white">FitIn Premium</h1>
              <p className="text-sm text-white/80">Welcome back, {userName}!</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </header>

        {/* Main Content */}
        <main className="flex-1 container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto space-y-12">
            {/* Welcome Section */}
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2">
                <TrendingUp className="w-8 h-8 text-primary" />
                <h2 className="text-4xl font-bold text-white">Your Fitness Journey</h2>
              </div>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">
                Track your progress, plan your meals, and connect with the community to achieve your fitness goals.
              </p>
            </div>

            {/* Navigation Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {navigationCards.map((card) => (
                <Card
                  key={card.path}
                  className="glass-card p-6 cursor-pointer hover:scale-105 transition-transform group"
                  onClick={() => navigate(card.path)}
                >
                  <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <card.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                  <p className="text-sm text-muted-foreground">{card.description}</p>
                </Card>
              ))}
            </div>

            {/* Community Links */}
            <div className="mt-12">
              <CommunityLinks />
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="p-6 text-center text-white/60 text-sm">
          © 2024 FitIn. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
