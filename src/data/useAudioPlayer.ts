// src/data/useAudioPlayer.ts

import { Howl } from 'howler';
import { useState, useEffect, useRef, useCallback } from 'react';

export const useAudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const soundRef = useRef<Howl | null>(null);

  const stop = useCallback(() => {
    if (soundRef.current) {
      soundRef.current.stop();
    }
  }, []);

  const play = useCallback(
    (src: string) => {
      // Stop any currently playing sound before starting a new one
      if (soundRef.current) {
        soundRef.current.stop();
      }

      const sound = new Howl({
        src: [src],
        html5: true, // Important for broad compatibility
        onplay: () => setIsPlaying(true),
        onpause: () => setIsPlaying(false),
        onstop: () => setIsPlaying(false),
        onend: () => setIsPlaying(false),
      });

      sound.play();
      soundRef.current = sound;
    },
    [] // No dependencies needed here
  );

  // Cleanup effect to stop audio when the component that uses this hook unmounts
  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  return { play, stop, isPlaying };
};