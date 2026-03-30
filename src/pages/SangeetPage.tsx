import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Heart, MoreVertical, Loader2 } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import NowPlayingBar from "@/components/NowPlayingBar";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { useAudio } from "@/contexts/AudioContext";
import { songs, deityCategories, filters } from "@/data/songs";

const SangeetPage = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeFilter, setActiveFilter] = useState(0);
  const [likedSongs, setLikedSongs] = useState<Set<number>>(new Set());
  const player = useAudioPlayer();
  const backgroundAudio = useAudio();

  // Stop background Om/Gayatri drone when on Sangeet page to avoid distortion
  useEffect(() => {
    if (backgroundAudio.isPlaying) {
      backgroundAudio.switchTrack("silent");
    }
  }, []);

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

  const handlePlaySong = (globalIndex: number) => {
    player.togglePlayPause(globalIndex, songs[globalIndex].audioUrl);
  };

  const handleNext = () => {
    if (player.currentSongIndex === null) return;
    const nextIdx = (player.currentSongIndex + 1) % songs.length;
    player.playSong(nextIdx, songs[nextIdx].audioUrl);
  };

  const handlePrev = () => {
    if (player.currentSongIndex === null) return;
    const prevIdx = (player.currentSongIndex - 1 + songs.length) % songs.length;
    player.playSong(prevIdx, songs[prevIdx].audioUrl);
  };

  const currentSong = player.currentSongIndex !== null ? songs[player.currentSongIndex] : null;

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
            {activeCategory === 0 ? "गाने चलाने के लिए टैप करें 🎶" : `${deityCategories[activeCategory].name} के भजन`}
          </p>
          {filteredSongs.map((song, i) => {
            const globalIndex = songs.indexOf(song);
            const isPlaying = player.currentSongIndex === globalIndex && player.isPlaying;
            const isSelected = player.currentSongIndex === globalIndex;
            const isLoadingThis = player.currentSongIndex === globalIndex && player.isLoading;
            return (
              <motion.div
                key={`${song.title}-${i}`}
                className={`glass-card flex items-center gap-3 p-3 transition-colors cursor-pointer ${
                  isSelected ? "bg-primary/10 border border-primary/20" : "hover:bg-muted/30"
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                onClick={() => handlePlaySong(globalIndex)}
              >
                {/* Thumbnail */}
                <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={song.img} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-background/40 flex items-center justify-center">
                    {isLoadingThis ? (
                      <Loader2 className="w-4 h-4 text-primary animate-spin" />
                    ) : isPlaying ? (
                      <div className="flex items-end gap-[2px] h-3">
                        {[0, 1, 2].map(b => (
                          <motion.div
                            key={b}
                            className="w-[3px] bg-primary rounded-full"
                            animate={{ height: ["4px", "12px", "6px", "10px", "4px"] }}
                            transition={{ duration: 0.8, repeat: Infinity, delay: b * 0.15 }}
                          />
                        ))}
                      </div>
                    ) : (
                      <Play className="w-4 h-4 text-foreground ml-0.5" />
                    )}
                  </div>
                </div>

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
                  onClick={(e) => { e.stopPropagation(); toggleLike(globalIndex); }}
                  className="p-1"
                >
                  <Heart
                    className={`w-4 h-4 transition-colors ${
                      likedSongs.has(globalIndex) ? "text-primary fill-primary" : "text-muted-foreground"
                    }`}
                  />
                </button>
                <button className="p-1 text-muted-foreground" onClick={(e) => e.stopPropagation()}>
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

      {/* Now Playing Bar */}
      {currentSong && (
        <NowPlayingBar
          songTitle={currentSong.title}
          artist={currentSong.artist}
          img={currentSong.img}
          isPlaying={player.isPlaying}
          isLoading={player.isLoading}
          progress={player.progress}
          onToggle={() => handlePlaySong(player.currentSongIndex!)}
          onClose={() => player.pause()}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}

      <BottomNav />
    </div>
  );
};

export default SangeetPage;
