import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MealPlanner as MealPlannerComponent } from '@/components/nutrition/MealPlanner';
import { ArrowLeft } from 'lucide-react';
import fitinLogo from '@/assets/fitin-final-logo.jpg';
import gymBackground from '@/assets/gymimage2.jpg';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

export default function MealPlanner() {
  const navigate = useNavigate();

  // Check if user has completed profile setup
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['user-profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');
      
      const { data } = await supabase
        .from('profiles')
        .select('height_cm, weight_kg')
        .eq('user_id', user.id)
        .single();
      
      return data;
    },
  });

  // Redirect to premium dashboard if profile not complete
  useEffect(() => {
    if (!profileLoading && (!profile || !profile.height_cm || !profile.weight_kg)) {
      navigate('/premium-dashboard');
    }
  }, [profile, profileLoading, navigate]);

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${gymBackground})` }}
    >
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <header className="p-6 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-4">
            <img src={fitinLogo} alt="FitIn Logo" className="h-12 w-12 rounded-full" />
            <h1 className="text-2xl font-bold text-white">Meal Planner</h1>
          </div>
          <Button variant="outline" onClick={() => navigate('/premium-dashboard')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <MealPlannerComponent />
          </div>
        </main>
      </div>
    </div>
  );
}
