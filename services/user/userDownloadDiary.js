const { Diary, Calculator, User } = require("../../models");
const { jsPDF } = require("jspdf");

const userDownloadDiary = async (req) => {
// eslint-disable-next-line new-cap
  const doc = new jsPDF();
  let lineNum = 30;
      let dairyRate = 0
      let dayCalories = 0
  function header(calculatorData, userinfo) {
    doc.setFontSize(20);
    doc.text("Dairy Summary for", 105, 30, null, null, "center");
    doc.text(`${userinfo[0].name.toUpperCase()}   (${userinfo[0].email})`, 105, 40, null, null, "center");

    doc.setFontSize(10);
    const calculatorInfo = calculatorData[0].calculatorEntries[0].calculatorEntry[0]
        doc.text(`height:  ${calculatorInfo.height.toString()}    age:  ${calculatorInfo.age.toString()}  bloodType:   ${calculatorInfo.bloodType.toString()}`, 105, 60, null, null, "center");
        doc.text(`Current Weight:  ${calculatorInfo.currentWeight.toString()}    Desired Weight:  ${calculatorInfo.desiredWeight.toString()}`, 105, 65, null, null, "center");
    lineNum = 80;
  }



  try {
    const userId = req.user._id;
    const userinfo = await User.find({ _id: userId }, { _id: 0 });
    const diaryData = await Diary.find({ userId }, { _id: 0 });
    const calculatorData = await Calculator.find({ userId }, { _id: 0 });


    if (diaryData) {
      header(calculatorData, userinfo) 
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
          header(calculatorData, userinfo) 
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
            header(calculatorData, userinfo) 
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
          header(calculatorData, userinfo) 
          doc.addPage("letter", "l");
        }

        return diaryData
      })
      doc.save("newFile.pdf");
    };
    return { diaryData, calculatorData, userinfo }

  } catch (err) {
    console.log("Error Archiving data");
  }
};
module.exports = userDownloadDiary;