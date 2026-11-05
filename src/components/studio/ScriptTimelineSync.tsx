"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Scissors, RefreshCw, Play, Volume2, Type } from "lucide-react";
import { audio } from "@/lib/audioManager";

interface ScriptLine {
  id: string;
  tag: string;
  text: string;
  durationSec: number;
  isCuttable: boolean;
  isKept: boolean;
}

const initialLines: ScriptLine[] = [
  {
    id: "line-1",
    tag: "HOOK",
    text: "Most agency videos are ignored within the first 2 seconds.",
    durationSec: 4,
    isCuttable: false,
    isKept: true,
  },
  {
    id: "line-2",
    tag: "PROBLEM",
    text: "Here is why standard generic editing kills your brand's reach.",
    durationSec: 6,
    isCuttable: true,
    isKept: true,
  },
  {
    id: "line-3",
    tag: "SOLUTION",
    text: "We architect AI-driven photorealistic cinema that captivates instantly.",
    durationSec: 5,
    isCuttable: false,
    isKept: true,
  },
  {
    id: "line-4",
    tag: "OFFER",
    text: "Claim your 48-hour delivery timeline before our monthly spots close.",
    durationSec: 3,
    isCuttable: true,
    isKept: true,
  },
];

const springConfig = { stiffness: 260, damping: 25 };

export default function ScriptTimelineSync() {
  const [lines, setLines] = useState<ScriptLine[]>(initialLines);

  const toggleLine = (id: string) => {
    audio.playClick();
    setLines((prev) =>
      prev.map((l) => (l.id === id ? { ...l, isKept: !l.isKept } : l))
    );
  };

  // Calculate total duration from kept lines
  const totalSeconds = lines.reduce(
    (acc, l) => (l.isKept ? acc + l.durationSec : acc),
    0
  );

  return (
    <div className="w-full p-6 md:p-8 rounded-2xl bg-[#0a0a0a] border border-white/10 shadow-2xl relative overflow-hidden">
      {/* Studio Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 mb-6 border-b border-white/[0.06] gap-3">
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-[#F00016] block mb-1">
            NON-DESTRUCTIVE TIMELINE SYNC
          </span>
          <h4 className="text-xl font-black text-white tracking-tight">
            Script-to-Timeline <span className="text-gradient">Dynamic Cut</span>
          </h4>
        </div>

        {/* Live Duration Counter */}
        <div className="flex items-center gap-3 px-3 py-1.5 rounded-lg bg-[#141414] border border-white/10 font-mono text-xs">
          <span className="text-[#888]">TIMELINE RUN:</span>
          <motion.span
            key={totalSeconds}
            initial={{ y: -5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-white font-bold text-sm text-[#FF334B]"
          >
            0:{totalSeconds < 10 ? `0${totalSeconds}` : totalSeconds}
          </motion.span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Column: Interactive Script Lines */}
        <div className="space-y-3">
          <div className="text-[11px] font-mono text-[#888] uppercase tracking-wider mb-2">
            Ad Script Prompts (Click cuttable lines to collapse clip)
          </div>

          {lines.map((line) => {
            return (
              <div
                key={line.id}
                className={`p-3.5 rounded-xl border transition-all ${
                  line.isKept
                    ? "bg-[#111] border-white/10"
                    : "bg-[#070707] border-white/5 opacity-50"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-black/60 text-[#aaa] border border-white/5">
                    {line.tag} // {line.durationSec}s
                  </span>

                  {line.isCuttable ? (
                    <button
                      onClick={() => toggleLine(line.id)}
                      onMouseEnter={() => audio.playHoverTick()}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-mono font-bold transition-all ${
                        line.isKept
                          ? "bg-[#F00016]/15 text-[#FF334B] hover:bg-[#F00016] hover:text-white"
                          : "bg-white/10 text-[#aaa] hover:bg-white/20 hover:text-white"
                      }`}
                    >
                      {line.isKept ? (
                        <>
                          <Scissors className="w-3 h-3" />
                          <span>Cut</span>
                        </>
                      ) : (
                        <>
                          <RefreshCw className="w-3 h-3" />
                          <span>Restore</span>
                        </>
                      )}
                    </button>
                  ) : (
                    <span className="text-[10px] font-mono text-[#555] uppercase">
                      Locked
                    </span>
                  )}
                </div>

                <p
                  className={`text-xs md:text-sm leading-relaxed transition-all ${
                    line.isKept ? "text-white" : "line-through text-[#666]"
                  }`}
                >
                  &ldquo;{line.text}&rdquo;
                </p>
              </div>
            );
          })}
        </div>

        {/* Right Column: 3-Track Mini Timeline */}
        <div className="p-5 rounded-xl bg-[#060606] border border-white/10 space-y-4 relative overflow-hidden">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#777] pb-2 border-b border-white/5">
            <span>3-TRACK NLE TIMELINE</span>
            <span>FRAME SYNC ACTIVE</span>
          </div>

          {/* Continuous Moving Vertical Playhead */}
          <div className="relative pt-2 pb-1">
            <motion.div
              animate={{ left: ["0%", "98%"] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "linear" }}
              className="absolute top-0 bottom-0 w-[2px] bg-[#F00016] shadow-[0_0_8px_rgba(240,0,22,0.9)] z-20 pointer-events-none"
            >
              <div className="w-2 h-2 rounded-full bg-[#F00016] -translate-x-[3px] -translate-y-1" />
            </motion.div>

            {/* TRACK V1: Video */}
            <div className="mb-3">
              <div className="flex items-center gap-2 text-[10px] font-mono text-[#888] mb-1.5">
                <Play className="w-3 h-3 text-[#FF334B]" />
                <span>V1 VIDEO</span>
              </div>
              <div className="h-9 rounded-lg bg-black/60 border border-white/5 p-1 flex items-center gap-1.5 overflow-hidden">
                <AnimatePresence>
                  {lines.map((line) => {
                    if (!line.isKept) return null;
                    return (
                      <motion.div
                        layout
                        key={line.id}
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        exit={{ opacity: 0, scaleX: 0 }}
                        transition={springConfig}
                        className="h-full rounded bg-gradient-to-r from-[#1c1c1c] to-[#252525] border border-white/10 px-2 flex items-center justify-between text-[9px] font-mono text-white flex-1 min-w-[50px] overflow-hidden"
                      >
                        <span className="truncate">{line.tag}</span>
                        <span className="text-[#888]">{line.durationSec}s</span>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>

            {/* TRACK T1: Titles */}
            <div className="mb-3">
              <div className="flex items-center gap-2 text-[10px] font-mono text-[#888] mb-1.5">
                <Type className="w-3 h-3 text-[#aaa]" />
                <span>T1 TITLES</span>
              </div>
              <div className="h-7 rounded-lg bg-black/60 border border-white/5 p-1 flex items-center gap-1.5 overflow-hidden">
                <div className="h-full rounded bg-[#141414] border border-white/10 px-2 flex items-center text-[9px] font-mono text-[#aaa] w-1/3">
                  HOOK_CARD
                </div>
                <div className="h-full rounded bg-[#141414] border border-white/10 px-2 flex items-center text-[9px] font-mono text-[#aaa] w-1/2">
                  CALL_TO_ACTION
                </div>
              </div>
            </div>

            {/* TRACK A1: Audio Waveform */}
            <div>
              <div className="flex items-center gap-2 text-[10px] font-mono text-[#888] mb-1.5">
                <Volume2 className="w-3 h-3 text-[#FF334B]" />
                <span>A1 AUDIO</span>
              </div>
              <div className="h-8 rounded-lg bg-black/60 border border-white/5 p-1 flex items-center gap-1.5 overflow-hidden">
                <AnimatePresence>
                  {lines.map((line) => {
                    if (!line.isKept) return null;
                    return (
                      <motion.div
                        layout
                        key={line.id}
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        exit={{ opacity: 0, scaleX: 0 }}
                        transition={springConfig}
                        className="h-full rounded bg-[#101010] border border-[#F00016]/30 px-1.5 flex items-center justify-center gap-0.5 flex-1 min-w-[45px] overflow-hidden"
                      >
                        {[8, 14, 6, 16, 12, 18, 9, 15, 7].map((h, i) => (
                          <span
                            key={i}
                            className="w-[2px] bg-[#F00016] rounded-full"
                            style={{ height: `${h}px` }}
                          />
                        ))}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

