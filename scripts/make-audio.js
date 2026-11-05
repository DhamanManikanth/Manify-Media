const fs = require("fs");
const path = require("path");

function createWav(filename, durationSec, freq, sampleRate = 44100) {
  const numSamples = Math.floor(sampleRate * durationSec);
  const buffer = Buffer.alloc(44 + numSamples * 2);

  buffer.write("RIFF", 0);
  buffer.writeUInt32LE(36 + numSamples * 2, 4);
  buffer.write("WAVE", 8);
  buffer.write("fmt ", 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(1, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(sampleRate * 2, 28);
  buffer.writeUInt16LE(2, 32);
  buffer.writeUInt16LE(16, 34);
  buffer.write("data", 36);
  buffer.writeUInt32LE(numSamples * 2, 40);

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const env = Math.sin((Math.PI * i) / numSamples);
    const sample = Math.sin(2 * Math.PI * freq * t) * env * 0.25 * 32767;
    buffer.writeInt16LE(Math.floor(sample), 44 + i * 2);
  }

  const outDir = path.join(__dirname, "..", "public", "assets", "audio");
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  const outPath = path.join(outDir, filename);
  fs.writeFileSync(outPath, buffer);
  console.log("Created: " + outPath);
}

createWav("ambient.mp3", 6.0, 110);
createWav("whoosh.mp3", 0.6, 220);
createWav("tick.mp3", 0.05, 1200);
createWav("click.mp3", 0.08, 440);

