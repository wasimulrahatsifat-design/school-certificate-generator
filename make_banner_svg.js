const fs = require('fs');

function makeBanners() {
  const textBase64 = 'data:image/png;base64,' + fs.readFileSync('banner_text_4x.png').toString('base64');

  // 1. MAIN CERTIFICATE BANNER (Bigger & bolder with authentic non-unicode calligraphy)
  const mw = 460;
  const mh = 62;
  const mainSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${mw}" height="${mh}" viewBox="0 0 ${mw} ${mh}">
    <defs>
      <g id="floralFlourishMain">
        <path d="M 0 0 C 15 -12, 35 -15, 45 -5 C 38 2, 25 5, 0 0 Z" fill="#dc2626"/>
        <path d="M 5 -2 C 22 -18, 42 -22, 52 -10 C 42 -2, 28 3, 5 -2 Z" fill="#dc2626"/>
        <path d="M 0 4 C 18 14, 38 18, 48 8 C 38 0, 24 -1, 0 4 Z" fill="#dc2626"/>
        <path d="M 5 6 C 22 20, 42 24, 52 12 C 42 4, 28 2, 5 6 Z" fill="#dc2626"/>
        <circle cx="50" cy="0" r="4.5" fill="#dc2626"/>
      </g>
    </defs>

    <!-- Left Flourish -->
    <g transform="translate(62, 31) scale(0.95, 0.95)">
      <use href="#floralFlourishMain" transform="scale(-1, 1)"/>
    </g>

    <!-- Right Flourish -->
    <g transform="translate(398, 31) scale(0.95, 0.95)">
      <use href="#floralFlourishMain"/>
    </g>

    <!-- Center Yellow Capsule Pill -->
    <g transform="translate(80, 3)">
      <rect x="0" y="0" width="300" height="56" rx="28" ry="28" fill="#ffe600" stroke="#dc2626" stroke-width="2.8"/>
      <rect x="3.5" y="3.5" width="293" height="49" rx="24.5" ry="24.5" fill="none" stroke="#dc2626" stroke-width="1.2" opacity="0.85"/>
      <image href="${textBase64}" x="25" y="6" width="250" height="44" preserveAspectRatio="xMidYMid meet" />
    </g>
  </svg>`;

  fs.writeFileSync('clean_banner.svg', mainSvg);
  console.log('clean_banner.svg generated successfully with authentic calligraphy image!');

  // 2. STUB BANNER (Proportionately scaled to fit stub perfectly)
  const sw = 260;
  const sh = 36;
  const stubSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${sw}" height="${sh}" viewBox="0 0 ${sw} ${sh}">
    <defs>
      <g id="floralFlourishStub">
        <path d="M 0 0 C 15 -12, 35 -15, 45 -5 C 38 2, 25 5, 0 0 Z" fill="#dc2626"/>
        <path d="M 5 -2 C 22 -18, 42 -22, 52 -10 C 42 -2, 28 3, 5 -2 Z" fill="#dc2626"/>
        <path d="M 0 4 C 18 14, 38 18, 48 8 C 38 0, 24 -1, 0 4 Z" fill="#dc2626"/>
        <path d="M 5 6 C 22 20, 42 24, 52 12 C 42 4, 28 2, 5 6 Z" fill="#dc2626"/>
        <circle cx="50" cy="0" r="4.5" fill="#dc2626"/>
      </g>
    </defs>

    <!-- Left Flourish -->
    <g transform="translate(34, 18) scale(0.55, 0.55)">
      <use href="#floralFlourishStub" transform="scale(-1, 1)"/>
    </g>

    <!-- Right Flourish -->
    <g transform="translate(226, 18) scale(0.55, 0.55)">
      <use href="#floralFlourishStub"/>
    </g>

    <!-- Center Yellow Capsule Pill -->
    <g transform="translate(45, 2)">
      <rect x="0" y="0" width="170" height="32" rx="16" ry="16" fill="#ffe600" stroke="#dc2626" stroke-width="1.8"/>
      <rect x="2.5" y="2.5" width="165" height="27" rx="13.5" ry="13.5" fill="none" stroke="#dc2626" stroke-width="0.8" opacity="0.85"/>
      <image href="${textBase64}" x="14" y="3.5" width="142" height="25" preserveAspectRatio="xMidYMid meet" />
    </g>
  </svg>`;

  fs.writeFileSync('stub_banner.svg', stubSvg);
  console.log('stub_banner.svg generated successfully with authentic calligraphy image!');

  // Update assets_base64.json with both banners
  const assets = JSON.parse(fs.readFileSync('assets_base64.json', 'utf8'));
  assets.clean_banner = 'data:image/svg+xml;base64,' + Buffer.from(mainSvg).toString('base64');
  assets.stub_banner = 'data:image/svg+xml;base64,' + Buffer.from(stubSvg).toString('base64');
  fs.writeFileSync('assets_base64.json', JSON.stringify(assets, null, 2));
  console.log('assets_base64.json updated with both banners!');
}

makeBanners();
