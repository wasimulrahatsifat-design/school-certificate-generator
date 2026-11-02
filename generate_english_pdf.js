const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const htmlFile = path.resolve(__dirname, 'certificate_en.html').replace(/\\/g, '/');
const filledPdf = path.resolve(__dirname, 'Certificate_Abdur_Rahman_EN.pdf');
const tempProfile1 = path.join(os.tmpdir(), 'edge_en_pdf_' + Date.now());

console.log('Generating English PDF for:', htmlFile);
try {
  execSync(`"${edgePath}" --headless=new --user-data-dir="${tempProfile1}" --disable-gpu --no-sandbox --print-to-pdf="${filledPdf}" --no-pdf-header-footer "file:///${htmlFile}"`, { stdio: 'inherit' });
  console.log('English Filled PDF Generated! Size:', fs.statSync(filledPdf).size, 'bytes');
} catch (e) {
  console.error('Error generating PDF:', e.message);
} finally {
  try { fs.rmSync(tempProfile1, { recursive: true, force: true }); } catch(_) {}
}

// Generate Blank English PDF
const tempProfile2 = path.join(os.tmpdir(), 'edge_en_blank_pdf_' + Date.now());
try {
  let blankHtml = fs.readFileSync('certificate_en.html', 'utf8');
  // clear student data
  blankHtml = blankHtml.replace(/id="main_view_name">[^<]*/, 'id="main_view_name">')
                       .replace(/id="main_view_father">[^<]*/, 'id="main_view_father">')
                       .replace(/id="main_view_mother">[^<]*/, 'id="main_view_mother">')
                       .replace(/id="main_view_dob">[^<]*/, 'id="main_view_dob">')
                       .replace(/id="main_view_roll">[^<]*/, 'id="main_view_roll">')
                       .replace(/id="main_view_year">[^<]*/, 'id="main_view_year">')
                       .replace(/id="main_view_class">[^<]*/, 'id="main_view_class">')
                       .replace(/id="main_view_writer">[^<]*/, 'id="main_view_writer">')
                       .replace(/id="main_view_date">[^<]*/, 'id="main_view_date">')
                       .replace(/id="stub_view_name">[^<]*/, 'id="stub_view_name">')
                       .replace(/id="stub_view_father">[^<]*/, 'id="stub_view_father">')
                       .replace(/id="stub_view_mother">[^<]*/, 'id="stub_view_mother">')
                       .replace(/id="stub_view_dob">[^<]*/, 'id="stub_view_dob">')
                       .replace(/id="stub_view_roll">[^<]*/, 'id="stub_view_roll">')
                       .replace(/id="stub_view_year">[^<]*/, 'id="stub_view_year">')
                       .replace(/id="stub_view_class">[^<]*/, 'id="stub_view_class">')
                       .replace(/id="stub_view_eval_class">[^<]*/, 'id="stub_view_eval_class">')
                       .replace(/id="stub_view_writer">[^<]*/, 'id="stub_view_writer">')
                       .replace(/id="stub_view_date">[^<]*/, 'id="stub_view_date">');

  const tmpBlankHtml = path.resolve(__dirname, 'temp_blank_en.html');
  fs.writeFileSync(tmpBlankHtml, blankHtml);

  const blankPdf = path.resolve(__dirname, 'Certificate_Blank_EN.pdf');
  execSync(`"${edgePath}" --headless=new --user-data-dir="${tempProfile2}" --disable-gpu --no-sandbox --print-to-pdf="${blankPdf}" --no-pdf-header-footer "file:///${tmpBlankHtml.replace(/\\/g, '/')}"`, { stdio: 'inherit' });
  console.log('English Blank PDF Generated! Size:', fs.statSync(blankPdf).size, 'bytes');

  fs.unlinkSync(tmpBlankHtml);
} catch (e) {
  console.error('Error generating blank English PDF:', e.message);
} finally {
  try { fs.rmSync(tempProfile2, { recursive: true, force: true }); } catch(_) {}
}
