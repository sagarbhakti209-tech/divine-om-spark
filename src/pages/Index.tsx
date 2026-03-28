import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Star, BookOpen, Calendar, MessageCircle, Sun, Moon, Clock } from "lucide-react";
import FloatingParticles from "@/components/FloatingParticles";
import BottomNav from "@/components/BottomNav";

import shiva from "@/assets/shiva.jpg";
import krishna from "@/assets/krishna.jpg";
import ram from "@/assets/ram.jpg";
import hanuman from "@/assets/hanuman.jpg";
import lakshmi from "@/assets/lakshmi.jpg";
import durga from "@/assets/durga.jpg";
import ganesha from "@/assets/ganesha.jpg";
import vishnu from "@/assets/vishnu.jpg";

const bhavishyaItems = [
  { icon: "🪐", label: "जन्म कुंडली", desc: "Janam Kundali" },
  { icon: "🙏", label: "गुरुजी से पूछें", desc: "Ask Guruji" },
  { icon: "⭐", label: "राशिफल", desc: "Rashifal" },
];

const weeklyFestivals = [
  { date: "29", month: "मार्च", name: "कामदा एकादशी", img: hanuman },
  { date: "30", month: "मार्च", name: "प्रदोष व्रत", img: shiva },
  { date: "2", month: "अप्रैल", name: "हनुमान जयंती", img: hanuman },
];

const quickFeatures = [
  { icon: "🕉️", label: "ॐ मेडिटेशन", path: "/japa", color: "from-primary to-secondary" },
  { icon: "📿", label: "गायत्री मंत्र", path: "/mantra", color: "from-secondary to-primary" },
  { icon: "💬", label: "भगवान से बात", path: "/chat", color: "from-primary to-gold" },
  { icon: "🖼️", label: "देवी-देवता गैलरी", path: "/gallery", color: "from-gold to-primary" },
];

const todaySuvichar = "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। — श्रीमद्भगवद्गीता";

const gods = [
  { name: "शिव", img: shiva },
  { name: "कृष्ण", img: krishna },
  { name: "राम", img: ram },
  { name: "हनुमान", img: hanuman },
  { name: "लक्ष्मी", img: lakshmi },
  { name: "दुर्गा", img: durga },
  { name: "गणेश", img: ganesha },
  { name: "विष्णु", img: vishnu },
];

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const now = new Date();
  const hours = now.getHours();
  const greeting = hours < 12 ? "शुभ प्रभात" : hours < 17 ? "शुभ दोपहर" : "शुभ संध्या";

  return (
    <div className="min-h-screen bg-background relative overflow-hidden pb-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--saffron)/0.12)_0%,transparent_50%)]" />
      <FloatingParticles count={12} />

      <div className="relative z-10 px-4 pt-6 max-w-lg mx-auto space-y-5">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <h1 className="text-xl font-bold text-foreground">{greeting} 🙏</h1>
            <p className="text-xs text-muted-foreground">आपका आध्यात्मिक सहयात्री</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full glass-card flex items-center justify-center">
              <span className="text-lg">🕉️</span>
            </div>
          </div>
        </motion.div>

        {/* Search */}
        <motion.div
          className="glass-card flex items-center gap-3 px-4 py-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="पूजा, मंत्र या भजन खोजें..."
            className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
        </motion.div>

        {/* Deity Carousel */}
        <motion.div
          className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {gods.map((god) => (
            <button
              key={god.name}
              onClick={() => navigate("/mandir")}
              className="flex-shrink-0 flex flex-col items-center gap-1"
            >
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary/40 hover:border-primary transition-colors">
                <img src={god.img} alt={god.name} className="w-full h-full object-cover" />
              </div>
              <span className="text-[10px] font-devanagari text-muted-foreground">{god.name}</span>
            </button>
          ))}
        </motion.div>

        {/* Suvichar Card */}
        <motion.div
          className="glass-card p-4 border-l-4 border-l-primary"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25 }}
        >
          <p className="text-xs text-muted-foreground mb-1">✨ आज का सुविचार</p>
          <p className="text-sm font-devanagari text-foreground italic leading-relaxed">{todaySuvichar}</p>
        </motion.div>

        {/* Bhavishya Gyan */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-base font-bold text-foreground mb-3 font-devanagari">भविष्य ज्ञान</h2>
          <div className="grid grid-cols-3 gap-2">
            {bhavishyaItems.map((item) => (
              <button
                key={item.label}
                onClick={() => navigate("/chadawa")}
                className="glass-card p-3 flex flex-col items-center gap-2 hover:glow-saffron transition-all active:scale-95"
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="text-[11px] font-devanagari text-foreground text-center leading-tight">{item.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Weekly Festivals */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-foreground font-devanagari">
              <Calendar className="w-4 h-4 inline mr-1 text-primary" />
              इस सप्ताह के त्योहार
            </h2>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {weeklyFestivals.map((fest) => (
              <div
                key={fest.name}
                className="flex-shrink-0 w-36 glass-card overflow-hidden"
              >
                <div className="h-20 relative">
                  <img src={fest.img} alt={fest.name} className="w-full h-full object-cover opacity-70" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                  <div className="absolute bottom-2 left-2">
                    <span className="text-xl font-bold text-foreground">{fest.date}</span>
                    <span className="text-[10px] text-muted-foreground ml-1">{fest.month}</span>
                  </div>
                </div>
                <div className="p-2">
                  <p className="text-[11px] font-devanagari text-foreground leading-tight">{fest.name}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-base font-bold text-foreground mb-3 font-devanagari">आध्यात्मिक साधना</h2>
          <div className="grid grid-cols-2 gap-3">
            {quickFeatures.map((feature, i) => (
              <motion.button
                key={feature.label}
                onClick={() => navigate(feature.path)}
                className="glass-card p-4 flex flex-col items-center gap-2 hover:glow-saffron transition-all"
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 + i * 0.08 }}
              >
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center`}>
                  <span className="text-xl">{feature.icon}</span>
                </div>
                <span className="text-xs font-devanagari font-medium text-foreground text-center">{feature.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Panchang Summary */}
        <motion.div
          className="glass-card p-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-sm font-bold text-foreground mb-3 font-devanagari">
            <Clock className="w-4 h-4 inline mr-1 text-secondary" />
            आज का पंचांग
          </h3>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-muted/50 rounded-lg p-2">
              <p className="text-muted-foreground">तिथि</p>
              <p className="text-foreground font-medium font-devanagari">शुक्ल पक्ष दशमी</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-2">
              <p className="text-muted-foreground">नक्षत्र</p>
              <p className="text-foreground font-medium font-devanagari">पुष्य</p>
            </div>
            <div className="bg-primary/10 rounded-lg p-2 border border-primary/20">
              <p className="text-primary text-[10px]">शुभ मुहूर्त</p>
              <p className="text-foreground font-medium">11:40 - 12:28</p>
            </div>
            <div className="bg-destructive/10 rounded-lg p-2 border border-destructive/20">
              <p className="text-destructive text-[10px]">राहुकाल</p>
              <p className="text-foreground font-medium">8:59 - 10:32</p>
            </div>
          </div>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Index;
