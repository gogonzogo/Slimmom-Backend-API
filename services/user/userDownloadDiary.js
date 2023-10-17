const { Diary, Calculator, User } = require("../../models");
const PDFDocument = require('pdfkit');
// const path = require('node:path');
const fs = require('fs');
const https = require('https');
const path = require('path');

const userDownloadDiary = async (req) => {



  let lineNum = 30;
  let dairyRate = 0
  let dayCalories = 0
  const doc = new PDFDocument({
    layout: 'portrait',
    size: 'letter',
    margins: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    }
  });
  function header(calculatorData, userinfo) {
    const imageWidth = 167 // what you wants
    doc.image('logo.jpeg',
      doc.page.width / 2 - imageWidth / 2, doc.y, {
      width: imageWidth
    });
    // doc.image('logo.jpeg',{ fit: [167, 66], align: 'center' })
    doc.moveDown();
    doc.fontSize(20);
    const head1 = 'Dairy Summary for'
    const head2 = `${userinfo[0].name.toUpperCase()}   (${userinfo[0].email})`
    const header3 = `${startDate} through ${endDate}`
    const labelWidth = doc.widthOfString(head1);
    const labelWidth2 = doc.widthOfString(head2);
    const labelWidth3 = doc.widthOfString(header3);

    const labelHeight = doc.heightOfString(head1)
    const labelHeight2 = doc.heightOfString(head2)
    doc.text(head1, (578 - labelWidth) / 2, 100);
    doc.text(head2, (578 - labelWidth2) / 2, 100 + labelHeight + 2);
    lineNum = 100 + labelHeight + 2 + labelHeight2 + 5
    doc.text(header3, (578 - labelWidth3) / 2, lineNum);
    lineNum = lineNum + labelHeight2 + 5


    doc.fontSize(20);
    const calculatorInfo = calculatorData[0].calculatorEntries[0].calculatorEntry[0]
    const calcInfo = `Height:  ${calculatorInfo.height.toString()}    Age:  ${calculatorInfo.age.toString()}  BloodType:   ${calculatorInfo.bloodType.toString()}`
    const calcInfo2 = `Current Weight:  ${calculatorInfo.currentWeight.toString()}    Desired Weight:  ${calculatorInfo.desiredWeight.toString()}`
    const calcWidth = doc.widthOfString(calcInfo);
    const calcWidth2 = doc.widthOfString(calcInfo2);
    doc.text(calcInfo, (578 - calcWidth) / 2, lineNum);
    doc.text(calcInfo2, (578 - calcWidth2) / 2, lineNum + labelHeight + 5);
    lineNum = lineNum + (labelHeight2 * 2) + 15;
    doc.fontSize(10);
  }


  async function downloadFile(url, targetFile) {
    return await new Promise((resolve, reject) => {
      https.get(url, response => {
        const code = response.statusCode ?? 0

        if (code >= 400) {
          return reject(new Error(response.statusMessage))
        }

        // save the file to disk
        const fileWriter = fs
          .createWriteStream(targetFile)
          .on('finish', () => {
            resolve({})
          })

        response.pipe(fileWriter)
      }).on('error', error => {
        reject(error)
      })
    })
  }



  const { startDate, endDate } = req.body
  const startDateParse = Date.parse(startDate)
  const endDateParse = Date.parse(endDate)



  try {
    const userId = req.user._id;

    const userinfo = await User.find({ _id: userId }, { _id: 0 });
    const diaryData = await Diary.find({ userId }, { _id: 0 });
    const calculatorData = await Calculator.find({ userId }, { _id: 0 });


    if (diaryData) {
      const output = `dairy${userId}.pdf`
      const url = path.join(__dirname, '../../', "pdf", output)
      doc.pipe(fs.createWriteStream(url));
      header(calculatorData, userinfo)
      diaryData[0].entries.map((item) => {

        dayCalories = 0
        dairyRate = item.dailyRate
        doc.fontSize(20);

        if (Date.parse(item.date) >= startDateParse && Date.parse(item.date) <= endDateParse) {
          const head1 = item.date
          const labelWidth = doc.widthOfString(head1);
          const labelHeight = doc.heightOfString(head1)
          doc.text(head1, (578 - labelWidth) / 2, lineNum);
          lineNum = lineNum + labelHeight + 10
          if (lineNum >= 675) {
            doc.addPage();
            header(calculatorData, userinfo)
          }
          doc.fontSize(10);
          doc.text('Food Name', 40, lineNum);
          doc.text('Grams', 325, lineNum);
          doc.text('Calories', 450, lineNum);
          const labelHeight1 = doc.heightOfString('Food Name')

          lineNum = lineNum + labelHeight1 + 3
          if (lineNum >= 675) {
            doc.addPage();
            header(calculatorData, userinfo)

          }

          item.foodItems.map((fooditem) => {
            doc.fontSize(10);

            const item = fooditem.title
            const weight = fooditem.weight
            const cals = fooditem.calories
            doc.text(item, 40, lineNum);
            doc.text(weight.toString(), 325, lineNum);
            doc.text(cals.toString(), 450, lineNum);
            const labelHeight1 = doc.heightOfString(item)

            lineNum = lineNum + labelHeight1 + 2
            if (lineNum >= 675) {
              doc.addPage();
              header(calculatorData, userinfo)

            }
            dayCalories = dayCalories + fooditem.calories;

            return diaryData
          })
          lineNum = lineNum + 5


          doc.text(`Daily Rate:  ${dairyRate.toString()}`, 40, lineNum);
          doc.text(`Calories consumed ${dayCalories.toString()}`, 200, lineNum);
          if (dairyRate * 1 - dayCalories * 1 < 0) {
            doc.fillColor('red');
          } else {
            doc.fillColor('black');

          }
          doc.text(`Remaining calories ${(dairyRate * 1 - dayCalories * 1).toString()}`, 350, lineNum)
          doc.fillColor("black");

          lineNum = lineNum + 20
          if (lineNum >= 675) {
            doc.addPage();
            header(calculatorData, userinfo)

          }
        }
        return diaryData

      })
      doc.end();
      downloadFile(url)
      fs.unlink(url, (err => {
        if (err) console.log(err);
        else {
          console.log("\nDeleted file: example_file.txt");
        }
      }));

    };
    return { diaryData, calculatorData, userinfo }

  } catch (err) {
    console.log("Error Archiving data");
  }
};
module.exports = userDownloadDiary;