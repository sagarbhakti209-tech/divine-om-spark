import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import BottomNav from "@/components/BottomNav";

import shiva from "@/assets/shiva.jpg";
import krishna from "@/assets/krishna.jpg";
import ram from "@/assets/ram.jpg";
import hanuman from "@/assets/hanuman.jpg";
import lakshmi from "@/assets/lakshmi.jpg";
import durga from "@/assets/durga.jpg";
import ganesha from "@/assets/ganesha.jpg";
import vishnu from "@/assets/vishnu.jpg";

const gods = [
  { name: "Shiva", img: shiva, desc: "The Destroyer and Transformer, Lord of Meditation and Yoga. Shiva represents the cosmic consciousness and the power of inner peace." },
  { name: "Krishna", img: krishna, desc: "The Supreme Personality of Godhead, divine lover and protector. Krishna's flute melody enchants all living beings." },
  { name: "Ram", img: ram, desc: "The ideal king and embodiment of dharma. Lord Ram represents righteousness, honor, and the perfect human." },
  { name: "Hanuman", img: hanuman, desc: "The mighty devotee of Lord Ram, symbol of devotion, strength, and selfless service." },
  { name: "Lakshmi", img: lakshmi, desc: "Goddess of wealth, fortune, and prosperity. She brings abundance and grace to all devotees." },
  { name: "Durga", img: durga, desc: "The invincible warrior goddess who protects the universe from evil. She embodies shakti — divine feminine power." },
  { name: "Ganesha", img: ganesha, desc: "The remover of obstacles, lord of beginnings and wisdom. Ganesha blesses every new endeavor." },
  { name: "Vishnu", img: vishnu, desc: "The Preserver of the universe, maintaining cosmic order. Vishnu descends as avatars to restore balance." },
];

const GalleryPage = () => {
  const [selected, setSelected] = useState<number | null>(null);

  const navigate = (dir: number) => {
    if (selected === null) return;
    setSelected((selected + dir + gods.length) % gods.length);
  };

  return (
    <div className="min-h-screen bg-background relative pb-20">
      <div className="relative z-10 px-4 pt-8 max-w-lg mx-auto">
        <motion.h1
          className="text-2xl font-bold text-foreground text-glow-saffron text-center mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          🖼️ God Gallery
        </motion.h1>

        <div className="grid grid-cols-2 gap-3">
          {gods.map((god, i) => (
            <motion.button
              key={god.name}
              onClick={() => setSelected(i)}
              className="glass-card overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={god.img}
                  alt={god.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-3">
                <p className="text-sm font-semibold text-foreground">{god.name}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Fullscreen Viewer */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full glass-card flex items-center justify-center text-foreground"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 w-full max-w-md">
              <button onClick={() => navigate(-1)} className="text-muted-foreground hover:text-foreground">
                <ChevronLeft className="w-8 h-8" />
              </button>

              <motion.div
                key={selected}
                className="flex-1"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={gods[selected].img}
                  alt={gods[selected].name}
                  className="w-full rounded-2xl border border-border glow-saffron"
                />
                <h2 className="text-xl font-bold text-foreground text-center mt-4 text-glow-saffron">
                  {gods[selected].name}
                </h2>
                <p className="text-sm text-muted-foreground text-center mt-2 leading-relaxed">
                  {gods[selected].desc}
                </p>
              </motion.div>

              <button onClick={() => navigate(1)} className="text-muted-foreground hover:text-foreground">
                <ChevronRight className="w-8 h-8" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav />
    </div>
  );
};

export default GalleryPage;
