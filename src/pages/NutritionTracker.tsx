import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Coffee, Sun, Moon, Apple as AppleIcon, Droplets } from 'lucide-react';
import logo from '@/assets/fitin-final-logo.jpg';
import { MealCard } from '@/components/nutrition/MealCard';
import { DailyCalories } from '@/components/nutrition/DailyCalories';
import { Macronutrients } from '@/components/nutrition/Macronutrients';
import { RestDayCalendar } from '@/components/nutrition/RestDayCalendar';
import { QuickActions } from '@/components/nutrition/QuickActions';
import { NutritionInsights } from '@/components/nutrition/NutritionInsights';
import { MealPlanner } from '@/components/nutrition/MealPlanner';
import { SetGoalsDialog } from '@/components/nutrition/SetGoalsDialog';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

const NutritionTracker = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('today');
  const [selectedMealType, setSelectedMealType] = useState<string | null>(null);
  const [waterGlasses, setWaterGlasses] = useState(6);

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
    <div className="min-h-screen bg-gradient-dark">
      {/* Header */}
      <div className="border-b border-border/50 bg-background/50 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <img src={logo} alt="FitIn" className="h-12 w-auto" />
            <Button
              variant="ghost"
              onClick={() => navigate('/dashboard')}
              className="text-muted-foreground hover:text-primary"
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                <span className="text-gradient">Nutrition Tracker</span>
              </h1>
              <p className="text-muted-foreground">
                Track your meals, monitor your nutrition, and achieve your health goals
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-3">
              <Button variant="outline" className="border-primary/50">
                Export Data
              </Button>
              <SetGoalsDialog />
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="glass-card p-1 mb-8">
              <TabsTrigger value="today" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Today
              </TabsTrigger>
              <TabsTrigger value="planner" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Meal Planner
              </TabsTrigger>
              <TabsTrigger value="insights" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Insights
              </TabsTrigger>
            </TabsList>

            {/* Today Tab */}
            <TabsContent value="today" className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Left Column - Meals */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Meal Cards */}
                  <div className="glass-card p-6 rounded-2xl">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                      {meals.map((meal) => (
                        <MealCard
                          key={meal.type}
                          type={meal.type}
                          label={meal.label}
                          calories={meal.calories}
                          icon={meal.icon}
                          color={meal.color}
                          onClick={() => setSelectedMealType(meal.type)}
                          isSelected={selectedMealType === meal.type}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Water Intake */}
                  <div className="glass-card p-6 rounded-2xl">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-cyan-500/10 p-3 rounded-xl">
                          <Droplets className="w-6 h-6 text-cyan-500" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">Water Intake</h3>
                          <p className="text-sm text-muted-foreground">
                            {waterGlasses}/8 glasses today
                          </p>
                        </div>
                      </div>
                      <div className="text-3xl font-bold text-cyan-500">
                        {waterGlasses}/8
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Stay hydrated for optimal performance
                    </p>
                  </div>

                  {/* Quick Actions */}
                  <QuickActions />
                </div>

                {/* Right Column - Stats */}
                <div className="space-y-6">
                  {/* Daily Calories - Only for paid plan */}
                  {isPaidPlan && (
                    <DailyCalories
                      consumed={totalCalories}
                      target={2000}
                    />
                  )}

                  {/* Macronutrients */}
                  <Macronutrients />

                  {/* Rest Day Calendar */}
                  <RestDayCalendar />
                </div>
              </div>
            </TabsContent>

            {/* Meal Planner Tab */}
            <TabsContent value="planner">
              <MealPlanner />
            </TabsContent>

            {/* Insights Tab */}
            <TabsContent value="insights">
              <NutritionInsights isPaidPlan={isPaidPlan} />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default NutritionTracker;
