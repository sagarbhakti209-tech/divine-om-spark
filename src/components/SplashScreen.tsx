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
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1400),
      setTimeout(() => setPhase(2), 2800),
      setTimeout(() => setPhase(3), 4200),
      setTimeout(() => onComplete(), 5000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase < 3 ? (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: 'hsl(20 8% 3%)' }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <FloatingParticles count={50} />

          {/* Sacred geometry background */}
          <div className="absolute inset-0 bg-mesh-gradient" />
          
          {/* Rotating sacred ring */}
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full animate-sacred-rotate"
            style={{
              border: '1px solid hsl(25 100% 52% / 0.06)',
              boxShadow: 'inset 0 0 60px hsl(25 100% 52% / 0.03)',
            }}
          />
          <motion.div
            className="absolute w-[350px] h-[350px] rounded-full"
            style={{
              border: '1px solid hsl(42 100% 55% / 0.04)',
              animation: 'sacred-rotate 25s linear infinite reverse',
            }}
          />

          {/* Conic glow rays */}
          <motion.div
            className="absolute w-[700px] h-[700px] opacity-[0.07] animate-sacred-rotate"
            style={{
              background: "conic-gradient(from 0deg, transparent, hsl(25 100% 52% / 0.4), transparent 30%, transparent, hsl(42 100% 55% / 0.3), transparent 60%, transparent, hsl(25 100% 52% / 0.2), transparent)",
            }}
          />

          {/* OM Symbol */}
          <motion.div
            className="relative z-10"
            initial={{ opacity: 0, scale: 0.2, rotate: -15 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="text-[140px] md:text-[180px] font-devanagari font-black leading-none select-none"
              style={{ color: 'hsl(25 100% 52%)' }}
              animate={{
                textShadow: [
                  "0 0 30px hsl(25 100% 52% / 0.4), 0 0 60px hsl(42 100% 55% / 0.2)",
                  "0 0 80px hsl(25 100% 52% / 0.7), 0 0 150px hsl(42 100% 55% / 0.4), 0 0 250px hsl(25 100% 52% / 0.15)",
                  "0 0 30px hsl(25 100% 52% / 0.4), 0 0 60px hsl(42 100% 55% / 0.2)",
                ],
                filter: [
                  "brightness(1) drop-shadow(0 0 20px hsl(25 100% 52% / 0.3))",
                  "brightness(1.3) drop-shadow(0 0 40px hsl(25 100% 52% / 0.5))",
                  "brightness(1) drop-shadow(0 0 20px hsl(25 100% 52% / 0.3))",
                ]
              }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            >
              ॐ
            </motion.div>

            {/* Expanding pulse rings */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full"
                style={{
                  border: `1px solid hsl(25 100% 52% / ${0.15 - i * 0.04})`,
                  margin: `${-20 - i * 25}px`,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.6,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>

          {/* Deity Images */}
          <motion.div className="flex gap-5 mt-12 z-10">
            {deities.map((img, i) => (
              <motion.div
                key={i}
                className="relative"
                initial={{ opacity: 0, y: 40, scale: 0.6 }}
                animate={phase >= 1 ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden gradient-border">
                  <img
                    src={img}
                    alt="Deity"
                    className="w-full h-full object-cover"
                  />
                </div>
                <motion.div
                  className="absolute -inset-1 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, hsl(42 100% 55% / 0.2) 0%, transparent 70%)',
                  }}
                  animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.1, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.25 }}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* App Title */}
          <motion.div
            className="mt-10 z-10 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={phase >= 2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-4xl md:text-5xl font-cinzel font-bold tracking-wider">
              <span className="gradient-gold-shimmer bg-clip-text text-transparent">
                Divine Bhakti
              </span>
            </h1>
            <motion.div
              className="h-[2px] mx-auto mt-3 rounded-full overflow-hidden"
              initial={{ width: 0 }}
              animate={phase >= 2 ? { width: 160 } : {}}
              transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
            >
              <div className="w-full h-full gradient-saffron" />
            </motion.div>
            <motion.p
              className="text-muted-foreground text-sm mt-4 font-light tracking-widest uppercase"
              initial={{ opacity: 0 }}
              animate={phase >= 2 ? { opacity: 0.7 } : {}}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Connect with the Divine
            </motion.p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default SplashScreen;
