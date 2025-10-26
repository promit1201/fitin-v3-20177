import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp } from 'lucide-react';

export const StrengthProgressionChart = () => {
  const data = [
    { date: 'Week 1', benchPress: 135, squat: 185, deadlift: 225 },
    { date: 'Week 2', benchPress: 140, squat: 195, deadlift: 235 },
    { date: 'Week 3', benchPress: 145, squat: 205, deadlift: 245 },
    { date: 'Week 4', benchPress: 150, squat: 215, deadlift: 255 },
    { date: 'Week 5', benchPress: 155, squat: 225, deadlift: 265 },
    { date: 'Week 6', benchPress: 160, squat: 235, deadlift: 275 },
  ];

  return (
    <Card className="glass-card p-6">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-5 h-5 text-primary" />
        <h3 className="text-xl font-bold">Strength Progression</h3>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="date" 
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: '12px' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
            }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="benchPress" 
            stroke="hsl(265 100% 83%)" 
            strokeWidth={2}
            name="Bench Press (lbs)"
          />
          <Line 
            type="monotone" 
            dataKey="squat" 
            stroke="#10b981" 
            strokeWidth={2}
            name="Squat (lbs)"
          />
          <Line 
            type="monotone" 
            dataKey="deadlift" 
            stroke="#f59e0b" 
            strokeWidth={2}
            name="Deadlift (lbs)"
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};
