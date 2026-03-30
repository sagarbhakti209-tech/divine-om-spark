import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipBack, SkipForward, X, Loader2 } from "lucide-react";

interface NowPlayingBarProps {
  songTitle: string;
  artist: string;
  img: string;
  isPlaying: boolean;
  isLoading?: boolean;
  progress: number;
  onToggle: () => void;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const NowPlayingBar = ({
  songTitle, artist, img, isPlaying, isLoading, progress,
  onToggle, onClose, onNext, onPrev,
}: NowPlayingBarProps) => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-[68px] left-0 right-0 z-40 px-3"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="max-w-lg mx-auto glass-card-elevated rounded-2xl overflow-hidden">
          {/* Progress bar */}
          <div className="h-[3px] bg-muted/50 w-full">
            <motion.div
              className="h-full gradient-saffron relative"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary"
                style={{ boxShadow: '0 0 8px hsl(25 100% 52% / 0.6)' }}
              />
            </motion.div>
          </div>

          <div className="flex items-center gap-3 p-3">
            {/* Thumbnail */}
            <div className="relative w-11 h-11 rounded-xl overflow-hidden flex-shrink-0">
              <img src={img} alt="" className="w-full h-full object-cover" />
              {isPlaying && !isLoading && (
                <div className="absolute inset-0 bg-background/20 flex items-center justify-center">
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
                </div>
              )}
              {isLoading && (
                <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                  <Loader2 className="w-4 h-4 text-primary animate-spin" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-devanagari text-foreground truncate font-medium">{songTitle}</p>
              <p className="text-[10px] text-muted-foreground font-devanagari truncate">{artist}</p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-1">
              <button onClick={onPrev} className="p-1.5 text-muted-foreground hover:text-foreground transition-colors">
                <SkipBack className="w-4 h-4" />
              </button>
              <motion.button
                onClick={onToggle}
                className="w-10 h-10 rounded-full gradient-saffron flex items-center justify-center text-primary-foreground"
                disabled={isLoading}
                whileTap={{ scale: 0.9 }}
                style={{ boxShadow: '0 0 15px hsl(25 100% 52% / 0.3)' }}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : isPlaying ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4 ml-0.5" />
                )}
              </motion.button>
              <button onClick={onNext} className="p-1.5 text-muted-foreground hover:text-foreground transition-colors">
                <SkipForward className="w-4 h-4" />
              </button>
            </div>

            <button onClick={onClose} className="p-1 text-muted-foreground hover:text-foreground transition-colors ml-1">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default NowPlayingBar;
