import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Calendar, ChevronRight, ArrowRight } from "lucide-react";
import BottomNav from "@/components/BottomNav";

import shiva from "@/assets/shiva.jpg";
import hanuman from "@/assets/hanuman.jpg";
import ganesha from "@/assets/ganesha.jpg";
import lakshmi from "@/assets/lakshmi.jpg";
import durga from "@/assets/durga.jpg";

const filterChips = ["भगवान", "तिथि", "दोषा", "ग्रह शांति"];

const poojas = [
  {
    title: "नारायण बलि पूजा",
    subtitle: "त्रिपिंडी श्राद्ध पितृ दोष शांति पूजा",
    desc: "पूर्वजों के श्राप से मुक्ति और दिवंगत आत्माओं को शांति प्रदान करने के लिए",
    location: "गोकर्ण क्षेत्र, गोकर्ण, कर्नाटक",
    date: "28 मार्च, शनिवार",
    img: shiva,
    tag: "एकादशी विशेष",
    price: "₹2,100",
  },
  {
    title: "महा मृत्युंजय जाप",
    subtitle: "1.25 लाख जाप",
    desc: "स्वास्थ्य सुरक्षा और दीर्घायु के लिए विशेष अनुष्ठान",
    location: "काशी विश्वनाथ, वाराणसी",
    date: "30 मार्च, सोमवार",
    img: shiva,
    tag: "लोकप्रिय",
    price: "₹1,500",
  },
  {
    title: "गणेश अथर्वशीर्ष पाठ",
    subtitle: "विघ्न नाशक विशेष पूजा",
    desc: "नए काम की शुरुआत और बाधा निवारण के लिए",
    location: "सिद्धिविनायक मंदिर, मुंबई",
    date: "2 अप्रैल, बुधवार",
    img: ganesha,
    tag: "नया",
    price: "₹1,100",
  },
  {
    title: "लक्ष्मी नारायण पूजा",
    subtitle: "धन प्राप्ति और समृद्धि हेतु",
    desc: "व्यापार में उन्नति और आर्थिक समस्याओं के समाधान के लिए",
    location: "तिरुपति बालाजी, आंध्र प्रदेश",
    date: "4 अप्रैल, शुक्रवार",
    img: lakshmi,
    tag: "विशेष",
    price: "₹3,500",
  },
  {
    title: "हनुमान पंचमुखी हवन",
    subtitle: "बुरी नज़र और नकारात्मक ऊर्जा से सुरक्षा",
    desc: "हनुमान जयंती के अवसर पर विशेष अनुष्ठान",
    location: "संकट मोचन मंदिर, वाराणसी",
    date: "2 अप्रैल, बुधवार",
    img: hanuman,
    tag: "हनुमान जयंती",
    price: "₹1,800",
  },
  {
    title: "दुर्गा सप्तशती पाठ",
    subtitle: "माँ दुर्गा की कृपा हेतु",
    desc: "शत्रु नाशक और रोग निवारण के लिए शक्तिशाली पाठ",
    location: "वैष्णो देवी, कटरा",
    date: "6 अप्रैल, रविवार",
    img: durga,
    tag: "नवरात्रि विशेष",
    price: "₹2,500",
  },
];

const PoojaPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

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
          <motion.div 
            className="w-10 h-10 rounded-2xl glass-card-elevated flex items-center justify-center"
            whileTap={{ scale: 0.9 }}
          >
            <span className="text-lg">🕉️</span>
          </motion.div>
          <h1 className="text-lg font-bold text-foreground font-devanagari">
            <span className="text-primary">पूजा</span> सेवा
          </h1>
          <button className="glass-card px-3 py-1.5 rounded-xl text-xs text-foreground font-medium hover:bg-muted/30 transition-colors">
            📋 बुकिंग्स
          </button>
        </motion.div>

        {/* Search */}
        <motion.div
          className="glass-card-elevated flex items-center gap-3 px-4 py-3.5 mb-4 group"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Search className="w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="दोष निवारण पूजा ढूँढें"
            className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground font-devanagari"
          />
        </motion.div>

        {/* Filter Chips */}
        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
          <button className="flex-shrink-0 px-3 py-2 rounded-xl text-xs glass-card text-muted-foreground font-medium">
            ≡ फ़िल्टर
          </button>
          {filterChips.map((chip) => (
            <button
              key={chip}
              onClick={() => setActiveFilter(activeFilter === chip ? null : chip)}
              className={`flex-shrink-0 px-3 py-2 rounded-xl text-xs font-devanagari font-medium transition-all ${
                activeFilter === chip
                  ? "gradient-saffron text-primary-foreground"
                  : "glass-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Section Header */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-5 rounded-full gradient-saffron" />
          <h2 className="text-sm font-bold text-foreground font-devanagari">आने वाली पूजाएँ</h2>
        </div>

        {/* Pooja Cards */}
        <div className="space-y-3">
          {poojas.map((pooja, i) => (
            <motion.div
              key={pooja.title}
              className="glass-card overflow-hidden group"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
            >
              {/* Banner */}
              <div className="relative h-36 overflow-hidden">
                <img src={pooja.img} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                <span className="absolute top-3 left-3 gradient-saffron text-primary-foreground text-[10px] font-semibold px-2.5 py-1 rounded-lg">
                  {pooja.tag}
                </span>
                <span className="absolute top-3 right-3 glass-card-elevated text-foreground text-xs font-bold px-3 py-1 rounded-lg">
                  {pooja.price}
                </span>
              </div>

              {/* Content */}
              <div className="p-4 space-y-2.5">
                <h3 className="text-sm font-bold text-foreground font-devanagari">{pooja.title}</h3>
                <p className="text-xs text-primary font-devanagari font-medium">{pooja.subtitle}</p>
                <p className="text-xs text-muted-foreground font-devanagari leading-relaxed">{pooja.desc}</p>

                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3 text-primary/60" />
                  <span className="font-devanagari">{pooja.location}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3 text-secondary/60" />
                  <span className="font-devanagari">{pooja.date}</span>
                </div>

                <motion.button 
                  className="w-full mt-2 gradient-saffron text-primary-foreground py-3 rounded-xl text-sm font-semibold font-devanagari flex items-center justify-center gap-1.5 transition-all"
                  whileTap={{ scale: 0.97 }}
                  style={{ boxShadow: '0 4px 20px hsl(25 100% 52% / 0.25)' }}
                >
                  भाग ले <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default PoojaPage;
