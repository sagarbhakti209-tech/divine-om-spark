import { useState, useRef, useCallback, useEffect } from "react";

// Indian raga note frequencies (Sa Re Ga Ma Pa Dha Ni)
const RAGA_SCALES: Record<string, number[]> = {
  bhairav: [240, 256, 288, 320, 360, 384, 432],    // Morning raga
  yaman:   [240, 270, 304, 340, 360, 405, 450],     // Evening raga
  darbari: [240, 270, 288, 320, 360, 384, 432],     // Night raga
  malkauns:[240, 288, 320, 360, 432],                // Midnight raga
  bhairavi:[240, 256, 288, 320, 360, 384, 426],     // Universal raga
  durga:   [240, 270, 320, 360, 405],                // Pentatonic raga
};

const RAGA_NAMES = Object.keys(RAGA_SCALES);

// Generate a melodic pattern for a song based on its index
function getMelodyForSong(songIndex: number): { raga: string; pattern: number[]; tempo: number } {
  const raga = RAGA_NAMES[songIndex % RAGA_NAMES.length];
  const scale = RAGA_SCALES[raga];
  const patternLength = 16;
  const pattern: number[] = [];
  
  // Seed-based pseudo-random for consistent melody per song
  let seed = songIndex * 7 + 13;
  const next = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
  
  for (let i = 0; i < patternLength; i++) {
    const noteIdx = Math.floor(next() * scale.length);
    const octaveShift = next() > 0.7 ? 2 : (next() > 0.5 ? 0.5 : 1);
    pattern.push(scale[noteIdx] * octaveShift);
  }
  
  const tempo = 280 + (songIndex % 5) * 40; // ms per note
  return { raga, pattern, tempo };
}

export interface AudioPlayerState {
  isPlaying: boolean;
  currentSongIndex: number | null;
  progress: number; // 0-100
  duration: number; // seconds (from song data)
}

export function useAudioPlayer() {
  const [state, setState] = useState<AudioPlayerState>({
    isPlaying: false,
    currentSongIndex: null,
    progress: 0,
    duration: 0,
  });

  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const schedulerRef = useRef<number | null>(null);
  const progressRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const totalDurationRef = useRef<number>(0);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);

  const getCtx = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
      gainRef.current = audioCtxRef.current.createGain();
      gainRef.current.gain.value = 0.25;
      gainRef.current.connect(audioCtxRef.current.destination);
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return { ctx: audioCtxRef.current, gain: gainRef.current! };
  }, []);

  const stopAll = useCallback(() => {
    if (schedulerRef.current) clearTimeout(schedulerRef.current);
    if (progressRef.current) cancelAnimationFrame(progressRef.current);
    schedulerRef.current = null;
    progressRef.current = null;
    oscillatorsRef.current.forEach(o => { try { o.stop(); } catch {} });
    oscillatorsRef.current = [];
  }, []);

  const playSong = useCallback((songIndex: number, durationStr: string) => {
    stopAll();
    const { ctx, gain } = getCtx();
    const { pattern, tempo } = getMelodyForSong(songIndex);

    // Parse duration string "12:45" -> seconds
    const parts = durationStr.split(":").map(Number);
    const totalSec = parts[0] * 60 + parts[1];
    totalDurationRef.current = totalSec;
    startTimeRef.current = Date.now();

    setState({ isPlaying: true, currentSongIndex: songIndex, progress: 0, duration: totalSec });

    // Add a background tanpura drone
    const drone = ctx.createOscillator();
    drone.type = "sine";
    drone.frequency.value = 120;
    const droneGain = ctx.createGain();
    droneGain.gain.value = 0.08;
    drone.connect(droneGain);
    droneGain.connect(gain);
    drone.start();
    oscillatorsRef.current.push(drone);

    // Schedule notes in a loop
    let noteIdx = 0;
    const playNote = () => {
      const freq = pattern[noteIdx % pattern.length];
      const osc = ctx.createOscillator();
      osc.type = noteIdx % 3 === 0 ? "sine" : "triangle";
      osc.frequency.value = freq;

      const noteGain = ctx.createGain();
      noteGain.gain.setValueAtTime(0, ctx.currentTime);
      noteGain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.05);
      noteGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + tempo / 1000 * 0.9);

      osc.connect(noteGain);
      noteGain.connect(gain);
      osc.start();
      osc.stop(ctx.currentTime + tempo / 1000);

      noteIdx++;
      schedulerRef.current = window.setTimeout(playNote, tempo);
    };

    playNote();

    // Progress updater
    const updateProgress = () => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      const pct = Math.min((elapsed / totalSec) * 100, 100);
      setState(s => ({ ...s, progress: pct }));
      if (pct < 100) {
        progressRef.current = requestAnimationFrame(updateProgress);
      } else {
        stopAll();
        setState(s => ({ ...s, isPlaying: false, progress: 100 }));
      }
    };
    progressRef.current = requestAnimationFrame(updateProgress);
  }, [getCtx, stopAll]);

  const pause = useCallback(() => {
    stopAll();
    setState(s => ({ ...s, isPlaying: false }));
  }, [stopAll]);

  const togglePlayPause = useCallback((songIndex: number, durationStr: string) => {
    if (state.currentSongIndex === songIndex && state.isPlaying) {
      pause();
    } else {
      playSong(songIndex, durationStr);
    }
  }, [state.currentSongIndex, state.isPlaying, pause, playSong]);

  useEffect(() => {
    return () => { stopAll(); audioCtxRef.current?.close(); };
  }, [stopAll]);

  return { ...state, togglePlayPause, pause, playSong };
}
