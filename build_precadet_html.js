const fs = require('fs');

const assets = JSON.parse(fs.readFileSync('assets_base64.json', 'utf8'));

// build_precadet_html.js creates 'প্রত্যয়নপত্র_প্রি_ক্যাডেট_হোমস.html'
// Using the same upgraded engine from build_html.js with default school as Pre-cadet
const mainHtml = fs.readFileSync('index.html', 'utf8');
fs.writeFileSync('প্রত্যয়নপত্র_প্রি_ক্যাডেট_হোমস.html', mainHtml);
console.log('প্রত্যয়নপত্র_প্রি_ক্যাডেট_হোমস.html successfully updated with signature upload and bold/normal styles!');
