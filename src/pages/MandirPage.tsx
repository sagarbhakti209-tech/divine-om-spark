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

      {/* Header */}
      <div className="relative z-10 px-4 pt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-9 h-9 rounded-full glass-card flex items-center justify-center">
            <span className="text-lg">🕉️</span>
          </div>
          <h1 className="text-lg font-bold text-primary font-devanagari">मंदिर दर्शन</h1>
          <button className="w-9 h-9 rounded-full glass-card flex items-center justify-center text-muted-foreground">
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* Deity Selector Chips */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {deities.map((d, i) => (
            <button
              key={d.name}
              onClick={() => setCurrentDeity(i)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-devanagari transition-all ${
                currentDeity === i
                  ? "bg-primary text-primary-foreground"
                  : "glass-card text-muted-foreground"
              }`}
            >
              <img src={d.img} alt="" className="w-5 h-5 rounded-full object-cover" />
              {d.nameEn.split(" ").pop()}
            </button>
          ))}
        </div>
      </div>

      {/* Main Deity Display */}
      <motion.div className="relative z-10 mt-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentDeity}
            className="relative mx-4 rounded-2xl overflow-hidden aspect-[3/4] max-h-[50vh]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            <img src={deity.img} alt={deity.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />

            {/* Navigation arrows */}
            <button onClick={prevDeity} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/60 backdrop-blur flex items-center justify-center text-foreground">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={nextDeity} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/60 backdrop-blur flex items-center justify-center text-foreground">
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Deity Info */}
            <div className="absolute bottom-0 inset-x-0 p-4">
              <h2 className="text-2xl font-bold text-foreground text-glow-saffron font-devanagari">{deity.name}</h2>
              <p className="text-sm text-secondary font-devanagari mt-1">॥ {deity.mantra} ॥</p>
              <p className="text-xs text-muted-foreground mt-1">{deity.day} विशेष दर्शन</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Tab Bar */}
      <div className="relative z-10 px-4 mt-4">
        <div className="flex gap-1 bg-muted/50 rounded-xl p-1">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`flex-1 py-2 rounded-lg text-xs font-devanagari font-medium transition-all ${
                activeTab === i
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="relative z-10 px-4 mt-4 space-y-3">
        {activeTab === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            <div className="glass-card p-4">
              <p className="text-sm text-foreground font-devanagari leading-relaxed">
                भारत के विभिन्न मंदिरों के दैनिक दर्शन करने के लिए ऊपर स्वाइप करें। आज {deity.day} विशेष दर्शन में {deity.name} जी के दर्शन करें।
              </p>
            </div>
            <button className="w-full glass-card p-3 text-center text-sm text-primary font-medium hover:glow-saffron transition-all">
              🔔 दर्शन रिमाइंडर सेट करें
            </button>
          </motion.div>
        )}

        {activeTab === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
            <h3 className="text-sm font-bold text-foreground font-devanagari">आने वाली महत्वपूर्ण तिथियाँ</h3>
            {importantDates.map((d) => (
              <div key={d.name} className="glass-card p-3 flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground font-devanagari">{d.name}</p>
                  <p className="text-xs text-muted-foreground">{d.date}</p>
                </div>
                <span className={`text-[10px] px-2 py-1 rounded-full ${
                  d.type === "व्रत" ? "bg-primary/20 text-primary" : "bg-secondary/20 text-secondary"
                }`}>
                  {d.type}
                </span>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            <div className="glass-card p-4">
              <h3 className="text-sm font-bold text-foreground font-devanagari mb-3">दैनिक पंचांग</h3>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center text-3xl">🌙</div>
                <div>
                  <p className="text-sm font-bold text-foreground font-devanagari">शुक्ल पक्ष दशमी, शनिवार</p>
                  <p className="text-xs text-muted-foreground">चैत्र मास • वसंत, सिद्धार्थ 2083</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-primary/10 border border-primary/20 rounded-lg p-2">
                  <p className="text-primary font-medium">शुभ मुहूर्त</p>
                  <p className="text-foreground">11:40 AM - 12:28 PM</p>
                </div>
                <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-2">
                  <p className="text-secondary font-medium">गुलिक काल</p>
                  <p className="text-foreground">5:55 AM - 7:27 AM</p>
                </div>
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-2">
                  <p className="text-destructive font-medium">राहुकाल</p>
                  <p className="text-foreground">8:59 - 10:32 AM</p>
                </div>
                <div className="bg-muted rounded-lg p-2">
                  <p className="text-muted-foreground font-medium">सूर्योदय</p>
                  <p className="text-foreground">6:12 AM</p>
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
