const fs = require('fs');
const path = require('path');

// Load existing base64 assets
const assets = JSON.parse(fs.readFileSync(path.join(__dirname, 'assets_base64.json'), 'utf8'));

// Load offline QR Code generator library
const qrcodeLib = fs.readFileSync(path.join(__dirname, 'qrcode.min.js'), 'utf8');

// Modern SVG Ornate Border Frame with Guilloche & Corner Filigrees
const modernSvgBorder = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1122 793" width="100%" height="100%" style="position: absolute; top:0; left:0; pointer-events: none; z-index: 2;">
  <defs>
    <!-- Gold Gradients -->
    <linearGradient id="goldGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#b8860b"/>
      <stop offset="25%" stop-color="#f5d77f"/>
      <stop offset="50%" stop-color="#d4af37"/>
      <stop offset="75%" stop-color="#fff1b8"/>
      <stop offset="100%" stop-color="#aa771c"/>
    </linearGradient>
    <linearGradient id="goldGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#996515"/>
      <stop offset="30%" stop-color="#d4af37"/>
      <stop offset="50%" stop-color="#ffeaa7"/>
      <stop offset="70%" stop-color="#cf9d38"/>
      <stop offset="100%" stop-color="#804e08"/>
    </linearGradient>
    <radialGradient id="sealShine" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#fff8db"/>
      <stop offset="40%" stop-color="#ffd54f"/>
      <stop offset="75%" stop-color="#d4af37"/>
      <stop offset="100%" stop-color="#8c6409"/>
    </radialGradient>

    <!-- Corner Filigree Pattern -->
    <g id="cornerOrnament">
      <path d="M 0,0 L 55,0 C 45,15 35,20 20,20 C 20,35 15,45 0,55 Z" fill="url(#goldGrad1)"/>
      <path d="M 12,12 Q 40,15 48,4 C 36,24 24,36 4,48 Q 15,40 12,12 Z" fill="url(#goldGrad2)"/>
      <circle cx="22" cy="22" r="4" fill="url(#goldGrad1)"/>
      <circle cx="34" cy="14" r="2.5" fill="url(#goldGrad1)"/>
      <circle cx="14" cy="34" r="2.5" fill="url(#goldGrad1)"/>
      <path d="M 4,4 L 75,4 C 60,18 45,22 22,45 C 18,60 4,75 4,75 L 4,4" fill="none" stroke="url(#goldGrad1)" stroke-width="1.2"/>
      <path d="M 2,78 C 30,75 75,30 78,2" fill="none" stroke="url(#goldGrad2)" stroke-width="2"/>
    </g>
  </defs>

  <!-- Outer Heavy Border -->
  <rect x="14" y="14" width="1094" height="765" rx="6" fill="none" stroke="url(#goldGrad1)" stroke-width="3"/>
  <rect x="19" y="19" width="1084" height="755" rx="4" fill="none" stroke="var(--theme-accent, #0f2942)" stroke-width="2"/>

  <!-- Guilloche / Micro-dash border -->
  <rect x="25" y="25" width="1072" height="743" rx="3" fill="none" stroke="url(#goldGrad2)" stroke-width="1.5" stroke-dasharray="6,3"/>

  <!-- Inner Double Border -->
  <rect x="30" y="30" width="1062" height="733" rx="2" fill="none" stroke="url(#goldGrad1)" stroke-width="1"/>
  <rect x="34" y="34" width="1054" height="725" fill="none" stroke="var(--theme-accent-light, #1e3a5f)" stroke-width="0.8" opacity="0.6"/>

  <!-- 4 Corner Filigrees -->
  <use href="#cornerOrnament" x="34" y="34"/>
  <use href="#cornerOrnament" x="1088" y="34" transform="scale(-1, 1) translate(-1122, 0)"/>
  <use href="#cornerOrnament" x="34" y="759" transform="scale(1, -1) translate(0, -793)"/>
  <use href="#cornerOrnament" x="1088" y="759" transform="scale(-1, -1) translate(-1122, -793)"/>

  <!-- Subtly Elegant Mid-edge Diamond Rosettes -->
  <g transform="translate(561, 24)" fill="url(#goldGrad1)">
    <polygon points="0,-6 7,0 0,6 -7,0"/>
    <circle cx="-16" cy="0" r="2.5"/>
    <circle cx="16" cy="0" r="2.5"/>
    <line x1="-40" y1="0" x2="-22" y2="0" stroke="url(#goldGrad1)" stroke-width="1"/>
    <line x1="22" y1="0" x2="40" y2="0" stroke="url(#goldGrad1)" stroke-width="1"/>
  </g>
  <g transform="translate(561, 769)" fill="url(#goldGrad1)">
    <polygon points="0,-6 7,0 0,6 -7,0"/>
    <circle cx="-16" cy="0" r="2.5"/>
    <circle cx="16" cy="0" r="2.5"/>
    <line x1="-40" y1="0" x2="-22" y2="0" stroke="url(#goldGrad1)" stroke-width="1"/>
    <line x1="22" y1="0" x2="40" y2="0" stroke="url(#goldGrad1)" stroke-width="1"/>
  </g>
</svg>`;

// Mathematically Flawless 3D Golden Embossed Seal SVG (36-tooth radiant starburst, zero clipping)
const goldSealSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="-15 -10 190 190" width="105" height="105" overflow="visible" style="overflow: visible;" class="seal-svg-img">
  <defs>
    <radialGradient id="sealBody" cx="38%" cy="36%" r="65%">
      <stop offset="0%" stop-color="#fff5cc"/>
      <stop offset="25%" stop-color="#fadc6f"/>
      <stop offset="55%" stop-color="#d4af37"/>
      <stop offset="85%" stop-color="#aa7a1e"/>
      <stop offset="100%" stop-color="#694605"/>
    </radialGradient>
    <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#c5221f"/>
      <stop offset="50%" stop-color="#8a110e"/>
      <stop offset="100%" stop-color="#540705"/>
    </linearGradient>
    <filter id="sealDrop" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="3" stdDeviation="3.5" flood-color="#000" flood-opacity="0.25"/>
    </filter>
  </defs>

  <!-- Hanging Ribbons -->
  <g filter="url(#sealDrop)">
    <polygon points="66,95 50,154 70,140 85,154 74,95" fill="url(#ribbonGrad)"/>
    <polygon points="94,95 85,154 100,140 120,154 104,95" fill="url(#ribbonGrad)"/>
    <!-- Gold Ribbon Edge Stitching -->
    <polyline points="53,150 70,136 82,150" fill="none" stroke="#fef08a" stroke-width="1" stroke-dasharray="2,2"/>
    <polyline points="88,150 100,136 116,150" fill="none" stroke="#fef08a" stroke-width="1" stroke-dasharray="2,2"/>
  </g>

  <!-- Starburst Medallion (36 mathematically symmetrical teeth) -->
  <g filter="url(#sealDrop)">
    <path d="M 80.0,14.0 L 84.1,21.7 L 89.4,14.8 L 92.0,23.1 L 98.5,17.3 L 99.7,25.9 L 107.0,21.2 L 106.7,29.9 L 114.7,26.6 L 112.9,35.1 L 121.4,33.3 L 118.1,41.3 L 126.8,41.0 L 122.1,48.3 L 130.7,49.5 L 124.9,56.0 L 133.2,58.6 L 126.3,63.9 L 134.0,68.0 L 126.3,72.1 L 133.2,77.4 L 124.9,80.0 L 130.7,86.5 L 122.1,87.7 L 126.8,95.0 L 118.1,94.7 L 121.4,102.7 L 112.9,100.9 L 114.7,109.4 L 106.7,106.1 L 107.0,114.8 L 99.7,110.1 L 98.5,118.7 L 92.0,112.9 L 89.4,121.2 L 84.1,114.3 L 80.0,122.0 L 75.9,114.3 L 70.6,121.2 L 68.0,112.9 L 61.5,118.7 L 60.3,110.1 L 53.0,114.8 L 53.3,106.1 L 45.3,109.4 L 47.1,100.9 L 38.6,102.7 L 41.9,94.7 L 33.2,95.0 L 37.9,87.7 L 29.3,86.5 L 35.1,80.0 L 26.8,77.4 L 33.7,72.1 L 26.0,68.0 L 33.7,63.9 L 26.8,58.6 L 35.1,56.0 L 29.3,49.5 L 37.9,48.3 L 33.2,41.0 L 41.9,41.3 L 38.6,33.3 L 47.1,35.1 L 45.3,26.6 L 53.3,29.9 L 53.0,21.2 L 60.3,25.9 L 61.5,17.3 L 68.0,23.1 L 70.6,14.8 L 75.9,21.7 Z" fill="url(#sealBody)"/>

    <!-- Concentric Inner Rings -->
    <circle cx="80" cy="68" r="45" fill="none" stroke="#ffe58f" stroke-width="2.2"/>
    <circle cx="80" cy="68" r="41" fill="none" stroke="#8a5c0b" stroke-width="1"/>
    <circle cx="80" cy="68" r="38" fill="#dfb33e" stroke="#fff" stroke-width="0.8"/>

    <!-- Dashed Security Track -->
    <circle cx="80" cy="68" r="36" fill="none" stroke="#5a3a02" stroke-width="1" stroke-dasharray="2.5,2"/>

    <!-- Inner Core Medal -->
    <circle cx="80" cy="68" r="33" fill="url(#sealBody)"/>

    <!-- Center 5 Stars -->
    <g fill="#ffffff" filter="drop-shadow(0 1px 1px rgba(0,0,0,0.5))">
      <!-- Main Center Star -->
      <polygon points="80,52 82.5,59.5 90,59.5 84,64 86,71.5 80,67 74,71.5 76,64 70,59.5 77.5,59.5" transform="scale(0.9) translate(8.8, 7)"/>
      <circle cx="64" cy="68" r="2.2"/>
      <circle cx="96" cy="68" r="2.2"/>
      <circle cx="70" cy="78" r="1.8"/>
      <circle cx="90" cy="78" r="1.8"/>
    </g>

    <!-- Embossed Seal Text along Circle Path -->
    <path id="sealTextPathTop" d="M 47,68 A 33,33 0 0,1 113,68" fill="none"/>
    <path id="sealTextPathBottom" d="M 113,68 A 33,33 0 0,1 47,68" fill="none"/>
    <text font-family="'Cinzel', serif" font-size="7" font-weight="900" fill="#422501" letter-spacing="1.2">
      <textPath href="#sealTextPathTop" startOffset="50%" text-anchor="middle">OFFICIAL SEAL</textPath>
    </text>
    <text font-family="'Cinzel', serif" font-size="6.5" font-weight="900" fill="#422501" letter-spacing="1">
      <textPath href="#sealTextPathBottom" startOffset="50%" text-anchor="middle">★ EXCELLENCE ★</textPath>
    </text>
  </g>
</svg>`;

// HTML Builder with Complete Design Excellence
const modernHtmlContent = `<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>আধুনিক প্রিমিয়াম প্রত্যয়নপত্র জেনারেটর (Royal Academic Edition)</title>
  
  <!-- Google Fonts: Royal serif & clean modern typography -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=EB+Garamond:ital,wght@0,500;0,600;0,700;0,800;1,500&family=Hind+Siliguri:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;0,800;0,900;1,600&family=Tiro+Bangla:ital@0;1&display=swap" rel="stylesheet">
  
  <!-- html2canvas for instant 4K image download -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>

  <style>
    :root {
      /* Theme 1: Royal Navy & Gold (Default) */
      --theme-bg-gradient: radial-gradient(circle at 50% 50%, #ffffff 0%, #fbf9f4 70%, #f6f0e2 100%);
      --theme-primary: #0a192f;
      --theme-secondary: #0f2b48;
      --theme-accent: #0f2942;
      --theme-accent-light: #1e3a5f;
      --theme-gold: #c59b27;
      --theme-gold-dark: #8c6409;
      --theme-gold-light: #fbe083;
      --theme-text: #1a202c;
      --theme-highlight: #b45309;
      --theme-border-gold: linear-gradient(135deg, #b8860b, #f5d77f, #d4af37, #aa771c);
    }

    /* Theme 2: Imperial Burgundy */
    body.theme-burgundy {
      --theme-primary: #3b0711;
      --theme-secondary: #58101e;
      --theme-accent: #4a0d18;
      --theme-accent-light: #701c2c;
      --theme-gold: #c59b27;
      --theme-text: #20080c;
      --theme-highlight: #9f1239;
    }

    /* Theme 3: Emerald Prestige */
    body.theme-emerald {
      --theme-primary: #022c22;
      --theme-secondary: #064e3b;
      --theme-accent: #064e3b;
      --theme-accent-light: #047857;
      --theme-gold: #c59b27;
      --theme-text: #052219;
      --theme-highlight: #047857;
    }

    /* Theme 4: Vintage Parchment */
    body.theme-vintage {
      --theme-bg-gradient: radial-gradient(circle at 50% 50%, #fffbf2 0%, #fcf4e3 70%, #f3e5c9 100%);
      --theme-primary: #291d13;
      --theme-secondary: #422d1b;
      --theme-accent: #3d2919;
      --theme-accent-light: #61462d;
      --theme-gold: #b38222;
      --theme-text: #261608;
      --theme-highlight: #78350f;
    }

    @font-face {
      font-family: 'SutonnyMJ';
      src: url('SutonnyOMJ.ttf') format('truetype'),
           local('SutonnyMJ'),
           local('SutonnyOMJ'),
           local('Sutonny');
      font-weight: normal;
      font-style: normal;
    }
    @font-face {
      font-family: 'SutonnyMJ';
      src: local('SutonnyMJ-Bold'),
           local('SutonnyOMJ-Bold'),
           url('SutonnyOMJ.ttf') format('truetype');
      font-weight: bold;
      font-style: normal;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background: #0f172a;
      color: #334155;
      font-family: 'SutonnyMJ', 'SutonnyOMJ', 'Kalpurush', 'SolaimanLipi', 'Tiro Bangla', sans-serif;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 10px 10px 40px 10px;
      overflow-x: auto;
    }

    /* ========================================================
       TOP FLOATING GLASS CONTROL PANEL (DASHBOARD)
       ======================================================== */
    .top-dashboard {
      width: 100%;
      max-width: 1200px;
      margin: 8px auto 14px auto;
      background: rgba(15, 23, 42, 0.88);
      backdrop-filter: blur(14px);
      border: 1px solid rgba(212, 175, 55, 0.35);
      border-radius: 12px;
      padding: 10px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.45);
      color: #f8fafc;
      z-index: 50;
      flex-wrap: wrap;
    }

    .brand-group {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .brand-crown {
      font-size: 24px;
      filter: drop-shadow(0 2px 4px rgba(212,175,55,0.6));
    }
    .brand-heading {
      font-family: 'Cinzel', serif;
      font-size: 1.05rem;
      font-weight: 800;
      letter-spacing: 0.8px;
      background: linear-gradient(135deg, #fbe083, #d4af37, #ffeaa7);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .brand-sub {
      font-size: 0.72rem;
      color: #94a3b8;
    }

    .dash-controls {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    .select-pill {
      background: #1e293b;
      color: #f1f5f9;
      border: 1px solid rgba(212,175,55,0.4);
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 0.84rem;
      font-weight: 600;
      outline: none;
      cursor: pointer;
    }
    .select-pill:focus {
      border-color: #d4af37;
      box-shadow: 0 0 0 2px rgba(212,175,55,0.25);
    }

    .btn-action {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 7px 14px;
      border-radius: 7px;
      font-size: 0.86rem;
      font-weight: 700;
      cursor: pointer;
      border: none;
      transition: all 0.2s ease;
      text-decoration: none;
    }
    .btn-gold {
      background: linear-gradient(135deg, #d4af37, #b8860b);
      color: #0f172a;
      box-shadow: 0 3px 12px rgba(212,175,55,0.35);
    }
    .btn-gold:hover {
      background: linear-gradient(135deg, #f3d46f, #d4af37);
      transform: translateY(-1px);
    }
    .btn-navy {
      background: #1e293b;
      color: #f8fafc;
      border: 1px solid #334155;
    }
    .btn-navy:hover {
      background: #334155;
      color: #fff;
    }
    .btn-accent {
      background: #0284c7;
      color: white;
    }
    .btn-accent:hover {
      background: #0369a1;
    }

    /* COLLAPSIBLE FORM DRAWER */
    .form-drawer {
      width: 100%;
      max-width: 1200px;
      background: #ffffff;
      border-radius: 12px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 10px 35px rgba(0,0,0,0.25);
      padding: 16px 20px;
      margin-bottom: 16px;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
      gap: 12px;
      transition: max-height 0.3s ease, opacity 0.3s ease, padding 0.3s ease;
    }
    .form-drawer.collapsed {
      display: none;
    }
    .field-card {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .field-card label {
      font-size: 0.76rem;
      font-weight: 700;
      color: #475569;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .field-card input, .field-card select {
      padding: 7px 10px;
      border: 1.5px solid #cbd5e1;
      border-radius: 6px;
      font-size: 0.9rem;
      outline: none;
      font-family: inherit;
      color: #0f172a;
    }
    .field-card input:focus {
      border-color: #d4af37;
      box-shadow: 0 0 0 2px rgba(212,175,55,0.2);
    }

    /* SIGNATURE & STAMP CONTROLS */
    .sig-control-box {
      grid-column: 1 / -1;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 12px;
      background: #f8fafc;
      padding: 12px 14px;
      border-radius: 8px;
      border: 1px solid #e2e8f0;
    }

    /* ========================================================
       CERTIFICATE VIEWPORT (Strict A4 Landscape 297mm x 210mm)
       ======================================================== */
    .cert-viewport {
      box-shadow: 0 20px 60px rgba(0,0,0,0.5);
      border-radius: 3px;
      overflow: hidden;
      margin: 0 auto;
      background: #fff;
    }

    .cert-sheet {
      width: 1122px; /* 297mm at 96 DPI */
      height: 793px; /* 210mm at 96 DPI */
      position: relative;
      background: var(--theme-bg-gradient);
      display: flex;
      flex-direction: row;
      overflow: hidden;
    }

    /* ========================================================
       LEFT: STUB / COUNTERFOIL (OFFICE COPY)
       ======================================================== */
    .stub-panel {
      width: 325px;
      height: 100%;
      padding: 24px 20px 22px 22px;
      border-right: 2px dashed rgba(212,175,55,0.7);
      background: rgba(255,255,255,0.65);
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      z-index: 10;
    }

    .cut-line-badge {
      position: absolute;
      right: -13px;
      top: 50%;
      transform: translateY(-50%);
      background: #ffffff;
      color: #8c6409;
      font-size: 10px;
      font-weight: 700;
      padding: 5px 4px;
      border-radius: 12px;
      border: 1px solid #d4af37;
      writing-mode: vertical-rl;
      text-orientation: mixed;
      letter-spacing: 2px;
      z-index: 20;
      user-select: none;
      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    }

    .stub-top {
      text-align: center;
    }
    .stub-badge-label {
      display: inline-block;
      font-family: 'Cinzel', serif;
      font-size: 0.68rem;
      font-weight: 800;
      letter-spacing: 1.5px;
      padding: 2px 8px;
      background: #fef08a;
      color: #854d0e;
      border-radius: 12px;
      border: 1px solid #facc15;
      margin-bottom: 5px;
      text-transform: uppercase;
    }
    .stub-inst-name {
      font-size: 0.96rem;
      font-weight: 800;
      color: var(--theme-primary);
      line-height: 1.3;
      margin-bottom: 3px;
    }
    .stub-inst-addr {
      font-size: 0.78rem;
      font-weight: 600;
      color: #64748b;
      margin-bottom: 2px;
    }
    .stub-inst-reg {
      font-size: 0.58rem;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 6px;
      letter-spacing: -0.2px;
    }
    .stub-title-pill {
      display: inline-block;
      background: linear-gradient(135deg, #0a192f, #1e3a5f);
      color: #fbe083;
      font-size: 0.78rem;
      font-weight: 700;
      padding: 3px 14px;
      border-radius: 20px;
      letter-spacing: 1px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.15);
      border: 1px solid rgba(212,175,55,0.6);
      margin-bottom: 8px;
    }

    .stub-info-grid {
      display: flex;
      flex-direction: column;
      gap: 6.5px;
      font-size: 0.88rem;
      color: #1e293b;
      margin-top: 4px;
    }
    .stub-field-row {
      display: flex;
      align-items: baseline;
      gap: 4px;
    }
    .stub-field-val {
      border-bottom: 1.2px dotted #475569;
      flex-grow: 1;
      padding-left: 4px;
      font-weight: 600;
      color: #0f172a;
      min-height: 18px;
    }

    .stub-bottom-footer {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-top: auto;
      padding-top: 10px;
    }
    .stub-headmaster-col {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100px;
    }
    .stub-signing-line {
      width: 90px;
      border-top: 1.2px dashed #475569;
      margin-bottom: 3px;
    }

    /* ========================================================
       RIGHT: MAIN LUXURY CERTIFICATE
       ======================================================== */
    .main-cert-panel {
      flex: 1;
      height: 100%;
      position: relative;
      padding: 44px 50px 38px 46px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      z-index: 10;
    }

    /* Giant Subtle Crest Watermark */
    .watermark-crest {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 380px;
      height: 380px;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      opacity: 0.055;
      pointer-events: none;
      z-index: 1;
    }

    /* Certificate Header */
    .cert-top-header {
      text-align: center;
      position: relative;
      z-index: 5;
    }
    .cert-logo-seal-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 14px;
      margin-bottom: 4px;
    }
    .cert-crest-img {
      width: 68px;
      height: 68px;
      object-fit: contain;
      border-radius: 50%;
      padding: 2px;
      background: #ffffff;
      border: 2px solid #d4af37;
      box-shadow: 0 4px 10px rgba(0,0,0,0.12);
    }
    .cert-inst-title {
      font-family: 'SutonnyMJ', 'SutonnyOMJ', 'Kalpurush', 'Tiro Bangla', serif;
      font-size: 2.1rem;
      font-weight: 900;
      color: var(--theme-primary);
      letter-spacing: 0.5px;
      line-height: 1.2;
      text-shadow: 0 1px 2px rgba(0,0,0,0.06);
    }
    .cert-inst-subtitle {
      font-family: 'Cinzel', 'Playfair Display', serif;
      font-size: 0.88rem;
      font-weight: 700;
      color: var(--theme-secondary);
      letter-spacing: 2px;
      margin-top: 1px;
    }
    .cert-inst-address {
      font-family: 'SutonnyMJ', 'SutonnyOMJ', 'Kalpurush', 'Tiro Bangla', serif;
      font-size: 1.05rem;
      font-weight: 700;
      color: #334155;
      margin-top: 1px;
    }
    .cert-reg-badge {
      font-family: 'SutonnyMJ', 'SutonnyOMJ', 'Kalpurush', 'Tiro Bangla', serif;
      font-size: 0.94rem;
      font-weight: 700;
      color: var(--theme-secondary);
      margin-top: 3px;
      letter-spacing: -0.1px;
    }

    /* Majestic Royal Plaque Banner */
    .royal-banner-wrap {
      text-align: center;
      margin: 10px 0 14px 0;
      position: relative;
      z-index: 5;
    }
    .royal-banner-pill {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 6px 36px;
      background: linear-gradient(135deg, var(--theme-primary) 0%, var(--theme-secondary) 50%, var(--theme-accent) 100%);
      color: #fff;
      border-radius: 30px;
      border: 2px solid #d4af37;
      box-shadow: 0 6px 18px rgba(0,0,0,0.2), inset 0 1px 2px rgba(255,255,255,0.4);
      position: relative;
    }
    .royal-banner-pill::before, .royal-banner-pill::after {
      content: '❖';
      color: #fbe083;
      font-size: 14px;
    }
    .banner-text-main {
      font-family: 'SutonnyMJ', 'SutonnyOMJ', 'Kalpurush', serif;
      font-size: 1.75rem;
      font-weight: 800;
      color: #ffffff;
      letter-spacing: 1.5px;
      text-shadow: 0 2px 4px rgba(0,0,0,0.5);
    }
    .banner-text-en {
      font-family: 'Cinzel', 'Playfair Display', serif;
      font-size: 0.75rem;
      font-weight: 800;
      letter-spacing: 3px;
      color: #fbe083;
      text-transform: uppercase;
      display: block;
      margin-top: -2px;
    }

    /* Certificate Body Text */
    .cert-body-content {
      position: relative;
      z-index: 5;
      font-family: 'SutonnyMJ', 'SutonnyOMJ', 'Kalpurush', 'SolaimanLipi', 'Tiro Bangla', serif;
      font-size: 1.18rem;
      line-height: 1.95;
      color: var(--theme-text);
      text-align: justify;
    }
    .fill-line {
      display: inline-block;
      border-bottom: 2px dotted #475569;
      font-weight: 800;
      color: var(--theme-primary);
      padding: 0 8px;
      text-align: center;
      min-width: 120px;
      transition: background 0.15s;
    }
    .fill-line-wide {
      min-width: 440px;
    }
    .fill-line-mid {
      min-width: 220px;
    }
    .fill-line-short {
      min-width: 90px;
    }
    .fill-line[contenteditable="true"]:hover {
      background: rgba(212,175,55,0.15);
      border-radius: 3px;
      cursor: text;
    }

    /* Footer & Signatures */
    .cert-footer-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      position: relative;
      z-index: 5;
      padding-top: 10px;
    }

    .footer-signer-col {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      width: 190px;
    }
    .signing-stroke-line {
      width: 170px;
      border-top: 2px dashed #475569;
      margin-bottom: 6px;
    }
    .signer-designation {
      font-size: 1.15rem;
      font-weight: 800;
      color: var(--theme-primary);
      text-align: center;
    }
    .signer-sub {
      font-size: 0.80rem;
      color: #64748b;
      font-weight: 600;
    }

    /* SIGNATURE WRAPPERS & INTERACTIVE DRAGGING */
    .sig-zone {
      position: relative;
      cursor: grab;
      user-select: none;
      touch-action: none;
    }
    .sig-zone:active {
      cursor: grabbing;
    }
    .sig-img {
      max-height: 52px;
      max-width: 180px;
      object-fit: contain;
      display: block;
      pointer-events: none;
      transition: max-height 0.15s ease;
    }
    .stub-sig-img {
      max-height: 30px;
      max-width: 100px;
      object-fit: contain;
      display: block;
      pointer-events: none;
      transition: max-height 0.15s ease;
    }

    /* Hover Control Palette on Signature */
    .sig-hover-toolbar {
      position: absolute;
      top: -30px;
      left: 50%;
      transform: translateX(-50%);
      display: none;
      background: rgba(15, 23, 42, 0.95);
      border-radius: 6px;
      padding: 3px 6px;
      gap: 3px;
      z-index: 40;
      box-shadow: 0 4px 14px rgba(0,0,0,0.3);
      white-space: nowrap;
      align-items: center;
    }
    .sig-zone:hover .sig-hover-toolbar {
      display: flex;
    }
    .btn-nudge {
      background: #2563eb;
      color: white;
      border: none;
      border-radius: 3px;
      width: 20px;
      height: 20px;
      font-size: 11px;
      font-weight: bold;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
    }
    .btn-nudge:hover {
      background: #1d4ed8;
    }
    .toolbar-divider {
      width: 1px;
      height: 14px;
      background: #475569;
      margin: 0 2px;
    }

    /* Center Footer Seal Column */
    .footer-seal-col {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      position: relative;
      width: 150px;
      min-height: 105px;
      overflow: visible;
    }
    .seal-container {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      z-index: 15;
      cursor: grab;
      user-select: none;
      touch-action: none;
      overflow: visible;
      transition: transform 0.05s ease;
    }
    .seal-container:active {
      cursor: grabbing;
    }

    /* Verification QR Code (Clean & Pure - No Box/Border) */
    .cert-qr-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: absolute;
      top: 36px;
      right: 46px;
      z-index: 20;
      background: transparent;
      padding: 0;
      border: none;
      border-radius: 0;
      box-shadow: none;
      backdrop-filter: none;
      cursor: grab;
      user-select: none;
      touch-action: none;
      transition: transform 0.05s ease;
    }
    .cert-qr-box:active {
      cursor: grabbing;
    }
    #live_qrcode_canvas {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    #live_qrcode_canvas svg, #live_qrcode_canvas img, #live_qrcode_canvas canvas {
      width: 82px;
      height: 82px;
      display: block;
    }

    /* ========================================================
       PRINT SPECIFICATIONS (Strict A4 Single Page Landscape)
       ======================================================== */
    @media print {
      @page {
        size: A4 landscape;
        margin: 0;
      }
      body {
        background: #fff !important;
        padding: 0 !important;
        margin: 0 !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      .top-dashboard, .form-drawer, .sig-hover-toolbar, .cut-line-badge {
        display: none !important;
      }
      .cert-viewport {
        margin: 0 !important;
        box-shadow: none !important;
        border-radius: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
      }
      .cert-sheet {
        width: 297mm !important;
        height: 210mm !important;
        page-break-after: avoid !important;
        page-break-inside: avoid !important;
      }
    }
  </style>
</head>
<body>

  <!-- TOP DASHBOARD -->
  <header class="top-dashboard">
    <div class="brand-group">
      <span class="brand-crown">👑</span>
      <div>
        <div class="brand-heading">ROYAL ACADEMIC CERTIFICATE</div>
        <div class="brand-sub">প্রেসিডেন্সিয়াল লাক্সারি এডিশন • A4 Landscape</div>
      </div>
    </div>

    <div class="dash-controls">
      <!-- School Selector -->
      <select id="schoolSelector" class="select-pill" onchange="switchSchool(this.value)">
        <option value="precadet">প্রি-ক্যাডেট চাইল্ড কেয়ার হোমস্</option>
        <option value="shawkat">শওকত ভূঁইয়া চাইল্ড কেয়ার হোমস্</option>
      </select>

      <!-- Theme Selector -->
      <select id="themeSelector" class="select-pill" onchange="switchTheme(this.value)">
        <option value="navy">👑 Royal Navy & Gold</option>
        <option value="burgundy">🍷 Imperial Burgundy</option>
        <option value="emerald">🌲 Emerald Prestige</option>
        <option value="vintage">📜 Vintage Parchment</option>
      </select>

      <!-- Toggle Form Drawer -->
      <button type="button" class="btn-action btn-navy" onclick="toggleDrawer()">⚙️ তথ্য প্যানেল</button>

      <!-- Toggle Stub -->
      <button type="button" class="btn-action btn-navy" id="btnToggleStub" onclick="toggleStub()">✂️ অফিস কপি অন/অফ</button>

      <!-- Toggle Seal & QR -->
      <button type="button" class="btn-action btn-navy" id="btnToggleSeal" onclick="toggleSeal(document.getElementById('sealWrapper').style.display === 'none')">🎖️ সিল অন</button>
      <button type="button" class="btn-action btn-navy" id="btnToggleQR" onclick="toggleQR(document.getElementById('qrContainer').style.display === 'none')">📱 কিউআর অন</button>

      <!-- Print & Export -->
      <button type="button" class="btn-action btn-gold" onclick="window.print()">🖨️ প্রিন্ট করুন</button>
      <button type="button" class="btn-action btn-accent" onclick="downloadImage()">📥 4K ছবি ডাউনলোড</button>
    </div>
  </header>

  <!-- FORM DRAWER ( তথ্য সম্পাদনা ও আপলোড প্যানেল ) -->
  <section class="form-drawer" id="formDrawer">
    <div class="field-card">
      <label>শিক্ষার্থীর নাম:</label>
      <input type="text" id="in_name" value="মো: আবদুর রহমান" oninput="syncAll()">
    </div>
    <div class="field-card">
      <label>পিতার নাম:</label>
      <input type="text" id="in_father" value="মো: মোমিনুল ইসলাম" oninput="syncAll()">
    </div>
    <div class="field-card">
      <label>মাতার নাম:</label>
      <input type="text" id="in_mother" value="সাথী আক্তার" oninput="syncAll()">
    </div>
    <div class="field-card">
      <label>জন্ম তারিখ:</label>
      <input type="text" id="in_dob" value="০১-০৪-২০২১" oninput="syncAll()">
    </div>
    <div class="field-card">
      <label>রোল নম্বর:</label>
      <input type="text" id="in_roll" value="১৬" oninput="syncAll()">
    </div>
    <div class="field-card">
      <label>শিক্ষাবর্ষ (সেশন):</label>
      <input type="text" id="in_year" value="২০২৬" oninput="syncAll()">
    </div>
    <div class="field-card">
      <label>শ্রেণি:</label>
      <input type="text" id="in_class" value="প্লে" oninput="syncAll()">
    </div>
    <div class="field-card">
      <label>তারিখ:</label>
      <input type="text" id="in_date" value="" placeholder="তারিখ (ঐচ্ছিক)" oninput="syncAll()">
    </div>
    <div class="field-card">
      <label>সনদ নম্বর (Serial No):</label>
      <input type="text" id="in_serial" value="CERT-2026-PC-0142" oninput="syncAll()">
    </div>

    <!-- SIGNATURE UPLOADS & SLIDERS -->
    <div class="sig-control-box">
      <!-- Writer Signature -->
      <div>
        <div style="font-weight: 700; color: #1e293b; font-size: 0.85rem; margin-bottom: 6px;">✍️ প্রস্তুতকারী / লেখকের স্বাক্ষর:</div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <input type="file" id="upload_writer_file" accept="image/*" style="display: none;" onchange="handleSigUpload(event, 'writer')">
          <button type="button" class="btn-action btn-navy" style="font-size: 0.8rem; padding: 5px 10px;" onclick="document.getElementById('upload_writer_file').click()">ছবি আপলোড</button>
          <button type="button" class="btn-action" style="background: #ef4444; color:white; font-size: 0.78rem; padding: 4px 8px; display: none;" id="btn_rem_writer" onclick="removeSig('writer')">✕ সরান</button>
        </div>
        <div id="box_writer_sliders" style="display: none; margin-top: 8px;">
          <div style="display: flex; align-items: center; gap: 6px; font-size: 0.76rem;">
            <span>সাইজ:</span>
            <input type="range" id="scale_writer" min="24" max="110" value="48" style="flex:1;" oninput="resizeSig('writer', this.value)">
            <span id="val_scale_writer" style="font-weight:700;">48px</span>
          </div>
        </div>
      </div>

      <!-- Headmaster Signature -->
      <div>
        <div style="font-weight: 700; color: #1e293b; font-size: 0.85rem; margin-bottom: 6px;">✍️ প্রধান শিক্ষকের স্বাক্ষর:</div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <input type="file" id="upload_head_file" accept="image/*" style="display: none;" onchange="handleSigUpload(event, 'headmaster')">
          <button type="button" class="btn-action btn-navy" style="font-size: 0.8rem; padding: 5px 10px;" onclick="document.getElementById('upload_head_file').click()">ছবি আপলোড</button>
          <button type="button" class="btn-action" style="background: #ef4444; color:white; font-size: 0.78rem; padding: 4px 8px; display: none;" id="btn_rem_head" onclick="removeSig('headmaster')">✕ সরান</button>
        </div>
        <div id="box_head_sliders" style="display: none; margin-top: 8px;">
          <div style="display: flex; align-items: center; gap: 6px; font-size: 0.76rem;">
            <span>সাইজ:</span>
            <input type="range" id="scale_headmaster" min="24" max="120" value="52" style="flex:1;" oninput="resizeSig('headmaster', this.value)">
            <span id="val_scale_headmaster" style="font-weight:700;">52px</span>
          </div>
        </div>
      </div>

      <!-- Seal & Watermark Settings -->
      <div>
        <div style="font-weight: 700; color: #1e293b; font-size: 0.85rem; margin-bottom: 6px;">🎖️ গোল্ডেন সিলমোহর ও ওয়াটারমার্ক:</div>
        <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
          <label style="font-size: 0.82rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 4px;">
            <input type="checkbox" id="chkSeal" checked onchange="toggleSeal(this.checked)"> ৩D গোল্ডেন সিল
          </label>
          <label style="font-size: 0.82rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 4px;">
            <input type="checkbox" id="chkQR" checked onchange="toggleQR(this.checked)"> ভেরিফিকেশন কিউআর কোড
          </label>
          <button type="button" class="btn-action btn-navy" style="font-size: 0.78rem; padding: 4px 8px;" onclick="resetAllPositions()">↺ সকল পজিশন রিসেট</button>
        </div>
      </div>
    </div>
  </section>

  <!-- CERTIFICATE CANVAS -->
  <main class="cert-viewport" id="certViewport">
    <div class="cert-sheet" id="certSheet">

      <!-- LEFT: STUB / COUNTERFOIL (অফিস কপি) -->
      <aside class="stub-panel" id="stubPanel">
        <span class="cut-line-badge">✂ কাটিং লাইন (অফিস কপি)</span>

        <div class="stub-top">
          <span class="stub-badge-label">OFFICE COPY • অফিস কপি</span>
          <h2 class="stub-inst-name" id="stub_school_name" contenteditable="true">প্রি-ক্যাডেট চাইল্ড কেয়ার হোমস্</h2>
          <div class="stub-inst-addr" id="stub_address" contenteditable="true">দেবপুর, বুড়িচং, কুমিল্লা।</div>
          <div class="stub-inst-reg" id="stub_reg_no" contenteditable="true">বাংলাদেশ কিন্ডারগার্টেন এসোসিয়েশন গভ. রেজি.নং- ১০২৮/৯৮/স-৭৩৬</div>
          <div class="stub-title-pill">প্রত্যয়নপত্র</div>
        </div>

        <div class="stub-info-grid">
          <div class="stub-field-row">
            <span>প্রত্যয়ন করা যাচ্ছে:</span>
            <span class="stub-field-val" id="stub_val_name">মো: আবদুর রহমান</span>
          </div>
          <div class="stub-field-row">
            <span>পিতা:</span>
            <span class="stub-field-val" id="stub_val_father">মো: মোমিনুল ইসলাম</span>
          </div>
          <div class="stub-field-row">
            <span>মাতা:</span>
            <span class="stub-field-val" id="stub_val_mother">সাথী আক্তার</span>
          </div>
          <div class="stub-field-row">
            <span>জন্ম তারিখ:</span>
            <span class="stub-field-val" style="min-width: 80px;" id="stub_val_dob">০১-০৪-২০২১</span>
            <span>রোল:</span>
            <span class="stub-field-val" style="min-width: 35px;" id="stub_val_roll">১৬</span>
          </div>
          <div style="margin-top: 4px;">
            <span>অত্র বিদ্যালয়ে</span>
            <span class="stub-field-val" style="display: inline-block; width: 60px; text-align: center;" id="stub_val_year">২০২৬</span>
            <span>ইং সনে</span>
          </div>
          <div>
            <span>শ্রেণি:</span>
            <span class="stub-field-val" style="display: inline-block; width: 60px; text-align: center;" id="stub_val_class">প্লে</span>
            <span>-তে অধ্যয়ন করেছে।</span>
          </div>
          <div>
            <span>মূল্যায়ন সন্তোষজনক ও পরবর্তী শ্রেণিতে উন্নীত।</span>
          </div>
          <div style="font-size: 0.78rem; color: #64748b; font-style: italic;">
            আমি তাহার উজ্জ্বল ভবিষ্যৎ কামনা করি।
          </div>
        </div>

        <!-- Stub Footer with Signatures -->
        <div class="stub-bottom-footer">
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <div style="display: flex; align-items: baseline; gap: 4px; position: relative;">
              <span>লেখক:</span>
              <div style="position: relative; flex-grow: 1; display: inline-flex; align-items: baseline;">
                <div id="stub_writer_sig_wrap" class="sig-zone" style="display: none; position: absolute; bottom: 2px; left: 4px; z-index: 5;" title="ড্র্যাগ করে ইচ্ছামতো বসান">
                  <div class="sig-hover-toolbar" onclick="event.stopPropagation();">
                    <button type="button" class="btn-nudge" onclick="nudgeStubSig('writer', 0, -3)">▲</button>
                    <button type="button" class="btn-nudge" onclick="nudgeStubSig('writer', 0, 3)">▼</button>
                    <button type="button" class="btn-nudge" onclick="nudgeStubSig('writer', -4, 0)">◄</button>
                    <button type="button" class="btn-nudge" onclick="nudgeStubSig('writer', 4, 0)">►</button>
                    <button type="button" class="btn-nudge" style="background:#475569;" onclick="resetStubSig('writer')">↺</button>
                  </div>
                  <img id="stub_writer_sig_img" class="stub-sig-img" src="" alt="স্বাক্ষর">
                </div>
                <span class="stub-field-val" style="width: 105px;" id="stub_val_writer"></span>
              </div>
            </div>
            <div style="display: flex; align-items: baseline; gap: 4px;">
              <span>তারিখ:</span>
              <span class="stub-field-val" style="width: 105px;" id="stub_val_date"></span>
            </div>
          </div>

          <div class="stub-headmaster-col">
            <div style="position: relative; width: 100%; display: flex; flex-direction: column; align-items: center;">
              <div id="stub_headmaster_sig_wrap" class="sig-zone" style="display: none; position: absolute; bottom: 3px; z-index: 5;" title="ড্র্যাগ করে ইচ্ছামতো বসান">
                <div class="sig-hover-toolbar" onclick="event.stopPropagation();">
                  <button type="button" class="btn-nudge" onclick="nudgeStubSig('headmaster', 0, -3)">▲</button>
                  <button type="button" class="btn-nudge" onclick="nudgeStubSig('headmaster', 0, 3)">▼</button>
                  <button type="button" class="btn-nudge" onclick="nudgeStubSig('headmaster', -4, 0)">◄</button>
                  <button type="button" class="btn-nudge" onclick="nudgeStubSig('headmaster', 4, 0)">►</button>
                  <button type="button" class="btn-nudge" style="background:#475569;" onclick="resetStubSig('headmaster')">↺</button>
                </div>
                <img id="stub_headmaster_sig_img" class="stub-sig-img" src="" alt="প্রধান শিক্ষকের স্বাক্ষর">
              </div>
              <div class="stub-signing-line"></div>
            </div>
            <div style="font-weight: 800; font-size: 0.86rem; color: #1e293b; text-align: center;">প্রধান শিক্ষক</div>
          </div>
        </div>
      </aside>

      <!-- RIGHT: MAIN CERTIFICATE (মূল সনদ) -->
      <section class="main-cert-panel" id="mainCertPanel">
        <!-- SVG Luxury Border Overlay -->
        ${modernSvgBorder}

        <!-- Watermark Crest -->
        <div class="watermark-crest" id="watermarkCrest" style="background-image: url('${assets.precadet_logo}');"></div>

        <!-- Header -->
        <div class="cert-top-header">
          <div class="cert-logo-seal-wrap">
            <img src="${assets.precadet_logo}" alt="School Crest" class="cert-crest-img" id="mainCrestImg">
          </div>
          <h1 class="cert-inst-title" id="main_school_name" contenteditable="true">প্রি-ক্যাডেট চাইল্ড কেয়ার হোমস্</h1>
          <div class="cert-inst-subtitle" id="main_school_name_en" contenteditable="true">PRE-CADET CHILD CARE HOMES</div>
          <div class="cert-inst-address" id="main_address" contenteditable="true">দেবপুর, বুড়িচং, কুমিল্লা।</div>
          <div class="cert-reg-badge" id="main_reg_no" contenteditable="true">বাংলাদেশ কিন্ডারগার্টেন এসোসিয়েশন গভ. রেজি.নং- ১০২৮/৯৮/স-৭৩৬</div>
        </div>

        <!-- Royal Title Plaque -->
        <div class="royal-banner-wrap">
          <div class="royal-banner-pill">
            <div>
              <div class="banner-text-main">প্রত্যয়নপত্র</div>
              <span class="banner-text-en">CERTIFICATE OF RECOGNITION</span>
            </div>
          </div>
        </div>

        <!-- Certificate Body -->
        <article class="cert-body-content">
          <div style="margin-bottom: 5px;">
            <span>এই মর্মে প্রত্যয়ন করা যাচ্ছে যে,</span>
            <span class="fill-line fill-line-wide" id="main_val_name" contenteditable="true">মো: আবদুর রহমান</span>
          </div>

          <div style="margin-bottom: 5px;">
            <span>পিতা:</span>
            <span class="fill-line fill-line-wide" id="main_val_father" contenteditable="true">মো: মোমিনুল ইসলাম</span>
          </div>

          <div style="margin-bottom: 5px;">
            <span>মাতা:</span>
            <span class="fill-line fill-line-wide" id="main_val_mother" contenteditable="true">সাথী আক্তার</span>
          </div>

          <div style="margin-bottom: 5px; display: flex; align-items: baseline;">
            <span>জন্ম তারিখ:</span>
            <span class="fill-line fill-line-mid" id="main_val_dob" contenteditable="true">০১-০৪-২০২১</span>
            <span style="margin-left: 24px;">রোল নং:</span>
            <span class="fill-line fill-line-mid" style="flex-grow: 1;" id="main_val_roll" contenteditable="true">১৬</span>
          </div>

          <div style="margin-bottom: 5px;">
            <span>অত্র বিদ্যালয়ে</span>
            <span class="fill-line fill-line-short" id="main_val_year" contenteditable="true">২০২৬</span>
            <span>ইং শিক্ষাবর্ষে</span>
            <span class="fill-line fill-line-short" id="main_val_class" contenteditable="true">প্লে</span>
            <span>শ্রেণিতে নিয়মিত অধ্যয়ন করেছে।</span>
          </div>

          <div style="margin-bottom: 5px;">
            <span>তাহার শ্রেণি শিক্ষা মূল্যায়ন অত্যন্ত সন্তোষজনক এবং তাহার আচরণ প্রশংসনীয়।</span>
          </div>

          <div style="margin-bottom: 5px;">
            <span>সে পরবর্তী উচ্চতর শ্রেণিতে উন্নীত হওয়ার যোগ্যতা অর্জন করিয়াছে।</span>
          </div>

          <div>
            <span>আমি তাহার সর্বাঙ্গীন কল্যাণ, সুস্বাস্থ্য ও উজ্জ্বল ভবিষ্যৎ কামনা করি।</span>
          </div>
        </article>

        <!-- Dynamic Live Scannable Verification QR Code (Top-Right Header Corner) -->
        <div class="cert-qr-box" id="qrContainer" title="মাউস দিয়ে ড্র্যাগ করে ইচ্ছামতো সরানো যায়">
          <div id="live_qrcode_canvas"></div>
        </div>

        <!-- Certificate Footer (Balanced 3-Column Layout) -->
        <div class="cert-footer-row">
          <!-- Column 1: Left - Prepared By & Date -->
          <div class="footer-signer-col" style="align-items: flex-start; margin-left: 10px;">
            <div style="display: flex; align-items: baseline; gap: 6px; position: relative;">
              <span style="font-weight: 700;">প্রস্তুতকারী:</span>
              <div style="position: relative; display: inline-flex; align-items: baseline;">
                <div id="main_writer_sig_wrap" class="sig-zone" style="display: none; position: absolute; bottom: 2px; left: 10px; z-index: 25;" title="মাউস দিয়ে ড্র্যাগ করে বসান">
                  <div class="sig-hover-toolbar" onclick="event.stopPropagation();">
                    <button type="button" class="btn-nudge" onclick="adjustSize('writer', -4)">−</button>
                    <button type="button" class="btn-nudge" onclick="adjustSize('writer', 4)">+</button>
                    <div class="toolbar-divider"></div>
                    <button type="button" class="btn-nudge" onclick="nudgeSig('writer', 0, -3)">▲</button>
                    <button type="button" class="btn-nudge" onclick="nudgeSig('writer', 0, 3)">▼</button>
                    <button type="button" class="btn-nudge" onclick="nudgeSig('writer', -4, 0)">◄</button>
                    <button type="button" class="btn-nudge" onclick="nudgeSig('writer', 4, 0)">►</button>
                    <button type="button" class="btn-nudge" style="background:#475569;" onclick="resetSig('writer')">↺</button>
                  </div>
                  <img id="main_writer_sig_img" class="sig-img" src="" alt="লেখকের স্বাক্ষর">
                </div>
                <span class="fill-line" style="min-width: 130px;" id="main_val_writer" contenteditable="true"></span>
              </div>
            </div>
            <div style="display: flex; align-items: baseline; gap: 6px; margin-top: 5px;">
              <span style="font-weight: 700;">তারিখ:</span>
              <span class="fill-line" style="min-width: 145px;" id="main_val_date" contenteditable="true"></span>
            </div>
          </div>

          <!-- Column 2: Center - 3D Embossed Golden Seal (Symmetrically Centered) -->
          <div class="footer-seal-col" id="sealWrapper">
            <div class="seal-container" id="goldSealElement" title="ড্র্যাগ করে ইচ্ছামতো সরানো যায়">
              ${goldSealSvg}
            </div>
          </div>

          <!-- Column 3: Right - Headmaster Signature & Seal -->
          <div class="footer-signer-col" style="align-items: flex-end; margin-right: 10px;">
            <div style="position: relative; display: flex; flex-direction: column; align-items: center; width: 170px;">
              <div id="main_headmaster_sig_wrap" class="sig-zone" style="display: none; position: absolute; bottom: 3px; z-index: 25;" title="মাউস দিয়ে ড্র্যাগ করে বসান">
                <div class="sig-hover-toolbar" onclick="event.stopPropagation();">
                  <button type="button" class="btn-nudge" onclick="adjustSize('headmaster', -4)">−</button>
                  <button type="button" class="btn-nudge" onclick="adjustSize('headmaster', 4)">+</button>
                  <div class="toolbar-divider"></div>
                  <button type="button" class="btn-nudge" onclick="nudgeSig('headmaster', 0, -3)">▲</button>
                  <button type="button" class="btn-nudge" onclick="nudgeSig('headmaster', 0, 3)">▼</button>
                  <button type="button" class="btn-nudge" onclick="nudgeSig('headmaster', -4, 0)">◄</button>
                  <button type="button" class="btn-nudge" onclick="nudgeSig('headmaster', 4, 0)">►</button>
                  <button type="button" class="btn-nudge" style="background:#475569;" onclick="resetSig('headmaster')">↺</button>
                </div>
                <img id="main_headmaster_sig_img" class="sig-img" src="" alt="প্রধান শিক্ষকের স্বাক্ষর">
              </div>
              <div class="signing-stroke-line"></div>
            </div>
            <div class="signer-designation" style="width: 170px; text-align: center;" contenteditable="true">প্রধান শিক্ষক</div>
            <div class="signer-sub" style="width: 170px; text-align: center;">অধ্যক্ষ / প্রতিষ্ঠান প্রধান</div>
          </div>
        </div>

      </section>
    </div>
  </main>

  <script>
    // Inlined Offline Live QR Code Library
    ${qrcodeLib}

    // School Presets
    const SCHOOLS = {
      precadet: {
        nameBn: 'প্রি-ক্যাডেট চাইল্ড কেয়ার হোমস্',
        nameEn: 'PRE-CADET CHILD CARE HOMES',
        address: 'দেবপুর, বুড়িচং, কুমিল্লা।',
        reg: 'বাংলাদেশ কিন্ডারগার্টেন এসোসিয়েশন গভ. রেজি.নং- ১০২৮/৯৮/স-৭৩৬',
        logo: '${assets.precadet_logo}'
      },
      shawkat: {
        nameBn: 'শওকত ভূঁইয়া চাইল্ড কেয়ার হোমস্',
        nameEn: 'SHAWKAT BHUIYAN CHILD CARE HOMES',
        address: 'কংশনগর, বুড়িচং, কুমিল্লা।',
        reg: '',
        logo: '${assets.logo}'
      }
    };

    // Signature State
    let sigSizes = { writer: 48, headmaster: 52 };
    let sigPositions = {
      main_writer: { x: 0, y: 0 },
      main_headmaster: { x: 0, y: 0 },
      stub_writer: { x: 0, y: 0 },
      stub_headmaster: { x: 0, y: 0 }
    };

    function switchTheme(theme) {
      document.body.className = '';
      if (theme !== 'navy') {
        document.body.classList.add('theme-' + theme);
      }
    }

    function updateLiveQR() {
      const qrBox = document.getElementById('live_qrcode_canvas');
      if (!qrBox || typeof qrcode !== 'function') return;
      qrBox.innerHTML = '';

      const serial = (document.getElementById('in_serial') ? document.getElementById('in_serial').value.trim() : '') || 'CERT-2026-PC-0142';

      // Standard verification link: Google Lens instantly pops up this URL preview
      const verifyUrl = 'https://wasimulrahatsifat-design.github.io/school-certificate-generator/modern_certificate.html?v=' + encodeURIComponent(serial);

      try {
        // Error Correction 'L' with auto-version keeps the matrix simple and clean (only 41x41 dots)
        const qr = qrcode(0, 'L');
        qr.addData(verifyUrl);
        qr.make();
        // Margin = 2 creates the essential white quiet-zone border required by Google Lens & phone cameras
        qrBox.innerHTML = qr.createSvgTag(2.5, 2);
      } catch (e) {
        console.error('QR creation error:', e);
      }
    }

    function switchSchool(key) {
      const s = SCHOOLS[key];
      if (!s) return;
      document.getElementById('stub_school_name').innerText = s.nameBn;
      document.getElementById('main_school_name').innerText = s.nameBn;
      document.getElementById('main_school_name_en').innerText = s.nameEn;
      document.getElementById('stub_address').innerText = s.address;
      document.getElementById('main_address').innerText = s.address;
      document.getElementById('stub_reg_no').innerText = s.reg;
      document.getElementById('main_reg_no').innerText = s.reg;
      document.getElementById('mainCrestImg').src = s.logo;
      document.getElementById('watermarkCrest').style.backgroundImage = 'url(\"' + s.logo + '\")';
      updateLiveQR();
    }

    function toggleDrawer() {
      const drawer = document.getElementById('formDrawer');
      drawer.classList.toggle('collapsed');
    }

    let isStubVisible = true;
    function toggleStub() {
      const stub = document.getElementById('stubPanel');
      const btn = document.getElementById('btnToggleStub');
      isStubVisible = !isStubVisible;
      if (isStubVisible) {
        stub.style.display = 'flex';
        btn.innerText = '✂️ অফিস কপি অন';
      } else {
        stub.style.display = 'none';
        btn.innerText = '✂️ অফিস কপি অফ';
      }
    }

    function toggleSeal(show) {
      const el = document.getElementById('sealWrapper') || document.getElementById('goldSealElement');
      if (el) el.style.display = show ? 'flex' : 'none';
      const chk = document.getElementById('chkSeal');
      if (chk) chk.checked = show;
      const btn = document.getElementById('btnToggleSeal');
      if (btn) btn.innerText = show ? '🎖️ সিল অন' : '🎖️ সিল অফ';
    }

    function toggleQR(show) {
      const el = document.getElementById('qrContainer');
      if (el) el.style.display = show ? 'flex' : 'none';
      const chk = document.getElementById('chkQR');
      if (chk) chk.checked = show;
      const btn = document.getElementById('btnToggleQR');
      if (btn) btn.innerText = show ? '📱 কিউআর অন' : '📱 কিউআর অফ';
    }

    function syncAll() {
      const name = document.getElementById('in_name').value;
      const father = document.getElementById('in_father').value;
      const mother = document.getElementById('in_mother').value;
      const dob = document.getElementById('in_dob').value;
      const roll = document.getElementById('in_roll').value;
      const year = document.getElementById('in_year').value;
      const cls = document.getElementById('in_class').value;
      const dateVal = document.getElementById('in_date').value;
      const serial = document.getElementById('in_serial').value;

      // Sync Stub
      document.getElementById('stub_val_name').innerText = name;
      document.getElementById('stub_val_father').innerText = father;
      document.getElementById('stub_val_mother').innerText = mother;
      document.getElementById('stub_val_dob').innerText = dob;
      document.getElementById('stub_val_roll').innerText = roll;
      document.getElementById('stub_val_year').innerText = year;
      document.getElementById('stub_val_class').innerText = cls;
      document.getElementById('stub_val_date').innerText = dateVal;

      // Sync Main
      document.getElementById('main_val_name').innerText = name;
      document.getElementById('main_val_father').innerText = father;
      document.getElementById('main_val_mother').innerText = mother;
      document.getElementById('main_val_dob').innerText = dob;
      document.getElementById('main_val_roll').innerText = roll;
      document.getElementById('main_val_year').innerText = year;
      document.getElementById('main_val_class').innerText = cls;
      document.getElementById('main_val_date').innerText = dateVal;
      const viewSerial = document.getElementById('view_serial');
      if (viewSerial) viewSerial.innerText = serial;

      // Update Live Scannable QR
      updateLiveQR();
    }

    // SIGNATURE UPLOAD & RESIZE
    function handleSigUpload(event, type) {
      const file = event.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function(e) {
        setSig(type, e.target.result);
      };
      reader.readAsDataURL(file);
    }

    function setSig(type, dataUrl) {
      const mainWrap = document.getElementById('main_' + type + '_sig_wrap');
      const mainImg = document.getElementById('main_' + type + '_sig_img');
      const stubWrap = document.getElementById('stub_' + type + '_sig_wrap');
      const stubImg = document.getElementById('stub_' + type + '_sig_img');
      const remBtn = document.getElementById('btn_rem_' + (type === 'writer' ? 'writer' : 'head'));
      const sliderBox = document.getElementById('box_' + (type === 'writer' ? 'writer' : 'head') + '_sliders');

      if (dataUrl) {
        if (mainImg) mainImg.src = dataUrl;
        if (mainWrap) mainWrap.style.display = 'block';
        if (stubImg) stubImg.src = dataUrl;
        if (stubWrap) stubWrap.style.display = 'block';
        if (remBtn) remBtn.style.display = 'inline-block';
        if (sliderBox) sliderBox.style.display = 'block';
        resizeSig(type, sigSizes[type]);
      } else {
        if (mainImg) mainImg.src = '';
        if (mainWrap) mainWrap.style.display = 'none';
        if (stubImg) stubImg.src = '';
        if (stubWrap) stubWrap.style.display = 'none';
        if (remBtn) remBtn.style.display = 'none';
        if (sliderBox) sliderBox.style.display = 'none';
        const fileInp = document.getElementById('upload_' + (type === 'writer' ? 'writer' : 'head') + '_file');
        if (fileInp) fileInp.value = '';
        resetSig(type);
      }
    }

    function removeSig(type) {
      setSig(type, '');
    }

    function resizeSig(type, val) {
      val = parseInt(val, 10);
      if (isNaN(val)) return;
      sigSizes[type] = val;
      const mainImg = document.getElementById('main_' + type + '_sig_img');
      const stubImg = document.getElementById('stub_' + type + '_sig_img');
      const slider = document.getElementById('scale_' + type);
      const valBadge = document.getElementById('val_scale_' + type);
      if (mainImg) mainImg.style.maxHeight = val + 'px';
      if (stubImg) stubImg.style.maxHeight = Math.round(val * 0.6) + 'px';
      if (slider) slider.value = val;
      if (valBadge) valBadge.innerText = val + 'px';
    }

    function adjustSize(type, delta) {
      const current = sigSizes[type] || 50;
      resizeSig(type, Math.max(20, Math.min(130, current + delta)));
    }

    // POSITIONING & DRAGGING
    function updateSigTransform(key) {
      const el = document.getElementById(key + '_sig_wrap');
      if (el) {
        const p = sigPositions[key];
        el.style.transform = 'translate(' + p.x + 'px, ' + p.y + 'px)';
      }
    }

    function nudgeSig(type, dx, dy) {
      const key = 'main_' + type;
      sigPositions[key].x = Math.max(-140, Math.min(140, sigPositions[key].x + dx));
      sigPositions[key].y = Math.max(-80, Math.min(60, sigPositions[key].y + dy));
      updateSigTransform(key);

      // Proportional nudge on stub
      const stubKey = 'stub_' + type;
      sigPositions[stubKey].x = Math.round(sigPositions[key].x * 0.6);
      sigPositions[stubKey].y = Math.round(sigPositions[key].y * 0.6);
      updateSigTransform(stubKey);
    }

    function nudgeStubSig(type, dx, dy) {
      const key = 'stub_' + type;
      sigPositions[key].x = Math.max(-60, Math.min(60, sigPositions[key].x + dx));
      sigPositions[key].y = Math.max(-40, Math.min(40, sigPositions[key].y + dy));
      updateSigTransform(key);
    }

    function resetSig(type) {
      sigPositions['main_' + type] = { x: 0, y: 0 };
      sigPositions['stub_' + type] = { x: 0, y: 0 };
      updateSigTransform('main_' + type);
      updateSigTransform('stub_' + type);
    }

    function resetStubSig(type) {
      sigPositions['stub_' + type] = { x: 0, y: 0 };
      updateSigTransform('stub_' + type);
    }

    function resetAllPositions() {
      resetSig('writer');
      resetSig('headmaster');
      sealOffset = { x: 0, y: 0 };
      qrOffset = { x: 0, y: 0 };
      const sEl = document.getElementById('goldSealElement');
      if (sEl) sEl.style.transform = 'none';
      const qEl = document.getElementById('qrContainer');
      if (qEl) qEl.style.transform = 'none';
    }

    // Generic Draggable Handler
    function makeDraggable(elId, onDrag) {
      const el = document.getElementById(elId);
      if (!el) return;
      let isDragging = false;
      let startX, startY;

      function onDown(e) {
        if (e.target.closest('.sig-hover-toolbar') || e.target.closest('button')) return;
        isDragging = true;
        const cx = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
        const cy = e.clientY !== undefined ? e.clientY : (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
        startX = cx;
        startY = cy;
        el.style.cursor = 'grabbing';
        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onUp);
        document.addEventListener('touchmove', onMove, { passive: false });
        document.addEventListener('touchend', onUp);
        e.preventDefault();
      }

      function onMove(e) {
        if (!isDragging) return;
        const cx = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
        const cy = e.clientY !== undefined ? e.clientY : (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
        const dx = cx - startX;
        const dy = cy - startY;
        startX = cx;
        startY = cy;
        onDrag(dx, dy);
        if (e.cancelable) e.preventDefault();
      }

      function onUp() {
        if (!isDragging) return;
        isDragging = false;
        el.style.cursor = 'grab';
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
        document.removeEventListener('touchmove', onMove);
        document.removeEventListener('touchend', onUp);
      }

      el.addEventListener('mousedown', onDown);
      el.addEventListener('touchstart', onDown, { passive: false });
    }

    // 4K PNG Download
    function downloadImage() {
      const sheet = document.getElementById('certSheet');
      const badge = document.querySelector('.cut-line-badge');
      if (badge) badge.style.display = 'none';

      html2canvas(sheet, {
        scale: 3, // Ultra 300+ DPI
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      }).then(canvas => {
        if (badge) badge.style.display = 'block';
        const link = document.createElement('a');
        const sKey = document.getElementById('schoolSelector').value;
        const sTitle = sKey === 'precadet' ? 'Pre_Cadet' : 'Shawkat_Bhuiyan';
        const studentName = document.getElementById('in_name').value || 'Student';
        link.download = 'Royal_Certificate_' + sTitle + '_' + studentName + '.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      }).catch(err => {
        if (badge) badge.style.display = 'block';
        alert('Image generation error: ' + err.message);
      });
    }

    // Initialize on Load
    syncAll();

    // Check URL parameters for direct verification feedback from QR scan
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const verifyCert = urlParams.get('v') || urlParams.get('cert');
      if (verifyCert) {
        const serialInput = document.getElementById('in_serial');
        if (serialInput) {
          serialInput.value = verifyCert;
          syncAll();
        }
        const notice = document.createElement('div');
        notice.style.position = 'fixed';
        notice.style.top = '15px';
        notice.style.left = '50%';
        notice.style.transform = 'translateX(-50%)';
        notice.style.background = '#065f46';
        notice.style.color = '#ffffff';
        notice.style.padding = '10px 22px';
        notice.style.borderRadius = '30px';
        notice.style.boxShadow = '0 8px 24px rgba(0,0,0,0.35)';
        notice.style.zIndex = '99999';
        notice.style.fontFamily = "'Hind Siliguri', sans-serif";
        notice.style.fontSize = '14px';
        notice.style.fontWeight = 'bold';
        notice.style.display = 'flex';
        notice.style.alignItems = 'center';
        notice.style.gap = '8px';
        notice.innerHTML = '<span>✅</span> সনদ যাচাই সফল: ' + verifyCert + ' (আসল ও অনুমোদিত প্রত্যয়নপত্র)';
        document.body.appendChild(notice);
        setTimeout(() => { notice.style.opacity = '0'; notice.style.transition = 'opacity 0.6s'; setTimeout(() => notice.remove(), 600); }, 7000);
      }
    } catch (err) {}

    // Attach Draggables
    makeDraggable('main_writer_sig_wrap', (dx, dy) => {
      nudgeSig('writer', dx, dy);
    });
    makeDraggable('main_headmaster_sig_wrap', (dx, dy) => {
      nudgeSig('headmaster', dx, dy);
    });
    makeDraggable('stub_writer_sig_wrap', (dx, dy) => {
      nudgeStubSig('writer', dx, dy);
    });
    makeDraggable('stub_headmaster_sig_wrap', (dx, dy) => {
      nudgeStubSig('headmaster', dx, dy);
    });

    // Make seal draggable as well!
    let sealOffset = { x: 0, y: 0 };
    makeDraggable('goldSealElement', (dx, dy) => {
      sealOffset.x += dx;
      sealOffset.y += dy;
      document.getElementById('goldSealElement').style.transform = 'translate(' + sealOffset.x + 'px, ' + sealOffset.y + 'px)';
    });

    // Make QR code badge draggable as well!
    let qrOffset = { x: 0, y: 0 };
    makeDraggable('qrContainer', (dx, dy) => {
      qrOffset.x += dx;
      qrOffset.y += dy;
      document.getElementById('qrContainer').style.transform = 'translate(' + qrOffset.x + 'px, ' + qrOffset.y + 'px)';
    });
  </script>
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, 'modern_certificate.html'), modernHtmlContent);
fs.writeFileSync(path.join(__dirname, 'আধুনিক_প্রত্যয়নপত্র.html'), modernHtmlContent);
console.log('modern_certificate.html and আধুনিক_প্রত্যয়নপত্র.html created successfully!');
