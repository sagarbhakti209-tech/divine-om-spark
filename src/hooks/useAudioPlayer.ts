import { useState, useRef, useCallback, useEffect } from "react";

export interface AudioPlayerState {
  isPlaying: boolean;
  currentSongIndex: number | null;
  progress: number;
  duration: number;
  currentTime: number;
  isLoading: boolean;
}

export function useAudioPlayer() {
  const [state, setState] = useState<AudioPlayerState>({
    isPlaying: false,
    currentSongIndex: null,
    progress: 0,
    duration: 0,
    currentTime: 0,
    isLoading: false,
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const getAudio = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.crossOrigin = "anonymous";
    }
    return audioRef.current;
  }, []);

  const stopProgressLoop = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
  }, []);

  const startProgressLoop = useCallback(() => {
    stopProgressLoop();
    const update = () => {
      const audio = audioRef.current;
      if (audio && !audio.paused) {
        const dur = audio.duration || 1;
        setState(s => ({
          ...s,
          progress: (audio.currentTime / dur) * 100,
          currentTime: audio.currentTime,
          duration: dur,
        }));
        animFrameRef.current = requestAnimationFrame(update);
      }
    };
    animFrameRef.current = requestAnimationFrame(update);
  }, [stopProgressLoop]);

  const playSong = useCallback((songIndex: number, audioUrl: string) => {
    const audio = getAudio();

    // If same song, just resume
    if (state.currentSongIndex === songIndex && audio.src.includes(encodeURI(audioUrl).slice(0, 30))) {
      audio.play().then(() => {
        setState(s => ({ ...s, isPlaying: true }));
        startProgressLoop();
      }).catch(console.error);
      return;
    }

    // New song
    stopProgressLoop();
    setState(s => ({ ...s, isLoading: true, currentSongIndex: songIndex, isPlaying: false, progress: 0, currentTime: 0 }));

    audio.src = audioUrl;
    audio.load();

    const onCanPlay = () => {
      audio.play().then(() => {
        setState(s => ({
          ...s,
          isPlaying: true,
          isLoading: false,
          duration: audio.duration || 0,
        }));
        startProgressLoop();
      }).catch(console.error);
      audio.removeEventListener("canplay", onCanPlay);
    };

    const onEnded = () => {
      stopProgressLoop();
      setState(s => ({ ...s, isPlaying: false, progress: 100 }));
    };

    const onError = () => {
      console.error("Audio load error for:", audioUrl);
      setState(s => ({ ...s, isLoading: false, isPlaying: false }));
    };

    audio.addEventListener("canplay", onCanPlay);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);
  }, [getAudio, state.currentSongIndex, startProgressLoop, stopProgressLoop]);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
    }
    stopProgressLoop();
    setState(s => ({ ...s, isPlaying: false }));
  }, [stopProgressLoop]);

  const togglePlayPause = useCallback((songIndex: number, audioUrl: string) => {
    if (state.currentSongIndex === songIndex && state.isPlaying) {
      pause();
    } else {
      playSong(songIndex, audioUrl);
    }
  }, [state.currentSongIndex, state.isPlaying, pause, playSong]);

  const seekTo = useCallback((percent: number) => {
    const audio = audioRef.current;
    if (audio && audio.duration) {
      audio.currentTime = (percent / 100) * audio.duration;
      setState(s => ({ ...s, progress: percent, currentTime: audio.currentTime }));
    }
  }, []);

  useEffect(() => {
    return () => {
      stopProgressLoop();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, [stopProgressLoop]);

  return { ...state, togglePlayPause, pause, playSong, seekTo };
}
