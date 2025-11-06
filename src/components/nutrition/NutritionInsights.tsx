import { Card } from '@/components/ui/card';
import { Lightbulb, TrendingUp, Trophy, Clock, Activity, Calendar, Award, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StrengthProgressionChart } from './StrengthProgressionChart';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { startOfWeek, endOfWeek, isWithinInterval } from 'date-fns';

export const NutritionInsights = () => {
  // Fetch nutrition logs for the week
  const { data: nutritionLogs } = useQuery({
    queryKey: ['nutrition-logs-week'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');
      
      const weekStart = startOfWeek(new Date());
      const weekEnd = endOfWeek(new Date());
      
      const { data, error } = await supabase
        .from('nutrition_logs')
        .select('*')
        .eq('user_id', user.id)
        .gte('meal_date', weekStart.toISOString().split('T')[0])
        .lte('meal_date', weekEnd.toISOString().split('T')[0]);
      
      if (error) throw error;
      return data || [];
    },
  });

  // Fetch recent nutrition logs
  const { data: recentFoods } = useQuery({
    queryKey: ['recent-foods'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');
      
      const { data, error } = await supabase
        .from('nutrition_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(4);
      
      if (error) throw error;
      return data || [];
    },
  });

  // Fetch workout logs for stats
  const { data: workoutLogs } = useQuery({
    queryKey: ['workout-logs-week'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');
      
      const weekStart = startOfWeek(new Date());
      const weekEnd = endOfWeek(new Date());
      
      const { data, error } = await supabase
        .from('workout_logs')
        .select('*')
        .eq('user_id', user.id)
        .gte('workout_date', weekStart.toISOString())
        .lte('workout_date', weekEnd.toISOString());
      
      if (error) throw error;
      return data || [];
    },
  });

  // Calculate stats
  const daysLogged = nutritionLogs ? new Set(nutritionLogs.map(log => log.meal_date)).size : 0;
  const workoutsThisWeek = workoutLogs?.length || 0;
  const totalDays = nutritionLogs && nutritionLogs.length > 0 ? 7 : 0;
  const goalAchievement = totalDays > 0 ? Math.round((daysLogged / totalDays) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Stats Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card p-6">
          <div className="flex items-center gap-3 mb-2">
            <Activity className="w-5 h-5 text-primary" />
            <h4 className="text-sm text-muted-foreground">Workouts This Week</h4>
          </div>
          <div className="text-4xl font-bold">{workoutsThisWeek}</div>
        </Card>
        
        <Card className="glass-card p-6">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <h4 className="text-sm text-muted-foreground">Total Progress</h4>
          </div>
          <div className="text-4xl font-bold">{goalAchievement}%</div>
        </Card>
        
        <Card className="glass-card p-6">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-5 h-5 text-blue-500" />
            <h4 className="text-sm text-muted-foreground">Days Active</h4>
          </div>
          <div className="text-4xl font-bold">{daysLogged}</div>
        </Card>
        
        <Card className="glass-card p-6">
          <div className="flex items-center gap-3 mb-2">
            <Award className="w-5 h-5 text-yellow-500" />
            <h4 className="text-sm text-muted-foreground">Achievements</h4>
          </div>
          <div className="text-4xl font-bold">{workoutsThisWeek + daysLogged}</div>
        </Card>
      </div>

      {/* Strength Progression Chart */}
      <StrengthProgressionChart />

      {/* Daily Tip */}
      <Card className="glass-card p-6 rounded-2xl bg-gradient-to-r from-primary/20 to-primary/10">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
            <Lightbulb className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Daily Nutrition Tip</h3>
            <p className="text-muted-foreground">
              Aim to include protein in every meal to help maintain muscle mass and keep you feeling full longer. 
              Try to get 20-30g of protein per meal for optimal results.
            </p>
          </div>
        </div>
      </Card>

      {/* This Week Stats */}
      <Card className="glass-card p-6 rounded-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">This Week</h3>
          <TrendingUp className="w-5 h-5 text-green-500" />
        </div>
        
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="text-center">
            <div className="text-5xl font-bold mb-2">{daysLogged}</div>
            <p className="text-muted-foreground">Days Logged</p>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold mb-2">{goalAchievement}%</div>
            <p className="text-muted-foreground">Goal Achievement</p>
          </div>
        </div>

        {daysLogged >= 5 && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
            <Trophy className="w-5 h-5 text-green-500" />
            <p className="text-green-500 font-semibold">Great consistency this week!</p>
          </div>
        )}
        
        {daysLogged < 5 && daysLogged > 0 && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/10 border border-primary/20">
            <Target className="w-5 h-5 text-primary" />
            <p className="text-primary font-semibold">Keep going! You're making progress.</p>
          </div>
        )}
      </Card>

      {/* Recent Foods */}
      {recentFoods && recentFoods.length > 0 && (
        <Card className="glass-card p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">Recent Foods</h3>
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
              <Clock className="w-4 h-4" />
              View All
            </Button>
          </div>
          
          <div className="space-y-3">
            {recentFoods.map((food) => (
              <div
                key={food.id}
                className="flex items-center justify-between p-3 glass-card rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                    🍽️
                  </div>
                  <div>
                    <h4 className="font-semibold">{food.food_name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {food.calories || 0} cal • {food.quantity}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground capitalize">{food.meal_type}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};
