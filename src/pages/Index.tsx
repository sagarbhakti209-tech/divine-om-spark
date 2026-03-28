import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Volume2, BookOpen, Disc3, MessageCircle, Image } from "lucide-react";
import FloatingParticles from "@/components/FloatingParticles";
import BottomNav from "@/components/BottomNav";

import templeBg from "@/assets/temple-bg.jpg";
import shiva from "@/assets/shiva.jpg";
import krishna from "@/assets/krishna.jpg";
import ram from "@/assets/ram.jpg";
import hanuman from "@/assets/hanuman.jpg";
import lakshmi from "@/assets/lakshmi.jpg";
import durga from "@/assets/durga.jpg";
import ganesha from "@/assets/ganesha.jpg";
import vishnu from "@/assets/vishnu.jpg";

const gods = [
  { name: "Shiva", img: shiva },
  { name: "Krishna", img: krishna },
  { name: "Ram", img: ram },
  { name: "Hanuman", img: hanuman },
  { name: "Lakshmi", img: lakshmi },
  { name: "Durga", img: durga },
  { name: "Ganesha", img: ganesha },
  { name: "Vishnu", img: vishnu },
];

const features = [
  { icon: Volume2, label: "Play Gayatri Mantra", path: "/mantra", color: "from-saffron to-saffron-light" },
  { icon: Disc3, label: "Om Meditation", path: "/japa", color: "from-gold to-gold-light" },
  { icon: BookOpen, label: "Daily Prayer", path: "/mantra", color: "from-saffron to-gold" },
  { icon: MessageCircle, label: "Chat with God", path: "/chat", color: "from-gold-light to-saffron-light" },
  { icon: Image, label: "God Gallery", path: "/gallery", color: "from-saffron-light to-gold" },
];

const Index = () => {
  const navigate = useNavigate();
  const [currentGod, setCurrentGod] = useState(0);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden pb-20">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={templeBg} alt="" className="w-full h-full object-cover opacity-20 blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>

      <FloatingParticles count={15} />

      <div className="relative z-10 px-4 pt-8 max-w-lg mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-foreground text-glow-saffron">
            🙏 Divine Bhakti
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Welcome to your spiritual journey</p>
        </motion.div>

        {/* God Carousel */}
        <motion.div
          className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {gods.map((god, i) => (
            <motion.button
              key={god.name}
              onClick={() => setCurrentGod(i)}
              className={`flex-shrink-0 flex flex-col items-center gap-1 transition-all duration-300 ${
                currentGod === i ? "scale-110" : "opacity-70"
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className={`w-16 h-16 rounded-full overflow-hidden border-2 transition-all duration-300 ${
                  currentGod === i
                    ? "border-primary glow-saffron"
                    : "border-border"
                }`}
              >
                <img src={god.img} alt={god.name} className="w-full h-full object-cover" />
              </div>
              <span className="text-[10px] text-foreground font-medium">{god.name}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Featured God */}
        <motion.div
          className="glass-card p-4 mb-6 flex items-center gap-4"
          key={currentGod}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <img
            src={gods[currentGod].img}
            alt={gods[currentGod].name}
            className="w-24 h-24 rounded-xl object-cover border border-border"
          />
          <div>
            <h2 className="text-xl font-bold text-foreground">{gods[currentGod].name}</h2>
            <p className="text-muted-foreground text-xs mt-1">
              Tap to explore the divine gallery
            </p>
            <button
              onClick={() => navigate("/gallery")}
              className="mt-2 text-xs text-primary font-medium hover:underline"
            >
              View Gallery →
            </button>
          </div>
        </motion.div>

        {/* Feature Buttons */}
        <div className="grid grid-cols-2 gap-3">
          {features.map((feature, i) => (
            <motion.button
              key={feature.label}
              onClick={() => navigate(feature.path)}
              className="glass-card p-4 flex flex-col items-center gap-2 hover:glow-saffron transition-all duration-300 active:scale-95"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center`}>
                <feature.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xs font-medium text-foreground text-center">{feature.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Index;
