const { Diary, Calculator, } = require("../../models");
// const downloadsFolder = require('downloads-folder');
const xlsx = require("xlsx");
// const fs = require('node:fs/promises');
// const downloadFolder = downloadsFolder()

const userDownloadDiary = async (req) => {
    try {
        const userId = req.user._id;
      const diaryData = await Diary.find({ userId }, { _id: 0 });
      const calculatorData = await Calculator.find({ userId }, { _id: 0 });
       console.log('json diaryData', JSON.stringify(diaryData))
      console.log('json calculatorData', JSON.stringify(calculatorData))
     let diaryDataJson = JSON.stringify(diaryData)
      let calculatorDataJson = JSON.stringify(calculatorData)
      diaryDataJson = JSON.parse(diaryDataJson)
      calculatorDataJson = JSON.parse(calculatorDataJson)
      const workbook = xlsx.utils.book_new();
      const workbook2 = xlsx.utils.book_new();
        const worksheet = xlsx.utils.json_to_sheet(calculatorDataJson)
        const worksheet2 = xlsx.utils.json_to_sheet(diaryDataJson)
        xlsx.utils.book_append_sheet(workbook, worksheet, "calculator")
        xlsx.utils.book_append_sheet(workbook2, worksheet2, "diary")
      xlsx.writeFile(workbook, "c:/temp/slimmom.xlsx")
            xlsx.writeFile(workbook2, "c:/temp/slimmom2.xlsx")

return 20
    } catch (err) {
        console.log("Error Archiving data");
      }
    };
    module.exports = userDownloadDiary;