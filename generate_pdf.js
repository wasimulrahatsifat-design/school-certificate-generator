const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const htmlFile = path.resolve(__dirname, 'index.html').replace(/\\/g, '/');
const outFile = path.resolve(__dirname, 'প্রত্যয়নপত্র_আবদুর_রহমান.pdf');

console.log('Generating PDF for:', htmlFile);
try {
  execSync(`"${edgePath}" --headless=new --disable-gpu --no-sandbox --print-to-pdf="${outFile}" --no-pdf-header-footer "file:///${htmlFile}"`, { stdio: 'inherit' });
  console.log('PDF Generated successfully! Size:', fs.statSync(outFile).size, 'bytes');
} catch (e) {
  console.error('Error generating PDF:', e.message);
}
