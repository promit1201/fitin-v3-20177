import { Card } from '@/components/ui/card';
import { TrendingUp, Target, Award } from 'lucide-react';
import { StrengthProgressionChart } from './StrengthProgressionChart';
import { WorkoutLogging } from './WorkoutLogging';

interface NutritionInsightsProps {
  isPaidPlan: boolean;
}

export const NutritionInsights = ({ isPaidPlan }: NutritionInsightsProps) => {
  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="glass-card p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-primary/10 p-3 rounded-xl">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Weekly Average</p>
              <p className="text-2xl font-bold">1,850 cal</p>
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-green-500/10 p-3 rounded-xl">
              <Target className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Goal Progress</p>
              <p className="text-2xl font-bold">87%</p>
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-yellow-500/10 p-3 rounded-xl">
              <Award className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Streak Days</p>
              <p className="text-2xl font-bold">12 days</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Strength Progression */}
      <StrengthProgressionChart />

      {/* Workout Logging */}
      <WorkoutLogging />
    </div>
  );
};
