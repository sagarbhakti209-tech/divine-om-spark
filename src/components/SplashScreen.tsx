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
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background overflow-hidden"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        onAnimationComplete={() => {
          setTimeout(onComplete, 3500);
        }}
      >
        <FloatingParticles count={30} />

        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(25_100%_50%/0.15)_0%,transparent_60%)]" />

        {/* Om Symbol */}
        <motion.div
          className="text-8xl md:text-9xl font-devanagari text-saffron animate-om-glow z-10"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          ॐ
        </motion.div>

        {/* God images fading in */}
        <div className="flex gap-4 mt-8 z-10">
          {deities.map((img, i) => (
            <motion.img
              key={i}
              src={img}
              alt="Deity"
              className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-gold/40"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + i * 0.3, duration: 0.8 }}
            />
          ))}
        </div>

        {/* App name */}
        <motion.h1
          className="text-2xl md:text-3xl font-bold text-foreground mt-6 z-10 text-glow-saffron"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          Divine Bhakti
        </motion.h1>

        <motion.p
          className="text-muted-foreground text-sm mt-2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8, duration: 1 }}
        >
          🙏 Connect with the Divine
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
};

export default SplashScreen;
