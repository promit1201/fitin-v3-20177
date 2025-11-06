import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { format, startOfWeek, addDays } from 'date-fns';

export const WeeklyCalendar = () => {
  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });

  const { data: weeklyLogs } = useQuery({
    queryKey: ['nutrition-logs-weekly'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('nutrition_logs')
        .select('*')
        .eq('user_id', user.id)
        .gte('meal_date', format(weekStart, 'yyyy-MM-dd'))
        .lte('meal_date', format(addDays(weekStart, 6), 'yyyy-MM-dd'))
        .order('meal_date', { ascending: true });

      if (error) throw error;
      return data || [];
    },
  });

  const getDayCalories = (dayIndex: number) => {
    const dayDate = format(addDays(weekStart, dayIndex), 'yyyy-MM-dd');
    const dayLogs = weeklyLogs?.filter(log => log.meal_date === dayDate) || [];
    return dayLogs.reduce((sum, log) => sum + (log.calories || 0), 0);
  };

  return (
    <Card className="glass-card p-6">
      <h3 className="text-xl font-bold mb-4">Weekly Overview</h3>
      <div className="grid grid-cols-7 gap-2">
        {[0, 1, 2, 3, 4, 5, 6].map((dayIndex) => {
          const day = addDays(weekStart, dayIndex);
          const calories = getDayCalories(dayIndex);
          
          return (
            <div key={dayIndex} className="text-center">
              <div className="text-xs text-muted-foreground mb-1">
                {format(day, 'EEE')}
              </div>
              <div className="text-xs text-muted-foreground mb-2">
                {format(day, 'd')}
              </div>
              <div className={`p-2 rounded-lg ${calories > 0 ? 'bg-primary/20 border border-primary/50' : 'bg-background/50'}`}>
                <div className="text-sm font-semibold">
                  {calories > 0 ? `${calories}` : '-'}
                </div>
                <div className="text-xs text-muted-foreground">cal</div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
