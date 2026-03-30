import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Calendar, Clock, ArrowRight, Sparkles } from "lucide-react";
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

const gods = [
  { name: "शिव", img: shiva, gradient: "from-orange-500/20 to-amber-600/10" },
  { name: "कृष्ण", img: krishna, gradient: "from-blue-500/20 to-indigo-600/10" },
  { name: "राम", img: ram, gradient: "from-yellow-500/20 to-orange-600/10" },
  { name: "हनुमान", img: hanuman, gradient: "from-red-500/20 to-orange-600/10" },
  { name: "लक्ष्मी", img: lakshmi, gradient: "from-pink-500/20 to-rose-600/10" },
  { name: "दुर्गा", img: durga, gradient: "from-red-500/20 to-pink-600/10" },
  { name: "गणेश", img: ganesha, gradient: "from-amber-500/20 to-yellow-600/10" },
  { name: "विष्णु", img: vishnu, gradient: "from-blue-500/20 to-cyan-600/10" },
];

const bhavishyaItems = [
  { icon: "🪐", label: "जन्म कुंडली", desc: "Kundali" },
  { icon: "🙏", label: "गुरुजी से पूछें", desc: "Ask Guru" },
  { icon: "⭐", label: "राशिफल", desc: "Horoscope" },
];

const weeklyFestivals = [
  { date: "29", month: "मार्च", name: "कामदा एकादशी", img: hanuman, color: "from-primary/60 to-saffron-deep/40" },
  { date: "30", month: "मार्च", name: "प्रदोष व्रत", img: shiva, color: "from-blue-500/40 to-indigo-600/30" },
  { date: "2", month: "अप्रैल", name: "हनुमान जयंती", img: hanuman, color: "from-red-500/40 to-orange-600/30" },
];

const quickFeatures = [
  { icon: "🕉️", label: "ॐ मेडिटेशन", sub: "शांति प्राप्त करें", path: "/japa" },
  { icon: "📿", label: "गायत्री मंत्र", sub: "मंत्र जाप", path: "/mantra" },
  { icon: "💬", label: "भगवान से बात", sub: "AI गुरु", path: "/chat" },
  { icon: "🖼️", label: "गैलरी", sub: "दिव्य दर्शन", path: "/gallery" },
];

const todaySuvichar = "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।";
const suvicharSource = "— श्रीमद्भगवद्गीता 2.47";

const stagger = {
  container: { show: { transition: { staggerChildren: 0.06 } } },
  item: {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { ease: [0.16, 1, 0.3, 1] as [number, number, number, number], duration: 0.6 } },
  },
};

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const now = new Date();
  const hours = now.getHours();
  const greeting = hours < 12 ? "शुभ प्रभात" : hours < 17 ? "शुभ दोपहर" : "शुभ संध्या";
  const greetingIcon = hours < 12 ? "🌅" : hours < 17 ? "☀️" : "🌙";

  return (
    <div className="min-h-screen bg-background relative overflow-hidden pb-24">
      {/* Multi-layer background */}
      <div className="absolute inset-0 bg-mesh-gradient" />
      <FloatingParticles count={15} />

      <motion.div
        className="relative z-10 px-4 pt-6 max-w-lg mx-auto space-y-5"
        variants={stagger.container}
        initial="hidden"
        animate="show"
      >
        {/* Header */}
        <motion.div className="flex items-center justify-between" variants={stagger.item}>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">{greetingIcon}</span>
              <h1 className="text-xl font-bold text-foreground font-devanagari">{greeting}</h1>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5 font-light tracking-wide">आपका आध्यात्मिक सहयात्री</p>
          </div>
          <motion.div 
            className="w-10 h-10 rounded-2xl glass-card-elevated flex items-center justify-center cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-lg animate-breathe">🕉️</span>
          </motion.div>
        </motion.div>

        {/* Search */}
        <motion.div
          className="glass-card-elevated flex items-center gap-3 px-4 py-3.5 group"
          variants={stagger.item}
        >
          <Search className="w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="पूजा, मंत्र या भजन खोजें..."
            className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground font-devanagari"
          />
        </motion.div>

        {/* Deity Carousel */}
        <motion.div variants={stagger.item}>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
            {gods.map((god, i) => (
              <motion.button
                key={god.name}
                onClick={() => navigate("/mandir")}
                className="flex-shrink-0 flex flex-col items-center gap-1.5 group"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                <div className="relative">
                  <div className="w-[58px] h-[58px] rounded-full overflow-hidden p-[2px] gradient-border">
                    <div className="w-full h-full rounded-full overflow-hidden">
                      <img src={god.img} alt={god.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                  </div>
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-b opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                    style={{ background: 'radial-gradient(circle, hsl(25 100% 52% / 0.2), transparent)' }}
                  />
                </div>
                <span className="text-[10px] font-devanagari text-muted-foreground group-hover:text-foreground transition-colors font-medium">
                  {god.name}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Suvichar Card */}
        <motion.div
          className="relative overflow-hidden glass-card-elevated p-5"
          variants={stagger.item}
        >
          <div className="absolute top-0 left-0 w-1 h-full gradient-saffron rounded-l-2xl" />
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-[0.03]"
            style={{ background: 'radial-gradient(circle, hsl(25 100% 52%), transparent)' }}
          />
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-[10px] text-primary font-semibold uppercase tracking-widest mb-2">आज का सुविचार</p>
              <p className="text-sm font-devanagari text-foreground leading-relaxed font-medium">{todaySuvichar}</p>
              <p className="text-xs text-muted-foreground mt-2 font-devanagari italic">{suvicharSource}</p>
            </div>
          </div>
        </motion.div>

        {/* Bhavishya Gyan */}
        <motion.div variants={stagger.item}>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-5 rounded-full gradient-saffron" />
            <h2 className="text-sm font-bold text-foreground font-devanagari tracking-wide">भविष्य ज्ञान</h2>
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            {bhavishyaItems.map((item, i) => (
              <motion.button
                key={item.label}
                onClick={() => navigate("/chadawa")}
                className="glass-card p-3.5 flex flex-col items-center gap-2 group relative overflow-hidden"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="text-2xl relative z-10">{item.icon}</span>
                <span className="text-[11px] font-devanagari text-foreground text-center leading-tight relative z-10 font-medium">{item.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Weekly Festivals */}
        <motion.div variants={stagger.item}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-1 h-5 rounded-full bg-secondary" />
              <h2 className="text-sm font-bold text-foreground font-devanagari">
                <Calendar className="w-3.5 h-3.5 inline mr-1.5 text-secondary" />
                इस सप्ताह के त्योहार
              </h2>
            </div>
            <button className="text-[10px] text-primary flex items-center gap-0.5 font-medium">
              सभी <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
            {weeklyFestivals.map((fest, i) => (
              <motion.div
                key={fest.name}
                className="flex-shrink-0 w-40 glass-card overflow-hidden group"
                whileHover={{ y: -3 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                <div className="h-24 relative overflow-hidden">
                  <img src={fest.img} alt={fest.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${fest.color} mix-blend-overlay`} />
                  <div className="absolute bottom-2 left-3">
                    <span className="text-2xl font-bold text-foreground leading-none">{fest.date}</span>
                    <span className="text-[10px] text-foreground/70 ml-1 font-devanagari">{fest.month}</span>
                  </div>
                </div>
                <div className="p-2.5">
                  <p className="text-[11px] font-devanagari text-foreground leading-tight font-medium">{fest.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Features Grid */}
        <motion.div variants={stagger.item}>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-5 rounded-full gradient-saffron" />
            <h2 className="text-sm font-bold text-foreground font-devanagari">आध्यात्मिक साधना</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {quickFeatures.map((feature, i) => (
              <motion.button
                key={feature.label}
                onClick={() => navigate(feature.path)}
                className="glass-card p-4 flex flex-col items-start gap-2.5 group relative overflow-hidden text-left"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                variants={stagger.item}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors relative z-10">
                  <span className="text-xl">{feature.icon}</span>
                </div>
                <div className="relative z-10">
                  <span className="text-xs font-devanagari font-semibold text-foreground block">{feature.label}</span>
                  <span className="text-[10px] text-muted-foreground font-devanagari">{feature.sub}</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground absolute bottom-4 right-4 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Panchang Summary */}
        <motion.div
          className="glass-card p-5"
          variants={stagger.item}
        >
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-4 h-4 text-secondary" />
            <h3 className="text-sm font-bold text-foreground font-devanagari">आज का पंचांग</h3>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { label: "तिथि", value: "शुक्ल पक्ष दशमी", color: "border-border" },
              { label: "नक्षत्र", value: "पुष्य", color: "border-border" },
              { label: "शुभ मुहूर्त", value: "11:40 - 12:28", color: "border-primary/25" },
              { label: "राहुकाल", value: "8:59 - 10:32", color: "border-destructive/25" },
            ].map((item) => (
              <div key={item.label} className={`rounded-xl p-3 bg-muted/30 border ${item.color}`}>
                <p className="text-[10px] text-muted-foreground font-devanagari mb-0.5">{item.label}</p>
                <p className="text-xs text-foreground font-semibold font-devanagari">{item.value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Spacer */}
        <div className="h-4" />
      </motion.div>

      <BottomNav />
    </div>
  );
};

export default Index;
