import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const MealLogger = () => {
  const [open, setOpen] = useState(false);
  const [mealType, setMealType] = useState('breakfast');
  const [description, setDescription] = useState('');
  const [calories, setCalories] = useState('');
  const queryClient = useQueryClient();

  const addMealMutation = useMutation({
    mutationFn: async (meal: { meal_type: string; food_name: string; calories: number; quantity: string }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { error } = await supabase
        .from('nutrition_logs')
        .insert({
          user_id: user.id,
          meal_type: meal.meal_type,
          food_name: meal.food_name,
          calories: meal.calories,
          quantity: meal.quantity,
          meal_date: new Date().toISOString().split('T')[0],
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['nutrition-logs'] });
      toast.success('Meal logged successfully!');
      setOpen(false);
      setDescription('');
      setCalories('');
    },
    onError: () => {
      toast.error('Failed to log meal');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description || !calories) {
      toast.error('Please fill in all fields');
      return;
    }

    addMealMutation.mutate({
      meal_type: mealType,
      food_name: description,
      calories: Number(calories),
      quantity: '1 serving',
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add Meal
        </Button>
      </DialogTrigger>
      <DialogContent className="glass-card">
        <DialogHeader>
          <DialogTitle>Log Your Meal</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="mealType">Meal Type</Label>
            <select
              id="mealType"
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
              className="w-full mt-2 bg-background/50 border border-border/50 rounded-lg px-4 py-3 text-foreground focus:border-primary focus:outline-none"
            >
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snacks">Snacks</option>
            </select>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="e.g., Grilled chicken salad"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-2"
              required
            />
          </div>

          <div>
            <Label htmlFor="calories">Calories</Label>
            <Input
              id="calories"
              type="number"
              placeholder="500"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              className="mt-2"
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={addMealMutation.isPending}>
            {addMealMutation.isPending ? 'Logging...' : 'Log Meal'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
