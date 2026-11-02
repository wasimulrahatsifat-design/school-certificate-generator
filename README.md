# School Certificate & Testimonial Generator (প্রত্যয়নপত্র জেনারেটর)

An authentic, print-ready School Certificate and Testimonial generation system supporting both **Bengali (বাংলা)** and **English** formats. Designed specifically for Bangladeshi schools, high schools, and pre-cadet institutions adhering to standard A4 Landscape certificate layouts with stub (মুল অংশ ও মুড়ি অংশ).

---

## 🌟 Features (মূল সুবিধাসমূহ)

- 👑 **Modern Luxury Royal Edition (নতুন রাজকীয় আধুনিক সংস্করণ)**:
  - **Modern Certificate Generator**: `modern_certificate.html` / `আধুনিক_প্রত্যয়নপত্র.html`
  - 4 Royal Color Themes (Royal Navy & Gold, Imperial Burgundy, Emerald Prestige, Vintage Parchment)
  - 3D Gold Foil Embossed Seal with ribbons
  - Dynamic QR verification badge & serial tracking
  - Live signature drag-and-drop, interactive sliders, nudge controls & stub toggle
  - Ultra-high-res 4K PNG export & single-sheet A4 landscape print
- 📜 **Dual Language Support (দ্বিভাষিক)**:
  - **Bengali Version (বাংলা প্রত্যয়নপত্র)**: `index.html` / `প্রত্যয়নপত্র_জেনারেটর.html`
  - **English Version (English Certificate)**: `Certificate_Generator_EN.html` / `certificate_en.html`
  - **Pre-cadet Specialized Version**: `প্রত্যয়নপত্র_প্রি_ক্যাডেট_হোমস.html`
- 🖨️ **Print Perfect (A4 Landscape)**:
  - Counterfoil / Stub on the left (মুড়ি অংশ) for official school records.
  - Main Certificate on the right (মূল প্রত্যয়নপত্র) for the student.
  - Authentic ornamental borders, school logos, and banner typography.
- ⚡ **Interactive Real-Time Preview & Fill**:
  - Live form inputs instantly update both the stub and main certificate.
  - One-click print / save as PDF button (`Ctrl + P`).
  - Toggle between blank format (খালি ফরম) and filled student data.
- 📄 **Multiple Output Formats**:
  - Web Apps (HTML)
  - PDF Generation (`generate_pdf.js`, `generate_english_pdf.js`, `generate_modern_pdf.js`, etc.)
  - Editable Word Documents (`.docx`) (`generate_docx.js`, `generate_precadet_docx.js`)

---

## 📁 Repository Structure (ফাইল পরিচিতি)

| ফাইল / ডিরেক্টরি | বিবরণ |
|---|---|
| `modern_certificate.html` / `আধুনিক_প্রত্যয়নপত্র.html` | 👑 নতুন রাজকীয় আধুনিক লাক্সারি প্রত্যয়নপত্র জেনারেটর (Royal Luxury Edition) |
| `আধুনিক_প্রত্যয়নপত্র_নমুনা.pdf` | নতুন আধুনিক প্রত্যয়নপত্রের প্রিন্ট-রেডি নমুনা PDF |
| `index.html` | মূল বাংলা প্রত্যয়নপত্র জেনারেটর (Main Bengali Generator) |
| `Certificate_Generator_EN.html` | ইংরেজি প্রত্যয়নপত্র জেনারেটর (English Certificate Generator) |
| `প্রত্যয়নপত্র_প্রি_ক্যাডেট_হোমস.html` | প্রি-ক্যাডেট হোমসের বিশেষায়িত প্রত্যয়নপত্র |
| `*.pdf` | রেডিমেড খালি ও পূরণকৃত প্রিন্ট কপি (Sample & Blank PDFs) |
| `*.docx` | মাইক্রোসফট ওয়ার্ডে এডিটেবল ফরম্যাট (Editable Word Documents) |
| `generate_*.js` | অটোমেটেড PDF ও DOCX তৈরির স্ক্রিপ্টসমূহ |
| `*.svg`, `*.png` | ব্যানার, ফ্রেম এবং লোগো অ্যাসেট |

---

## 🚀 How to Run & Use (ব্যবহারবিধি)

1. **ব্রাউজারে সরাসরি চালু করুন (Run Directly in Browser)**:
   - যেকোনো ব্রাউজারে `index.html` অথবা `Certificate_Generator_EN.html` ফাইলটি ডাবল ক্লিক করে খুলুন।
2. **ডাটা এন্ট্রি করুন (Fill Student Details)**:
   - শিক্ষার্থীর নাম, পিতা-মাতার নাম, রোল, বিভাগ, পাশের সাল ইত্যাদি ইনপুট দিন।
3. **প্রিন্ট বা পিডিএফ সেভ করুন (Print / Save as PDF)**:
   - ব্রাউজারের প্রিন্ট বাটনে চাপুন অথবা `Ctrl + P` চাপুন।
   - পেপার সাইজ নির্বাচন করুন **A4**, লেআউট দিন **Landscape** (আড়াআড়ি), মার্জিন রাখুন **None** অথবা **Default**।

---

## 🛠️ Developer Scripts (স্ক্রিপ্ট কমান্ড)

If you have Node.js installed and wish to re-render PDFs or DOCX files:

```bash
# Generate Bengali PDFs (Puppeteer)
node generate_pdf.js
node generate_blank_pdf.js

# Generate English PDFs
node generate_english_pdf.js

# Generate Pre-cadet PDFs & DOCX
node generate_precadet_pdf.js
node generate_docx.js
```

---

## 📄 License
MIT License. Created for institutional educational certificate generation.
