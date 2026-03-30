import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Star, Calendar, Mail, Flame, Download } from "lucide-react";
import BottomNav from "@/components/BottomNav";

import shiva from "@/assets/shiva.jpg";
import krishna from "@/assets/krishna.jpg";
import lakshmi from "@/assets/lakshmi.jpg";
import hanuman from "@/assets/hanuman.jpg";
import durga from "@/assets/durga.jpg";
import ganesha from "@/assets/ganesha.jpg";

const tabs = ["ज्योतिष", "राशिफल", "पंचांग", "सुविचार", "वॉलपेपर"];

const rashis = [
  { name: "मेष", icon: "♈", dates: "21 मार्च - 19 अप्रैल" },
  { name: "वृषभ", icon: "♉", dates: "20 अप्रैल - 20 मई" },
  { name: "मिथुन", icon: "♊", dates: "21 मई - 20 जून" },
  { name: "कर्क", icon: "♋", dates: "21 जून - 22 जुलाई" },
  { name: "सिंह", icon: "♌", dates: "23 जुलाई - 22 अगस्त" },
  { name: "कन्या", icon: "♍", dates: "23 अगस्त - 22 सितंबर" },
  { name: "तुला", icon: "♎", dates: "23 सितंबर - 22 अक्टूबर" },
  { name: "वृश्चिक", icon: "♏", dates: "23 अक्टूबर - 21 नवंबर" },
  { name: "धनु", icon: "♐", dates: "22 नवंबर - 21 दिसंबर" },
  { name: "मकर", icon: "♑", dates: "22 दिसंबर - 19 जनवरी" },
  { name: "कुंभ", icon: "♒", dates: "20 जनवरी - 18 फरवरी" },
  { name: "मीन", icon: "♓", dates: "19 फरवरी - 20 मार्च" },
];

const suvichars = [
  { text: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।", source: "श्रीमद्भगवद्गीता 2.47" },
  { text: "योगः कर्मसु कौशलम्।", source: "श्रीमद्भगवद्गीता 2.50" },
  { text: "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज।", source: "श्रीमद्भगवद्गीता 18.66" },
  { text: "उद्धरेदात्मनात्मानं नात्मानमवसादयेत्।", source: "श्रीमद्भगवद्गीता 6.5" },
  { text: "मन एव मनुष्याणां कारणं बन्धमोक्षयोः।", source: "अमृतबिन्दु उपनिषद्" },
];

const wallpapers = [
  { name: "देवी लक्ष्मी", img: lakshmi },
  { name: "श्री गणेश", img: ganesha },
  { name: "हनुमान जी", img: hanuman },
  { name: "भगवान शिव", img: shiva },
  { name: "श्री कृष्ण", img: krishna },
  { name: "माँ दुर्गा", img: durga },
];

const ChadawaPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden pb-24">
      <div className="absolute inset-0 bg-mesh-gradient" />

      <div className="relative z-10 px-4 pt-6 max-w-lg mx-auto">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-5"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div className="w-10 h-10 rounded-2xl glass-card-elevated flex items-center justify-center" whileTap={{ scale: 0.9 }}>
            <span className="text-lg">←</span>
          </motion.div>
          <h1 className="text-lg font-bold text-foreground font-devanagari">
            <span className="text-primary">महा</span>भंडार
          </h1>
          <div className="flex items-center gap-1.5 glass-card-elevated px-3 py-1.5 rounded-xl">
            <span className="text-xs text-foreground font-semibold">0</span>
            <span className="text-sm">🪙</span>
          </div>
        </motion.div>

        {/* Tab Icons */}
        <div className="flex justify-around mb-5">
          {tabs.map((tab, i) => {
            const icons = [Phone, Star, Calendar, Mail, Flame];
            const Icon = icons[i];
            return (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={`flex flex-col items-center gap-1.5 transition-all ${
                  activeTab === i ? "text-primary" : "text-muted-foreground"
                }`}
                whileTap={{ scale: 0.9 }}
              >
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all ${
                  activeTab === i ? "gradient-saffron text-primary-foreground" : "bg-muted/30 border border-border/30"
                }`}
                  style={activeTab === i ? { boxShadow: '0 4px 15px hsl(25 100% 52% / 0.25)' } : {}}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-devanagari font-medium">{tab}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Tab Content */}
        <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          {/* Jyotish */}
          {activeTab === 0 && (
            <div className="space-y-3">
              <div className="glass-card-elevated p-5 text-center">
                <p className="text-base font-bold text-foreground font-devanagari mb-2">पहली कंसल्टेशन बिलकुल मुफ्त</p>
                <p className="text-xs text-muted-foreground mb-3">अनुभवी ज्योतिषाचार्यों से बात करें</p>
                <div className="h-0.5 w-12 mx-auto gradient-saffron rounded-full" />
              </div>
              {[
                { name: "गुरुजी", spec: "वैदिक ज्योतिष", rating: "5.0", price: "निःशुल्क", exp: "" },
                { name: "आचार्य राजीव", spec: "वैदिक, पामिस्ट्री, सिग्नेचर", rating: "5.0", price: "₹33/min", exp: "20 साल" },
                { name: "ज्योतिषी शिवानी", spec: "KP, वैदिक, न्यूमेरोलॉजी", rating: "4.8", price: "₹27/min", exp: "4 साल" },
              ].map((astro, i) => (
                <motion.div 
                  key={astro.name} 
                  className="glass-card p-4 flex items-center gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <div className="w-12 h-12 rounded-2xl gradient-saffron flex items-center justify-center text-lg font-devanagari text-primary-foreground font-bold">
                    {astro.name[0]}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-foreground font-devanagari">{astro.name}</p>
                    <p className="text-[11px] text-muted-foreground font-devanagari">{astro.spec}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] text-secondary font-semibold">⭐ {astro.rating}</span>
                      {astro.exp && <span className="text-[10px] text-muted-foreground">• {astro.exp}</span>}
                    </div>
                    <p className="text-xs text-primary font-semibold mt-0.5">{astro.price}</p>
                  </div>
                  <motion.button 
                    className="glass-card-elevated px-4 py-2 rounded-xl text-xs text-primary font-semibold"
                    whileTap={{ scale: 0.95 }}
                  >
                    💬 चैट
                  </motion.button>
                </motion.div>
              ))}
            </div>
          )}

          {/* Rashifal */}
          {activeTab === 1 && (
            <div className="space-y-3">
              <h2 className="text-sm font-bold text-foreground font-devanagari flex items-center gap-2">
                <div className="w-1 h-4 rounded-full gradient-saffron" />
                वार्षिक राशिफल 2026
              </h2>
              <div className="grid grid-cols-3 gap-2.5">
                {rashis.map((rashi, i) => (
                  <motion.button 
                    key={rashi.name} 
                    className="glass-card p-3.5 flex flex-col items-center gap-1.5 group relative overflow-hidden"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="text-2xl relative z-10">{rashi.icon}</span>
                    <span className="text-[11px] font-devanagari text-foreground text-center font-medium relative z-10">{rashi.name}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Panchang */}
          {activeTab === 2 && (
            <div className="space-y-3">
              <div className="glass-card p-5">
                <div className="flex gap-2 mb-4">
                  <button className="flex-1 gradient-saffron text-primary-foreground py-2 rounded-xl text-xs font-devanagari font-semibold"
                    style={{ boxShadow: '0 2px 12px hsl(25 100% 52% / 0.2)' }}
                  >दैनिक</button>
                  <button className="flex-1 glass-card text-muted-foreground py-2 rounded-xl text-xs font-devanagari font-medium">मासिक</button>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center text-4xl">🌙</div>
                  <div>
                    <p className="text-sm font-bold text-foreground font-devanagari">शुक्ल पक्ष दशमी, शनिवार</p>
                    <p className="text-xs text-muted-foreground">8:47 AM तक</p>
                    <p className="text-xs text-muted-foreground font-devanagari">चैत्र मास • वसंत, सिद्धार्थ 2083</p>
                  </div>
                </div>
                <h4 className="text-xs font-bold text-foreground font-devanagari mb-2 flex items-center gap-2">
                  <div className="w-1 h-3 rounded-full bg-secondary" />
                  शुभ-अशुभ समय
                </h4>
                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  <div className="bg-primary/10 border border-primary/20 rounded-xl p-3">
                    <p className="text-primary font-semibold font-devanagari">शुभ मुहूर्त</p>
                    <p className="text-foreground mt-0.5">11:40 AM - 12:28 PM</p>
                  </div>
                  <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-3">
                    <p className="text-secondary font-semibold font-devanagari">गुलिक काल</p>
                    <p className="text-foreground mt-0.5">5:55 AM - 7:27 AM</p>
                  </div>
                  <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-3">
                    <p className="text-destructive font-semibold font-devanagari">राहुकाल</p>
                    <p className="text-foreground mt-0.5">8:59 - 10:32 AM</p>
                  </div>
                  <div className="bg-muted/50 rounded-xl p-3 border border-border/30">
                    <p className="text-muted-foreground font-semibold font-devanagari">यमगंड</p>
                    <p className="text-foreground mt-0.5">1:59 - 3:31 PM</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Suvichar */}
          {activeTab === 3 && (
            <div className="space-y-3">
              <h2 className="text-sm font-bold text-foreground font-devanagari flex items-center gap-2">
                <div className="w-1 h-4 rounded-full bg-secondary" />
                आज के सुविचार
              </h2>
              {suvichars.map((s, i) => (
                <motion.div
                  key={i}
                  className="glass-card p-5 relative overflow-hidden"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-secondary rounded-l-2xl" />
                  <p className="text-sm font-devanagari text-foreground italic leading-relaxed font-medium">"{s.text}"</p>
                  <p className="text-xs text-primary mt-2.5 font-devanagari font-semibold">— {s.source}</p>
                </motion.div>
              ))}
            </div>
          )}

          {/* Wallpapers */}
          {activeTab === 4 && (
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-foreground font-devanagari flex items-center gap-2">
                <div className="w-1 h-4 rounded-full gradient-saffron" />
                देवी-देवता वॉलपेपर 🌟
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {wallpapers.map((wp) => (
                  <motion.div 
                    key={wp.name} 
                    className="glass-card overflow-hidden group"
                    whileHover={{ y: -3 }}
                  >
                    <div className="aspect-[3/4] relative overflow-hidden">
                      <img src={wp.img} alt={wp.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                        <motion.button 
                          className="glass-card-elevated px-4 py-2 rounded-xl text-xs text-foreground flex items-center gap-1.5 font-medium"
                          whileTap={{ scale: 0.95 }}
                        >
                          <Download className="w-3 h-3" /> डाउनलोड
                        </motion.button>
                      </div>
                    </div>
                    <div className="p-2.5">
                      <p className="text-xs font-devanagari text-foreground text-center font-medium">{wp.name}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
};

export default ChadawaPage;
