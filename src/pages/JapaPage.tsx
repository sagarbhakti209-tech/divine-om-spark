import { useState } from "react";
import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import FloatingParticles from "@/components/FloatingParticles";
import BottomNav from "@/components/BottomNav";

const JapaPage = () => {
  const [count, setCount] = useState(0);
  const [ripple, setRipple] = useState(false);

  const handleTap = () => {
    setCount((prev) => prev + 1);
    setRipple(true);
    // Vibration API
    if (navigator.vibrate) navigator.vibrate(30);
    setTimeout(() => setRipple(false), 400);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden pb-20 flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(25_100%_50%/0.1)_0%,transparent_50%)]" />
      <FloatingParticles count={10} />

      <div className="relative z-10 flex flex-col items-center gap-8">
        <motion.h1
          className="text-2xl font-bold text-foreground text-glow-saffron"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          📿 Japa Counter
        </motion.h1>

        {/* Count Display */}
        <motion.div
          className="text-7xl font-bold text-primary text-glow-saffron font-devanagari"
          key={count}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {count}
        </motion.div>

        {/* Tap Button */}
        <motion.button
          onClick={handleTap}
          className="relative w-40 h-40 rounded-full gradient-saffron flex items-center justify-center glow-saffron"
          whileTap={{ scale: 0.92 }}
        >
          {ripple && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-primary"
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ scale: 1.6, opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          )}
          <span className="text-5xl font-devanagari text-primary-foreground">ॐ</span>
        </motion.button>

        <p className="text-muted-foreground text-sm">Tap to count your japa</p>

        {/* Reset */}
        <motion.button
          onClick={() => setCount(0)}
          className="glass-card px-6 py-2 rounded-full flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          whileTap={{ scale: 0.95 }}
        >
          <RotateCcw className="w-4 h-4" />
          <span className="text-sm">Reset</span>
        </motion.button>

        {/* Mala progress */}
        <div className="w-64">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>Mala Progress</span>
            <span>{count % 108}/108</span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <motion.div
              className="h-full gradient-saffron rounded-full"
              animate={{ width: `${((count % 108) / 108) * 100}%` }}
              transition={{ type: "spring", stiffness: 100 }}
            />
          </div>
          <p className="text-xs text-muted-foreground text-center mt-2">
            Malas completed: {Math.floor(count / 108)}
          </p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default JapaPage;
