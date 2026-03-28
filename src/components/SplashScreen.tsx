import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FloatingParticles from "./FloatingParticles";

import shivaImg from "@/assets/shiva.jpg";
import vishnu from "@/assets/vishnu.jpg";
import durga from "@/assets/durga.jpg";
import ganesha from "@/assets/ganesha.jpg";

const deities = [shivaImg, vishnu, durga, ganesha];

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [phase, setPhase] = useState(0); // 0=om, 1=deities, 2=text, 3=exit

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1200),
      setTimeout(() => setPhase(2), 2400),
      setTimeout(() => setPhase(3), 3800),
      setTimeout(() => onComplete(), 4600),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase < 3 ? (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background overflow-hidden"
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <FloatingParticles count={40} />

          {/* Multiple radial glows */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(25_100%_50%/0.2)_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(43_100%_50%/0.1)_0%,transparent_40%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(25_100%_50%/0.08)_0%,transparent_40%)]" />

          {/* Rotating light rays */}
          <motion.div
            className="absolute w-[600px] h-[600px] opacity-10"
            style={{
              background: "conic-gradient(from 0deg, transparent, hsl(25 100% 50% / 0.3), transparent, hsl(43 100% 50% / 0.2), transparent)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />

          {/* Om Symbol with epic glow */}
          <motion.div
            className="relative z-10"
            initial={{ opacity: 0, scale: 0.3, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="text-[120px] md:text-[160px] font-devanagari text-primary leading-none"
              animate={{
                textShadow: [
                  "0 0 30px hsl(25 100% 50% / 0.5), 0 0 60px hsl(43 100% 50% / 0.3)",
                  "0 0 60px hsl(25 100% 50% / 0.8), 0 0 120px hsl(43 100% 50% / 0.5), 0 0 180px hsl(25 100% 50% / 0.2)",
                  "0 0 30px hsl(25 100% 50% / 0.5), 0 0 60px hsl(43 100% 50% / 0.3)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              ॐ
            </motion.div>

            {/* Pulsing ring around Om */}
            <motion.div
              className="absolute inset-[-30px] rounded-full border border-primary/20"
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute inset-[-60px] rounded-full border border-secondary/10"
              animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0, 0.2] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
          </motion.div>

          {/* God images fading in with stagger */}
          <div className="flex gap-4 mt-10 z-10">
            {deities.map((img, i) => (
              <motion.div
                key={i}
                className="relative"
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                animate={phase >= 1 ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: i * 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <img
                  src={img}
                  alt="Deity"
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-secondary/40"
                />
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ boxShadow: "0 0 15px hsl(43 100% 50% / 0.4)" }}
                  animate={{ opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                />
              </motion.div>
            ))}
          </div>

          {/* App name with shimmer */}
          <motion.div
            className="mt-8 z-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={phase >= 2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-foreground text-glow-saffron tracking-wide">
              Divine Bhakti
            </h1>
            <motion.div
              className="h-0.5 mx-auto mt-2 rounded-full gradient-saffron"
              initial={{ width: 0 }}
              animate={phase >= 2 ? { width: 120 } : {}}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            />
            <motion.p
              className="text-muted-foreground text-sm mt-3"
              initial={{ opacity: 0 }}
              animate={phase >= 2 ? { opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              🙏 Connect with the Divine
            </motion.p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default SplashScreen;
