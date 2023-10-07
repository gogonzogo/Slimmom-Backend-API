const { Diary } = require("../models");

const findDiaryEntry = async (date, user) => {
  try {
    const userId = user._id;
    const dayInfo = await Diary.findOne({
      userId,
      entries: {
        $elemMatch: { date },
      },
    });
    if (dayInfo) {
      const entry = dayInfo.entries.find((entry) => entry.date === date);
      return {
        date,
        dailyRate: entry.dailyRate,
        foodItems: entry.foodItems,
      };
    } else {
      return 404;
    };
  } catch (err) {
    console.log(err);
    throw new Error("Error getting diaryEntry: " + err.message);
  }
}

module.exports = findDiaryEntry