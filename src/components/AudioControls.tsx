import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Music, ChevronDown } from "lucide-react";
import { useAudio } from "@/contexts/AudioContext";

const AudioControls = () => {
  const { isPlaying, volume, currentTrack, togglePlay, setVolume, switchTrack } = useAudio();
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col items-end gap-1.5">
      <motion.button
        onClick={togglePlay}
        className="w-10 h-10 rounded-2xl glass-card-elevated flex items-center justify-center text-primary"
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        title={isPlaying ? "Mute" : "Play Om"}
      >
        {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
      </motion.button>

      <motion.button
        onClick={() => setExpanded(!expanded)}
        className="w-8 h-8 rounded-xl glass-card flex items-center justify-center text-muted-foreground"
        whileTap={{ scale: 0.9 }}
      >
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
      </motion.button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            className="glass-card-elevated p-4 rounded-2xl w-52 space-y-3"
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <div>
              <label className="text-[10px] text-muted-foreground mb-1.5 block uppercase tracking-widest font-semibold">Volume</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full accent-primary h-1"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-muted-foreground block uppercase tracking-widest font-semibold">
                <Music className="w-3 h-3 inline mr-1" />Audio Track
              </label>
              {(["om", "gayatri", "silent"] as const).map((track) => (
                <button
                  key={track}
                  onClick={() => switchTrack(track)}
                  className={`w-full text-left text-xs px-3 py-2 rounded-xl transition-all ${
                    currentTrack === track
                      ? "bg-primary/15 text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                  }`}
                >
                  {track === "om" ? "🕉️ Om Chanting" : track === "gayatri" ? "🎵 Gayatri Tone" : "🔇 Silent"}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AudioControls;
