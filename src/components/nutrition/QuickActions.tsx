import { Scan, Camera, Droplets, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export const QuickActions = () => {
  const actions = [
    { icon: Scan, label: 'Scan Barcode', description: 'Quick food entry', color: 'bg-blue-500' },
    { icon: Camera, label: 'Photo Recognition', description: 'Identify food by photo', color: 'bg-green-500' },
    { icon: Droplets, label: 'Log Water', description: 'Add glass of water', color: 'bg-cyan-500' },
    { icon: Calendar, label: 'Meal Planning', description: 'Plan upcoming meals', color: 'bg-purple-500' },
  ];

  return (
    <div className="glass-card p-6 rounded-2xl">
      <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <motion.div
            key={action.label}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-4 rounded-xl cursor-pointer hover:shadow-lavender-glow transition-all"
          >
            <div className={`${action.color} w-12 h-12 rounded-full flex items-center justify-center mb-3`}>
              <action.icon className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-bold mb-1">{action.label}</h4>
            <p className="text-xs text-muted-foreground">{action.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
