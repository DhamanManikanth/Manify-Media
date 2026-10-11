const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const PORT = 3335;
const videosDir = path.join(__dirname, '..', 'public', 'videos');
const imagesDir = path.join(__dirname, '..', 'public', 'images');

const videos = [
  { file: 'educational-1.mp4', thumb: 'thumb-educational-1.jpg', time: 1.5 },
  { file: 'educational-2.mp4', thumb: 'thumb-educational-2.jpg', time: 1.5 },
  { file: 'educational-3.mp4', thumb: 'thumb-educational-3.jpg', time: 1.5 },
  { file: 'jewelry-brand-ad.mp4', thumb: 'thumb-jewelry-brand-ad.jpg', time: 1.0 },
  { file: 'brand-reel-1.mp4', thumb: 'thumb-brand-reel-1.jpg', time: 1.0 },
  { file: 'ai-reel.mp4', thumb: 'thumb-ai-reel.jpg', time: 1.0 },
  { file: 'avatar-ai-reel.mp4', thumb: 'thumb-avatar-ai-reel.jpg', time: 0.5 },
  { file: '2d-animation-1.mp4', thumb: 'thumb-2d-animation-1.jpg', time: 1.0 },
  { file: '2d-animation-2.mp4', thumb: 'thumb-2d-animation-2.jpg', time: 1.0 },
  { file: 'reel-1.mp4', thumb: 'thumb-reel-1.jpg', time: 1.0 },
  { file: 'reel-2.mp4', thumb: 'thumb-reel-2.jpg', time: 1.0 }
];

let savedCount = 0;

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <!DOCTYPE html>
      <html>
      <body>
        <h1>Extracting Thumbnails</h1>
        <script>
          const videos = ${JSON.stringify(videos)};
          
          async function captureAll() {
            for (const vInfo of videos) {
              await new Promise((resolve) => {
                const video = document.createElement('video');
                video.src = '/video/' + encodeURIComponent(vInfo.file);
                video.crossOrigin = 'anonymous';
                video.muted = true;
                video.preload = 'auto';

                video.onloadeddata = () => {
                  video.currentTime = Math.min(vInfo.time, (video.duration || 2) / 2);
                };

                video.onseeked = async () => {
                  const canvas = document.createElement('canvas');
                  canvas.width = video.videoWidth || 1280;
                  canvas.height = video.videoHeight || 720;
                  const ctx = canvas.getContext('2d');
                  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                  const dataUrl = canvas.toDataURL('image/jpeg', 0.9);

                  await fetch('/save', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ thumb: vInfo.thumb, data: dataUrl })
                  });
                  resolve();
                };

                video.onerror = (e) => {
                  console.error('Error loading video', vInfo.file, e);
                  resolve();
                };
              });
            }
          }
          captureAll();
        </script>
      </body>
      </html>
    `);
  } else if (req.url.startsWith('/video/')) {
    const fileName = decodeURIComponent(req.url.replace('/video/', ''));
    const filePath = path.join(videosDir, fileName);
    if (fs.existsSync(filePath)) {
      res.writeHead(200, {
        'Content-Type': 'video/mp4',
        'Content-Length': fs.statSync(filePath).size,
        'Access-Control-Allow-Origin': '*'
      });
      fs.createReadStream(filePath).pipe(res);
    } else {
      res.writeHead(404);
      res.end();
    }
  } else if (req.url === '/save' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const { thumb, data } = JSON.parse(body);
        const base64Data = data.replace(/^data:image\/jpeg;base64,/, '');
        fs.writeFileSync(path.join(imagesDir, thumb), Buffer.from(base64Data, 'base64'));
        console.log('Saved thumbnail:', thumb);
        savedCount++;
        res.writeHead(200);
        res.end('OK');

        if (savedCount >= videos.length) {
          console.log('All thumbnails generated successfully!');
          setTimeout(() => {
            process.exit(0);
          }, 500);
        }
      } catch (e) {
        console.error('Error saving:', e);
        res.writeHead(500);
        res.end();
      }
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(PORT, () => {
  console.log('Thumbnail server running on port', PORT);
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const child = spawn(chromePath, [
    '--headless=new',
    '--disable-gpu',
    `http://localhost:${PORT}`
  ]);
  child.on('error', err => {
    console.error('Failed to spawn chrome:', err);
  });
});
