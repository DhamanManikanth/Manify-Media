"use client";

import { useEffect, useState, useCallback } from "react";
import { soundFx } from "@/lib/sound";

export function useSound() {
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    setIsMuted(soundFx.getMuted());
    const unsubscribe = soundFx.subscribe(() => setIsMuted(soundFx.getMuted()));
    return () => unsubscribe();
  }, []);

  const toggleSound = useCallback(() => {
    return soundFx.toggleMute();
  }, []);

  const setMuted = useCallback((muted: boolean) => {
    soundFx.setMuted(muted);
  }, []);

  const playPop = useCallback((baseFreq?: number, volume?: number) => {
    soundFx.playPop(baseFreq, volume);
  }, []);

  const playHover = useCallback((volume?: number) => {
    soundFx.playHover(volume);
  }, []);

  const playClick = useCallback((volume?: number) => {
    soundFx.playClick(volume);
  }, []);

  const playSwoosh = useCallback((volume?: number) => {
    soundFx.playSwoosh(volume);
  }, []);

  const playSuccess = useCallback(() => {
    soundFx.playSuccess();
  }, []);

  return {
    isMuted,
    toggleSound,
    setMuted,
    playPop,
    playHover,
    playClick,
    playSwoosh,
    playSuccess,
  };
}

