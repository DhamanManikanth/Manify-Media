// Unified Sound Bridge to AudioManager
// Sound is OFF by default, strictly respecting user controls and low volumes.

import { audio } from "./audioManager";

export const soundFx = {
  playPop: (_pitch?: number, _vol?: number) => {},
  playHover: (_vol?: number) => audio.playHoverTick(),
  playClick: (_vol?: number) => audio.playClick(),
  playWhoosh: (_vol?: number) => audio.playWhoosh(),
  playSmoothWhoosh: (_vol?: number) => audio.playWhoosh(),
  playSwoosh: (_vol?: number) => audio.playWhoosh(),
  playSoftHaptic: (_vol?: number) => audio.playHoverTick(),
  playSuccess: (_vol?: number) => audio.playClick(),
  playHapticTick: (_vol?: number) => audio.playHoverTick(),
  playCosmicWarp: () => {},
  getMuted: () => !audio.isSoundEnabled(),
  setMuted: (m: boolean) => {
    if (m === audio.isSoundEnabled()) audio.toggleSound();
  },
  toggleMute: () => !audio.toggleSound(),
  subscribe: (cb: (muted?: any) => void) => audio.subscribe(cb),
};
