const { Diary } = require("../../models");

const diaryGetDayEntries = async (req) => {
  try {
    const date = req.body.date || req.query.date;
    const userId = req.user._id;
    const dayInfo = await Diary.findOne({
      userId,
      entries: {
        $elemMatch: { date },
      },
    });
    if (!dayInfo) {
      return 404;
    }
    const entry = dayInfo.entries.find((entry) => entry.date === date);
    return {
      date,
      dailyRate: entry.dailyRate,
      foodItems: entry.foodItems,
    };
  } catch (err) {
    console.log(err);
    throw new Error("Error getting diary" + err.message)
  }
};

module.exports = diaryGetDayEntries;
