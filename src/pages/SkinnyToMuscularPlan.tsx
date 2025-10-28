import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import pushUpVid1 from "@/assets/pushupvid1.mp4";
import benchPressVid1 from "@/assets/benchpressvid1.mp4";
import benchPressVid2 from "@/assets/benchpressvid2.mp4";
import pushUpVid2 from "@/assets/pushupvid2.mp4";

const SkinnyToMuscularPlan = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <Button
          variant="ghost"
          onClick={() => navigate('/workout-planner')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Workout Planner
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
              Skinny to Muscular Workout Plan
            </h1>
            <p className="text-muted-foreground text-lg">
              Complete workout program with exercise demonstrations
            </p>
          </div>

          {/* Chest Section - Monday */}
          <div className="glass-card p-8 rounded-2xl">
            <h2 className="text-3xl font-bold mb-6 text-primary">Monday: Chest</h2>
            <div className="space-y-6">
              {/* Warmup Pushups */}
              <div className="glass-card p-6 rounded-lg">
                <h4 className="font-medium mb-4 text-lg">Warmup Pushups - 3x12</h4>
                <div className="max-w-md">
                  <video 
                    controls 
                    className="w-full rounded-lg"
                    src={pushUpVid1}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>

              {/* Incline Bench Press */}
              <div className="glass-card p-6 rounded-lg">
                <h4 className="font-medium mb-4 text-lg">Incline Bench Press - 3x12</h4>
                <div className="max-w-md">
                  <video 
                    controls 
                    className="w-full rounded-lg"
                    src={benchPressVid1}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>

              {/* Flat Bench Press */}
              <div className="glass-card p-6 rounded-lg">
                <h4 className="font-medium mb-4 text-lg">Flat Bench Press - 3x12</h4>
                <div className="max-w-md">
                  <video 
                    controls 
                    className="w-full rounded-lg"
                    src={benchPressVid2}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>

              {/* Pec Dec Fly */}
              <div className="glass-card p-6 rounded-lg">
                <h4 className="font-medium mb-4 text-lg">Pec Dec Fly - 3x12</h4>
                <div className="max-w-md">
                  <video 
                    controls 
                    className="w-full rounded-lg"
                    src={pushUpVid2}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          </div>

          {/* Arms Section - Wednesday */}
          <div className="glass-card p-8 rounded-2xl">
            <h2 className="text-3xl font-bold mb-6 text-primary">Wednesday: Arms</h2>
            <div className="space-y-6">
              {/* Preacher Curl */}
              <div className="glass-card p-6 rounded-lg">
                <h4 className="font-medium mb-4 text-lg">Preacher Curl (Bicep) - 3x12</h4>
                <p className="text-muted-foreground">Video coming soon</p>
              </div>

              {/* Triceps Rope Pushdown */}
              <div className="glass-card p-6 rounded-lg">
                <h4 className="font-medium mb-4 text-lg">Triceps Rope Pushdown - 3x12</h4>
                <p className="text-muted-foreground">Video coming soon</p>
              </div>

              {/* Hammer Curl */}
              <div className="glass-card p-6 rounded-lg">
                <h4 className="font-medium mb-4 text-lg">Hammer Curl - 3x12</h4>
                <p className="text-muted-foreground">Video coming soon</p>
              </div>

              {/* Triceps Cable Pushdown */}
              <div className="glass-card p-6 rounded-lg">
                <h4 className="font-medium mb-4 text-lg">Triceps Cable Pushdown - 3x12</h4>
                <p className="text-muted-foreground">Video coming soon</p>
              </div>

              {/* Dumbbell Curl */}
              <div className="glass-card p-6 rounded-lg">
                <h4 className="font-medium mb-4 text-lg">Dumbbell Curl (Biceps) - 3x12</h4>
                <p className="text-muted-foreground">Video coming soon</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SkinnyToMuscularPlan;
