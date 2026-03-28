import { createContext, useContext, useState, useRef, useEffect, ReactNode } from "react";

type AudioTrack = "om" | "gayatri" | "silent";

interface AudioContextType {
  isPlaying: boolean;
  volume: number;
  currentTrack: AudioTrack;
  togglePlay: () => void;
  setVolume: (v: number) => void;
  switchTrack: (track: AudioTrack) => void;
}

const AudioCtx = createContext<AudioContextType | null>(null);

// Generate Om drone sound using Web Audio API
function createOmOscillator(audioCtx: AudioContext, gainNode: GainNode) {
  // Base drone
  const osc1 = audioCtx.createOscillator();
  osc1.type = "sine";
  osc1.frequency.value = 136.1; // Om frequency
  osc1.connect(gainNode);

  // Harmonic
  const osc2 = audioCtx.createOscillator();
  osc2.type = "sine";
  osc2.frequency.value = 272.2;
  const gain2 = audioCtx.createGain();
  gain2.gain.value = 0.3;
  osc2.connect(gain2);
  gain2.connect(gainNode);

  // Sub harmonic
  const osc3 = audioCtx.createOscillator();
  osc3.type = "sine";
  osc3.frequency.value = 68.05;
  const gain3 = audioCtx.createGain();
  gain3.gain.value = 0.4;
  osc3.connect(gain3);
  gain3.connect(gainNode);

  return [osc1, osc2, osc3];
}

function createGayatriTone(audioCtx: AudioContext, gainNode: GainNode) {
  // Slightly different harmonics for Gayatri
  const osc1 = audioCtx.createOscillator();
  osc1.type = "sine";
  osc1.frequency.value = 128;
  osc1.connect(gainNode);

  const osc2 = audioCtx.createOscillator();
  osc2.type = "triangle";
  osc2.frequency.value = 256;
  const gain2 = audioCtx.createGain();
  gain2.gain.value = 0.15;
  osc2.connect(gain2);
  gain2.connect(gainNode);

  const osc3 = audioCtx.createOscillator();
  osc3.type = "sine";
  osc3.frequency.value = 192;
  const gain3 = audioCtx.createGain();
  gain3.gain.value = 0.2;
  osc3.connect(gain3);
  gain3.connect(gainNode);

  return [osc1, osc2, osc3];
}

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.3);
  const [currentTrack, setCurrentTrack] = useState<AudioTrack>("om");

  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);

  const stopOscillators = () => {
    oscillatorsRef.current.forEach((o) => {
      try { o.stop(); } catch {}
    });
    oscillatorsRef.current = [];
  };

  const startAudio = (track: AudioTrack) => {
    if (track === "silent") return;

    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    }
    const ctx = audioCtxRef.current;

    if (!gainRef.current) {
      gainRef.current = ctx.createGain();
      gainRef.current.connect(ctx.destination);
    }
    gainRef.current.gain.value = volume;

    stopOscillators();

    const oscs = track === "om"
      ? createOmOscillator(ctx, gainRef.current)
      : createGayatriTone(ctx, gainRef.current);

    oscs.forEach((o) => o.start());
    oscillatorsRef.current = oscs;
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopOscillators();
      setIsPlaying(false);
    } else {
      startAudio(currentTrack);
      setIsPlaying(true);
    }
  };

  const setVolume = (v: number) => {
    setVolumeState(v);
    if (gainRef.current) {
      gainRef.current.gain.value = v;
    }
  };

  const switchTrack = (track: AudioTrack) => {
    setCurrentTrack(track);
    if (isPlaying) {
      stopOscillators();
      if (track !== "silent") {
        startAudio(track);
      } else {
        setIsPlaying(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      stopOscillators();
      audioCtxRef.current?.close();
    };
  }, []);

  return (
    <AudioCtx.Provider value={{ isPlaying, volume, currentTrack, togglePlay, setVolume, switchTrack }}>
      {children}
    </AudioCtx.Provider>
  );
};

export const useAudio = () => {
  const ctx = useContext(AudioCtx);
  if (!ctx) throw new Error("useAudio must be used within AudioProvider");
  return ctx;
};
