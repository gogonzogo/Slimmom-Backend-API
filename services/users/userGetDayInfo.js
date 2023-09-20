const { Measurements, Diary } = require("../../models");

const userGetDayInfo = async (req) => {
  try {
    const { date } = req.body;
    const userId = req.session.userId;

    const dayInfo = await Diary.findOne({
      userId,
      [`entries.date`]: date,
    });
    if (!dayInfo) {
      return 404;
    }
    // const totalConsumed = dayInfo.entries[0].foodItems.reduce(
    //   (acc, entrie) => acc + entrie.calories,
    //   0
    // );        will be used in endpoint for user stats
    console.log("dayInfo:", dayInfo);
    return {
      totalCalories: 0,
      date,
      foodItems: dayInfo.entries[0].foodItems,
    };
  } catch (err) {
    console.log("Error getting diary", err);
    return 500;
  }
};

module.exports = userGetDayInfo;
