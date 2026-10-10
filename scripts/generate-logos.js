process.env.npm_package_config_libvips = '';
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputPath = 'C:/Users/dhama/.gemini/antigravity-ide/brain/22be0073-ad98-4eaa-b388-82b99e3baf03/.user_uploaded/media_1791645784263.jpg';

async function generate() {
  const image = sharp(inputPath);
  const metadata = await image.metadata();
  const width = metadata.width;
  const height = metadata.height;

  const { data } = await image.raw().toBuffer({ resolveWithObject: true });

  // Function to create RGBA buffer with specified color for foreground
  // fgColor: [R, G, B] or function(x, y, alpha) => [R, G, B]
  function createMaskedRgba(minX, maxX, minY, maxY, fgColorFn) {
    const pad = 24;
    const startX = Math.max(0, minX - pad);
    const endX = Math.min(width - 1, maxX + pad);
    const startY = Math.max(0, minY - pad);
    const endY = Math.min(height - 1, maxY + pad);

    const outWidth = endX - startX + 1;
    const outHeight = endY - startY + 1;
    const outBuf = Buffer.alloc(outWidth * outHeight * 4);

    const THRESH_HIGH = 236; // background starts
    const THRESH_LOW = 40;   // solid foreground

    for (let y = startY; y <= endY; y++) {
      for (let x = startX; x <= endX; x++) {
        const inIdx = (y * width + x) * 3;
        const r = data[inIdx];
        const g = data[inIdx + 1];
        const b = data[inIdx + 2];
        const brightness = 0.299 * r + 0.587 * g + 0.114 * b;

        let alpha = 0;
        if (brightness < THRESH_LOW) {
          alpha = 255;
        } else if (brightness > THRESH_HIGH) {
          alpha = 0;
        } else {
          alpha = Math.round(255 * (1 - (brightness - THRESH_LOW) / (THRESH_HIGH - THRESH_LOW)));
        }

        const outX = x - startX;
        const outY = y - startY;
        const outIdx = (outY * outWidth + outX) * 4;

        if (alpha > 0) {
          const color = fgColorFn(x, y, alpha);
          outBuf[outIdx] = color[0];
          outBuf[outIdx + 1] = color[1];
          outBuf[outIdx + 2] = color[2];
          outBuf[outIdx + 3] = alpha;
        } else {
          outBuf[outIdx] = 0;
          outBuf[outIdx + 1] = 0;
          outBuf[outIdx + 2] = 0;
          outBuf[outIdx + 3] = 0;
        }
      }
    }

    return { buffer: outBuf, width: outWidth, height: outHeight };
  }

  // Emblem bounds: X 312 to 711, Y 324 to 585
  // Full logo bounds: X 189 to 840, Y 324 to 695

  const outDir = path.resolve('public/images');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  // 1. Emblem - Crisp White
  console.log('Generating emblem white...');
  const emblemWhite = createMaskedRgba(312, 711, 324, 585, () => [255, 255, 255]);
  await sharp(emblemWhite.buffer, { raw: { width: emblemWhite.width, height: emblemWhite.height, channels: 4 } })
    .png()
    .toFile(path.join(outDir, 'logo.png'));
  await sharp(emblemWhite.buffer, { raw: { width: emblemWhite.width, height: emblemWhite.height, channels: 4 } })
    .png()
    .toFile(path.join(outDir, 'logo-white.png'));

  // 2. Emblem - Vibrant Red (#F00016 = 240, 0, 22)
  console.log('Generating emblem red...');
  const emblemRed = createMaskedRgba(312, 711, 324, 585, () => [240, 0, 22]);
  await sharp(emblemRed.buffer, { raw: { width: emblemRed.width, height: emblemRed.height, channels: 4 } })
    .png()
    .toFile(path.join(outDir, 'logo-red.png'));

  // 3. Full Logo - White
  console.log('Generating full logo white...');
  const fullWhite = createMaskedRgba(189, 840, 324, 695, () => [255, 255, 255]);
  await sharp(fullWhite.buffer, { raw: { width: fullWhite.width, height: fullWhite.height, channels: 4 } })
    .png()
    .toFile(path.join(outDir, 'logo-full-white.png'));

  // 4. Full Logo - Red emblem with White text
  console.log('Generating full logo red emblem + white text...');
  const fullRedWhite = createMaskedRgba(189, 840, 324, 695, (x, y) => {
    // If within emblem Y range (<= 600), use red, else white
    if (y <= 600) {
      return [240, 0, 22]; // Red
    }
    return [255, 255, 255]; // White text
  });
  await sharp(fullRedWhite.buffer, { raw: { width: fullRedWhite.width, height: fullRedWhite.height, channels: 4 } })
    .png()
    .toFile(path.join(outDir, 'logo-full.png'));

  // 5. App Icon for Next.js tab favicon (512x512 with square padding and subtle luxury dark backdrop or transparent)
  console.log('Generating app icon...');
  const iconAppDir = path.resolve('src/app');
  // Generate square icon with red emblem on transparent or subtle dark background
  const squareSize = Math.max(emblemRed.width, emblemRed.height) + 60;
  const squareRed = await sharp(emblemRed.buffer, { raw: { width: emblemRed.width, height: emblemRed.height, channels: 4 } })
    .extend({
      top: Math.floor((squareSize - emblemRed.height) / 2),
      bottom: Math.ceil((squareSize - emblemRed.height) / 2),
      left: Math.floor((squareSize - emblemRed.width) / 2),
      right: Math.ceil((squareSize - emblemRed.width) / 2),
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .resize(512, 512)
    .png()
    .toBuffer();

  fs.writeFileSync(path.join(iconAppDir, 'icon.png'), squareRed);
  fs.writeFileSync(path.join('public', 'favicon.ico'), squareRed);

  console.log('All logo assets successfully generated!');
}

generate().catch(console.error);
