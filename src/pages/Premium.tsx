import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Camera, Upload } from 'lucide-react';
import { toast } from 'sonner';
import gymBackground from '@/assets/fitnessplaceholder.png';
import logo from '@/assets/fitin-final-logo.jpg';
import { NutritionInsights } from '@/components/nutrition/NutritionInsights';
import { MealCard } from '@/components/nutrition/MealCard';
import { Utensils, Coffee, Apple as AppleIcon, Pizza } from 'lucide-react';

const Premium = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showDetailsForm, setShowDetailsForm] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedMeal, setSelectedMeal] = useState<string | null>(null);

  // Form states
  const [heightUnit, setHeightUnit] = useState<'cm' | 'ft'>('cm');
  const [heightValue, setHeightValue] = useState('');
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');
  const [weightValue, setWeightValue] = useState('');
  const [age, setAge] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [dietPreference, setDietPreference] = useState<'veg' | 'non-veg' | ''>('');
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>('');

  const activityLevels = [
    { value: 'sedentary', label: 'Sedentary', desc: 'Little to no exercise' },
    { value: 'light', label: 'Lightly Active', desc: '1-3 days/week' },
    { value: 'moderate', label: 'Moderately Active', desc: '3-5 days/week' },
    { value: 'very', label: 'Very Active', desc: '6-7 days/week' },
  ];

  const meals = [
    { type: 'breakfast', label: 'Breakfast', calories: 450, icon: Coffee, color: 'text-orange-500' },
    { type: 'lunch', label: 'Lunch', calories: 650, icon: Utensils, color: 'text-green-500' },
    { type: 'dinner', label: 'Dinner', calories: 550, icon: Pizza, color: 'text-purple-500' },
    { type: 'snacks', label: 'Snacks', calories: 200, icon: AppleIcon, color: 'text-yellow-500' },
  ];

  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);

  const handleEnterDetails = () => {
    setShowWelcome(false);
    setTimeout(() => setShowDetailsForm(true), 300);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      toast.success('Camera permission granted!');
      stream.getTracks().forEach(track => track.stop());
    } catch (error) {
      toast.error('Camera access denied. Please upload a photo instead.');
    }
  };

  const completeForm = () => {
    toast.success('Profile completed successfully!');
    setShowDetailsForm(false);
    setTimeout(() => setShowDashboard(true), 300);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">What's your height?</h3>
            <p className="text-muted-foreground">This helps us personalize your fitness plan</p>
            
            <div className="flex gap-2">
              <Button
                variant={heightUnit === 'cm' ? 'default' : 'outline'}
                onClick={() => setHeightUnit('cm')}
                className="flex-1"
              >
                cm
              </Button>
              <Button
                variant={heightUnit === 'ft' ? 'default' : 'outline'}
                onClick={() => setHeightUnit('ft')}
                className="flex-1"
              >
                ft
              </Button>
            </div>
            
            <input
              type="number"
              placeholder={heightUnit === 'cm' ? 'e.g., 175' : 'e.g., 5.9'}
              value={heightValue}
              onChange={(e) => setHeightValue(e.target.value)}
              className="w-full bg-background/50 border border-border/50 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none"
            />
            
            <Button 
              onClick={() => setStep(2)}
              disabled={!heightValue}
              className="w-full"
            >
              Next
            </Button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">What's your weight?</h3>
            <p className="text-muted-foreground">We'll use this to track your progress</p>
            
            <div className="flex gap-2">
              <Button
                variant={weightUnit === 'kg' ? 'default' : 'outline'}
                onClick={() => setWeightUnit('kg')}
                className="flex-1"
              >
                kg
              </Button>
              <Button
                variant={weightUnit === 'lbs' ? 'default' : 'outline'}
                onClick={() => setWeightUnit('lbs')}
                className="flex-1"
              >
                lbs
              </Button>
            </div>
            
            <input
              type="number"
              placeholder={weightUnit === 'kg' ? 'e.g., 70' : 'e.g., 154'}
              value={weightValue}
              onChange={(e) => setWeightValue(e.target.value)}
              className="w-full bg-background/50 border border-border/50 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none"
            />
            
            <Button 
              onClick={() => setStep(3)}
              disabled={!weightValue}
              className="w-full"
            >
              Next
            </Button>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">How old are you?</h3>
            <p className="text-muted-foreground">Age helps us customize your fitness recommendations</p>
            
            <input
              type="number"
              placeholder="e.g., 25"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full bg-background/50 border border-border/50 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none"
            />
            
            <Button 
              onClick={() => setStep(4)}
              disabled={!age}
              className="w-full"
            >
              Next
            </Button>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Activity Level</h3>
            <p className="text-muted-foreground">How active are you typically?</p>
            
            <div className="space-y-2">
              {activityLevels.map((level) => (
                <button
                  key={level.value}
                  onClick={() => setActivityLevel(level.value)}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                    activityLevel === level.value
                      ? 'bg-primary/20 border-primary'
                      : 'bg-background/50 border-border/50 hover:border-primary/50'
                  }`}
                >
                  <div className="font-semibold text-white">{level.label}</div>
                  <div className="text-sm text-muted-foreground">{level.desc}</div>
                </button>
              ))}
            </div>
            
            <Button 
              onClick={() => setStep(5)}
              disabled={!activityLevel}
              className="w-full"
            >
              Next
            </Button>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Diet Preference</h3>
            <p className="text-muted-foreground">What's your dietary preference?</p>
            
            <div className="space-y-2">
              <button
                onClick={() => setDietPreference('veg')}
                className={`w-full text-left p-4 rounded-lg border transition-all ${
                  dietPreference === 'veg'
                    ? 'bg-primary/20 border-primary'
                    : 'bg-background/50 border-border/50 hover:border-primary/50'
                }`}
              >
                <div className="font-semibold text-white">Vegetarian</div>
                <div className="text-sm text-muted-foreground">Plant-based diet</div>
              </button>
              
              <button
                onClick={() => setDietPreference('non-veg')}
                className={`w-full text-left p-4 rounded-lg border transition-all ${
                  dietPreference === 'non-veg'
                    ? 'bg-primary/20 border-primary'
                    : 'bg-background/50 border-border/50 hover:border-primary/50'
                }`}
              >
                <div className="font-semibold text-white">Non-Vegetarian</div>
                <div className="text-sm text-muted-foreground">Includes all food types</div>
              </button>
            </div>
            
            <Button 
              onClick={() => setStep(6)}
              disabled={!dietPreference}
              className="w-full"
            >
              Next
            </Button>
          </div>
        );

      case 6:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Add a Profile Photo</h3>
            <p className="text-muted-foreground">Optional - helps personalize your experience</p>
            
            {photoPreview && (
              <div className="flex justify-center">
                <img 
                  src={photoPreview} 
                  alt="Preview" 
                  className="w-32 h-32 rounded-full object-cover border-2 border-primary"
                />
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={handleCameraCapture}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Camera className="w-4 h-4" />
                Use Camera
              </Button>
              
              <label className="cursor-pointer">
                <Button
                  variant="outline"
                  className="w-full flex items-center gap-2"
                  asChild
                >
                  <span>
                    <Upload className="w-4 h-4" />
                    Upload Photo
                  </span>
                </Button>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
            </div>
            
            <Button 
              onClick={completeForm}
              className="w-full"
            >
              Complete Profile
            </Button>
            
            <button
              onClick={completeForm}
              className="text-sm text-muted-foreground hover:text-primary w-full text-center"
            >
              Skip for now
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatePresence mode="wait">
        {/* Welcome Screen */}
        {showWelcome && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 flex items-center justify-center"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${gymBackground})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6, type: 'spring' }}
              className="text-center px-4"
            >
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="mb-8"
              >
                <img src={logo} alt="FitIn Premium" className="h-20 w-auto mx-auto mb-6" />
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                  Welcome to <span className="text-gradient">Premium</span>
                </h1>
                <p className="text-xl text-gray-300 mb-8">
                  Your personalized fitness journey starts here
                </p>
              </motion.div>

              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                <Button
                  onClick={handleEnterDetails}
                  size="lg"
                  className="px-12 py-6 text-lg"
                >
                  Get Started
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {/* Personal Details Form */}
        {showDetailsForm && (
          <motion.div
            key="details"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex items-center justify-center px-4 py-12 relative"
          >
            <div className="absolute inset-0 bg-gradient-dark-radial" />
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="glass-card p-8 rounded-2xl w-full max-w-md relative z-10"
            >
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-2xl font-bold text-white">Personal Details</h2>
                  <span className="text-sm text-muted-foreground">Step {step} of 6</span>
                </div>
                <div className="h-2 bg-background/50 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${(step / 6) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {renderStep()}
            </motion.div>
          </motion.div>
        )}

        {/* Dashboard with Nutrition Tracker */}
        {showDashboard && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen bg-gradient-dark"
          >
            {/* Header */}
            <div className="border-b border-border/50 bg-background/50 backdrop-blur-md sticky top-0 z-50">
              <div className="container mx-auto px-4 py-4">
                <img src={logo} alt="FitIn Premium" className="h-12 w-auto" />
              </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="mb-12">
                  <h1 className="text-4xl font-bold mb-2">
                    Your <span className="text-gradient">Premium Dashboard</span>
                  </h1>
                  <p className="text-muted-foreground">
                    Track your nutrition and progress
                  </p>
                </div>

                {/* Nutrition Tracker Section */}
                <div className="space-y-8">
                  {/* Total Calories Card */}
                  <div className="glass-card p-6 rounded-2xl">
                    <h2 className="text-2xl font-bold mb-4">Daily Nutrition Overview</h2>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-muted-foreground mb-2">Total Calories Today</p>
                        <p className="text-5xl font-bold text-gradient">{totalCalories}</p>
                        <p className="text-sm text-muted-foreground mt-1">kcal</p>
                      </div>
                      <div className="text-right">
                        <p className="text-muted-foreground mb-2">Goal</p>
                        <p className="text-3xl font-bold">2000</p>
                        <p className="text-sm text-muted-foreground mt-1">kcal</p>
                      </div>
                    </div>
                  </div>

                  {/* Meals Grid */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {meals.map((meal, index) => (
                      <motion.div
                        key={meal.type}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <MealCard
                          {...meal}
                          onClick={() => setSelectedMeal(meal.type)}
                          isSelected={selectedMeal === meal.type}
                        />
                      </motion.div>
                    ))}
                  </div>

                  {/* Progress and Insights */}
                  <NutritionInsights isPaidPlan={true} />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Premium;
