import { Progress } from '@/components/ui/progress';
import { Beef, Wheat, Droplet } from 'lucide-react';

export const Macronutrients = () => {
  const macros = [
    { label: 'Protein', current: 99.8, target: 120, icon: Beef, color: 'text-blue-500', progressColor: 'bg-blue-500' },
    { label: 'Carbs', current: 71.6, target: 250, icon: Wheat, color: 'text-green-500', progressColor: 'bg-green-500' },
    { label: 'Fats', current: 66.5, target: 70, icon: Droplet, color: 'text-yellow-500', progressColor: 'bg-yellow-500' },
  ];

  return (
    <div className="glass-card p-6 rounded-2xl">
      <h3 className="text-xl font-bold mb-4">Macronutrients</h3>
      <div className="space-y-4">
        {macros.map((macro) => {
          const percentage = (macro.current / macro.target) * 100;
          return (
            <div key={macro.label}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <macro.icon className={`w-4 h-4 ${macro.color}`} />
                  <span className="font-semibold">{macro.label}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {macro.current}g / {macro.target}g
                </span>
              </div>
              <Progress value={percentage} className="h-2" />
            </div>
          );
        })}
      </div>
    </div>
  );
};
