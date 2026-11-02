const fs = require('fs');

const assets = JSON.parse(fs.readFileSync('assets_base64.json', 'utf8'));
const qrcodeLib = fs.readFileSync('qrcode.min.js', 'utf8');

const htmlContent = `<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>প্রত্যয়নপত্র প্রস্তুতকরণ সিস্টেম</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=Noto+Sans+Bengali:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link href="https://fonts.maateen.me/kalpurush/font.css" rel="stylesheet">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
  <style>
    :root {
      --primary: #0f4c81;
      --primary-dark: #092c4c;
      --accent: #d92525;
      --gold: #d4af37;
      --bg-canvas: #f1f5f9;
      --text-dark: #0f172a;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Kalpurush', 'Noto Sans Bengali', 'Hind Siliguri', sans-serif;
      background: var(--bg-canvas);
      color: var(--text-dark);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-bottom: 50px;
    }

    /* TOP CONTROLS BAR (Non-printable) */
    .top-toolbar {
      width: 100%;
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
      color: #fff;
      padding: 12px 28px;
      position: sticky;
      top: 0;
      z-index: 1000;
      box-shadow: 0 4px 20px rgba(0,0,0,0.25);
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      font-family: 'Hind Siliguri', 'Segoe UI', system-ui, sans-serif !important;
    }

    .brand-title {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 1.15rem;
      font-weight: 700;
      font-family: 'Hind Siliguri', sans-serif !important;
    }
    .brand-badge {
      background: #f59e0b;
      color: #000;
      font-size: 0.72rem;
      padding: 3px 8px;
      border-radius: 4px;
      font-weight: 800;
      font-family: 'Hind Siliguri', sans-serif !important;
    }

    .school-selector-wrap {
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(255, 255, 255, 0.1);
      padding: 5px 12px;
      border-radius: 6px;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    .school-selector-wrap label {
      font-size: 0.88rem;
      font-weight: 600;
      color: #f8fafc;
      font-family: 'Hind Siliguri', sans-serif !important;
    }
    .school-select {
      background: #1e293b;
      color: #fff;
      border: 1px solid #475569;
      padding: 5px 10px;
      border-radius: 4px;
      font-size: 0.9rem;
      font-family: 'Hind Siliguri', sans-serif !important;
      outline: none;
      cursor: pointer;
    }

    .action-buttons {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 7px 14px;
      border-radius: 6px;
      font-size: 0.9rem;
      font-weight: 600;
      font-family: 'Hind Siliguri', sans-serif !important;
      cursor: pointer;
      border: none;
      transition: all 0.2s ease;
      text-decoration: none;
    }

    .btn-primary {
      background: #2563eb;
      color: white;
    }
    .btn-primary:hover {
      background: #1d4ed8;
      transform: translateY(-1px);
    }

    .btn-success {
      background: #059669;
      color: white;
      box-shadow: 0 2px 8px rgba(5,150,105,0.3);
    }
    .btn-success:hover {
      background: #047857;
      transform: translateY(-1px);
    }

    .btn-warning {
      background: #d97706;
      color: white;
    }
    .btn-warning:hover {
      background: #b45309;
      transform: translateY(-1px);
    }

    .btn-secondary {
      background: #475569;
      color: white;
    }
    .btn-secondary:hover {
      background: #334155;
    }

    /* COLLAPSIBLE FORM PANEL */
    .form-panel {
      width: 100%;
      max-width: 1140px;
      background: white;
      margin: 16px auto 6px auto;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
      border: 1px solid #e2e8f0;
      padding: 20px 24px;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
      gap: 15px;
      transition: all 0.3s ease;
      font-family: 'Hind Siliguri', sans-serif !important;
    }
    .form-panel.hidden {
      display: none;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .form-group label {
      font-size: 0.86rem;
      font-weight: 600;
      color: #334155;
      font-family: 'Hind Siliguri', sans-serif !important;
    }
    .form-group input, .form-group select {
      padding: 7px 11px;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      font-size: 0.94rem;
      font-family: 'Kalpurush', 'Hind Siliguri', sans-serif;
      outline: none;
      transition: border-color 0.2s;
    }
    .form-group input:focus, .form-group select:focus {
      border-color: #2563eb;
      box-shadow: 0 0 0 3px rgba(37,99,235,0.15);
    }

    /* SIGNATURE STYLES */
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
      max-height: 48px;
      max-width: 180px;
      object-fit: contain;
      display: block;
      pointer-events: none;
      transition: max-height 0.15s ease;
    }
    .stub-sig-img {
      max-height: 28px;
      max-width: 100px;
      object-fit: contain;
      display: block;
      pointer-events: none;
      transition: max-height 0.15s ease;
    }
    .sig-upload-btn-wrap {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .sig-preview-thumb {
      height: 32px;
      max-width: 70px;
      object-fit: contain;
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      padding: 2px;
      background: #f8fafc;
      display: none;
    }
    .btn-remove-sig {
      background: #ef4444;
      color: white;
      font-size: 0.78rem;
      padding: 4px 8px;
      border-radius: 4px;
      border: none;
      cursor: pointer;
      display: none;
    }
    .btn-remove-sig:hover {
      background: #dc2626;
    }

    .sig-size-ctrls {
      position: absolute;
      top: -28px;
      left: 50%;
      transform: translateX(-50%);
      display: none;
      background: rgba(15, 23, 42, 0.95);
      border-radius: 5px;
      padding: 3px 6px;
      gap: 3px;
      z-index: 30;
      box-shadow: 0 4px 12px rgba(0,0,0,0.25);
      white-space: nowrap;
      align-items: center;
    }
    .sig-zone:hover .sig-size-ctrls {
      display: flex;
    }
    .sig-ctrl-divider {
      width: 1px;
      height: 14px;
      background: #475569;
      margin: 0 2px;
    }
    .btn-sig-adj {
      background: #2563eb;
      color: white;
      border: none;
      border-radius: 3px;
      width: 20px;
      height: 20px;
      font-size: 13px;
      font-weight: bold;
      line-height: 1;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .btn-sig-adj:hover {
      background: #1d4ed8;
    }

    /* CERTIFICATE VIEWPORT (Strict A4 Landscape 297mm x 210mm) */
    .certificate-viewport {
      margin: 12px auto 30px auto;
      box-shadow: 0 12px 45px rgba(0,0,0,0.2);
      border-radius: 2px;
      background: #fff;
    }

    .certificate-sheet {
      width: 1122px; /* 297mm at 96 DPI */
      height: 793px; /* 210mm at 96 DPI */
      position: relative;
      background: #fffffb;
      display: flex;
      flex-direction: row;
      overflow: hidden;
      font-family: 'Kalpurush', 'SutonnyOMJ', 'Noto Sans Bengali', sans-serif;
    }

    /* LEFT SECTION: STUB / COUNTERFOIL (অফিস কপি) */
    .stub-section {
      width: 325px;
      height: 100%;
      padding: 20px 18px 20px 18px;
      background: url('${assets.stub_exact_bg}') no-repeat center center;
      background-size: 100% 100%;
      border-right: 2px dashed #94a3b8;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      font-size: 0.92rem;
      line-height: 1.5;
    }

    .cut-line-indicator {
      position: absolute;
      right: -13px;
      top: 50%;
      transform: translateY(-50%);
      background: #f1f5f9;
      color: #475569;
      font-size: 11px;
      padding: 4px 6px;
      border-radius: 10px;
      border: 1px solid #94a3b8;
      writing-mode: vertical-rl;
      text-orientation: mixed;
      letter-spacing: 2px;
      z-index: 10;
      user-select: none;
      font-family: 'Hind Siliguri', sans-serif !important;
    }

    .stub-header {
      text-align: center;
    }
    .stub-school-name {
      font-size: 1.25rem;
      font-weight: 900;
      -webkit-text-stroke: 0.6px #0f172a;
      color: #0f172a;
      margin-bottom: 3px;
    }
    .stub-logo {
      width: 56px;
      height: 56px;
      margin: 0 auto 2px auto;
      display: block;
      border-radius: 50%;
    }
    .stub-address {
      font-size: 0.88rem;
      color: #0f172a;
      font-weight: 800;
      -webkit-text-stroke: 0.35px #0f172a;
      margin-bottom: 1px;
    }
    .stub-reg-no {
      font-size: 0.65rem;
      font-weight: 800;
      -webkit-text-stroke: 0.22px #0f172a;
      color: #0f172a;
      margin-top: 1px;
      margin-bottom: 4px;
      white-space: nowrap;
      letter-spacing: -0.2px;
    }

    .stub-banner-wrapper {
      text-align: center;
      margin: 2px 0 6px 0;
    }
    .stub-banner-img {
      height: 30px;
      display: inline-block;
      filter: drop-shadow(0 1px 3px rgba(220, 38, 38, 0.15));
    }

    .stub-body {
      display: flex;
      flex-direction: column;
      gap: 7px;
      font-size: 0.92rem;
      color: #1e293b;
    }
    .stub-row {
      display: flex;
      align-items: baseline;
      gap: 4px;
    }

    /* LEFT SIDE: NOT BOLD */
    .stub-field {
      border-bottom: 1px dotted #334155;
      flex-grow: 1;
      padding-left: 4px;
      font-weight: 400 !important; /* বামসাইডে বোল্ড হবে না */
      -webkit-text-stroke: 0 !important;
      color: #0f172a;
      min-height: 19px;
    }

    .stub-footer {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-top: auto;
      margin-bottom: 4px;
      font-size: 0.86rem;
      padding-top: 6px;
    }
    .stub-writer-date {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .stub-headmaster-col {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 105px;
    }
    .stub-sign-line {
      width: 95px;
      border-top: 1px dashed #64748b;
      margin-bottom: 4px;
    }
    .stub-signature-title {
      font-weight: 800;
      color: #1e293b;
      text-align: center;
    }

    /* RIGHT SECTION: MAIN CERTIFICATE (মূল সনদ) */
    .certificate-main {
      flex: 1;
      height: 100%;
      position: relative;
      background: url('${assets.sample_exact_bg}') no-repeat center center;
      background-size: 100% 100%;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    /* WATERMARK LOGO */
    .watermark-bg {
      position: absolute;
      top: 52%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 350px;
      height: 350px;
      opacity: 0.08;
      pointer-events: none;
      z-index: 1;
      background: url('${assets.precadet_logo}') no-repeat center center;
      background-size: contain;
      transition: background 0.3s ease;
    }

    /* ORNATE BORDER OVERLAY */
    .ornate-border-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 20;
      background: url('${assets.border}') no-repeat center center;
      background-size: 100% 100%;
    }

    /* LIVE VERIFICATION QR CODE (Top-Right) */
    .cert-qr-wrap {
      position: absolute;
      top: 32px;
      right: 44px;
      z-index: 25;
      cursor: grab;
      user-select: none;
      touch-action: none;
      display: flex;
      flex-direction: column;
      align-items: center;
      background: transparent;
      transition: transform 0.05s ease;
    }
    .cert-qr-wrap:active {
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

    /* CERTIFICATE INNER CONTENT */
    .certificate-content {
      position: relative;
      z-index: 10;
      height: 100%;
      padding: 30px 46px 24px 46px;
      display: flex;
      flex-direction: column;
    }

    /* CERTIFICATE HEADER */
    .cert-header {
      text-align: center;
      margin-bottom: 1px;
    }
    .cert-school-name {
      font-size: 2.38rem;
      font-weight: 900;
      -webkit-text-stroke: 0.85px #000;
      color: #000000;
      letter-spacing: 0.5px;
      margin-bottom: 1px;
    }
    .cert-logo {
      width: 72px;
      height: 72px;
      margin: 0 auto;
      display: block;
      border-radius: 50%;
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.15));
    }
    .cert-address {
      font-size: 1.18rem;
      font-weight: 800;
      -webkit-text-stroke: 0.45px #0f172a;
      color: #0f172a;
      margin-top: 2px;
    }
    .cert-reg-no {
      font-size: 0.98rem;
      font-weight: 800;
      -webkit-text-stroke: 0.35px #0f172a;
      color: #0f172a;
      margin-top: 2px;
      white-space: nowrap;
    }

    /* TITLE BANNER (Clean Vector Banner with Authentic Calligraphy) */
    .cert-banner-wrapper {
      text-align: center;
      margin: 3px 0 6px 0;
    }
    .cert-banner-img {
      height: 54px;
      display: inline-block;
      filter: drop-shadow(0 2px 4px rgba(220, 38, 38, 0.2));
    }

    /* CERTIFICATE BODY TEXT */
    .cert-body {
      font-size: 1.34rem;
      line-height: 1.84;
      color: #0f172a;
      text-align: justify;
    }

    /* RIGHT SIDE: BOLD */
    .dotted-fill {
      border-bottom: 2px dotted #475569;
      display: inline-block;
      font-weight: 800 !important; /* ডানসাইডে যা যা বক্সে লেখা হয় তা বোল্ড হবে */
      -webkit-text-stroke: 0.35px #000;
      color: #000000;
      padding: 0 8px;
      text-align: center;
    }
    .dotted-fill-wide {
      min-width: 440px;
    }
    .dotted-fill-mid {
      min-width: 200px;
    }
    .dotted-fill-short {
      min-width: 80px;
    }

    /* CERTIFICATE FOOTER (Placed nicely at bottom of certificate) */
    .cert-footer {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-top: auto;
      margin-bottom: 6px;
      padding: 0 15px;
      font-size: 1.08rem;
    }

    .footer-left {
      display: flex;
      flex-direction: column;
      gap: 7px;
    }
    .footer-left-row {
      display: flex;
      align-items: baseline;
      gap: 6px;
    }
    .footer-dotted {
      border-bottom: 2px dotted #475569;
      min-width: 200px;
      display: inline-block;
      padding-left: 6px;
      font-weight: 800 !important; /* ডানসাইডে যা যা বক্সে লেখা হয় তা বোল্ড হবে */
      -webkit-text-stroke: 0.35px #000;
      color: #000000;
      min-height: 18px;
      position: relative;
      top: -4px;
    }

    .footer-right {
      text-align: center;
    }
    .sign-line {
      width: 160px;
      border-top: 2px dashed #475569;
      margin-bottom: 6px;
    }
    .headmaster-title {
      font-size: 1.15rem;
      font-weight: 800;
      color: #0f172a;
    }

    /* EDITABLE HOVER */
    [contenteditable="true"]:hover {
      outline: 2px dashed #2563eb;
      background: rgba(37, 99, 235, 0.05);
      border-radius: 2px;
      cursor: text;
    }
    [contenteditable="true"]:focus {
      outline: 2px solid #2563eb;
      background: rgba(37, 99, 235, 0.08);
      border-radius: 2px;
    }

    /* PRINT STYLES (Strict A4 Landscape 297mm x 210mm) */
    @page {
      size: 297mm 210mm;
      margin: 0mm;
    }
    @media print {
      html, body {
        width: 297mm !important;
        height: 210mm !important;
        overflow: hidden !important;
        margin: 0 !important;
        padding: 0 !important;
        background: none !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      .top-toolbar, .form-panel, .cut-line-indicator, .sig-size-ctrls {
        display: none !important;
      }
      .certificate-viewport {
        width: 297mm !important;
        height: 210mm !important;
        margin: 0 !important;
        box-shadow: none !important;
        border-radius: 0 !important;
        border: none !important;
      }
      .certificate-sheet {
        width: 297mm !important;
        height: 210mm !important;
        max-width: 297mm !important;
        max-height: 210mm !important;
        page-break-after: avoid !important;
        page-break-inside: avoid !important;
      }
      [contenteditable="true"]:hover, [contenteditable="true"]:focus {
        outline: none !important;
        background: none !important;
      }
    }
  </style>
</head>
<body>

  <!-- TOP TOOLBAR -->
  <header class="top-toolbar">
    <div class="brand-title">
      <span>🏫 প্রত্যয়নপত্র জেনারেটর</span>
      <span class="brand-badge">বাংলা ফন্ট / A4 ল্যান্ডস্কেপ</span>
    </div>

    <!-- SCHOOL SELECTOR -->
    <div class="school-selector-wrap">
      <label>স্কুল নির্বাচন:</label>
      <select class="school-select" id="schoolSelector" onchange="switchSchool(this.value)">
        <option value="precadet" selected>🏫 প্রি-ক্যাডেট চাইল্ড কেয়ার হোমস্</option>
        <option value="shawkat">🏫 শওকত ভূঁইয়া চাইল্ড কেয়ার হোমস্</option>
      </select>
    </div>

    <div class="action-buttons">
      <a href="certificate_en.html" class="btn" style="background:#0284c7; color:#fff;">🇬🇧 English Version</a>
      <button type="button" id="btnToggleQR" class="btn" style="background:#0d9488; color:#fff;" onclick="toggleQR();">📱 কিউআর: অন</button>
      <button class="btn btn-primary" onclick="toggleFormPanel()">✏️ তথ্য ও স্বাক্ষর ফরম</button>
      <button class="btn btn-warning" onclick="loadSampleData()">⭐ নমুনা ডেটা</button>
      <button class="btn btn-secondary" onclick="clearToBlank()">📄 খালি ফরম</button>
      <button class="btn btn-success" onclick="printCertificate()">🖨️ প্রিন্ট / PDF</button>
      <button class="btn btn-primary" onclick="downloadAsImage()">🖼️ ছবি (PNG)</button>
    </div>
  </header>

  <!-- COLLAPSIBLE FORM PANEL -->
  <section class="form-panel" id="formPanel">
    <div class="form-group">
      <label>শিক্ষার্থীর নাম:</label>
      <input type="text" id="input_student_name" value="মো: আবদুর রহমান" oninput="syncData()">
    </div>
    <div class="form-group">
      <label>পিতার নাম:</label>
      <input type="text" id="input_father_name" value="মো: মোমিনুল ইসলাম" oninput="syncData()">
    </div>
    <div class="form-group">
      <label>মাতার নাম:</label>
      <input type="text" id="input_mother_name" value="সাথী আক্তার" oninput="syncData()">
    </div>
    <div class="form-group">
      <label>জন্ম তারিখ:</label>
      <input type="text" id="input_dob" value="০১-০৪-২০২১" oninput="syncData()">
    </div>
    <div class="form-group">
      <label>রোল নং:</label>
      <input type="text" id="input_roll" value="১৬" oninput="syncData()">
    </div>
    <div class="form-group">
      <label>শিক্ষাবর্ষ (ইং সনে):</label>
      <input type="text" id="input_year" value="২০২৬" oninput="syncData()">
    </div>
    <div class="form-group">
      <label>শ্রেণি:</label>
      <input type="text" id="input_class" value="প্লে" oninput="syncData()">
    </div>
    <div class="form-group">
      <label>লেখক:</label>
      <input type="text" id="input_writer" value="" placeholder="লেখকের নাম (ঐচ্ছিক)" oninput="syncData()">
    </div>
    <div class="form-group">
      <label>তারিখ:</label>
      <input type="text" id="input_date" value="" placeholder="তারিখ (ঐচ্ছিক)" oninput="syncData()">
    </div>
    <div class="form-group">
      <label>সনদ ট্র্যাকিং নং:</label>
      <input type="text" id="input_serial" value="CERT-2026-PC-0142" oninput="syncData()">
    </div>

    <!-- SIGNATURE UPLOADS & RESIZING -->
    <div class="form-group">
      <label>লেখকের স্বাক্ষর (সিগনেচার):</label>
      <input type="file" id="upload_writer_sig" accept="image/*" style="display: none;" onchange="handleSigUpload(event, 'writer')">
      <div class="sig-upload-btn-wrap">
        <button type="button" class="btn btn-secondary" style="font-size: 0.82rem; padding: 6px 11px;" onclick="triggerSigUpload('writer')">✍️ আপলোড</button>
        <img id="preview_writer_sig" class="sig-preview-thumb" alt="Preview">
        <button type="button" id="btn_remove_writer_sig" class="btn-remove-sig" onclick="removeSignature('writer')">✕ সরান</button>
      </div>
      <div id="ctrl_writer_sig_size" style="display: none; margin-top: 6px; align-items: center; gap: 8px;">
        <span style="font-size: 0.78rem; color: #64748b; font-weight: 600;">সাইজ:</span>
        <button type="button" class="btn-sig-adj" onclick="adjustSigSize('writer', -4)">−</button>
        <input type="range" id="scale_writer_sig" min="24" max="110" value="48" style="flex: 1; accent-color: #2563eb;" oninput="resizeSig('writer', this.value)">
        <button type="button" class="btn-sig-adj" onclick="adjustSigSize('writer', 4)">+</button>
        <span id="val_writer_sig" style="font-size: 0.78rem; font-weight: 700; color: #334155; min-width: 32px;">48px</span>
      </div>
      <!-- Position Controls -->
      <div id="ctrl_writer_sig_pos" style="display: none; flex-direction: column; gap: 4px; margin-top: 6px; padding: 6px 8px; background: #f8fafc; border-radius: 6px; border: 1px solid #e2e8f0;">
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <span style="font-size: 0.76rem; color: #475569; font-weight: 700;">পজিশন অ্যাডজাস্ট (Position):</span>
          <button type="button" style="background: none; border: none; color: #2563eb; font-size: 0.74rem; font-weight: 600; cursor: pointer;" onclick="resetSigPos('writer')">↺ রিসেট</button>
        </div>
        <div style="display: flex; align-items: center; gap: 6px;">
          <span style="font-size: 0.74rem; color: #64748b; width: 45px;">ডানে-বামে:</span>
          <button type="button" class="btn-sig-adj" onclick="moveSig('writer', -4, 0)">◄</button>
          <input type="range" id="pos_x_writer" min="-120" max="120" value="0" style="flex: 1; accent-color: #2563eb;" oninput="setSigPos('writer', 'x', this.value)">
          <button type="button" class="btn-sig-adj" onclick="moveSig('writer', 4, 0)">►</button>
          <span id="val_pos_x_writer" style="font-size: 0.72rem; font-weight: 700; color: #334155; min-width: 32px; text-align: right;">0px</span>
        </div>
        <div style="display: flex; align-items: center; gap: 6px;">
          <span style="font-size: 0.74rem; color: #64748b; width: 45px;">উপরে-নিচে:</span>
          <button type="button" class="btn-sig-adj" onclick="moveSig('writer', 0, -3)">▲</button>
          <input type="range" id="pos_y_writer" min="-80" max="60" value="0" style="flex: 1; accent-color: #2563eb;" oninput="setSigPos('writer', 'y', this.value)">
          <button type="button" class="btn-sig-adj" onclick="moveSig('writer', 0, 3)">▼</button>
          <span id="val_pos_y_writer" style="font-size: 0.72rem; font-weight: 700; color: #334155; min-width: 32px; text-align: right;">0px</span>
        </div>
        <span style="font-size: 0.70rem; color: #94a3b8; font-style: italic;">💡 সার্টিফিকেটের ওপর মাউস দিয়ে টেনেও (Drag) সরানো যাবে</span>
      </div>
    </div>
    <div class="form-group">
      <label>প্রধান শিক্ষকের স্বাক্ষর (সিগনেচার):</label>
      <input type="file" id="upload_headmaster_sig" accept="image/*" style="display: none;" onchange="handleSigUpload(event, 'headmaster')">
      <div class="sig-upload-btn-wrap">
        <button type="button" class="btn btn-secondary" style="font-size: 0.82rem; padding: 6px 11px;" onclick="triggerSigUpload('headmaster')">✍️ আপলোড</button>
        <img id="preview_headmaster_sig" class="sig-preview-thumb" alt="Preview">
        <button type="button" id="btn_remove_headmaster_sig" class="btn-remove-sig" onclick="removeSignature('headmaster')">✕ সরান</button>
      </div>
      <div id="ctrl_headmaster_sig_size" style="display: none; margin-top: 6px; align-items: center; gap: 8px;">
        <span style="font-size: 0.78rem; color: #64748b; font-weight: 600;">সাইজ:</span>
        <button type="button" class="btn-sig-adj" onclick="adjustSigSize('headmaster', -4)">−</button>
        <input type="range" id="scale_headmaster_sig" min="24" max="120" value="52" style="flex: 1; accent-color: #2563eb;" oninput="resizeSig('headmaster', this.value)">
        <button type="button" class="btn-sig-adj" onclick="adjustSigSize('headmaster', 4)">+</button>
        <span id="val_headmaster_sig" style="font-size: 0.78rem; font-weight: 700; color: #334155; min-width: 32px;">52px</span>
      </div>
      <!-- Position Controls -->
      <div id="ctrl_headmaster_sig_pos" style="display: none; flex-direction: column; gap: 4px; margin-top: 6px; padding: 6px 8px; background: #f8fafc; border-radius: 6px; border: 1px solid #e2e8f0;">
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <span style="font-size: 0.76rem; color: #475569; font-weight: 700;">পজিশন অ্যাডজাস্ট (Position):</span>
          <button type="button" style="background: none; border: none; color: #2563eb; font-size: 0.74rem; font-weight: 600; cursor: pointer;" onclick="resetSigPos('headmaster')">↺ রিসেট</button>
        </div>
        <div style="display: flex; align-items: center; gap: 6px;">
          <span style="font-size: 0.74rem; color: #64748b; width: 45px;">ডানে-বামে:</span>
          <button type="button" class="btn-sig-adj" onclick="moveSig('headmaster', -4, 0)">◄</button>
          <input type="range" id="pos_x_headmaster" min="-120" max="120" value="0" style="flex: 1; accent-color: #2563eb;" oninput="setSigPos('headmaster', 'x', this.value)">
          <button type="button" class="btn-sig-adj" onclick="moveSig('headmaster', 4, 0)">►</button>
          <span id="val_pos_x_headmaster" style="font-size: 0.72rem; font-weight: 700; color: #334155; min-width: 32px; text-align: right;">0px</span>
        </div>
        <div style="display: flex; align-items: center; gap: 6px;">
          <span style="font-size: 0.74rem; color: #64748b; width: 45px;">উপরে-নিচে:</span>
          <button type="button" class="btn-sig-adj" onclick="moveSig('headmaster', 0, -3)">▲</button>
          <input type="range" id="pos_y_headmaster" min="-80" max="60" value="0" style="flex: 1; accent-color: #2563eb;" oninput="setSigPos('headmaster', 'y', this.value)">
          <button type="button" class="btn-sig-adj" onclick="moveSig('headmaster', 0, 3)">▼</button>
          <span id="val_pos_y_headmaster" style="font-size: 0.72rem; font-weight: 700; color: #334155; min-width: 32px; text-align: right;">0px</span>
        </div>
        <span style="font-size: 0.70rem; color: #94a3b8; font-style: italic;">💡 সার্টিফিকেটের ওপর মাউস দিয়ে টেনেও (Drag) সরানো যাবে</span>
      </div>
    <!-- QR CODE SETTINGS -->
    <div class="form-group" style="grid-column: 1 / -1; background: #f8fafc; padding: 10px 14px; border-radius: 6px; border: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
      <div style="font-weight: 700; color: #0f172a; font-size: 0.92rem; display: flex; align-items: center; gap: 6px;">
        <span>📱 ডিজিটাল সত্যতা যাচাই QR কোড:</span>
      </div>
      <div style="display: flex; align-items: center; gap: 12px;">
        <label style="cursor: pointer; font-size: 0.88rem; font-weight: 600; display: flex; align-items: center; gap: 4px;">
          <input type="checkbox" id="chkQR" checked onchange="toggleQR(this.checked)"> কিউআর কোড দৃশ্যমান
        </label>
        <button type="button" class="btn btn-secondary" style="font-size: 0.78rem; padding: 4px 8px;" onclick="resetQRPos()">↺ কিউআর পজিশন রিসেট</button>
      </div>
    </div>

    <div class="form-group" style="grid-column: 1 / -1; display: flex; justify-content: flex-end; gap: 10px;">
      <button class="btn btn-secondary" type="button" onclick="toggleFormPanel()">প্যানেল বন্ধ করুন</button>
    </div>
  </section>

  <!-- CERTIFICATE CANVAS -->
  <main class="certificate-viewport" id="certificateViewport">
    <div class="certificate-sheet" id="certificateSheet">

      <!-- LEFT: STUB (অফিস কপি) -->
      <aside class="stub-section">
        <div class="stub-header">
          <h2 class="stub-school-name" contenteditable="true" id="stub_school_name">প্রি-ক্যাডেট চাইল্ড কেয়ার হোমস্</h2>
          <img src="${assets.precadet_logo}" alt="School Logo" class="stub-logo" id="stub_logo_img">
          <div class="stub-address" contenteditable="true" id="stub_address">দেবপুর, বুড়িচং, কুমিল্লা।</div>
          <div class="stub-reg-no" contenteditable="true" id="stub_reg_no">বাংলাদেশ কিন্ডারগার্টেন এসোসিয়েশন গভ. রেজি.নং- ১০২৮/৯৮/স-৭৩৬</div>
          <div class="stub-banner-wrapper">
            <img src="${assets.stub_banner}" alt="প্রত্যয়নপত্র" class="stub-banner-img">
          </div>
        </div>

        <div class="stub-body">
          <div class="stub-row">
            <span>প্রত্যয়ন করা যাচ্ছে যে</span>
            <span class="stub-field" id="stub_view_name">মো: আবদুর রহমান</span>
          </div>
          <div class="stub-row">
            <span>পিতা:</span>
            <span class="stub-field" id="stub_view_father">মো: মোমিনুল ইসলাম</span>
          </div>
          <div class="stub-row">
            <span>মাতা:</span>
            <span class="stub-field" id="stub_view_mother">সাথী আক্তার</span>
          </div>
          <div class="stub-row">
            <span>জন্ম তারিখ:</span>
            <span class="stub-field" style="min-width: 80px;" id="stub_view_dob">০১-০৪-২০২১</span>
            <span>রোল নং:</span>
            <span class="stub-field" style="min-width: 40px;" id="stub_view_roll">১৬</span>
          </div>
          <div style="margin-top: 4px;">
            <span>অত্র বিদ্যালয়ে</span>
            <span class="stub-field" style="display: inline-block; width: 65px; text-align: center;" id="stub_view_year">২০২৬</span>
            <span>ইং সনে</span>
          </div>
          <div>
            <span class="stub-field" style="display: inline-block; width: 60px; text-align: center;" id="stub_view_class">প্লে</span>
            <span>শ্রেণিতে অধ্যয়ন করেছে।</span>
          </div>
          <div>
            <span>তার</span>
            <span class="stub-field" style="display: inline-block; width: 55px; text-align: center;" id="stub_view_eval_class">প্লে</span>
            <span>শ্রেণির শিক্ষা মূল্যায়ন সন্তোষজনক।</span>
          </div>
          <div>সে পরবর্তী শ্রেণিতে উন্নীত হওয়ার যোগ্য।</div>
          <div>আমি তাহার উজ্জ্বল ভবিষ্যৎ কামনা করি।</div>
        </div>

        <div class="stub-footer">
          <div class="stub-writer-date">
            <div style="display:flex; align-items:baseline; gap:4px; position: relative;">
              <span>লেখক:</span>
              <div style="position: relative; flex-grow: 1; display: inline-flex; align-items: baseline;">
                <div id="stub_writer_sig_wrap" class="sig-zone" style="display: none; position: absolute; bottom: 2px; left: 5px; z-index: 5;" title="মাউস দিয়ে ড্র্যাগ করে ইচ্ছামতো বসান">
                  <div class="sig-size-ctrls" onclick="event.stopPropagation();">
                    <button type="button" class="btn-sig-adj" onclick="adjustSigSize('writer', -4);" title="ছোটো করুন">−</button>
                    <button type="button" class="btn-sig-adj" onclick="adjustSigSize('writer', 4);" title="বড় করুন">+</button>
                    <div class="sig-ctrl-divider"></div>
                    <button type="button" class="btn-sig-adj" onclick="moveStubSig('writer', 0, -3);" title="উপরে তুলুন">▲</button>
                    <button type="button" class="btn-sig-adj" onclick="moveStubSig('writer', 0, 3);" title="নিচে নামান">▼</button>
                    <button type="button" class="btn-sig-adj" onclick="moveStubSig('writer', -4, 0);" title="বামে সরান">◄</button>
                    <button type="button" class="btn-sig-adj" onclick="moveStubSig('writer', 4, 0);" title="ডানে সরান">►</button>
                    <button type="button" class="btn-sig-adj" style="background: #475569;" onclick="resetStubSigPos('writer');" title="পজিশন রিসেট">↺</button>
                  </div>
                  <img id="stub_writer_sig_img" class="stub-sig-img" src="" alt="স্বাক্ষর">
                </div>
                <span class="stub-field" style="width: 105px;" id="stub_view_writer"></span>
              </div>
            </div>
            <div style="display:flex; align-items:baseline; gap:4px;">
              <span>তারিখ:</span>
              <span class="stub-field" style="width: 105px;" id="stub_view_date"></span>
            </div>
          </div>
          <div class="stub-headmaster-col">
            <div style="position: relative; width: 100%; display: flex; flex-direction: column; align-items: center;">
              <div id="stub_headmaster_sig_wrap" class="sig-zone" style="display: none; position: absolute; bottom: 3px; z-index: 5;" title="মাউস দিয়ে ড্র্যাগ করে ইচ্ছামতো বসান">
                <div class="sig-size-ctrls" onclick="event.stopPropagation();">
                  <button type="button" class="btn-sig-adj" onclick="adjustSigSize('headmaster', -4);" title="ছোটো করুন">−</button>
                  <button type="button" class="btn-sig-adj" onclick="adjustSigSize('headmaster', 4);" title="বড় করুন">+</button>
                  <div class="sig-ctrl-divider"></div>
                  <button type="button" class="btn-sig-adj" onclick="moveStubSig('headmaster', 0, -3);" title="উপরে তুলুন">▲</button>
                  <button type="button" class="btn-sig-adj" onclick="moveStubSig('headmaster', 0, 3);" title="নিচে নামান">▼</button>
                  <button type="button" class="btn-sig-adj" onclick="moveStubSig('headmaster', -4, 0);" title="বামে সরান">◄</button>
                  <button type="button" class="btn-sig-adj" onclick="moveStubSig('headmaster', 4, 0);" title="ডানে সরান">►</button>
                  <button type="button" class="btn-sig-adj" style="background: #475569;" onclick="resetStubSigPos('headmaster');" title="পজিশন রিসেট">↺</button>
                </div>
                <img id="stub_headmaster_sig_img" class="stub-sig-img" src="" alt="প্রধান শিক্ষকের স্বাক্ষর">
              </div>
              <div class="stub-sign-line"></div>
            </div>
            <div class="stub-signature-title">প্রধান শিক্ষক</div>
          </div>
        </div>
      </aside>

      <!-- RIGHT: MAIN CERTIFICATE (মূল সনদ) -->
      <section class="certificate-main">
        <div class="ornate-border-overlay"></div>
        <div class="watermark-bg" id="watermark_bg" style="background-image: url('${assets.precadet_logo}');"></div>

        <!-- LIVE SCANNABLE VERIFICATION QR CODE (Top-Right Header Corner) -->
        <div id="main_qr_container" class="cert-qr-wrap" title="মাউস দিয়ে ড্র্যাগ করে ইচ্ছামতো বসান">
          <div id="live_qrcode_canvas"></div>
        </div>

        <div class="certificate-content">
          <!-- Header -->
          <div class="cert-header">
            <h1 class="cert-school-name" contenteditable="true" id="cert_school_name">প্রি-ক্যাডেট চাইল্ড কেয়ার হোমস্</h1>
            <img src="${assets.precadet_logo}" alt="School Logo" class="cert-logo" id="cert_logo_img">
            <div class="cert-address" contenteditable="true" id="cert_address">দেবপুর, বুড়িচং, কুমিল্লা।</div>
            <div class="cert-reg-no" contenteditable="true" id="cert_reg_no">বাংলাদেশ কিন্ডারগার্টেন এসোসিয়েশন গভ. রেজি.নং- ১০২৮/৯৮/স-৭৩৬</div>
          </div>

          <!-- Banner Title (Clean Vector Banner with Authentic Calligraphy) -->
          <div class="cert-banner-wrapper">
            <img src="${assets.clean_banner}" alt="প্রত্যয়নপত্র" class="cert-banner-img">
          </div>

          <!-- Body Text -->
          <div class="cert-body">
            <div style="margin-bottom: 4px;">
              <span>প্রত্যয়ন করা যাচ্ছে যে</span>
              <span class="dotted-fill dotted-fill-wide" id="main_view_name" contenteditable="true">মো: আবদুর রহমান</span>
            </div>

            <div style="margin-bottom: 4px;">
              <span>পিতা:</span>
              <span class="dotted-fill dotted-fill-wide" style="min-width: 530px;" id="main_view_father" contenteditable="true">মো: মোমিনুল ইসলাম</span>
            </div>

            <div style="margin-bottom: 4px;">
              <span>মাতা:</span>
              <span class="dotted-fill dotted-fill-wide" style="min-width: 525px;" id="main_view_mother" contenteditable="true">সাথী আক্তার</span>
            </div>

            <div style="margin-bottom: 4px; display: flex; align-items: baseline;">
              <span>জন্ম তারিখ:</span>
              <span class="dotted-fill dotted-fill-mid" id="main_view_dob" contenteditable="true">০১-০৪-২০২১</span>
              <span style="margin-left: 28px;">রোল নং:</span>
              <span class="dotted-fill dotted-fill-mid" style="flex-grow: 1;" id="main_view_roll" contenteditable="true">১৬</span>
            </div>

            <div style="margin-bottom: 4px;">
              <span>অত্র বিদ্যালয়ে</span>
              <span class="dotted-fill dotted-fill-short" id="main_view_year" contenteditable="true">২০২৬</span>
              <span>ইং সনে</span>
              <span class="dotted-fill dotted-fill-short" id="main_view_class" contenteditable="true">প্লে</span>
              <span>শ্রেণিতে অধ্যয়ন করেছে।</span>
            </div>

            <div style="margin-bottom: 4px;">
              <span>তার</span>
              <span class="dotted-fill dotted-fill-short" id="main_view_eval_class" contenteditable="true">প্লে</span>
              <span>শ্রেণির শিক্ষা মূল্যায়ন সন্তোষজনক।</span>
            </div>

            <div style="margin-bottom: 4px;">সে পরবর্তী শ্রেণিতে উন্নীত হওয়ার যোগ্য।</div>
            <div>আমি তাহার উজ্জ্বল ভবিষ্যৎ কামনা করি।</div>
          </div>

          <!-- Footer ( লেখক ও প্রধান শিক্ষকের স্বাক্ষর এবং নিখুঁত অবস্থান ) -->
          <div class="cert-footer">
            <div class="footer-left">
              <div class="footer-left-row" style="position: relative;">
                <span>লেখক:</span>
                <div style="position: relative; display: inline-flex; align-items: baseline;">
                  <div id="main_writer_sig_wrap" class="sig-zone" style="display: none; position: absolute; bottom: 2px; left: 15px; z-index: 5;" title="মাউস দিয়ে টেনে (Drag) যেকোনো জায়গায় বসান">
                    <div class="sig-size-ctrls" onclick="event.stopPropagation();">
                      <button type="button" class="btn-sig-adj" onclick="adjustSigSize('writer', -4);" title="ছোটো করুন">−</button>
                      <button type="button" class="btn-sig-adj" onclick="adjustSigSize('writer', 4);" title="বড় করুন">+</button>
                      <div class="sig-ctrl-divider"></div>
                      <button type="button" class="btn-sig-adj" onclick="moveSig('writer', 0, -3);" title="উপরে তুলুন">▲</button>
                      <button type="button" class="btn-sig-adj" onclick="moveSig('writer', 0, 3);" title="নিচে নামান">▼</button>
                      <button type="button" class="btn-sig-adj" onclick="moveSig('writer', -4, 0);" title="বামে সরান">◄</button>
                      <button type="button" class="btn-sig-adj" onclick="moveSig('writer', 4, 0);" title="ডানে সরান">►</button>
                      <button type="button" class="btn-sig-adj" style="background: #475569;" onclick="resetSigPos('writer');" title="পজিশন রিসেট">↺</button>
                      <div class="sig-ctrl-divider"></div>
                      <button type="button" class="btn-sig-adj" style="background: #059669;" onclick="triggerSigUpload('writer');" title="স্বাক্ষর পরিবর্তন/আপলোড">✎</button>
                    </div>
                    <img id="main_writer_sig_img" class="sig-img" src="" alt="লেখকের স্বাক্ষর">
                  </div>
                  <span class="footer-dotted" id="main_view_writer" contenteditable="true"></span>
                </div>
              </div>
              <div class="footer-left-row">
                <span>তারিখ:</span>
                <span class="footer-dotted" id="main_view_date" contenteditable="true"></span>
              </div>
            </div>

            <div class="footer-right">
              <div style="position: relative; display: flex; flex-direction: column; align-items: center;">
                <div id="main_headmaster_sig_wrap" class="sig-zone" style="display: none; position: absolute; bottom: 3px; z-index: 5;" title="মাউস দিয়ে টেনে (Drag) যেকোনো জায়গায় বসান">
                  <div class="sig-size-ctrls" onclick="event.stopPropagation();">
                    <button type="button" class="btn-sig-adj" onclick="adjustSigSize('headmaster', -4);" title="ছোটো করুন">−</button>
                    <button type="button" class="btn-sig-adj" onclick="adjustSigSize('headmaster', 4);" title="বড় করুন">+</button>
                    <div class="sig-ctrl-divider"></div>
                    <button type="button" class="btn-sig-adj" onclick="moveSig('headmaster', 0, -3);" title="উপরে তুলুন">▲</button>
                    <button type="button" class="btn-sig-adj" onclick="moveSig('headmaster', 0, 3);" title="নিচে নামান">▼</button>
                    <button type="button" class="btn-sig-adj" onclick="moveSig('headmaster', -4, 0);" title="বামে সরান">◄</button>
                    <button type="button" class="btn-sig-adj" onclick="moveSig('headmaster', 4, 0);" title="ডানে সরান">►</button>
                    <button type="button" class="btn-sig-adj" style="background: #475569;" onclick="resetSigPos('headmaster');" title="পজিশন রিসেট">↺</button>
                    <div class="sig-ctrl-divider"></div>
                    <button type="button" class="btn-sig-adj" style="background: #059669;" onclick="triggerSigUpload('headmaster');" title="স্বাক্ষর পরিবর্তন/আপলোড">✎</button>
                  </div>
                  <img id="main_headmaster_sig_img" class="sig-img" src="" alt="প্রধান শিক্ষকের স্বাক্ষর">
                </div>
                <div class="sign-line"></div>
              </div>
              <div class="headmaster-title" contenteditable="true">প্রধান শিক্ষক</div>
            </div>
          </div>
        </div>
      </section>

    </div>
  </main>

  <script>
    // Offline Live QR Code Library
    ${qrcodeLib}

    const SCHOOL_DATA = {
      precadet: {
        name: 'প্রি-ক্যাডেট চাইল্ড কেয়ার হোমস্',
        address: 'দেবপুর, বুড়িচং, কুমিল্লা।',
        reg: 'বাংলাদেশ কিন্ডারগার্টেন এসোসিয়েশন গভ. রেজি.নং- ১০২৮/৯৮/স-৭৩৬',
        logo: '${assets.precadet_logo}'
      },
      shawkat: {
        name: 'শওকত ভূঁইয়া চাইল্ড কেয়ার হোমস্',
        address: 'কংশনগর, বুড়িচং, কুমিল্লা',
        reg: '',
        logo: '${assets.logo}'
      }
    };

    let writerSigSize = 48;
    let headmasterSigSize = 52;
    let sigPositions = {
      writer: { x: 0, y: 0 },
      headmaster: { x: 0, y: 0 }
    };
    let stubSigPositions = {
      writer: { x: 0, y: 0 },
      headmaster: { x: 0, y: 0 }
    };

    function applySigPos(type) {
      const pos = sigPositions[type];
      const mainWrap = document.getElementById('main_' + type + '_sig_wrap');
      if (mainWrap) {
        mainWrap.style.transform = 'translate(' + pos.x + 'px, ' + pos.y + 'px)';
      }
      applyStubSigPos(type);

      const sliderX = document.getElementById('pos_x_' + type);
      const sliderY = document.getElementById('pos_y_' + type);
      const valX = document.getElementById('val_pos_x_' + type);
      const valY = document.getElementById('val_pos_y_' + type);
      if (sliderX) sliderX.value = pos.x;
      if (sliderY) sliderY.value = pos.y;
      if (valX) valX.innerText = (pos.x > 0 ? '+' : '') + pos.x + 'px';
      if (valY) valY.innerText = (pos.y > 0 ? '+' : '') + pos.y + 'px';
    }

    function applyStubSigPos(type) {
      const stubWrap = document.getElementById('stub_' + type + '_sig_wrap');
      if (stubWrap) {
        const totalX = Math.round(sigPositions[type].x * 0.6) + stubSigPositions[type].x;
        const totalY = Math.round(sigPositions[type].y * 0.6) + stubSigPositions[type].y;
        stubWrap.style.transform = 'translate(' + totalX + 'px, ' + totalY + 'px)';
      }
    }

    function moveSig(type, dx, dy) {
      sigPositions[type].x = Math.max(-120, Math.min(120, sigPositions[type].x + dx));
      sigPositions[type].y = Math.max(-80, Math.min(60, sigPositions[type].y + dy));
      applySigPos(type);
    }

    function moveStubSig(type, dx, dy) {
      stubSigPositions[type].x = Math.max(-60, Math.min(60, stubSigPositions[type].x + dx));
      stubSigPositions[type].y = Math.max(-40, Math.min(40, stubSigPositions[type].y + dy));
      applyStubSigPos(type);
    }

    function resetStubSigPos(type) {
      stubSigPositions[type].x = 0;
      stubSigPositions[type].y = 0;
      applyStubSigPos(type);
    }

    function setSigPos(type, axis, val) {
      val = parseInt(val, 10);
      if (isNaN(val)) return;
      sigPositions[type][axis] = val;
      applySigPos(type);
    }

    function resetSigPos(type) {
      sigPositions[type].x = 0;
      sigPositions[type].y = 0;
      stubSigPositions[type].x = 0;
      stubSigPositions[type].y = 0;
      applySigPos(type);
    }

    function makeElementDraggable(elId, getPos, setPos, onUpdate) {
      const el = document.getElementById(elId);
      if (!el) return;
      let isDragging = false;
      let startX, startY;
      let initialPosX, initialPosY;

      function onPointerDown(e) {
        if (e.target.closest('.sig-size-ctrls')) return;
        isDragging = true;
        const clientX = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
        const clientY = e.clientY !== undefined ? e.clientY : (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
        startX = clientX;
        startY = clientY;
        const currentPos = getPos();
        initialPosX = currentPos.x;
        initialPosY = currentPos.y;
        el.style.cursor = 'grabbing';
        document.addEventListener('mousemove', onPointerMove);
        document.addEventListener('mouseup', onPointerUp);
        document.addEventListener('touchmove', onPointerMove, { passive: false });
        document.addEventListener('touchend', onPointerUp);
        e.preventDefault();
      }

      function onPointerMove(e) {
        if (!isDragging) return;
        const clientX = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
        const clientY = e.clientY !== undefined ? e.clientY : (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
        const dx = clientX - startX;
        const dy = clientY - startY;
        setPos(initialPosX + dx, initialPosY + dy);
        onUpdate();
        if (e.cancelable) e.preventDefault();
      }

      function onPointerUp() {
        if (!isDragging) return;
        isDragging = false;
        el.style.cursor = 'grab';
        document.removeEventListener('mousemove', onPointerMove);
        document.removeEventListener('mouseup', onPointerUp);
        document.removeEventListener('touchmove', onPointerMove);
        document.removeEventListener('touchend', onPointerUp);
      }

      el.addEventListener('mousedown', onPointerDown);
      el.addEventListener('touchstart', onPointerDown, { passive: false });
      el.style.cursor = 'grab';
    }

    function switchSchool(key) {
      const school = SCHOOL_DATA[key];
      if (!school) return;

      document.getElementById('stub_school_name').innerText = school.name;
      document.getElementById('cert_school_name').innerText = school.name;

      document.getElementById('stub_address').innerText = school.address;
      document.getElementById('cert_address').innerText = school.address;

      document.getElementById('stub_reg_no').innerText = school.reg;
      document.getElementById('cert_reg_no').innerText = school.reg;

      document.getElementById('stub_logo_img').src = school.logo;
      document.getElementById('cert_logo_img').src = school.logo;
      document.getElementById('watermark_bg').style.backgroundImage = 'url(\"' + school.logo + '\")';
    }

    function toggleFormPanel() {
      const panel = document.getElementById('formPanel');
      panel.classList.toggle('hidden');
    }

    function syncData() {
      const name = document.getElementById('input_student_name').value;
      const father = document.getElementById('input_father_name').value;
      const mother = document.getElementById('input_mother_name').value;
      const dob = document.getElementById('input_dob').value;
      const roll = document.getElementById('input_roll').value;
      const year = document.getElementById('input_year').value;
      const cls = document.getElementById('input_class').value;
      const writer = document.getElementById('input_writer').value;
      const dateVal = document.getElementById('input_date').value;

      // Sync Stub (Left - Not Bold)
      document.getElementById('stub_view_name').innerText = name;
      document.getElementById('stub_view_father').innerText = father;
      document.getElementById('stub_view_mother').innerText = mother;
      document.getElementById('stub_view_dob').innerText = dob;
      document.getElementById('stub_view_roll').innerText = roll;
      document.getElementById('stub_view_year').innerText = year;
      document.getElementById('stub_view_class').innerText = cls;
      document.getElementById('stub_view_eval_class').innerText = cls;
      document.getElementById('stub_view_writer').innerText = writer;
      document.getElementById('stub_view_date').innerText = dateVal;

      // Sync Main (Right - Bold)
      document.getElementById('main_view_name').innerText = name;
      document.getElementById('main_view_father').innerText = father;
      document.getElementById('main_view_mother').innerText = mother;
      document.getElementById('main_view_dob').innerText = dob;
      document.getElementById('main_view_roll').innerText = roll;
      document.getElementById('main_view_year').innerText = year;
      document.getElementById('main_view_class').innerText = cls;
      document.getElementById('main_view_eval_class').innerText = cls;
      document.getElementById('main_view_writer').innerText = writer;
      document.getElementById('main_view_date').innerText = dateVal;

      // Update Live Verification QR
      updateLiveQR();
    }

    // SIGNATURE UPLOAD & MANAGEMENT
    function triggerSigUpload(type) {
      if (type === 'writer') {
        document.getElementById('upload_writer_sig').click();
      } else if (type === 'headmaster') {
        document.getElementById('upload_headmaster_sig').click();
      }
    }

    function handleSigUpload(event, type) {
      const file = event.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function(e) {
        setSignature(type, e.target.result);
      };
      reader.readAsDataURL(file);
    }

    function setSignature(type, dataUrl) {
      if (type === 'writer') {
        const mainWrap = document.getElementById('main_writer_sig_wrap');
        const mainImg = document.getElementById('main_writer_sig_img');
        const stubWrap = document.getElementById('stub_writer_sig_wrap');
        const stubImg = document.getElementById('stub_writer_sig_img');
        const removeBtn = document.getElementById('btn_remove_writer_sig');
        const preview = document.getElementById('preview_writer_sig');
        const sizeCtrl = document.getElementById('ctrl_writer_sig_size');
        const posCtrl = document.getElementById('ctrl_writer_sig_pos');

        if (dataUrl) {
          if (mainImg) mainImg.src = dataUrl;
          if (mainWrap) mainWrap.style.display = 'block';
          if (stubImg) stubImg.src = dataUrl;
          if (stubWrap) stubWrap.style.display = 'block';
          if (removeBtn) removeBtn.style.display = 'inline-block';
          if (preview) { preview.src = dataUrl; preview.style.display = 'inline-block'; }
          if (sizeCtrl) sizeCtrl.style.display = 'flex';
          if (posCtrl) posCtrl.style.display = 'flex';
          resizeSig('writer', writerSigSize);
          applySigPos('writer');
        } else {
          if (mainImg) mainImg.src = '';
          if (mainWrap) mainWrap.style.display = 'none';
          if (stubImg) stubImg.src = '';
          if (stubWrap) stubWrap.style.display = 'none';
          if (removeBtn) removeBtn.style.display = 'none';
          if (preview) { preview.src = ''; preview.style.display = 'none'; }
          if (sizeCtrl) sizeCtrl.style.display = 'none';
          if (posCtrl) posCtrl.style.display = 'none';
          const input = document.getElementById('upload_writer_sig');
          if (input) input.value = '';
          resetSigPos('writer');
        }
      } else if (type === 'headmaster') {
        const mainWrap = document.getElementById('main_headmaster_sig_wrap');
        const mainImg = document.getElementById('main_headmaster_sig_img');
        const stubWrap = document.getElementById('stub_headmaster_sig_wrap');
        const stubImg = document.getElementById('stub_headmaster_sig_img');
        const removeBtn = document.getElementById('btn_remove_headmaster_sig');
        const preview = document.getElementById('preview_headmaster_sig');
        const sizeCtrl = document.getElementById('ctrl_headmaster_sig_size');
        const posCtrl = document.getElementById('ctrl_headmaster_sig_pos');

        if (dataUrl) {
          if (mainImg) mainImg.src = dataUrl;
          if (mainWrap) mainWrap.style.display = 'block';
          if (stubImg) stubImg.src = dataUrl;
          if (stubWrap) stubWrap.style.display = 'block';
          if (removeBtn) removeBtn.style.display = 'inline-block';
          if (preview) { preview.src = dataUrl; preview.style.display = 'inline-block'; }
          if (sizeCtrl) sizeCtrl.style.display = 'flex';
          if (posCtrl) posCtrl.style.display = 'flex';
          resizeSig('headmaster', headmasterSigSize);
          applySigPos('headmaster');
        } else {
          if (mainImg) mainImg.src = '';
          if (mainWrap) mainWrap.style.display = 'none';
          if (stubImg) stubImg.src = '';
          if (stubWrap) stubWrap.style.display = 'none';
          if (removeBtn) removeBtn.style.display = 'none';
          if (preview) { preview.src = ''; preview.style.display = 'none'; }
          if (sizeCtrl) sizeCtrl.style.display = 'none';
          if (posCtrl) posCtrl.style.display = 'none';
          const input = document.getElementById('upload_headmaster_sig');
          if (input) input.value = '';
          resetSigPos('headmaster');
        }
      }
    }

    function removeSignature(type) {
      setSignature(type, '');
    }

    function resizeSig(type, size) {
      size = parseInt(size, 10);
      if (isNaN(size)) return;
      if (type === 'writer') {
        writerSigSize = size;
        const img = document.getElementById('main_writer_sig_img');
        const stubImg = document.getElementById('stub_writer_sig_img');
        const slider = document.getElementById('scale_writer_sig');
        const valText = document.getElementById('val_writer_sig');
        if (img) img.style.maxHeight = size + 'px';
        if (stubImg) stubImg.style.maxHeight = Math.round(size * 0.6) + 'px';
        if (slider) slider.value = size;
        if (valText) valText.innerText = size + 'px';
      } else if (type === 'headmaster') {
        headmasterSigSize = size;
        const img = document.getElementById('main_headmaster_sig_img');
        const stubImg = document.getElementById('stub_headmaster_sig_img');
        const slider = document.getElementById('scale_headmaster_sig');
        const valText = document.getElementById('val_headmaster_sig');
        if (img) img.style.maxHeight = size + 'px';
        if (stubImg) stubImg.style.maxHeight = Math.round(size * 0.6) + 'px';
        if (slider) slider.value = size;
        if (valText) valText.innerText = size + 'px';
      }
    }

    function adjustSigSize(type, delta) {
      if (type === 'writer') {
        resizeSig('writer', Math.max(24, Math.min(110, writerSigSize + delta)));
      } else if (type === 'headmaster') {
        resizeSig('headmaster', Math.max(24, Math.min(120, headmasterSigSize + delta)));
      }
    }

    function loadSampleData() {
      document.getElementById('input_student_name').value = 'মো: আবদুর রহমান';
      document.getElementById('input_father_name').value = 'মো: মোমিনুল ইসলাম';
      document.getElementById('input_mother_name').value = 'সাথী আক্তার';
      document.getElementById('input_dob').value = '০১-০৪-২০২১';
      document.getElementById('input_roll').value = '১৬';
      document.getElementById('input_year').value = '২০২৬';
      document.getElementById('input_class').value = 'প্লে';
      document.getElementById('input_writer').value = '';
      document.getElementById('input_date').value = '';
      syncData();
    }

    function clearToBlank() {
      document.getElementById('input_student_name').value = '';
      document.getElementById('input_father_name').value = '';
      document.getElementById('input_mother_name').value = '';
      document.getElementById('input_dob').value = '';
      document.getElementById('input_roll').value = '';
      document.getElementById('input_year').value = '';
      document.getElementById('input_class').value = '';
      document.getElementById('input_writer').value = '';
      document.getElementById('input_date').value = '';
      removeSignature('writer');
      removeSignature('headmaster');
      syncData();
    }

    function printCertificate() {
      window.print();
    }

    function downloadAsImage() {
      const sheet = document.getElementById('certificateSheet');
      const cutLine = document.querySelector('.cut-line-indicator');
      if (cutLine) cutLine.style.display = 'none';

      html2canvas(sheet, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      }).then(canvas => {
        if (cutLine) cutLine.style.display = 'block';
        const link = document.createElement('a');
        const schoolKey = document.getElementById('schoolSelector').value;
        const schoolTitle = schoolKey === 'precadet' ? 'প্রি_ক্যাডেট' : 'শওকত_ভূঁইয়া';
        link.download = 'প্রত্যয়নপত্র_' + schoolTitle + '_' + (document.getElementById('input_student_name').value || 'নমুনা') + '.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      }).catch(err => {
        if (cutLine) cutLine.style.display = 'block';
        alert('ছবি ডাউনলোড তৈরিতে সমস্যা হয়েছে: ' + err.message);
      });
    }

    // Initialize
    syncData();
    makeElementDraggable('main_writer_sig_wrap', () => sigPositions.writer, (x, y) => {
      sigPositions.writer.x = Math.max(-120, Math.min(120, x));
      sigPositions.writer.y = Math.max(-80, Math.min(60, y));
    }, () => applySigPos('writer'));

    makeElementDraggable('main_headmaster_sig_wrap', () => sigPositions.headmaster, (x, y) => {
      sigPositions.headmaster.x = Math.max(-120, Math.min(120, x));
      sigPositions.headmaster.y = Math.max(-80, Math.min(60, y));
    }, () => applySigPos('headmaster'));

    makeElementDraggable('stub_writer_sig_wrap', () => stubSigPositions.writer, (x, y) => {
      stubSigPositions.writer.x = Math.max(-60, Math.min(60, x));
      stubSigPositions.writer.y = Math.max(-40, Math.min(40, y));
    }, () => applyStubSigPos('writer'));

    // QR Code Live Generation & Controls
    function updateLiveQR() {
      const qrBox = document.getElementById('live_qrcode_canvas');
      if (!qrBox || typeof qrcode !== 'function') return;
      qrBox.innerHTML = '';

      const name = document.getElementById('input_student_name') ? document.getElementById('input_student_name').value.trim() : 'মো: আবদুর রহমান';
      const roll = document.getElementById('input_roll') ? document.getElementById('input_roll').value.trim() : '১৬';
      const cls = document.getElementById('input_class') ? document.getElementById('input_class').value.trim() : 'প্লে';
      const year = document.getElementById('input_year') ? document.getElementById('input_year').value.trim() : '২০২৬';
      const serial = (document.getElementById('input_serial') ? document.getElementById('input_serial').value.trim() : '') || 'CERT-2026-PC-0142';

      // Concise verification card format: Scans in 0.1s on Google Lens & displays directly on screen
      const verifyData = 'CERTIFICATE VERIFIED\n' +
        'Serial: ' + serial + '\n' +
        'Name: ' + name + '\n' +
        'Class: ' + cls + ' | Roll: ' + roll + '\n' +
        'Year: ' + year + '\n' +
        'Status: ORIGINAL & AUTHENTIC';

      try {
        const qr = qrcode(0, 'L');
        qr.addData(unescape(encodeURIComponent(verifyData)));
        qr.make();
        qrBox.innerHTML = qr.createSvgTag(2.5, 2);
      } catch (e) {
        console.error('QR creation error:', e);
      }
    }

    let isQRVisible = true;
    function toggleQR(show) {
      if (show === undefined) isQRVisible = !isQRVisible;
      else isQRVisible = !!show;
      const el = document.getElementById('main_qr_container');
      if (el) el.style.display = isQRVisible ? 'flex' : 'none';
      const btn = document.getElementById('btnToggleQR');
      if (btn) {
        btn.innerText = isQRVisible ? '📱 কিউআর: অন' : '📱 কিউআর: অফ';
        btn.style.background = isQRVisible ? '#0d9488' : '#64748b';
      }
      const chk = document.getElementById('chkQR');
      if (chk) chk.checked = isQRVisible;
    }

    let qrPosition = { x: 0, y: 0 };
    function applyQRPos() {
      const el = document.getElementById('main_qr_container');
      if (el) el.style.transform = 'translate(' + qrPosition.x + 'px, ' + qrPosition.y + 'px)';
    }
    function resetQRPos() {
      qrPosition = { x: 0, y: 0 };
      applyQRPos();
    }

    makeElementDraggable('main_qr_container', () => qrPosition, (x, y) => {
      qrPosition.x = Math.max(-250, Math.min(60, x));
      qrPosition.y = Math.max(-20, Math.min(250, y));
    }, applyQRPos);
  </script>
</body>
</html>`;

fs.writeFileSync('index.html', htmlContent);
fs.writeFileSync('প্রত্যয়নপত্র_জেনারেটর.html', htmlContent);
fs.writeFileSync('প্রত্যয়নপত্র_প্রি_ক্যাডেট_হোমস.html', htmlContent);
console.log('index.html, প্রত্যয়নপত্র_জেনারেটর.html, প্রত্যয়নপত্র_প্রি_ক্যাডেট_হোমস.html successfully rebuilt with signature resizing!');
