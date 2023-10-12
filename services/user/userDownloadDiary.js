const { Diary, Calculator, } = require("../../models");
const { jsPDF } = require("jspdf");

const userDownloadDiary = async (req) => {
  try {
    const userId = req.user._id;
    const diaryData = await Diary.find({ userId }, { _id: 0 });
    const calculatorData = await Calculator.find({ userId }, { _id: 0 });
    console.log('calculatorData', calculatorData)


    if (diaryData) {
      // eslint-disable-next-line new-cap
      const doc = new jsPDF();
      let lineNum = 30;
      let dairyRate = 0
      let dayCalories = 0
      diaryData[0].entries.map((item) => {

        dayCalories = 0
        dairyRate = item.dailyRate
        doc.setFontSize(20);
        doc.text(item.date, 105, lineNum, null, null, "center");
        lineNum = lineNum + 20
        if (lineNum >= 280) {
          lineNum = 30
          doc.addPage("letter", "l");
        }
        doc.setFontSize(10);
        doc.text('Food Name', 40, lineNum);
        doc.text('Grams', 120, lineNum);
        doc.text('Calories', 150, lineNum);
        lineNum = lineNum + 5
        if (lineNum >= 280) {
          lineNum = 30
          doc.addPage("letter", "l");
        }

        item.foodItems.map((fooditem) => {
          doc.setFontSize(10);

          const item = fooditem.title
          const weight = fooditem.weight
          const cals = fooditem.calories
          doc.text(item, 40, lineNum);
          doc.text(weight.toString(), 120, lineNum);
          doc.text(cals.toString(), 150, lineNum);

          lineNum = lineNum + 5
          if (lineNum >= 280) {
            lineNum = 30
            doc.addPage("letter", "l");
          }
          dayCalories = dayCalories + fooditem.calories;

          return diaryData
        })
        lineNum = lineNum + 5


        doc.text(`Daily Rate:  ${dairyRate.toString()}`, 40, lineNum);
        doc.text(`Calories consumed ${dayCalories.toString()}`, 80, lineNum);
        if (dairyRate * 1 - dayCalories * 1 < 0) {
          doc.setTextColor("red");
        } else {
          doc.setTextColor("black");

        }
        doc.text(`Remaining calories ${(dairyRate * 1 - dayCalories * 1).toString()}`, 125, lineNum)
        doc.setTextColor("black");
        lineNum = lineNum + 20
        if (lineNum >= 280) {
          lineNum = 30
          doc.addPage("letter", "l");
        }

        return diaryData
      })
      doc.save("newFile.pdf");
    };
    return { diaryData, calculatorData }

  } catch (err) {
    console.log("Error Archiving data");
  }
};
module.exports = userDownloadDiary;