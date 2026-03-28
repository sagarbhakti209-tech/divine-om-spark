import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Calendar, ChevronRight } from "lucide-react";
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
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--saffron)/0.08)_0%,transparent_50%)]" />

      <div className="relative z-10 px-4 pt-6 max-w-lg mx-auto">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-9 h-9 rounded-full glass-card flex items-center justify-center">
            <span className="text-lg">🕉️</span>
          </div>
          <h1 className="text-lg font-bold text-primary font-devanagari">पूजा सेवा</h1>
          <button className="glass-card px-3 py-1.5 rounded-full text-xs text-foreground font-medium">
            📋 बुकिंग्स
          </button>
        </motion.div>

        {/* Search */}
        <motion.div
          className="glass-card flex items-center gap-3 px-4 py-3 mb-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="दोष निवारण पूजा ढूँढें"
            className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
        </motion.div>

        {/* Filter Chips */}
        <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide">
          <button className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs glass-card text-muted-foreground">
            ≡ फ़िल्टर
          </button>
          {filterChips.map((chip) => (
            <button
              key={chip}
              onClick={() => setActiveFilter(activeFilter === chip ? null : chip)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-devanagari transition-all ${
                activeFilter === chip
                  ? "bg-primary text-primary-foreground"
                  : "glass-card text-muted-foreground"
              }`}
            >
              {chip} ▾
            </button>
          ))}
        </div>

        {/* Section Header */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-5 rounded-full bg-primary" />
          <h2 className="text-sm font-bold text-foreground font-devanagari">आने वाली पूजाएँ</h2>
        </div>

        {/* Pooja Cards */}
        <div className="space-y-3">
          {poojas.map((pooja, i) => (
            <motion.div
              key={pooja.title}
              className="glass-card overflow-hidden"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
            >
              {/* Banner */}
              <div className="relative h-32">
                <img src={pooja.img} alt="" className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
                <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] font-medium px-2 py-0.5 rounded-full">
                  {pooja.tag}
                </span>
                <span className="absolute top-2 right-2 bg-secondary text-secondary-foreground text-xs font-bold px-2 py-0.5 rounded-lg">
                  {pooja.price}
                </span>
              </div>

              {/* Content */}
              <div className="p-3 space-y-2">
                <h3 className="text-sm font-bold text-foreground font-devanagari">{pooja.title}</h3>
                <p className="text-xs text-primary font-devanagari">{pooja.subtitle}</p>
                <p className="text-xs text-muted-foreground font-devanagari leading-relaxed">{pooja.desc}</p>

                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  <span className="font-devanagari">{pooja.location}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  <span className="font-devanagari">{pooja.date}</span>
                </div>

                <button className="w-full mt-2 bg-primary hover:bg-primary/90 text-primary-foreground py-2.5 rounded-xl text-sm font-medium font-devanagari flex items-center justify-center gap-1 transition-colors">
                  भाग ले <ChevronRight className="w-4 h-4" />
                </button>
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
