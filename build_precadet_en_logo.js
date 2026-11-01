const fs = require('fs');

const basePng = 'data:image/png;base64,' + fs.readFileSync('clean_english_logo_base.png').toString('base64');
const realBlankBase64 = 'data:image/png;base64,' + fs.readFileSync('real_logo_pristine_blank.png').toString('base64');

// 1. PRE-CADET (Exact user-uploaded logo with ESTD: 2011)
const precadetSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
  <defs>
    <!-- Smooth curved arc under the shield matching original "Since : 2011" -->
    <path id="estdArc" d="M 320,725 A 250,250 0 0,0 700,725" fill="none"/>
  </defs>

  <!-- Real English Logo Base from User Image with transparent corners -->
  <image href="${basePng}" x="0" y="0" width="1024" height="1024"/>

  <!-- ESTD : 2011 (Replaced Since with ESTD as requested) -->
  <text font-family="'Arial Black', 'Arial', sans-serif" font-weight="900" font-size="44" fill="#000000" letter-spacing="1.5">
    <textPath href="#estdArc" startOffset="50%" text-anchor="middle">ESTD : 2011</textPath>
  </text>
</svg>`;

// 2. SHAWKAT BHUIYAN (Matching style with Title Case and ESTD: 2011)
const shawkatSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="673" height="681" viewBox="0 0 673 681">
  <defs>
    <path id="topArcS" d="M 80,332 A 270,270 0 0,1 593,332" fill="none"/>
    <path id="bottomArcS" d="M 100,358 A 268,268 0 0,0 573,358" fill="none"/>
    <path id="estArcS" d="M 235,475 A 135,135 0 0,0 438,475" fill="none"/>
  </defs>

  <image href="${realBlankBase64}" x="0" y="0" width="673" height="681"/>

  <text font-family="'Arial Black', 'Arial', sans-serif" font-weight="900" font-size="28" fill="#000000" letter-spacing="1">
    <textPath href="#topArcS" startOffset="50%" text-anchor="middle">Shawkat Bhuiyan Child Care Homes</textPath>
  </text>

  <text x="74" y="352" font-family="'Arial', sans-serif" font-size="38" font-weight="bold" fill="#000000" text-anchor="middle">★</text>
  <text x="599" y="352" font-family="'Arial', sans-serif" font-size="38" font-weight="bold" fill="#000000" text-anchor="middle">★</text>

  <text font-family="'Arial Black', 'Arial', sans-serif" font-weight="900" font-size="24" fill="#000000" letter-spacing="0.8">
    <textPath href="#bottomArcS" startOffset="50%" text-anchor="middle">Kongshonagar, Burichang, Cumilla</textPath>
  </text>

  <text font-family="'Arial Black', 'Arial', sans-serif" font-weight="900" font-size="22" fill="#000000" letter-spacing="1.5">
    <textPath href="#estArcS" startOffset="50%" text-anchor="middle">ESTD : 2011</textPath>
  </text>
</svg>`;

fs.writeFileSync('precadet_logo_en.svg', precadetSvg);
fs.writeFileSync('shawkat_logo_en.svg', shawkatSvg);

// Update assets_base64.json
const assets = JSON.parse(fs.readFileSync('assets_base64.json', 'utf8'));
assets.precadet_logo_en = 'data:image/svg+xml;base64,' + Buffer.from(precadetSvg).toString('base64');
assets.shawkat_logo_en = 'data:image/svg+xml;base64,' + Buffer.from(shawkatSvg).toString('base64');
fs.writeFileSync('assets_base64.json', JSON.stringify(assets, null, 2));

console.log('assets_base64.json updated with user-provided English logo (with ESTD)!');
