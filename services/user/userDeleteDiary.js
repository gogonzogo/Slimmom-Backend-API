const { Diary, Calculator } = require("../../models");


const userDeleteDiary = async (req) => {
        try {
        const userId = req.user._id;
        await Diary.deleteMany({ userId });
        await Calculator.findOneAndDelete({ userId });
        return 200
    } catch (err) {
        console.log("Error Archiving data");
      }
    };
    module.exports = userDeleteDiary;