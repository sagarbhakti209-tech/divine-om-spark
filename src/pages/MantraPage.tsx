import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw } from "lucide-react";
import FloatingParticles from "@/components/FloatingParticles";
import BottomNav from "@/components/BottomNav";

const mantraLines = [
  "ॐ भूर्भुवः स्वः",
  "तत्सवितुर्वरेण्यं",
  "भर्गो देवस्य धीमहि",
  "धियो यो नः प्रचोदयात्",
];

const mantraTranslation = [
  "Om, the Earth, Atmosphere, and Heavens",
  "That excellent divine Sun",
  "May we meditate on his radiance",
  "May he illuminate our minds",
];

const MantraPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLine, setCurrentLine] = useState(0);
  const [loop, setLoop] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentLine((prev) => {
        const next = prev + 1;
        if (next >= mantraLines.length) {
          if (loop) return 0;
          setIsPlaying(false);
          return prev;
        }
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [isPlaying, loop]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden pb-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(25_100%_50%/0.08)_0%,transparent_60%)]" />
      <FloatingParticles count={12} />

      <div className="relative z-10 px-4 pt-12 max-w-lg mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold text-foreground text-glow-saffron">
            🕉️ Gayatri Mantra
          </h1>
          <p className="text-muted-foreground text-sm mt-1">The most sacred Vedic hymn</p>
        </motion.div>

        {/* Mantra Display */}
        <div className="glass-card p-8 mb-8">
          <div className="space-y-6">
            {mantraLines.map((line, i) => (
              <motion.div
                key={i}
                className={`text-center transition-all duration-500 ${
                  currentLine === i
                    ? "scale-105"
                    : "opacity-50 scale-100"
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: currentLine === i ? 1 : 0.4, y: 0 }}
                transition={{ delay: i * 0.15 }}
              >
                <p
                  className={`text-2xl font-devanagari font-semibold transition-colors duration-500 ${
                    currentLine === i ? "text-primary text-glow-saffron" : "text-foreground"
                  }`}
                >
                  {line}
                </p>
                <p className="text-xs text-muted-foreground mt-1 italic">
                  {mantraTranslation[i]}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6">
          <motion.button
            onClick={() => setLoop(!loop)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              loop ? "glass-card text-primary glow-saffron" : "glass-card text-muted-foreground"
            }`}
            whileTap={{ scale: 0.9 }}
          >
            <RotateCcw className="w-5 h-5" />
          </motion.button>

          <motion.button
            onClick={() => {
              setIsPlaying(!isPlaying);
              if (!isPlaying) setCurrentLine(0);
            }}
            className="w-16 h-16 rounded-full gradient-saffron flex items-center justify-center glow-saffron"
            whileTap={{ scale: 0.9 }}
          >
            {isPlaying ? (
              <Pause className="w-7 h-7 text-primary-foreground" />
            ) : (
              <Play className="w-7 h-7 text-primary-foreground ml-1" />
            )}
          </motion.button>

          <div className="w-12 h-12" /> {/* Spacer for symmetry */}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default MantraPage;
