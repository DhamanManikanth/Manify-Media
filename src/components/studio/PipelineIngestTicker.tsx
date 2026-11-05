"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, FileImage, Film, FileAudio, Loader2, Sparkles } from "lucide-react";
import { audio } from "@/lib/audioManager";

const ASSETS = [
  { name: "product_raw.png", type: "IMAGE", size: "4.2 MB", icon: FileImage },
  { name: "ai_motion_scene.mp4", type: "VIDEO", size: "38.6 MB", icon: Film },
  { name: "master_audio_mix.wav", type: "AUDIO", size: "12.1 MB", icon: FileAudio },
];

export default function PipelineIngestTicker() {
  const [checkedCount, setCheckedCount] = useState(0);
  const [renderProgress, setRenderProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    // Phase 1: Sequential checkmarks popping in (0.4s stagger)
    if (checkedCount < ASSETS.length) {
      timeout = setTimeout(() => {
        audio.playHoverTick();
        setCheckedCount((prev) => prev + 1);
      }, 650);
    }
    // Phase 2: All 3 checked -> Trigger progress bar 0% to 100%
    else if (checkedCount === ASSETS.length && renderProgress < 100) {
      const interval = setInterval(() => {
        setRenderProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsCompleted(true);
            audio.playClick();
            return 100;
          }
          return prev + 4;
        });
      }, 40);

      return () => clearInterval(interval);
    }
    // Phase 3: Completed -> 3s pause then loop cleanly
    else if (isCompleted) {
      timeout = setTimeout(() => {
        setCheckedCount(0);
        setRenderProgress(0);
        setIsCompleted(false);
      }, 3000);
    }

    return () => clearTimeout(timeout);
  }, [checkedCount, renderProgress, isCompleted]);

  return (
    <div className="w-full p-6 rounded-2xl bg-[#0a0a0a] border border-white/10 shadow-xl relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#F00016]" />
          <h4 className="text-sm font-bold font-mono text-white tracking-wider uppercase">
            Pipeline Ingest & Render
          </h4>
        </div>
        <div className="text-[10px] font-mono text-[#888]">
          STATUS // {renderProgress === 100 ? "EXPORT READY" : "PROCESSING"}
        </div>
      </div>

      {/* Assets Ingest List */}
      <div className="space-y-3 mb-6">
        {ASSETS.map((asset, index) => {
          const isChecked = index < checkedCount;
          const Icon = asset.icon;

          return (
            <div
              key={asset.name}
              className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                isChecked
                  ? "bg-[#111] border-white/10 text-white"
                  : "bg-[#070707] border-white/5 text-[#666]"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isChecked ? "text-[#FF334B]" : "text-[#555]"}`} />
                <div>
                  <span className="text-xs font-mono font-medium block">{asset.name}</span>
                  <span className="text-[10px] font-mono text-[#555]">{asset.size}</span>
                </div>
              </div>

              {/* Sequential checkmark with spring pop */}
              <AnimatePresence>
                {isChecked ? (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="flex items-center gap-1.5 text-xs font-mono text-[#F00016]"
                  >
                    <span>INGESTED</span>
                    <CheckCircle2 className="w-4 h-4 text-[#F00016]" />
                  </motion.div>
                ) : (
                  <div className="w-4 h-4 rounded-full border border-white/10" />
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Render Progress Bar & Live Percentage Counter */}
      <div className="pt-2">
        <div className="flex items-center justify-between text-xs font-mono mb-2">
          <span className="text-[#999] flex items-center gap-2">
            {checkedCount === 3 && renderProgress < 100 && (
              <Loader2 className="w-3.5 h-3.5 text-[#F00016] animate-spin" />
            )}
            <span>Rendering Final Ad</span>
          </span>
          <span className="text-white font-bold">{renderProgress}% Ready</span>
        </div>

        {/* Progress Track */}
        <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden p-[1px] border border-white/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[#F00016] via-[#FF334B] to-[#FF8595]"
            style={{ width: `${renderProgress}%` }}
            transition={{ ease: "linear" }}
          />
        </div>
      </div>
    </div>
  );
}

