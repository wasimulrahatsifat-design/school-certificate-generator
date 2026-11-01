const fs = require('fs');

const assets = JSON.parse(fs.readFileSync('assets_base64.json', 'utf8'));

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
      transition: all 0.2s ease;
      border: 1px solid transparent;
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
      background: #0284c7;
      color: white;
      border: 1px solid rgba(255,255,255,0.3);
    }
    .btn-lang:hover {
      background: #0369a1;
    }

    /* COLLAPSIBLE FORM PANEL */
    .form-panel {
      width: 95%;
      max-width: 1140px;
      background: #ffffff;
      margin: 18px auto 6px auto;
      padding: 16px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.06);
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
      gap: 12px;
      border: 1px solid #e2e8f0;
    }
    .form-panel.collapsed {
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
      font-family: 'Inter', sans-serif;
      outline: none;
      transition: border-color 0.2s;
    }
    .form-group input:focus, .form-group select:focus {
      border-color: #2563eb;
      box-shadow: 0 0 0 3px rgba(37,99,235,0.15);
    }

    /* INSTRUCTION BANNER */
    .hint-banner {
      max-width: 1140px;
      width: 95%;
      margin: 8px auto;
      background: #e0f2fe;
      border-left: 4px solid #0284c7;
      padding: 8px 16px;
      border-radius: 4px;
      font-size: 0.88rem;
      color: #0369a1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-family: 'Inter', sans-serif !important;
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
      padding: 22px 18px 20px 18px;
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
      margin-bottom: 4px;
      letter-spacing: 0.2px;
      text-transform: uppercase;
      white-space: nowrap;
    }
    .stub-logo {
      width: 58px;
      height: 58px;
      margin: 0 auto 3px auto;
      display: block;
      border-radius: 50%;
    }
    .stub-address {
      font-size: 0.88rem;
      color: #0f172a;
      font-weight: 800;
      font-family: 'Inter', sans-serif;
      -webkit-text-stroke: 0.35px #0f172a;
      margin-bottom: 6px;
    }

    .stub-banner-wrapper {
      text-align: center;
      margin: 3px 0 8px 0;
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
    .stub-field {
      border-bottom: 1px dotted #334155;
      flex-grow: 1;
      padding-left: 4px;
      font-weight: 700;
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
    .stub-signature-title {
      font-weight: 800;
      color: #1e293b;
      border-top: 1px dashed #64748b;
      padding-top: 4px;
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

    /* CERTIFICATE INNER CONTENT */
    .certificate-content {
      position: relative;
      z-index: 10;
      height: 100%;
      padding: 34px 46px 26px 46px;
      display: flex;
      flex-direction: column;
    }

    /* CERTIFICATE HEADER */
    .cert-header {
      text-align: center;
      margin-bottom: 2px;
    }
    .cert-school-name {
      font-size: 1.78rem;
      font-weight: 900;
      font-family: 'Cinzel', 'Montserrat', serif;
      -webkit-text-stroke: 0.5px #000;
      color: #000000;
      letter-spacing: 1px;
      text-transform: uppercase;
      margin-bottom: 2px;
      white-space: nowrap;
    }
    .cert-logo {
      width: 74px;
      height: 74px;
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
      margin-top: 3px;
      letter-spacing: 0.5px;
    }

    /* TITLE BANNER (Vector Banner) */
    .cert-banner-wrapper {
      text-align: center;
      margin: 4px 0 8px 0;
    }
    .cert-banner-img {
      height: 56px;
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

    .dotted-fill {
      border-bottom: 2px dotted #475569;
      display: inline-block;
      font-weight: 700;
      color: #0f172a;
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
      font-weight: 600;
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
      .top-toolbar, .form-panel, .hint-banner {
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
      <button class="btn btn-primary" onclick="toggleFormPanel()">✏️ Edit Form</button>
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
      <label>Assessment Class:</label>
      <input type="text" id="input_eval_class" value="Play" oninput="updateField('eval_class', this.value)">
    </div>
    <div class="form-group">
      <label>Prepared by:</label>
      <input type="text" id="input_writer" value="Rafiqul Islam" oninput="updateField('writer', this.value)">
    </div>
    <div class="form-group">
      <label>Date:</label>
      <input type="text" id="input_date" value="15-12-2026" oninput="updateField('date', this.value)">
    </div>
  </section>

  <!-- HINT / INSTRUCTION BANNER -->
  <div class="hint-banner">
    <span>💡 <b>Tip:</b> High quality English typography with authentic royal certificate layout. Single page A4 Landscape.</span>
    <span style="font-size: 0.85rem; font-weight: 600;">Size: A4 Landscape (297 × 210 mm)</span>
  </div>

  <!-- CERTIFICATE CANVAS -->
  <main class="certificate-viewport" id="certificateViewport">
    <div class="certificate-sheet" id="certificateSheet">

      <!-- LEFT: STUB (OFFICE COPY) -->
      <aside class="stub-section">
        <div class="stub-header">
          <h2 class="stub-school-name" contenteditable="true" id="stub_school_name">PRE-CADET CHILD CARE HOMES</h2>
          <img src="${assets.precadet_logo_en}" alt="School Logo" class="stub-logo" id="stub_logo_img">
          <div class="stub-address" contenteditable="true" id="stub_address">Debpur, Burichang, Cumilla.</div>
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
            <div style="display:flex; align-items:baseline; gap:4px;">
              <span>Prepared:</span>
              <span class="stub-field" style="width: 100px;" id="stub_view_writer"></span>
            </div>
            <div style="display:flex; align-items:baseline; gap:4px;">
              <span>Date:</span>
              <span class="stub-field" style="width: 100px;" id="stub_view_date"></span>
            </div>
          </div>
          <div class="stub-signature-title">Headmaster</div>
        </div>
      </aside>

      <!-- RIGHT: MAIN CERTIFICATE (ORIGINAL) -->
      <section class="certificate-main">
        <div class="ornate-border-overlay"></div>
        <div class="watermark-bg" id="watermark_bg" style="background-image: url('${assets.precadet_logo_en}');"></div>

        <div class="certificate-content">
          <!-- Header -->
          <div class="cert-header">
            <h1 class="cert-school-name" contenteditable="true" id="cert_school_name">PRE-CADET CHILD CARE HOMES</h1>
            <img src="${assets.precadet_logo_en}" alt="School Logo" class="cert-logo" id="cert_logo_img">
            <div class="cert-address" contenteditable="true" id="cert_address">Debpur, Burichang, Cumilla.</div>
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
              <div class="footer-left-row">
                <span>Prepared by:</span>
                <span class="footer-dotted" id="main_view_writer" contenteditable="true"></span>
              </div>
              <div class="footer-left-row">
                <span>Date:</span>
                <span class="footer-dotted" id="main_view_date" contenteditable="true"></span>
              </div>
            </div>
            <div class="footer-right">
              <div class="sign-line"></div>
              <div class="headmaster-title">Headmaster</div>
            </div>
          </div>
        </div>
      </section>

    </div>
  </main>

  <script>
    const SCHOOL_DATA_EN = {
      precadet: {
        name: 'PRE-CADET CHILD CARE HOMES',
        address: 'Debpur, Burichang, Cumilla.',
        logo: '${assets.precadet_logo_en}'
      },
      shawkat: {
        name: 'SHAWKAT BHUIYAN CHILD CARE HOMES',
        address: 'Kongshonagar, Burichang, Cumilla.',
        logo: '${assets.shawkat_logo_en}'
      }
    };

    function switchSchool(key) {
      const school = SCHOOL_DATA_EN[key];
      if (!school) return;

      document.getElementById('stub_school_name').innerText = school.name;
      document.getElementById('cert_school_name').innerText = school.name;

      document.getElementById('stub_address').innerText = school.address;
      document.getElementById('cert_address').innerText = school.address;

      document.getElementById('stub_logo_img').src = school.logo;
      document.getElementById('cert_logo_img').src = school.logo;
      document.getElementById('watermark_bg').style.backgroundImage = 'url(' + school.logo + ')';
    }

    function toggleFormPanel() {
      const panel = document.getElementById('formPanel');
      panel.classList.toggle('collapsed');
    }

    function updateField(fieldKey, value) {
      const mainEl = document.getElementById('main_view_' + fieldKey);
      if (mainEl) mainEl.innerText = value;

      const stubEl = document.getElementById('stub_view_' + fieldKey);
      if (stubEl) stubEl.innerText = value;

      if (fieldKey === 'class') {
        const evalStub = document.getElementById('stub_view_eval_class');
        if (evalStub) evalStub.innerText = value;
      }
    }

    function clearToBlank() {
      const fields = ['name', 'father', 'mother', 'dob', 'roll', 'year', 'class', 'eval_class', 'writer', 'date'];
      fields.forEach(f => {
        const input = document.getElementById('input_' + f);
        if (input) input.value = '';
        const main = document.getElementById('main_view_' + f);
        if (main) main.innerText = '';
        const stub = document.getElementById('stub_view_' + f);
        if (stub) stub.innerText = '';
      });
    }

    function loadSampleData() {
      const sample = {
        name: 'Md. Abdur Rahman',
        father: 'Md. Mominul Islam',
        mother: 'Sathi Akter',
        dob: '01-04-2021',
        roll: '16',
        year: '2026',
        class: 'Play',
        eval_class: 'Play',
        writer: 'Rafiqul Islam',
        date: '15-12-2026'
      };
      for (const [k, v] of Object.entries(sample)) {
        const input = document.getElementById('input_' + k);
        if (input) input.value = v;
        updateField(k, v);
      }
    }

    function printCertificate() {
      window.print();
    }

    function downloadAsImage() {
      const sheet = document.getElementById('certificateSheet');
      html2canvas(sheet, {
        scale: 2,
        useCORS: true,
        logging: false
      }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'Student_Certificate_EN.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    }
  </script>
</body>
</html>`;

fs.writeFileSync('certificate_en.html', htmlContent);
fs.writeFileSync('Certificate_Generator_EN.html', htmlContent);
console.log('certificate_en.html & Certificate_Generator_EN.html built successfully!');
