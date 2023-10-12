const { Diary, Calculator, } = require("../../models");

const userArchive = async (req) => {
  try {
    const userId = req.user._id;
    await Diary.aggregate([{ $match: { userId } }, {
      $addFields: {
        archiveDate: Date.now()
      }
    }, { $merge: { into: "DiaryArchive" } }]);
    await Calculator.aggregate([{ $match: { userId } }, { $merge: { into: "CalculatorArchive" } }]);
    await Diary.deleteMany({ userId });
    await Calculator.findOneAndDelete({ userId });
    return 200

  } catch (err) {
    console.log("Error Archiving data");
  }
};
module.exports = userArchive;