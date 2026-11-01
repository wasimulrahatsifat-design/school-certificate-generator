const fs = require('fs');

const assets = JSON.parse(fs.readFileSync('assets_base64.json', 'utf8'));

const htmlContent = `<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>প্রত্যয়নপত্র - প্রি-ক্যাডেট চাইল্ড কেয়ার হোমস্</title>
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

    .action-buttons {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 16px;
      border-radius: 6px;
      font-size: 0.92rem;
      font-weight: 600;
      font-family: 'Hind Siliguri', sans-serif !important;
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
      font-family: 'Hind Siliguri', sans-serif !important;
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
      margin-bottom: 4px;
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
      gap: 8px;
      font-size: 0.92rem;
      color: #1e293b;
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
      font-size: 2.38rem;
      font-weight: 900;
      -webkit-text-stroke: 0.85px #000;
      color: #000000;
      letter-spacing: 0.5px;
      margin-bottom: 2px;
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
      font-size: 1.18rem;
      font-weight: 800;
      -webkit-text-stroke: 0.45px #0f172a;
      color: #0f172a;
      margin-top: 3px;
    }

    /* TITLE BANNER (Clean Vector Banner) */
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
      font-size: 1.15rem;
      line-height: 1.82;
      color: #0f172a;
      text-align: justify;
    }

    .dotted-fill {
      border-bottom: 2px dotted #475569;
      display: inline-block;
      font-weight: 700;
      color: #0f172a;
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
      .top-toolbar, .form-panel, .hint-banner, .cut-line-indicator {
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
      <span>🏫 প্রি-ক্যাডেট চাইল্ড কেয়ার হোমস্ - প্রত্যয়নপত্র প্রস্তুতকরণ</span>
      <span class="brand-badge">বাংলা ফন্ট / A4 ল্যান্ডস্কেপ</span>
    </div>
    <div class="action-buttons">
      <button class="btn btn-primary" onclick="toggleFormPanel()">✏️ তথ্য সম্পাদনা ফরম</button>
      <button class="btn btn-warning" onclick="loadSampleData()">⭐ নমুনা ডেটা লোড</button>
      <button class="btn btn-secondary" onclick="clearToBlank()">📄 খালি ফরম (ফাঁকা)</button>
      <button class="btn btn-success" onclick="printCertificate()">🖨️ প্রিন্ট / PDF সংরক্ষণ</button>
      <button class="btn btn-primary" onclick="downloadAsImage()">🖼️ ছবি ডাউনলোড (PNG)</button>
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
    <div class="form-group" style="grid-column: 1 / -1; display: flex; justify-content: flex-end; gap: 10px;">
      <button class="btn btn-secondary" type="button" onclick="toggleFormPanel()">প্যানেল বন্ধ করুন</button>
    </div>
  </section>

  <div class="hint-banner">
    <span>💡 <b>টিপস:</b> ফন্ট হিসেবে কালপুরুষ (Sutonny Unicode) সেট করা হয়েছে। লেখক ও তারিখ উভয়ের নিচেই ডট ডট রয়েছে। সম্পূর্ণ প্রত্যয়নপত্রটি A4 সাইজের এক পাতায় প্রিন্ট হবে।</span>
    <span style="font-size: 0.85rem; font-weight: 600;">সাইজ: A4 Landscape (297 × 210 mm)</span>
  </div>

  <!-- CERTIFICATE CANVAS -->
  <main class="certificate-viewport" id="certificateViewport">
    <div class="certificate-sheet" id="certificateSheet">

      <!-- LEFT: STUB (অফিস কপি) -->
      <aside class="stub-section">
        <div class="stub-header">
          <h2 class="stub-school-name" contenteditable="true" id="stub_school_name">প্রি-ক্যাডেট চাইল্ড কেয়ার হোমস্</h2>
          <img src="${assets.precadet_logo}" alt="School Logo" class="stub-logo">
          <div class="stub-address" contenteditable="true" id="stub_address">দেবপুর, বুড়িচং, কুমিল্লা।</div>
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
            <div style="display:flex; align-items:baseline; gap:4px;">
              <span>লেখক:</span>
              <span class="stub-field" style="width: 105px;" id="stub_view_writer"></span>
            </div>
            <div style="display:flex; align-items:baseline; gap:4px;">
              <span>তারিখ:</span>
              <span class="stub-field" style="width: 105px;" id="stub_view_date"></span>
            </div>
          </div>
          <div class="stub-signature-title">প্রধান শিক্ষক</div>
        </div>
      </aside>

      <!-- RIGHT: MAIN CERTIFICATE (মূল সনদ) -->
      <section class="certificate-main">
        <div class="ornate-border-overlay"></div>
        <div class="watermark-bg"></div>

        <div class="certificate-content">
          <!-- Header -->
          <div class="cert-header">
            <h1 class="cert-school-name" contenteditable="true" id="cert_school_name">প্রি-ক্যাডেট চাইল্ড কেয়ার হোমস্</h1>
            <img src="${assets.precadet_logo}" alt="School Logo" class="cert-logo">
            <div class="cert-address" contenteditable="true" id="cert_address">দেবপুর, বুড়িচং, কুমিল্লা।</div>
          </div>

          <!-- Banner Title (Clean Vector Banner) -->
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

          <!-- Footer ( লেখক ও তারিখ উভয়ের নিচেই ডট ডট এবং নিখুঁত অবস্থান ) -->
          <div class="cert-footer">
            <div class="footer-left">
              <div class="footer-left-row">
                <span>লেখক:</span>
                <span class="footer-dotted" id="main_view_writer" contenteditable="true"></span>
              </div>
              <div class="footer-left-row">
                <span>তারিখ:</span>
                <span class="footer-dotted" id="main_view_date" contenteditable="true"></span>
              </div>
            </div>

            <div class="footer-right">
              <div class="sign-line"></div>
              <div class="headmaster-title" contenteditable="true">প্রধান শিক্ষক</div>
            </div>
          </div>
        </div>
      </section>

    </div>
  </main>

  <script>
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

      // Sync Stub
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

      // Sync Main
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
        link.download = 'প্রত্যয়নপত্র_প্রি_ক্যাডেট_' + (document.getElementById('input_student_name').value || 'নমুনা') + '.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      }).catch(err => {
        if (cutLine) cutLine.style.display = 'block';
        alert('ছবি ডাউনলোড তৈরিতে সমস্যা হয়েছে: ' + err.message);
      });
    }

    // Initialize
    syncData();
  </script>
</body>
</html>`;

fs.writeFileSync('প্রত্যয়নপত্র_প্রি_ক্যাডেট_হোমস.html', htmlContent);
console.log('প্রত্যয়নপত্র_প্রি_ক্যাডেট_হোমস.html successfully created with exact sample background, dots under date and writer, raised footer, and no corrupt fonts!');
