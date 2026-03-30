import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Share2 } from "lucide-react";
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

const deities = [
  { name: "श्री शिव", nameEn: "Lord Shiva", img: shiva, mantra: "ॐ नमः शिवाय", day: "सोमवार" },
  { name: "श्री कृष्ण", nameEn: "Lord Krishna", img: krishna, mantra: "हरे कृष्ण हरे कृष्ण", day: "बुधवार" },
  { name: "श्री राम", nameEn: "Lord Ram", img: ram, mantra: "श्री राम जय राम जय जय राम", day: "मंगलवार" },
  { name: "श्री हनुमान", nameEn: "Lord Hanuman", img: hanuman, mantra: "ॐ हं हनुमंते नमः", day: "मंगलवार" },
  { name: "माँ लक्ष्मी", nameEn: "Goddess Lakshmi", img: lakshmi, mantra: "ॐ श्रीं महालक्ष्म्यै नमः", day: "शुक्रवार" },
  { name: "माँ दुर्गा", nameEn: "Goddess Durga", img: durga, mantra: "ॐ दुं दुर्गायै नमः", day: "शुक्रवार" },
  { name: "श्री गणेश", nameEn: "Lord Ganesha", img: ganesha, mantra: "ॐ गं गणपतये नमः", day: "बुधवार" },
  { name: "श्री विष्णु", nameEn: "Lord Vishnu", img: vishnu, mantra: "ॐ नमो भगवते वासुदेवाय", day: "गुरुवार" },
];

const tabs = ["दर्शन", "शुभ दिन", "पंचांग"];

const importantDates = [
  { date: "29 मार्च", name: "कामदा एकादशी", type: "व्रत" },
  { date: "30 मार्च", name: "प्रदोष व्रत", type: "व्रत" },
  { date: "2 अप्रैल", name: "हनुमान जयंती", type: "त्योहार" },
  { date: "6 अप्रैल", name: "चैत्र नवरात्रि", type: "त्योहार" },
  { date: "13 अप्रैल", name: "राम नवमी", type: "त्योहार" },
];

const MandirPage = () => {
  const [currentDeity, setCurrentDeity] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  const nextDeity = () => setCurrentDeity((prev) => (prev + 1) % deities.length);
  const prevDeity = () => setCurrentDeity((prev) => (prev - 1 + deities.length) % deities.length);
  const deity = deities[currentDeity];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden pb-24">
      <FloatingParticles count={10} />
      <div className="absolute inset-0 bg-mesh-gradient" />

      {/* Header */}
      <div className="relative z-10 px-4 pt-6">
        <motion.div
          className="flex items-center justify-between mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div className="w-10 h-10 rounded-2xl glass-card-elevated flex items-center justify-center" whileTap={{ scale: 0.9 }}>
            <span className="text-lg">🕉️</span>
          </motion.div>
          <h1 className="text-lg font-bold text-foreground font-devanagari">
            <span className="text-primary">मंदिर</span> दर्शन
          </h1>
          <motion.button className="w-10 h-10 rounded-2xl glass-card flex items-center justify-center text-muted-foreground" whileTap={{ scale: 0.9 }}>
            <Share2 className="w-4 h-4" />
          </motion.button>
        </motion.div>

        {/* Deity Selector Chips */}
        <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide">
          {deities.map((d, i) => (
            <motion.button
              key={d.name}
              onClick={() => setCurrentDeity(i)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-devanagari font-medium transition-all ${
                currentDeity === i
                  ? "gradient-saffron text-primary-foreground"
                  : "glass-card text-muted-foreground"
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <img src={d.img} alt="" className="w-5 h-5 rounded-full object-cover" />
              {d.nameEn.split(" ").pop()}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Main Deity Display */}
      <motion.div className="relative z-10 mt-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentDeity}
            className="relative mx-4 rounded-2xl overflow-hidden aspect-[3/4] max-h-[50vh]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <img src={deity.img} alt={deity.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/10" />
            
            {/* Sacred border glow */}
            <div className="absolute inset-0 rounded-2xl gradient-border" />

            {/* Navigation arrows */}
            <motion.button 
              onClick={prevDeity} 
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl glass-card-elevated flex items-center justify-center text-foreground"
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            <motion.button 
              onClick={nextDeity} 
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl glass-card-elevated flex items-center justify-center text-foreground"
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>

            {/* Deity Info */}
            <div className="absolute bottom-0 inset-x-0 p-5">
              <motion.h2 
                className="text-3xl font-bold text-foreground text-glow-saffron font-devanagari"
                key={deity.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {deity.name}
              </motion.h2>
              <p className="text-sm font-devanagari mt-1.5" style={{ color: 'hsl(42 100% 55%)' }}>
                ॥ {deity.mantra} ॥
              </p>
              <p className="text-xs text-muted-foreground mt-1">{deity.day} विशेष दर्शन</p>
            </div>
          </motion.div>
        </AnimatePresence>
        
        {/* Deity indicator dots */}
        <div className="flex justify-center gap-1.5 mt-3">
          {deities.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-300 ${
                currentDeity === i 
                  ? "w-5 h-1.5 gradient-saffron" 
                  : "w-1.5 h-1.5 bg-muted-foreground/30"
              }`}
              style={currentDeity === i ? { boxShadow: '0 0 8px hsl(25 100% 52% / 0.4)' } : {}}
            />
          ))}
        </div>
      </motion.div>

      {/* Tab Bar */}
      <div className="relative z-10 px-4 mt-4">
        <div className="flex gap-1 bg-muted/30 rounded-xl p-1 border border-border/30">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`flex-1 py-2.5 rounded-lg text-xs font-devanagari font-semibold transition-all ${
                activeTab === i
                  ? "gradient-saffron text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              style={activeTab === i ? { boxShadow: '0 2px 12px hsl(25 100% 52% / 0.2)' } : {}}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="relative z-10 px-4 mt-4 space-y-3">
        {activeTab === 0 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            <div className="glass-card p-4">
              <p className="text-sm text-foreground font-devanagari leading-relaxed">
                भारत के विभिन्न मंदिरों के दैनिक दर्शन करने के लिए ऊपर स्वाइप करें। आज {deity.day} विशेष दर्शन में {deity.name} जी के दर्शन करें।
              </p>
            </div>
            <motion.button 
              className="w-full glass-card-elevated p-3.5 text-center text-sm text-primary font-semibold hover:glow-saffron transition-all font-devanagari"
              whileTap={{ scale: 0.98 }}
            >
              🔔 दर्शन रिमाइंडर सेट करें
            </motion.button>
          </motion.div>
        )}

        {activeTab === 1 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
            <h3 className="text-sm font-bold text-foreground font-devanagari flex items-center gap-2">
              <div className="w-1 h-4 rounded-full gradient-saffron" />
              आने वाली महत्वपूर्ण तिथियाँ
            </h3>
            {importantDates.map((d, i) => (
              <motion.div 
                key={d.name} 
                className="glass-card p-3.5 flex items-center justify-between"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <div>
                  <p className="text-sm text-foreground font-devanagari font-medium">{d.name}</p>
                  <p className="text-xs text-muted-foreground">{d.date}</p>
                </div>
                <span className={`text-[10px] px-2.5 py-1 rounded-lg font-semibold ${
                  d.type === "व्रत" ? "bg-primary/15 text-primary" : "bg-secondary/15 text-secondary"
                }`}>
                  {d.type}
                </span>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === 2 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            <div className="glass-card p-5">
              <h3 className="text-sm font-bold text-foreground font-devanagari mb-4 flex items-center gap-2">
                <div className="w-1 h-4 rounded-full bg-secondary" />
                दैनिक पंचांग
              </h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-muted/50 flex items-center justify-center text-3xl">🌙</div>
                <div>
                  <p className="text-sm font-bold text-foreground font-devanagari">शुक्ल पक्ष दशमी, शनिवार</p>
                  <p className="text-xs text-muted-foreground">चैत्र मास • वसंत, सिद्धार्थ 2083</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div className="bg-primary/10 border border-primary/20 rounded-xl p-3">
                  <p className="text-primary font-semibold">शुभ मुहूर्त</p>
                  <p className="text-foreground mt-0.5">11:40 AM - 12:28 PM</p>
                </div>
                <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-3">
                  <p className="text-secondary font-semibold">गुलिक काल</p>
                  <p className="text-foreground mt-0.5">5:55 AM - 7:27 AM</p>
                </div>
                <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-3">
                  <p className="text-destructive font-semibold">राहुकाल</p>
                  <p className="text-foreground mt-0.5">8:59 - 10:32 AM</p>
                </div>
                <div className="bg-muted/50 rounded-xl p-3 border border-border/30">
                  <p className="text-muted-foreground font-semibold">सूर्योदय</p>
                  <p className="text-foreground mt-0.5">6:12 AM</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default MandirPage;
