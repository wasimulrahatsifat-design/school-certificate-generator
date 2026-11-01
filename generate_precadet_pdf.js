const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const htmlFile = path.resolve(__dirname, 'প্রত্যয়নপত্র_প্রি_ক্যাডেট_হোমস.html').replace(/\\/g, '/');
const outFile = path.resolve(__dirname, 'প্রত্যয়নপত্র_প্রি_ক্যাডেট_পূরণকৃত.pdf');

console.log('Generating Pre-cadet PDF for:', htmlFile);
try {
  execSync(`"${edgePath}" --headless=new --disable-gpu --no-sandbox --print-to-pdf="${outFile}" --no-pdf-header-footer "file:///${htmlFile}"`, { stdio: 'inherit' });
  console.log('Pre-cadet PDF Generated successfully! Size:', fs.statSync(outFile).size, 'bytes');
} catch (e) {
  console.error('Error generating Pre-cadet PDF:', e.message);
}

// Generate Blank PDF
let blankHtml = fs.readFileSync('প্রত্যয়নপত্র_প্রি_ক্যাডেট_হোমস.html', 'utf8');
blankHtml = blankHtml.replace('value="মো: আবদুর রহমান"', 'value=""')
                     .replace('value="মো: মোমিনুল ইসলাম"', 'value=""')
                     .replace('value="সাথী আক্তার"', 'value=""')
                     .replace('value="০১-০৪-২০২১"', 'value=""')
                     .replace('value="১৬"', 'value=""')
                     .replace('value="২০২৬"', 'value=""')
                     .replace('value="প্লে"', 'value=""')
                     .replace('value="সন্তোষজনক"', 'value=""');

blankHtml = blankHtml.replace('id="stub_view_name">মো: আবদুর রহমান', 'id="stub_view_name">&nbsp;')
                     .replace('id="stub_view_father">মো: মোমিনুল ইসলাম', 'id="stub_view_father">&nbsp;')
                     .replace('id="stub_view_mother">সাথী আক্তার', 'id="stub_view_mother">&nbsp;')
                     .replace('id="stub_view_dob">০১-০৪-২০২১', 'id="stub_view_dob">&nbsp;')
                     .replace('id="stub_view_roll">১৬', 'id="stub_view_roll">&nbsp;')
                     .replace('id="stub_view_year">২০২৬', 'id="stub_view_year">&nbsp;')
                     .replace('id="stub_view_class">প্লে', 'id="stub_view_class">&nbsp;')
                     .replace('id="stub_view_eval_class">প্লে', 'id="stub_view_eval_class">&nbsp;')
                     .replace('id="stub_view_eval">সন্তোষজনক', 'id="stub_view_eval">&nbsp;')
                     .replace('id="main_view_name" contenteditable="true">মো: আবদুর রহমান', 'id="main_view_name" contenteditable="true">&nbsp;')
                     .replace('id="main_view_father" contenteditable="true">মো: মোমিনুল ইসলাম', 'id="main_view_father" contenteditable="true">&nbsp;')
                     .replace('id="main_view_mother" contenteditable="true">সাথী আক্তার', 'id="main_view_mother" contenteditable="true">&nbsp;')
                     .replace('id="main_view_dob" contenteditable="true">০১-০৪-২০২১', 'id="main_view_dob" contenteditable="true">&nbsp;')
                     .replace('id="main_view_roll" contenteditable="true">১৬', 'id="main_view_roll" contenteditable="true">&nbsp;')
                     .replace('id="main_view_year" contenteditable="true">২০২৬', 'id="main_view_year" contenteditable="true">&nbsp;')
                     .replace('id="main_view_class" contenteditable="true">প্লে', 'id="main_view_class" contenteditable="true">&nbsp;')
                     .replace('id="main_view_eval_class" contenteditable="true">প্লে', 'id="main_view_eval_class" contenteditable="true">&nbsp;')
                     .replace('id="main_view_eval" contenteditable="true">সন্তোষজনক', 'id="main_view_eval" contenteditable="true">&nbsp;');

blankHtml = blankHtml.replace('syncData();', '// syncData();');

fs.writeFileSync('temp_precadet_blank.html', blankHtml);
const blankHtmlFile = path.resolve(__dirname, 'temp_precadet_blank.html').replace(/\\/g, '/');
const blankOutFile = path.resolve(__dirname, 'প্রত্যয়নপত্র_প্রি_ক্যাডেট_খালি_ফরম.pdf');

try {
  execSync(`"${edgePath}" --headless=new --disable-gpu --no-sandbox --print-to-pdf="${blankOutFile}" --no-pdf-header-footer "file:///${blankHtmlFile}"`, { stdio: 'inherit' });
  console.log('Pre-cadet Blank PDF Generated! Size:', fs.statSync(blankOutFile).size, 'bytes');
  fs.unlinkSync('temp_precadet_blank.html');
} catch (e) {
  console.error('Error generating Pre-cadet Blank PDF:', e.message);
}
