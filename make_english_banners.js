const fs = require('fs');

function makeEnglishBanners() {
  // 1. MAIN CERTIFICATE BANNER (CERTIFICATE)
  const mw = 460;
  const mh = 62;
  const mainSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${mw}" height="${mh}" viewBox="0 0 ${mw} ${mh}">
    <defs>
      <g id="floralFlourishMainEN">
        <path d="M 0 0 C 15 -12, 35 -15, 45 -5 C 38 2, 25 5, 0 0 Z" fill="#dc2626"/>
        <path d="M 5 -2 C 22 -18, 42 -22, 52 -10 C 42 -2, 28 3, 5 -2 Z" fill="#dc2626"/>
        <path d="M 0 4 C 18 14, 38 18, 48 8 C 38 0, 24 -1, 0 4 Z" fill="#dc2626"/>
        <path d="M 5 6 C 22 20, 42 24, 52 12 C 42 4, 28 2, 5 6 Z" fill="#dc2626"/>
        <circle cx="50" cy="0" r="4.5" fill="#dc2626"/>
      </g>
    </defs>

    <!-- Left Flourish -->
    <g transform="translate(62, 31) scale(0.95, 0.95)">
      <use href="#floralFlourishMainEN" transform="scale(-1, 1)"/>
    </g>

    <!-- Right Flourish -->
    <g transform="translate(398, 31) scale(0.95, 0.95)">
      <use href="#floralFlourishMainEN"/>
    </g>

    <!-- Center Yellow Capsule Pill -->
    <g transform="translate(75, 3)">
      <rect x="0" y="0" width="310" height="56" rx="28" ry="28" fill="#ffe600" stroke="#dc2626" stroke-width="2.8"/>
      <rect x="3.5" y="3.5" width="303" height="49" rx="24.5" ry="24.5" fill="none" stroke="#dc2626" stroke-width="1.2" opacity="0.85"/>
      <text x="155" y="39" font-family="'Cinzel', 'Times New Roman', 'Georgia', serif" font-size="31" font-weight="900" fill="#000000" text-anchor="middle" letter-spacing="3.5">CERTIFICATE</text>
    </g>
  </svg>`;

  fs.writeFileSync('clean_banner_en.svg', mainSvg);
  console.log('clean_banner_en.svg generated successfully with CERTIFICATE!');

  // 2. STUB BANNER (CERTIFICATE - scaled for stub)
  const sw = 260;
  const sh = 36;
  const stubSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${sw}" height="${sh}" viewBox="0 0 ${sw} ${sh}">
    <defs>
      <g id="floralFlourishStubEN">
        <path d="M 0 0 C 15 -12, 35 -15, 45 -5 C 38 2, 25 5, 0 0 Z" fill="#dc2626"/>
        <path d="M 5 -2 C 22 -18, 42 -22, 52 -10 C 42 -2, 28 3, 5 -2 Z" fill="#dc2626"/>
        <path d="M 0 4 C 18 14, 38 18, 48 8 C 38 0, 24 -1, 0 4 Z" fill="#dc2626"/>
        <path d="M 5 6 C 22 20, 42 24, 52 12 C 42 4, 28 2, 5 6 Z" fill="#dc2626"/>
        <circle cx="50" cy="0" r="4.5" fill="#dc2626"/>
      </g>
    </defs>

    <!-- Left Flourish -->
    <g transform="translate(32, 18) scale(0.55, 0.55)">
      <use href="#floralFlourishStubEN" transform="scale(-1, 1)"/>
    </g>

    <!-- Right Flourish -->
    <g transform="translate(228, 18) scale(0.55, 0.55)">
      <use href="#floralFlourishStubEN"/>
    </g>

    <!-- Center Yellow Capsule Pill -->
    <g transform="translate(42, 2)">
      <rect x="0" y="0" width="176" height="32" rx="16" ry="16" fill="#ffe600" stroke="#dc2626" stroke-width="1.8"/>
      <rect x="2.5" y="2.5" width="171" height="27" rx="13.5" ry="13.5" fill="none" stroke="#dc2626" stroke-width="0.8" opacity="0.85"/>
      <text x="88" y="22" font-family="'Cinzel', 'Times New Roman', 'Georgia', serif" font-size="18" font-weight="900" fill="#000000" text-anchor="middle" letter-spacing="1.8">CERTIFICATE</text>
    </g>
  </svg>`;

  fs.writeFileSync('stub_banner_en.svg', stubSvg);
  console.log('stub_banner_en.svg generated successfully with CERTIFICATE!');

  // Update assets_base64.json with English banners
  const assets = JSON.parse(fs.readFileSync('assets_base64.json', 'utf8'));
  assets.clean_banner_en = 'data:image/svg+xml;base64,' + Buffer.from(mainSvg).toString('base64');
  assets.stub_banner_en = 'data:image/svg+xml;base64,' + Buffer.from(stubSvg).toString('base64');
  fs.writeFileSync('assets_base64.json', JSON.stringify(assets, null, 2));
  console.log('assets_base64.json updated with CERTIFICATE banners!');
}

makeEnglishBanners();
