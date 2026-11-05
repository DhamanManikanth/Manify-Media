"use client";

import PromptToEditShowcase from "./PromptToEditShowcase";
import PipelineIngestTicker from "./PipelineIngestTicker";
import ScriptTimelineSync from "./ScriptTimelineSync";

export default function StudioSuite() {
  return (
    <div className="container mx-auto px-6 space-y-12 my-12">
      {/* 1. 4-Stage "Prompt-to-Edit" Morphing Preview Card */}
      <PromptToEditShowcase />

      {/* 2. Interactive Pipeline Ingest + Script-to-Timeline Sync Grid */}
      <div className="max-w-5xl mx-auto space-y-8">
        <PipelineIngestTicker />
        <ScriptTimelineSync />
      </div>
    </div>
  );
}

