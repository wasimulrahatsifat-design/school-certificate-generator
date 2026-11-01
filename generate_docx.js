const { 
  Document, 
  Packer, 
  Paragraph, 
  TextRun, 
  Table, 
  TableRow, 
  TableCell, 
  WidthType, 
  AlignmentType, 
  BorderStyle, 
  ImageRun, 
  PageOrientation,
  VerticalAlign
} = require('docx');
const fs = require('fs');

const logoData = fs.readFileSync('logo.png');
const bannerData = fs.readFileSync('banner.png');

const doc = new Document({
  sections: [{
    properties: {
      page: {
        size: {
          orientation: PageOrientation.LANDSCAPE,
          width: 16838, // A4 landscape width in twips
          height: 11906 // A4 landscape height in twips
        },
        margin: {
          top: 720,
          right: 720,
          bottom: 720,
          left: 720
        }
      }
    },
    children: [
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          new TableRow({
            children: [
              // LEFT CELL: STUB / COUNTERFOIL (অফিস কপি)
              new TableCell({
                width: { size: 30, type: WidthType.PERCENTAGE },
                borders: {
                  top: { style: BorderStyle.NONE },
                  bottom: { style: BorderStyle.NONE },
                  left: { style: BorderStyle.NONE },
                  right: { style: BorderStyle.DASHED, size: 12, color: '888888' }
                },
                margins: { right: 360, left: 140, top: 140, bottom: 140 },
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [
                      new TextRun({ text: 'শওকত ভূঁইয়া চাইল্ড কেয়ার হোমস', bold: true, size: 24, font: 'Kalpurush' })
                    ]
                  }),
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    spacing: { before: 80, after: 80 },
                    children: [
                      new ImageRun({
                        data: logoData,
                        transformation: { width: 50, height: 50 }
                      })
                    ]
                  }),
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [
                      new TextRun({ text: 'কংশনগর, বুড়িচং, কুমিল্লা', bold: true, size: 18, font: 'Kalpurush' })
                    ]
                  }),
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    spacing: { before: 120, after: 180 },
                    children: [
                      new TextRun({ text: 'প্রত্যয়নপত্র', bold: true, size: 22, underline: {}, font: 'Kalpurush' })
                    ]
                  }),
                  new Paragraph({
                    spacing: { after: 120 },
                    children: [
                      new TextRun({ text: 'প্রত্যয়ন করা যাচ্ছে যে .................................................', size: 18, font: 'Kalpurush' })
                    ]
                  }),
                  new Paragraph({
                    spacing: { after: 120 },
                    children: [
                      new TextRun({ text: 'পিতা: .................................................................', size: 18, font: 'Kalpurush' })
                    ]
                  }),
                  new Paragraph({
                    spacing: { after: 120 },
                    children: [
                      new TextRun({ text: 'মাতা: ................................................................', size: 18, font: 'Kalpurush' })
                    ]
                  }),
                  new Paragraph({
                    spacing: { after: 120 },
                    children: [
                      new TextRun({ text: 'জন্ম তারিখ: ................... রোল নং: ...................', size: 18, font: 'Kalpurush' })
                    ]
                  }),
                  new Paragraph({
                    spacing: { after: 100 },
                    children: [
                      new TextRun({ text: 'অত্র বিদ্যালয়ে ২০২৬ ইং সনে প্লে শ্রেণিতে অধ্যয়ন করেছে।', size: 18, font: 'Kalpurush' })
                    ]
                  }),
                  new Paragraph({
                    spacing: { after: 100 },
                    children: [
                      new TextRun({ text: 'তার প্লে শ্রেণির শিক্ষা মূল্যায়ন সন্তোষজনক।', size: 18, font: 'Kalpurush' })
                    ]
                  }),
                  new Paragraph({
                    spacing: { after: 100 },
                    children: [
                      new TextRun({ text: 'সে পরবর্তী শ্রেণিতে উন্নীত হওয়ার যোগ্য।', size: 18, font: 'Kalpurush' })
                    ]
                  }),
                  new Paragraph({
                    spacing: { after: 280 },
                    children: [
                      new TextRun({ text: 'আমি তাহার উজ্জ্বল ভবিষ্যৎ কামনা করি।', size: 18, font: 'Kalpurush' })
                    ]
                  }),
                  new Paragraph({
                    spacing: { after: 100 },
                    children: [
                      new TextRun({ text: 'লেখক: ...................................', size: 17, font: 'Kalpurush' })
                    ]
                  }),
                  new Paragraph({
                    children: [
                      new TextRun({ text: 'তারিখ: ...................................         প্রধান শিক্ষক', size: 17, font: 'Kalpurush' })
                    ]
                  })
                ]
              }),

              // RIGHT CELL: MAIN CERTIFICATE (মূল সনদ)
              new TableCell({
                width: { size: 70, type: WidthType.PERCENTAGE },
                borders: {
                  top: { style: BorderStyle.DOUBLE, size: 18, color: '0f4c81' },
                  bottom: { style: BorderStyle.DOUBLE, size: 18, color: '0f4c81' },
                  left: { style: BorderStyle.DOUBLE, size: 18, color: '0f4c81' },
                  right: { style: BorderStyle.DOUBLE, size: 18, color: '0f4c81' }
                },
                margins: { top: 360, bottom: 360, left: 450, right: 450 },
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [
                      new TextRun({ text: 'শওকত ভূঁইয়া চাইল্ড কেয়ার হোমস', bold: true, size: 38, font: 'Kalpurush', color: '111111' })
                    ]
                  }),
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    spacing: { before: 100, after: 100 },
                    children: [
                      new ImageRun({
                        data: logoData,
                        transformation: { width: 68, height: 68 }
                      })
                    ]
                  }),
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [
                      new TextRun({ text: 'কংশনগর, বুড়িচং, কুমিল্লা', bold: true, size: 22, font: 'Kalpurush', color: '333333' })
                    ]
                  }),
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    spacing: { before: 160, after: 200 },
                    children: [
                      new ImageRun({
                        data: bannerData,
                        transformation: { width: 280, height: 44 }
                      })
                    ]
                  }),
                  new Paragraph({
                    spacing: { after: 180 },
                    children: [
                      new TextRun({ text: 'প্রত্যয়ন করা যাচ্ছে যে ................... ', size: 22, font: 'Kalpurush' }),
                      new TextRun({ text: 'মো: আবদুর রহমান', bold: true, size: 24, font: 'Kalpurush', underline: {} }),
                      new TextRun({ text: ' .................................................................', size: 22, font: 'Kalpurush' })
                    ]
                  }),
                  new Paragraph({
                    spacing: { after: 180 },
                    children: [
                      new TextRun({ text: 'পিতা: ....................................... ', size: 22, font: 'Kalpurush' }),
                      new TextRun({ text: 'মো: মোমিনুল ইসলাম', bold: true, size: 24, font: 'Kalpurush', underline: {} }),
                      new TextRun({ text: ' .................................................................', size: 22, font: 'Kalpurush' })
                    ]
                  }),
                  new Paragraph({
                    spacing: { after: 180 },
                    children: [
                      new TextRun({ text: 'মাতা: ....................................... ', size: 22, font: 'Kalpurush' }),
                      new TextRun({ text: 'সাথী আক্তার', bold: true, size: 24, font: 'Kalpurush', underline: {} }),
                      new TextRun({ text: ' .....................................................................', size: 22, font: 'Kalpurush' })
                    ]
                  }),
                  new Paragraph({
                    spacing: { after: 180 },
                    children: [
                      new TextRun({ text: 'জন্ম তারিখ: ................. ', size: 22, font: 'Kalpurush' }),
                      new TextRun({ text: '০১-০৪-২০২১', bold: true, size: 24, font: 'Kalpurush', underline: {} }),
                      new TextRun({ text: ' .................   রোল নং: ............. ', size: 22, font: 'Kalpurush' }),
                      new TextRun({ text: '১৬', bold: true, size: 24, font: 'Kalpurush', underline: {} }),
                      new TextRun({ text: ' .............', size: 22, font: 'Kalpurush' })
                    ]
                  }),
                  new Paragraph({
                    spacing: { after: 160 },
                    children: [
                      new TextRun({ text: 'অত্র বিদ্যালয়ে ', size: 22, font: 'Kalpurush' }),
                      new TextRun({ text: '২০২৬', bold: true, size: 24, font: 'Kalpurush', underline: {} }),
                      new TextRun({ text: ' ইং সনে ', size: 22, font: 'Kalpurush' }),
                      new TextRun({ text: 'প্লে', bold: true, size: 24, font: 'Kalpurush', underline: {} }),
                      new TextRun({ text: ' শ্রেণিতে অধ্যয়ন করেছে।', size: 22, font: 'Kalpurush' })
                    ]
                  }),
                  new Paragraph({
                    spacing: { after: 160 },
                    children: [
                      new TextRun({ text: 'তার ', size: 22, font: 'Kalpurush' }),
                      new TextRun({ text: 'প্লে', bold: true, size: 24, font: 'Kalpurush', underline: {} }),
                      new TextRun({ text: ' শ্রেণির শিক্ষা মূল্যায়ন ', size: 22, font: 'Kalpurush' }),
                      new TextRun({ text: 'সন্তোষজনক', bold: true, size: 24, font: 'Kalpurush', underline: {} }),
                      new TextRun({ text: '।', size: 22, font: 'Kalpurush' })
                    ]
                  }),
                  new Paragraph({
                    spacing: { after: 160 },
                    children: [
                      new TextRun({ text: 'সে পরবর্তী শ্রেণিতে উন্নীত হওয়ার যোগ্য।', size: 22, font: 'Kalpurush' })
                    ]
                  }),
                  new Paragraph({
                    spacing: { after: 380 },
                    children: [
                      new TextRun({ text: 'আমি তাহার উজ্জ্বল ভবিষ্যৎ কামনা করি।', size: 22, font: 'Kalpurush' })
                    ]
                  }),
                  new Paragraph({
                    spacing: { after: 80 },
                    children: [
                      new TextRun({ text: 'লেখক: .................................................', size: 20, font: 'Kalpurush' })
                    ]
                  }),
                  new Paragraph({
                    children: [
                      new TextRun({ text: 'তারিখ: .................................................                                              প্রধান শিক্ষক', size: 20, font: 'Kalpurush', bold: true })
                    ]
                  })
                ]
              })
            ]
          })
        ]
      })
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync('প্রত্যয়নপত্র_শওকত_ভূঁইয়া.docx', buffer);
  console.log('প্রত্যয়নপত্র_শওকত_ভূঁইয়া.docx created successfully! Size:', buffer.length);
});
