import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipBack, SkipForward, X } from "lucide-react";

interface NowPlayingBarProps {
  songTitle: string;
  artist: string;
  img: string;
  isPlaying: boolean;
  progress: number;
  onToggle: () => void;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const NowPlayingBar = ({
  songTitle, artist, img, isPlaying, progress,
  onToggle, onClose, onNext, onPrev,
}: NowPlayingBarProps) => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-20 left-0 right-0 z-40 px-3"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
      >
        <div className="max-w-lg mx-auto glass-card rounded-2xl overflow-hidden border border-border/50">
          {/* Progress bar */}
          <div className="h-0.5 bg-muted w-full">
            <motion.div
              className="h-full bg-primary"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="flex items-center gap-3 p-3">
            {/* Thumbnail */}
            <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
              <img src={img} alt="" className="w-full h-full object-cover" />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-devanagari text-foreground truncate">{songTitle}</p>
              <p className="text-[10px] text-muted-foreground font-devanagari truncate">{artist}</p>
            </div>

            {/* Controls */}
            <button onClick={onPrev} className="p-1.5 text-muted-foreground hover:text-foreground">
              <SkipBack className="w-4 h-4" />
            </button>
            <button
              onClick={onToggle}
              className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>
            <button onClick={onNext} className="p-1.5 text-muted-foreground hover:text-foreground">
              <SkipForward className="w-4 h-4" />
            </button>
            <button onClick={onClose} className="p-1 text-muted-foreground hover:text-foreground ml-1">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default NowPlayingBar;
