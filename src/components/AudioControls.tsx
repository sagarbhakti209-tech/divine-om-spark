import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Music, ChevronUp } from "lucide-react";
import { useAudio } from "@/contexts/AudioContext";

const AudioControls = () => {
  const { isPlaying, volume, currentTrack, togglePlay, setVolume, switchTrack } = useAudio();
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col items-end gap-2">
      {/* Toggle button */}
      <motion.button
        onClick={togglePlay}
        className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-primary"
        whileTap={{ scale: 0.9 }}
        title={isPlaying ? "Mute" : "Play Om"}
      >
        {isPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
      </motion.button>

      {/* Expand button */}
      <motion.button
        onClick={() => setExpanded(!expanded)}
        className="w-8 h-8 rounded-full glass-card flex items-center justify-center text-muted-foreground"
        whileTap={{ scale: 0.9 }}
      >
        <ChevronUp className={`w-4 h-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
      </motion.button>

      {/* Expanded panel */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            className="glass-card p-4 rounded-2xl w-48 space-y-3"
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
          >
            {/* Volume */}
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Volume</label>
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

            {/* Track selector */}
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground block">
                <Music className="w-3 h-3 inline mr-1" />Audio
              </label>
              {(["om", "gayatri", "silent"] as const).map((track) => (
                <button
                  key={track}
                  onClick={() => switchTrack(track)}
                  className={`w-full text-left text-xs px-3 py-1.5 rounded-lg transition-all ${
                    currentTrack === track
                      ? "bg-primary/20 text-primary"
                      : "text-muted-foreground hover:text-foreground"
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
