import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MealPlanner as MealPlannerComponent } from '@/components/nutrition/MealPlanner';
import { ArrowLeft } from 'lucide-react';
import fitinLogo from '@/assets/fitin-final-logo.jpg';
import gymBackground from '@/assets/gymimage2.jpg';

export default function MealPlanner() {
  const navigate = useNavigate();

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
