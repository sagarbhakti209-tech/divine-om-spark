import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Heart, Share2, MoreVertical } from "lucide-react";
import BottomNav from "@/components/BottomNav";

import hanuman from "@/assets/hanuman.jpg";
import shiva from "@/assets/shiva.jpg";
import krishna from "@/assets/krishna.jpg";
import ram from "@/assets/ram.jpg";
import lakshmi from "@/assets/lakshmi.jpg";
import ganesha from "@/assets/ganesha.jpg";
import durga from "@/assets/durga.jpg";
import vishnu from "@/assets/vishnu.jpg";

const deityCategories = [
  { name: "पसंदीदा", img: "❤️", isEmoji: true },
  { name: "हनुमान जी", img: hanuman },
  { name: "शिव जी", img: shiva },
  { name: "कृष्ण जी", img: krishna },
  { name: "राम जी", img: ram },
  { name: "माँ लक्ष्मी", img: lakshmi },
  { name: "गणेश जी", img: ganesha },
  { name: "माँ दुर्गा", img: durga },
  { name: "विष्णु जी", img: vishnu },
];

const filters = ["सभी", "आरती", "चालीसा", "भजन", "मंत्र", "स्तोत्र"];

const songs = [
  { title: "हनुमान चालीसा", artist: "पंकज उधास", deity: "हनुमान जी", img: hanuman, duration: "12:45", category: "चालीसा" },
  { title: "आरती कीजै हनुमान लला की", artist: "सुरेश वाडकर", deity: "हनुमान जी", img: hanuman, duration: "5:30", category: "आरती" },
  { title: "ॐ गं गणपतये नमः - 108 बार", artist: "शंकर महादेवन", deity: "गणेश जी", img: ganesha, duration: "18:20", category: "मंत्र" },
  { title: "महामृत्युंजय मंत्र", artist: "अनुराधा पौडवाल", deity: "शिव जी", img: shiva, duration: "11:15", category: "मंत्र" },
  { title: "विष्णु जी की आरती", artist: "मिताली सिंह", deity: "विष्णु जी", img: vishnu, duration: "6:45", category: "आरती" },
  { title: "शिव गायत्री मंत्र", artist: "महालक्ष्मी अय्यर", deity: "शिव जी", img: shiva, duration: "8:30", category: "मंत्र" },
  { title: "ॐ शनि देवाय नमः", artist: "संजय बग्गा", deity: "शिव जी", img: shiva, duration: "9:10", category: "मंत्र" },
  { title: "गणेश जी की आरती", artist: "दिवकी पांडे", deity: "गणेश जी", img: ganesha, duration: "4:55", category: "आरती" },
  { title: "दुनिया चले ना श्री राम के बिना", artist: "उपासना मेहता", deity: "राम जी", img: ram, duration: "7:20", category: "भजन" },
  { title: "श्री लक्ष्मी स्तोत्र", artist: "कविता कृष्णमूर्ति", deity: "माँ लक्ष्मी", img: lakshmi, duration: "10:05", category: "स्तोत्र" },
  { title: "दुर्गा चालीसा", artist: "अनुराधा पौडवाल", deity: "माँ दुर्गा", img: durga, duration: "14:30", category: "चालीसा" },
  { title: "कृष्ण भजन मधुर संग्रह", artist: "जसवंत सिंह", deity: "कृष्ण जी", img: krishna, duration: "22:15", category: "भजन" },
];

const SangeetPage = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeFilter, setActiveFilter] = useState(0);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [likedSongs, setLikedSongs] = useState<Set<number>>(new Set());

  const filteredSongs = songs.filter((song) => {
    if (activeFilter > 0 && song.category !== filters[activeFilter]) return false;
    if (activeCategory > 0 && song.deity !== deityCategories[activeCategory].name) return false;
    return true;
  });

  const toggleLike = (i: number) => {
    setLikedSongs((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden pb-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--gold)/0.08)_0%,transparent_50%)]" />

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
          <h1 className="text-lg font-bold text-primary font-devanagari">संगीत संग्रह</h1>
          <div className="w-9 h-9 rounded-full glass-card flex items-center justify-center text-muted-foreground">
            🎵
          </div>
        </motion.div>

        {/* Deity Categories */}
        <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide mb-2">
          {deityCategories.map((cat, i) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(i)}
              className={`flex-shrink-0 flex flex-col items-center gap-1 transition-all ${
                activeCategory === i ? "scale-105" : "opacity-60"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-full overflow-hidden border-2 flex items-center justify-center transition-all ${
                  activeCategory === i ? "border-primary glow-saffron" : "border-border"
                }`}
              >
                {cat.isEmoji ? (
                  <span className="text-xl">{cat.img}</span>
                ) : (
                  <img src={cat.img as string} alt={cat.name} className="w-full h-full object-cover" />
                )}
              </div>
              <span className="text-[9px] font-devanagari text-foreground whitespace-nowrap">{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Filter Chips */}
        <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide">
          {filters.map((filter, i) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(i)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-devanagari transition-all ${
                activeFilter === i
                  ? "bg-primary text-primary-foreground"
                  : "glass-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Song List */}
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground mb-2 font-devanagari">
            {activeCategory === 0 ? "पसंदीदा में जोड़ने के लिए सुझाव" : `${deityCategories[activeCategory].name} के भजन`}
          </p>
          {filteredSongs.map((song, i) => {
            const globalIndex = songs.indexOf(song);
            const isPlaying = playingIndex === globalIndex;
            return (
              <motion.div
                key={`${song.title}-${i}`}
                className="glass-card flex items-center gap-3 p-3 hover:bg-muted/30 transition-colors"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                {/* Thumbnail */}
                <button
                  onClick={() => setPlayingIndex(isPlaying ? null : globalIndex)}
                  className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0"
                >
                  <img src={song.img} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-background/40 flex items-center justify-center">
                    {isPlaying ? (
                      <Pause className="w-4 h-4 text-primary" />
                    ) : (
                      <Play className="w-4 h-4 text-foreground ml-0.5" />
                    )}
                  </div>
                </button>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-devanagari truncate ${isPlaying ? "text-primary" : "text-foreground"}`}>
                    {song.title}
                  </p>
                  <p className="text-[11px] text-muted-foreground font-devanagari truncate">{song.artist}</p>
                </div>

                {/* Duration */}
                <span className="text-[10px] text-muted-foreground mr-1">{song.duration}</span>

                {/* Actions */}
                <button
                  onClick={() => toggleLike(globalIndex)}
                  className="p-1"
                >
                  <Heart
                    className={`w-4 h-4 transition-colors ${
                      likedSongs.has(globalIndex) ? "text-primary fill-primary" : "text-muted-foreground"
                    }`}
                  />
                </button>
                <button className="p-1 text-muted-foreground">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
          {filteredSongs.length === 0 && (
            <div className="text-center py-12 text-muted-foreground text-sm font-devanagari">
              इस श्रेणी में कोई भजन उपलब्ध नहीं है
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default SangeetPage;
