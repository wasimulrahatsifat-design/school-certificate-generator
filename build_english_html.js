const fs = require('fs');

const assets = JSON.parse(fs.readFileSync('assets_base64.json', 'utf8'));
const qrcodeLib = fs.readFileSync('qrcode.min.js', 'utf8');

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Student Certificate / Testimonial Generator</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;800;900&family=EB+Garamond:ital,wght@0,400;0,600;0,700;0,800;1,400;1,600&family=Inter:wght@400;500;600;700&family=Montserrat:wght@600;700;800;900&display=swap" rel="stylesheet">
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
      font-family: 'EB Garamond', 'Times New Roman', serif;
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
      font-family: 'Inter', system-ui, sans-serif !important;
    }

    .brand-title {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 1.15rem;
      font-weight: 700;
      font-family: 'Inter', sans-serif !important;
    }
    .brand-badge {
      background: #f59e0b;
      color: #000;
      font-size: 0.72rem;
      padding: 3px 8px;
      border-radius: 4px;
      font-weight: 800;
      font-family: 'Inter', sans-serif !important;
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
      font-family: 'Inter', sans-serif !important;
    }
    .school-select {
      background: #1e293b;
      color: #fff;
      border: 1px solid #475569;
      padding: 5px 10px;
      border-radius: 4px;
      font-size: 0.9rem;
      font-family: 'Inter', sans-serif !important;
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
      font-family: 'Inter', sans-serif !important;
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

    .btn-lang {
      background: #7c3aed;
      color: white;
    }
    .btn-lang:hover {
      background: #6d28d9;
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
      font-family: 'Inter', sans-serif !important;
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
      font-family: 'Inter', sans-serif !important;
    }
    .form-group input, .form-group select {
      padding: 7px 11px;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      font-size: 0.94rem;
      font-family: 'EB Garamond', serif;
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
      font-family: 'EB Garamond', 'Times New Roman', serif;
    }

    /* LEFT SECTION: STUB / COUNTERFOIL (OFFICE COPY) */
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
      font-family: 'Inter', sans-serif !important;
    }

    .stub-header {
      text-align: center;
    }
    .stub-school-name {
      font-size: 0.90rem;
      font-weight: 900;
      font-family: 'Montserrat', sans-serif;
      -webkit-text-stroke: 0.3px #0f172a;
      color: #0f172a;
      margin-bottom: 3px;
      letter-spacing: 0.2px;
      text-transform: uppercase;
      white-space: nowrap;
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
      font-family: 'Inter', sans-serif;
      -webkit-text-stroke: 0.35px #0f172a;
      margin-bottom: 1px;
    }
    .stub-reg-no {
      font-size: 0.49rem;
      font-weight: 800;
      font-family: 'Inter', sans-serif;
      -webkit-text-stroke: 0.15px #0f172a;
      color: #0f172a;
      margin-top: 1px;
      margin-bottom: 4px;
      white-space: nowrap;
      letter-spacing: -0.32px;
      text-align: center;
      max-width: 100%;
      display: block;
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
      font-family: 'EB Garamond', serif;
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
      font-weight: 400 !important; /* Left side: NOT bold */
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
      font-family: 'Inter', sans-serif;
    }

    /* RIGHT SECTION: MAIN CERTIFICATE (ORIGINAL) */
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
      background: url('${assets.precadet_logo_en}') no-repeat center center;
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
      font-size: 1.85rem;
      font-weight: 900;
      font-family: 'Montserrat', sans-serif;
      -webkit-text-stroke: 0.6px #000;
      color: #000000;
      letter-spacing: 0.6px;
      margin-bottom: 1px;
      text-transform: uppercase;
      white-space: nowrap;
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
      font-size: 1.15rem;
      font-weight: 800;
      font-family: 'Inter', sans-serif;
      -webkit-text-stroke: 0.4px #0f172a;
      color: #0f172a;
      margin-top: 2px;
      letter-spacing: 0.5px;
    }
    .cert-reg-no {
      font-size: 0.95rem;
      font-weight: 800;
      font-family: 'Inter', sans-serif;
      -webkit-text-stroke: 0.35px #0f172a;
      color: #0f172a;
      margin-top: 2px;
      white-space: nowrap;
      letter-spacing: 0.3px;
    }

    /* TITLE BANNER (Vector Banner) */
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
      font-size: 1.25rem;
      line-height: 1.82;
      color: #0f172a;
      text-align: justify;
      font-family: 'EB Garamond', serif;
    }

    /* RIGHT SIDE: BOLD */
    .dotted-fill {
      border-bottom: 2px dotted #475569;
      display: inline-block;
      font-weight: 800 !important; /* Right side: BOLD */
      -webkit-text-stroke: 0.35px #000;
      color: #000000;
      padding: 0 8px;
      text-align: center;
      font-family: 'EB Garamond', serif;
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

    /* CERTIFICATE FOOTER */
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
      font-family: 'EB Garamond', serif;
      font-size: 1.15rem;
    }
    .footer-dotted {
      border-bottom: 2px dotted #475569;
      min-width: 200px;
      display: inline-block;
      padding-left: 6px;
      font-weight: 800 !important; /* Right side: BOLD */
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
      font-size: 1.2rem;
      font-weight: 800;
      color: #0f172a;
      font-family: 'EB Garamond', serif;
    }

    /* EDITABLE HOVER */
    [contenteditable="true"]:hover {
      outline: 2px dashed #2563eb;
      background: rgba(37, 99, 235, 0.05);
      border-radius: 2px;
      cursor: text;
    }

    /* PRINT STYLES (Strict Single Page A4 Landscape) */
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
      .top-toolbar, .form-panel, .cut-line-indicator, .sig-size-ctrls {
        display: none !important;
      }
      .certificate-viewport {
        margin: 0 !important;
        box-shadow: none !important;
        border-radius: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
      }
      .certificate-sheet {
        width: 297mm !important;
        height: 210mm !important;
        page-break-after: avoid !important;
        page-break-inside: avoid !important;
      }
    }
  </style>
</head>
<body>

  <!-- TOP TOOLBAR -->
  <header class="top-toolbar">
    <div class="brand-title">
      <span>🏫 Certificate Generator</span>
      <span class="brand-badge">English Version / A4 Landscape</span>
    </div>

    <!-- SCHOOL SELECTOR -->
    <div class="school-selector-wrap">
      <label>School:</label>
      <select class="school-select" id="schoolSelector" onchange="switchSchool(this.value)">
        <option value="precadet" selected>🏫 Pre-Cadet Child Care Homes</option>
        <option value="shawkat">🏫 Shawkat Bhuiyan Child Care Homes</option>
      </select>
    </div>

    <div class="action-buttons">
      <a href="index.html" class="btn btn-lang">🇧🇩 বাংলা ভার্সন</a>
      <button type="button" id="btnToggleQR" class="btn" style="background:#0d9488; color:#fff;" onclick="toggleQR();">📱 QR: ON</button>
      <button class="btn btn-primary" onclick="toggleFormPanel()">✏️ Edit Form & Signatures</button>
      <button class="btn btn-warning" onclick="loadSampleData()">⭐ Sample Data</button>
      <button class="btn btn-secondary" onclick="clearToBlank()">📄 Blank Form</button>
      <button class="btn btn-success" onclick="printCertificate()">🖨️ Print / PDF</button>
      <button class="btn btn-primary" onclick="downloadAsImage()">🖼️ Image (PNG)</button>
    </div>
  </header>

  <!-- COLLAPSIBLE FORM PANEL -->
  <section class="form-panel" id="formPanel">
    <div class="form-group">
      <label>Student Name:</label>
      <input type="text" id="input_name" value="Md. Abdur Rahman" oninput="updateField('name', this.value)">
    </div>
    <div class="form-group">
      <label>Father's Name:</label>
      <input type="text" id="input_father" value="Md. Mominul Islam" oninput="updateField('father', this.value)">
    </div>
    <div class="form-group">
      <label>Mother's Name:</label>
      <input type="text" id="input_mother" value="Sathi Akter" oninput="updateField('mother', this.value)">
    </div>
    <div class="form-group">
      <label>Date of Birth:</label>
      <input type="text" id="input_dob" value="01-04-2021" oninput="updateField('dob', this.value)">
    </div>
    <div class="form-group">
      <label>Roll No:</label>
      <input type="text" id="input_roll" value="16" oninput="updateField('roll', this.value)">
    </div>
    <div class="form-group">
      <label>Academic Year:</label>
      <input type="text" id="input_year" value="2026" oninput="updateField('year', this.value)">
    </div>
    <div class="form-group">
      <label>Class:</label>
      <input type="text" id="input_class" value="Play" oninput="updateField('class', this.value)">
    </div>
    <div class="form-group">
      <label>Prepared by:</label>
      <input type="text" id="input_writer" value="" placeholder="Writer / Prepared by (Optional)" oninput="updateField('writer', this.value)">
    </div>
    <div class="form-group">
      <label>Date:</label>
      <input type="text" id="input_date" value="" placeholder="Date (Optional)" oninput="updateField('date', this.value)">
    </div>
    <div class="form-group">
      <label>Tracking Serial No:</label>
      <div style="display: flex; gap: 6px;">
        <input type="text" id="input_serial" value="CERT-2026-PC-0142" style="flex: 1;" oninput="updateLiveQR()">
        <button type="button" class="btn btn-secondary" style="font-size: 0.8rem; padding: 4px 10px; white-space: nowrap;" onclick="incrementSerial()" title="Advance to next serial number">+ Next No</button>
      </div>
    </div>

    <!-- SIGNATURE UPLOADS & RESIZING -->
    <div class="form-group">
      <label>Prepared by Signature:</label>
      <input type="file" id="upload_writer_sig" accept="image/*" style="display: none;" onchange="handleSigUpload(event, 'writer')">
      <div class="sig-upload-btn-wrap">
        <button type="button" class="btn btn-secondary" style="font-size: 0.82rem; padding: 6px 11px;" onclick="triggerSigUpload('writer')">✍️ Upload</button>
        <img id="preview_writer_sig" class="sig-preview-thumb" alt="Preview">
        <button type="button" id="btn_remove_writer_sig" class="btn-remove-sig" onclick="removeSignature('writer')">✕ Remove</button>
      </div>
      <div id="ctrl_writer_sig_size" style="display: none; margin-top: 6px; align-items: center; gap: 8px;">
        <span style="font-size: 0.78rem; color: #64748b; font-weight: 600;">Size:</span>
        <button type="button" class="btn-sig-adj" onclick="adjustSigSize('writer', -4)">−</button>
        <input type="range" id="scale_writer_sig" min="24" max="110" value="48" style="flex: 1; accent-color: #2563eb;" oninput="resizeSig('writer', this.value)">
        <button type="button" class="btn-sig-adj" onclick="adjustSigSize('writer', 4)">+</button>
        <span id="val_writer_sig" style="font-size: 0.78rem; font-weight: 700; color: #334155; min-width: 32px;">48px</span>
      </div>
    </div>
    <div class="form-group">
      <label>Headmaster Signature:</label>
      <input type="file" id="upload_headmaster_sig" accept="image/*" style="display: none;" onchange="handleSigUpload(event, 'headmaster')">
      <div class="sig-upload-btn-wrap">
        <button type="button" class="btn btn-secondary" style="font-size: 0.82rem; padding: 6px 11px;" onclick="triggerSigUpload('headmaster')">✍️ Upload</button>
        <img id="preview_headmaster_sig" class="sig-preview-thumb" alt="Preview">
        <button type="button" id="btn_remove_headmaster_sig" class="btn-remove-sig" onclick="removeSignature('headmaster')">✕ Remove</button>
      </div>
      <div id="ctrl_headmaster_sig_size" style="display: none; margin-top: 6px; align-items: center; gap: 8px;">
        <span style="font-size: 0.78rem; color: #64748b; font-weight: 600;">Size:</span>
        <button type="button" class="btn-sig-adj" onclick="adjustSigSize('headmaster', -4)">−</button>
        <input type="range" id="scale_headmaster_sig" min="24" max="120" value="52" style="flex: 1; accent-color: #2563eb;" oninput="resizeSig('headmaster', this.value)">
        <button type="button" class="btn-sig-adj" onclick="adjustSigSize('headmaster', 4)">+</button>
        <span id="val_headmaster_sig" style="font-size: 0.78rem; font-weight: 700; color: #334155; min-width: 32px;">52px</span>
      </div>
    </div>

    <div class="form-group" style="grid-column: 1 / -1; display: flex; justify-content: flex-end; gap: 10px;">
      <button class="btn btn-secondary" type="button" onclick="toggleFormPanel()">Close Panel</button>
    </div>
  </section>

  <!-- CERTIFICATE CANVAS -->
  <main class="certificate-viewport" id="certificateViewport">
    <div class="certificate-sheet" id="certificateSheet">

      <!-- LEFT: STUB (OFFICE COPY) -->
      <aside class="stub-section">
        <div class="stub-header">
          <h2 class="stub-school-name" contenteditable="true" id="stub_school_name">PRE-CADET CHILD CARE HOMES</h2>
          <img src="${assets.precadet_logo_en}" alt="School Logo" class="stub-logo" id="stub_logo_img">
          <div class="stub-address" contenteditable="true" id="stub_address">Debpur, Burichang, Cumilla.</div>
          <div class="stub-reg-no" contenteditable="true" id="stub_reg_no">Bangladesh Kindergarten Association Govt. Reg. No. 1028/98/736</div>
          <div class="stub-banner-wrapper">
            <img src="${assets.stub_banner_en}" alt="CERTIFICATE" class="stub-banner-img">
          </div>
        </div>

        <div class="stub-body">
          <div class="stub-row">
            <span>This is to certify that</span>
            <span class="stub-field" id="stub_view_name">Md. Abdur Rahman</span>
          </div>
          <div class="stub-row">
            <span>Father:</span>
            <span class="stub-field" id="stub_view_father">Md. Mominul Islam</span>
          </div>
          <div class="stub-row">
            <span>Mother:</span>
            <span class="stub-field" id="stub_view_mother">Sathi Akter</span>
          </div>
          <div class="stub-row">
            <span>Date of Birth:</span>
            <span class="stub-field" style="min-width: 80px;" id="stub_view_dob">01-04-2021</span>
            <span>Roll:</span>
            <span class="stub-field" style="min-width: 35px;" id="stub_view_roll">16</span>
          </div>
          <div style="margin-top: 4px;">
            <span>has studied in this school in the year</span>
            <span class="stub-field" style="display: inline-block; width: 60px; text-align: center;" id="stub_view_year">2026</span>
          </div>
          <div>
            <span>in Class</span>
            <span class="stub-field" style="display: inline-block; width: 55px; text-align: center;" id="stub_view_class">Play</span>
            <span>.</span>
          </div>
          <div>
            <span>Academic evaluation in Class</span>
            <span class="stub-field" style="display: inline-block; width: 50px; text-align: center;" id="stub_view_eval_class">Play</span>
            <span>is satisfactory.</span>
          </div>
          <div>Eligible for promotion to the next class.</div>
          <div>I wish him/her every success in life.</div>
        </div>

        <div class="stub-footer">
          <div class="stub-writer-date">
            <div style="display:flex; align-items:baseline; gap:4px; position: relative;">
              <span>Prepared:</span>
              <div style="position: relative; flex-grow: 1; display: inline-flex; align-items: baseline;">
                <div id="stub_writer_sig_wrap" class="sig-zone" style="display: none; position: absolute; bottom: 2px; left: 5px; z-index: 5;" title="Click and drag to position anywhere">
                  <div class="sig-size-ctrls" onclick="event.stopPropagation();">
                    <button type="button" class="btn-sig-adj" onclick="adjustSigSize('writer', -4);" title="Make smaller">−</button>
                    <button type="button" class="btn-sig-adj" onclick="adjustSigSize('writer', 4);" title="Make larger">+</button>
                    <div class="sig-ctrl-divider"></div>
                    <button type="button" class="btn-sig-adj" onclick="moveStubSig('writer', 0, -3);" title="Move up">▲</button>
                    <button type="button" class="btn-sig-adj" onclick="moveStubSig('writer', 0, 3);" title="Move down">▼</button>
                    <button type="button" class="btn-sig-adj" onclick="moveStubSig('writer', -4, 0);" title="Move left">◄</button>
                    <button type="button" class="btn-sig-adj" onclick="moveStubSig('writer', 4, 0);" title="Move right">►</button>
                    <button type="button" class="btn-sig-adj" style="background: #475569;" onclick="resetStubSigPos('writer');" title="Reset position">↺</button>
                  </div>
                  <img id="stub_writer_sig_img" class="stub-sig-img" src="" alt="Signature">
                </div>
                <span class="stub-field" style="width: 100px;" id="stub_view_writer"></span>
              </div>
            </div>
            <div style="display:flex; align-items:baseline; gap:4px;">
              <span>Date:</span>
              <span class="stub-field" style="width: 100px;" id="stub_view_date"></span>
            </div>
          </div>
          <div class="stub-headmaster-col">
            <div style="position: relative; width: 100%; display: flex; flex-direction: column; align-items: center;">
              <div id="stub_headmaster_sig_wrap" class="sig-zone" style="display: none; position: absolute; bottom: 3px; z-index: 5;" title="Click and drag to position anywhere">
                <div class="sig-size-ctrls" onclick="event.stopPropagation();">
                  <button type="button" class="btn-sig-adj" onclick="adjustSigSize('headmaster', -4);" title="Make smaller">−</button>
                  <button type="button" class="btn-sig-adj" onclick="adjustSigSize('headmaster', 4);" title="Make larger">+</button>
                  <div class="sig-ctrl-divider"></div>
                  <button type="button" class="btn-sig-adj" onclick="moveStubSig('headmaster', 0, -3);" title="Move up">▲</button>
                  <button type="button" class="btn-sig-adj" onclick="moveStubSig('headmaster', 0, 3);" title="Move down">▼</button>
                  <button type="button" class="btn-sig-adj" onclick="moveStubSig('headmaster', -4, 0);" title="Move left">◄</button>
                  <button type="button" class="btn-sig-adj" onclick="moveStubSig('headmaster', 4, 0);" title="Move right">►</button>
                  <button type="button" class="btn-sig-adj" style="background: #475569;" onclick="resetStubSigPos('headmaster');" title="Reset position">↺</button>
                </div>
                <img id="stub_headmaster_sig_img" class="stub-sig-img" src="" alt="Headmaster Signature">
              </div>
              <div class="stub-sign-line"></div>
            </div>
            <div class="stub-signature-title">Headmaster</div>
          </div>
        </div>
      </aside>

      <!-- RIGHT: MAIN CERTIFICATE (ORIGINAL) -->
      <section class="certificate-main">
        <div class="ornate-border-overlay"></div>
        <div class="watermark-bg" id="watermark_bg" style="background-image: url('${assets.precadet_logo_en}');"></div>

        <!-- LIVE SCANNABLE VERIFICATION QR CODE (Top-Right Header Corner) -->
        <div id="main_qr_container" class="cert-qr-wrap" title="Drag with mouse to reposition">
          <div id="live_qrcode_canvas"></div>
        </div>

        <div class="certificate-content">
          <!-- Header -->
          <div class="cert-header">
            <h1 class="cert-school-name" contenteditable="true" id="cert_school_name">PRE-CADET CHILD CARE HOMES</h1>
            <img src="${assets.precadet_logo_en}" alt="School Logo" class="cert-logo" id="cert_logo_img">
            <div class="cert-address" contenteditable="true" id="cert_address">Debpur, Burichang, Cumilla.</div>
            <div class="cert-reg-no" contenteditable="true" id="cert_reg_no">Bangladesh Kindergarten Association Govt. Reg. No. 1028/98/736</div>
          </div>

          <!-- Banner Title (Vector Banner) -->
          <div class="cert-banner-wrapper">
            <img src="${assets.clean_banner_en}" alt="CERTIFICATE" class="cert-banner-img">
          </div>

          <!-- Body Text -->
          <div class="cert-body">
            <div style="margin-bottom: 4px;">
              <span>This is to certify that</span>
              <span class="dotted-fill dotted-fill-wide" id="main_view_name" contenteditable="true">Md. Abdur Rahman</span>
            </div>

            <div style="margin-bottom: 4px;">
              <span>Son / Daughter of:</span>
              <span class="dotted-fill dotted-fill-wide" style="min-width: 485px;" id="main_view_father" contenteditable="true">Md. Mominul Islam</span>
            </div>

            <div style="margin-bottom: 4px;">
              <span>and:</span>
              <span class="dotted-fill dotted-fill-wide" style="min-width: 535px;" id="main_view_mother" contenteditable="true">Sathi Akter</span>
            </div>

            <div style="margin-bottom: 4px; display: flex; align-items: baseline;">
              <span>Date of Birth:</span>
              <span class="dotted-fill dotted-fill-mid" id="main_view_dob" contenteditable="true">01-04-2021</span>
              <span style="margin-left: 28px;">Roll No:</span>
              <span class="dotted-fill dotted-fill-mid" style="flex-grow: 1;" id="main_view_roll" contenteditable="true">16</span>
            </div>

            <div style="margin-bottom: 4px;">
              <span>has been a student of this institution in</span>
              <span class="dotted-fill dotted-fill-short" id="main_view_year" contenteditable="true">2026</span>
              <span>in Class</span>
              <span class="dotted-fill dotted-fill-short" id="main_view_class" contenteditable="true">Play</span>
              <span>.</span>
            </div>

            <div style="margin-bottom: 4px;">
              <span>His / Her academic evaluation and conduct have been highly satisfactory.</span>
            </div>

            <div style="margin-bottom: 4px;">
              <span>He / She is qualified for promotion to the next higher class.</span>
            </div>

            <div style="margin-bottom: 4px;">
              <span>I wish him / her all the success and a bright future in life.</span>
            </div>
          </div>

          <!-- Footer -->
          <div class="cert-footer">
            <div class="footer-left">
              <div class="footer-left-row" style="position: relative;">
                <span>Prepared by:</span>
                <div style="position: relative; display: inline-flex; align-items: baseline;">
                  <div id="main_writer_sig_wrap" class="sig-zone" style="display: none; position: absolute; bottom: 2px; left: 15px; z-index: 5;" title="Click and drag to position anywhere">
                    <div class="sig-size-ctrls" onclick="event.stopPropagation();">
                      <button type="button" class="btn-sig-adj" onclick="adjustSigSize('writer', -4);" title="Make smaller">−</button>
                      <button type="button" class="btn-sig-adj" onclick="adjustSigSize('writer', 4);" title="Make larger">+</button>
                      <div class="sig-ctrl-divider"></div>
                      <button type="button" class="btn-sig-adj" onclick="moveSig('writer', 0, -3);" title="Move up">▲</button>
                      <button type="button" class="btn-sig-adj" onclick="moveSig('writer', 0, 3);" title="Move down">▼</button>
                      <button type="button" class="btn-sig-adj" onclick="moveSig('writer', -4, 0);" title="Move left">◄</button>
                      <button type="button" class="btn-sig-adj" onclick="moveSig('writer', 4, 0);" title="Move right">►</button>
                      <button type="button" class="btn-sig-adj" style="background: #475569;" onclick="resetSigPos('writer');" title="Reset position">↺</button>
                      <div class="sig-ctrl-divider"></div>
                      <button type="button" class="btn-sig-adj" style="background: #059669;" onclick="triggerSigUpload('writer');" title="Change/Upload signature">✎</button>
                    </div>
                    <img id="main_writer_sig_img" class="sig-img" src="" alt="Writer Signature">
                  </div>
                  <span class="footer-dotted" id="main_view_writer" contenteditable="true"></span>
                </div>
              </div>
              <div class="footer-left-row">
                <span>Date:</span>
                <span class="footer-dotted" id="main_view_date" contenteditable="true"></span>
              </div>
            </div>
            <div class="footer-right">
              <div style="position: relative; display: flex; flex-direction: column; align-items: center;">
                <div id="main_headmaster_sig_wrap" class="sig-zone" style="display: none; position: absolute; bottom: 3px; z-index: 5;" title="Click and drag to position anywhere">
                  <div class="sig-size-ctrls" onclick="event.stopPropagation();">
                    <button type="button" class="btn-sig-adj" onclick="adjustSigSize('headmaster', -4);" title="Make smaller">−</button>
                    <button type="button" class="btn-sig-adj" onclick="adjustSigSize('headmaster', 4);" title="Make larger">+</button>
                    <div class="sig-ctrl-divider"></div>
                    <button type="button" class="btn-sig-adj" onclick="moveSig('headmaster', 0, -3);" title="Move up">▲</button>
                    <button type="button" class="btn-sig-adj" onclick="moveSig('headmaster', 0, 3);" title="Move down">▼</button>
                    <button type="button" class="btn-sig-adj" onclick="moveSig('headmaster', -4, 0);" title="Move left">◄</button>
                    <button type="button" class="btn-sig-adj" onclick="moveSig('headmaster', 4, 0);" title="Move right">►</button>
                    <button type="button" class="btn-sig-adj" style="background: #475569;" onclick="resetSigPos('headmaster');" title="Reset position">↺</button>
                    <div class="sig-ctrl-divider"></div>
                    <button type="button" class="btn-sig-adj" style="background: #059669;" onclick="triggerSigUpload('headmaster');" title="Change/Upload signature">✎</button>
                  </div>
                  <img id="main_headmaster_sig_img" class="sig-img" src="" alt="Headmaster Signature">
                </div>
                <div class="sign-line"></div>
              </div>
              <div class="headmaster-title">Headmaster</div>
            </div>
          </div>
        </div>
      </section>

    </div>
  </main>

  <script>
    // Offline Live QR Code Library
    ${qrcodeLib}

    const SCHOOL_DATA_EN = {
      precadet: {
        name: 'PRE-CADET CHILD CARE HOMES',
        address: 'Debpur, Burichang, Cumilla.',
        reg: 'Bangladesh Kindergarten Association Govt. Reg. No. 1028/98/736',
        logo: '${assets.precadet_logo_en}'
      },
      shawkat: {
        name: 'SHAWKAT BHUIYAN CHILD CARE HOMES',
        address: 'Kangshanagar, Burichang, Cumilla.',
        reg: '',
        logo: '${assets.shawkat_logo_en}'
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
      const school = SCHOOL_DATA_EN[key];
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

      // Auto-update tracking serial PC / SB
      const serialInput = document.getElementById('input_serial');
      if (serialInput) {
        const cur = serialInput.value;
        const targetCode = key === 'shawkat' ? 'SB' : 'PC';
        const otherCode = key === 'shawkat' ? 'PC' : 'SB';
        if (cur.includes('-' + otherCode + '-')) {
          serialInput.value = cur.replace('-' + otherCode + '-', '-' + targetCode + '-');
        } else if (cur.includes(otherCode)) {
          serialInput.value = cur.replace(otherCode, targetCode);
        } else if (!cur.includes(targetCode)) {
          const year = document.getElementById('input_year') ? document.getElementById('input_year').value.trim() : '2026';
          serialInput.value = 'CERT-' + year + '-' + targetCode + '-0142';
        }
      }
      updateLiveQR();
    }

    function toggleFormPanel() {
      const panel = document.getElementById('formPanel');
      panel.classList.toggle('hidden');
    }

    function updateField(field, val) {
      const mainEl = document.getElementById('main_view_' + field);
      const stubEl = document.getElementById('stub_view_' + field);
      if (mainEl) mainEl.innerText = val;
      if (stubEl) stubEl.innerText = val;

      if (field === 'class') {
        const stubEval = document.getElementById('stub_view_eval_class');
        if (stubEval) stubEval.innerText = val;
      }
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

        if (dataUrl) {
          if (mainImg) mainImg.src = dataUrl;
          if (mainWrap) mainWrap.style.display = 'block';
          if (stubImg) stubImg.src = dataUrl;
          if (stubWrap) stubWrap.style.display = 'block';
          if (removeBtn) removeBtn.style.display = 'inline-block';
          if (preview) { preview.src = dataUrl; preview.style.display = 'inline-block'; }
          if (sizeCtrl) sizeCtrl.style.display = 'flex';
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

        if (dataUrl) {
          if (mainImg) mainImg.src = dataUrl;
          if (mainWrap) mainWrap.style.display = 'block';
          if (stubImg) stubImg.src = dataUrl;
          if (stubWrap) stubWrap.style.display = 'block';
          if (removeBtn) removeBtn.style.display = 'inline-block';
          if (preview) { preview.src = dataUrl; preview.style.display = 'inline-block'; }
          if (sizeCtrl) sizeCtrl.style.display = 'flex';
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
      document.getElementById('input_name').value = 'Md. Abdur Rahman';
      document.getElementById('input_father').value = 'Md. Mominul Islam';
      document.getElementById('input_mother').value = 'Sathi Akter';
      document.getElementById('input_dob').value = '01-04-2021';
      document.getElementById('input_roll').value = '16';
      document.getElementById('input_year').value = '2026';
      document.getElementById('input_class').value = 'Play';
      document.getElementById('input_writer').value = '';
      document.getElementById('input_date').value = '';

      updateField('name', 'Md. Abdur Rahman');
      updateField('father', 'Md. Mominul Islam');
      updateField('mother', 'Sathi Akter');
      updateField('dob', '01-04-2021');
      updateField('roll', '16');
      updateField('year', '2026');
      updateField('class', 'Play');
      updateField('writer', '');
      updateField('date', '');
    }

    function clearToBlank() {
      ['name', 'father', 'mother', 'dob', 'roll', 'year', 'class', 'writer', 'date'].forEach(f => {
        const inp = document.getElementById('input_' + f);
        if (inp) inp.value = '';
        updateField(f, '');
      });
      removeSignature('writer');
      removeSignature('headmaster');
    }

    function printCertificate() {
      window.print();
      setTimeout(incrementSerial, 1500);
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
        const schoolTitle = schoolKey === 'precadet' ? 'Pre_Cadet' : 'Shawkat_Bhuiyan';
        link.download = 'Certificate_' + schoolTitle + '_' + (document.getElementById('input_name').value || 'Sample') + '.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
        setTimeout(incrementSerial, 1000);
      }).catch(err => {
        if (cutLine) cutLine.style.display = 'block';
        alert('Image generation failed: ' + err.message);
      });
    }

    function incrementSerial() {
      const serialInput = document.getElementById('input_serial');
      if (!serialInput) return;
      const cur = serialInput.value.trim();
      const match = cur.match(/^(.*?)(\\d+)$/);
      if (match) {
        const prefix = match[1];
        const numStr = match[2];
        const nextNum = parseInt(numStr, 10) + 1;
        const padded = String(nextNum).padStart(numStr.length, '0');
        serialInput.value = prefix + padded;
      } else {
        const schoolKey = document.getElementById('schoolSelector') ? document.getElementById('schoolSelector').value : 'precadet';
        const code = schoolKey === 'shawkat' ? 'SB' : 'PC';
        const year = document.getElementById('input_year') ? document.getElementById('input_year').value.trim() : '2026';
        serialInput.value = 'CERT-' + year + '-' + code + '-0143';
      }
      try {
        const schoolKey = document.getElementById('schoolSelector') ? document.getElementById('schoolSelector').value : 'precadet';
        localStorage.setItem('last_serial_en_' + schoolKey, serialInput.value);
      } catch (e) {}
      updateLiveQR();
    }

    // Initialize Draggables
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

    makeElementDraggable('stub_headmaster_sig_wrap', () => stubSigPositions.headmaster, (x, y) => {
      stubSigPositions.headmaster.x = Math.max(-60, Math.min(60, x));
      stubSigPositions.headmaster.y = Math.max(-40, Math.min(40, y));
    }, () => applyStubSigPos('headmaster'));

    // QR Code Live Generation & Controls
    function updateLiveQR() {
      const qrBox = document.getElementById('live_qrcode_canvas');
      if (!qrBox || typeof qrcode !== 'function') return;
      qrBox.innerHTML = '';

      const name = document.getElementById('input_name') ? document.getElementById('input_name').value.trim() : 'Md. Abdur Rahman';
      const roll = document.getElementById('input_roll') ? document.getElementById('input_roll').value.trim() : '16';
      const cls = document.getElementById('input_class') ? document.getElementById('input_class').value.trim() : 'Play';
      const year = document.getElementById('input_year') ? document.getElementById('input_year').value.trim() : '2026';
      const serial = (document.getElementById('input_serial') ? document.getElementById('input_serial').value.trim() : '') || 'CERT-2026-PC-0142';

      // Concise verification card format: Scans in 0.1s on Google Lens & displays directly on screen
      const verifyData = 'CERTIFICATE VERIFIED\\n' +
        'Serial: ' + serial + '\\n' +
        'Name: ' + name + '\\n' +
        'Class: ' + cls + ' | Roll: ' + roll + '\\n' +
        'Year: ' + year + '\\n' +
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
        btn.innerText = isQRVisible ? '📱 QR: ON' : '📱 QR: OFF';
        btn.style.background = isQRVisible ? '#0d9488' : '#64748b';
      }
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

    // Initial QR render
    updateLiveQR();
  </script>
</body>
</html>`;

fs.writeFileSync('certificate_en.html', htmlContent);
fs.writeFileSync('Certificate_Generator_EN.html', htmlContent);
console.log('certificate_en.html and Certificate_Generator_EN.html successfully rebuilt with reg no and no tips banner!');
