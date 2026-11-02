const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const htmlFile = path.resolve(__dirname, 'modern_certificate.html').replace(/\\/g, '/');
const filledPdf = path.resolve(__dirname, 'আধুনিক_প্রত্যয়নপত্র_নমুনা.pdf');
const tempProfile1 = path.join(os.tmpdir(), 'edge_modern_pdf_' + Date.now());

console.log('Generating Modern Luxury PDF for:', htmlFile);
try {
  execSync(`"${edgePath}" --headless=new --user-data-dir="${tempProfile1}" --disable-gpu --no-sandbox --print-to-pdf="${filledPdf}" --no-pdf-header-footer "file:///${htmlFile}"`, { stdio: 'inherit' });
  console.log('Modern Filled PDF Generated! Size:', fs.statSync(filledPdf).size, 'bytes');
} catch (e) {
  console.error('Error generating Modern PDF:', e.message);
} finally {
  try { fs.rmSync(tempProfile1, { recursive: true, force: true }); } catch(_) {}
}
