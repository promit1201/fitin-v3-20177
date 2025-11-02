import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Coffee, Sun, Moon, Apple as AppleIcon, Download, Target, Calendar, BarChart } from 'lucide-react';
import logo from '@/assets/fitin-final-logo.jpg';
import { MealCard } from '@/components/nutrition/MealCard';
import { DailyCalories } from '@/components/nutrition/DailyCalories';
import { Macronutrients } from '@/components/nutrition/Macronutrients';
import { QuickActions } from '@/components/nutrition/QuickActions';
import { NutritionInsights } from '@/components/nutrition/NutritionInsights';
import { MealPlanner } from '@/components/nutrition/MealPlanner';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

const NutritionTracker = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('today');
  const [selectedMeal, setSelectedMeal] = useState<string | null>(null);

  // Fetch user plan
  const { data: userPlan } = useQuery({
    queryKey: ['user-plan'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');
      
      const { data } = await supabase
        .from('user_plans')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      return data;
    },
  });

  const isPaidPlan = userPlan?.plan_type === 'paid';

  const meals = [
    { type: 'breakfast', label: 'Breakfast', calories: 350, icon: Coffee, color: 'bg-orange-500' },
    { type: 'lunch', label: 'Lunch', calories: 420, icon: Sun, color: 'bg-yellow-500' },
    { type: 'dinner', label: 'Dinner', calories: 312, icon: Moon, color: 'bg-purple-500' },
    { type: 'snacks', label: 'Snacks', calories: 174, icon: AppleIcon, color: 'bg-green-500' },
  ];

  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Nutrition Tracker
            </h1>
            <p className="text-muted-foreground">
              Track your meals, monitor your nutrition, and achieve your health goals
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export Data</span>
            </Button>
            <Button className="gap-2">
              <Target className="w-4 h-4" />
              <span className="hidden sm:inline">Set Goals</span>
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="glass-card grid w-full max-w-md mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="today" className="gap-2">
              <Calendar className="w-4 h-4" />
              Today
            </TabsTrigger>
            <TabsTrigger value="meal-planner" className="gap-2">
              <Sun className="w-4 h-4" />
              Meal Planner
            </TabsTrigger>
            <TabsTrigger value="insights" className="gap-2">
              <BarChart className="w-4 h-4" />
              Insights
            </TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Meal Cards Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {meals.map((meal) => (
                  <MealCard
                    key={meal.type}
                    {...meal}
                    onClick={() => setSelectedMeal(selectedMeal === meal.type ? null : meal.type)}
                    isSelected={selectedMeal === meal.type}
                  />
                ))}
              </div>

              {/* Selected Meal Details */}
              <AnimatePresence>
                {selectedMeal && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="glass-card p-6 rounded-2xl"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold">
                        {meals.find(m => m.type === selectedMeal)?.label} Foods
                      </h3>
                      <Button variant="outline" size="sm" className="gap-2">
                        + Add Food
                      </Button>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 glass-card rounded-xl">
                        <div>
                          <h4 className="font-semibold">Greek Yogurt with Berries</h4>
                          <p className="text-sm text-muted-foreground">1 × 1 cup • 150 cal</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            P: 15g    C: 20g    F: 0.5g
                          </p>
                        </div>
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                          🗑️
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-4 glass-card rounded-xl">
                        <div>
                          <h4 className="font-semibold">Granola</h4>
                          <p className="text-sm text-muted-foreground">0.5 × 1/2 cup • 200 cal</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            P: 6g    C: 30g    F: 8g
                          </p>
                        </div>
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                          🗑️
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Stats Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                <DailyCalories consumed={totalCalories} target={2000} />
                <Macronutrients selectedMeal={selectedMeal} />
              </div>

              {/* Quick Actions */}
              <QuickActions />

              {/* Recent Foods & Tips */}
              <NutritionInsights />
            </motion.div>
          </TabsContent>

          <TabsContent value="meal-planner">
            {isPaidPlan ? (
              <MealPlanner />
            ) : (
              <div className="glass-card p-12 rounded-2xl text-center">
                <h3 className="text-2xl font-bold mb-4">Upgrade to Premium</h3>
                <p className="text-muted-foreground mb-6">
                  Access the meal planner feature with a premium subscription
                </p>
                <Button onClick={() => navigate('/premium')}>
                  Upgrade Now
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="insights">
            <NutritionInsights />
          </TabsContent>
        </Tabs>

        {/* Back Button for Mobile */}
        <div className="mt-8 flex justify-center md:hidden">
          <Button
            variant="outline"
            onClick={() => navigate('/dashboard')}
            className="w-full"
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NutritionTracker;
