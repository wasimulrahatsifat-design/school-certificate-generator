const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');
const PNG = require('pngjs').PNG;

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const tempProfile = path.join(os.tmpdir(), 'edge_cinzel_' + Date.now());
const htmlFile = path.resolve(__dirname, 'cinzel_render.html');
const shotFile = path.resolve(__dirname, 'cinzel_render.png');

// HTML page loading Google Font Cinzel Bold
const html = `<!DOCTYPE html>
<html>
<head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;800;900&display=swap" rel="stylesheet">
  <style>
    body {
      margin: 0;
      padding: 0;
      background: #ffe600;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1000px;
      height: 200px;
      overflow: hidden;
    }
    .text {
      font-family: 'Cinzel', serif;
      font-size: 80px;
      font-weight: 800;
      letter-spacing: 12px;
      color: #000000;
      text-transform: uppercase;
      white-space: nowrap;
    }
  </style>
</head>
<body>
  <div class="text">CERTIFICATE</div>
</body>
</html>`;

fs.writeFileSync(htmlFile, html);

try {
  execSync(`"${edgePath}" --headless=new --user-data-dir="${tempProfile}" --disable-gpu --no-sandbox --screenshot="${shotFile}" --window-size=1000,200 "file:///${htmlFile.replace(/\\/g, '/')}"`);
  console.log('Cinzel screenshot taken! Size:', fs.statSync(shotFile).size);

  // Now extract the black text onto transparent background
  const data = fs.readFileSync(shotFile);
  const src = PNG.sync.read(data);

  // Find bounding box
  let minX = src.width, maxX = 0, minY = src.height, maxY = 0;
  for (let y = 0; y < src.height; y++) {
    for (let x = 0; x < src.width; x++) {
      const idx = (src.width * y + x) << 2;
      const r = src.data[idx];
      const g = src.data[idx + 1];
      const b = src.data[idx + 2];
      if (r < 100 && g < 100 && b < 100) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  const pad = 4;
  minX = Math.max(0, minX - pad);
  maxX = Math.min(src.width - 1, maxX + pad);
  minY = Math.max(0, minY - pad);
  maxY = Math.min(src.height - 1, maxY + pad);

  const outW = maxX - minX + 1;
  const outH = maxY - minY + 1;
  const dst = new PNG({ width: outW, height: outH });

  for (let y = 0; y < outH; y++) {
    for (let x = 0; x < outW; x++) {
      const srcIdx = (src.width * (minY + y) + (minX + x)) << 2;
      const dstIdx = (outW * y + x) << 2;

      const r = src.data[srcIdx];
      const g = src.data[srcIdx + 1];
      const b = src.data[srcIdx + 2];
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;

      let alpha = 0;
      if (lum < 210) {
        alpha = Math.min(255, Math.max(0, Math.round((210 - lum) / 200 * 255)));
      }

      dst.data[dstIdx] = 0;
      dst.data[dstIdx + 1] = 0;
      dst.data[dstIdx + 2] = 0;
      dst.data[dstIdx + 3] = alpha;
    }
  }

  const outBuf = PNG.sync.write(dst);
  fs.writeFileSync('certificate_text_en.png', outBuf);
  console.log('Saved certificate_text_en.png:', outW, 'x', outH);
} catch(e) {
  console.error(e.message);
} finally {
  try { fs.rmSync(tempProfile, { recursive: true, force: true }); } catch(_) {}
  try { fs.unlinkSync(htmlFile); } catch(_) {}
  try { fs.unlinkSync(shotFile); } catch(_) {}
  try { fs.unlinkSync('test_cinzel.js'); } catch(_) {}
  try { fs.unlinkSync('test_cinzel.svg'); } catch(_) {}
  try { fs.unlinkSync('render_cinzel.js'); } catch(_) {}
  try { fs.unlinkSync('test_cinzel_preview.png'); } catch(_) {}
}
