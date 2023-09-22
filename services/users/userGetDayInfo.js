const { Diary } = require("../../models");

const userGetDayInfo = async (req) => {
  try {
    const { date } = req.body;
    const userId = req.session.userId
    console.log(date)
    console.log(userId)

    const dayInfo = await Diary.findOne({
      userId,
      [`entries.date`]: date,
    });
    if (!dayInfo) {
      return 404;
    }
    return {
      date,
      // dailyRate: dayInfo.entries[0].dailyRate, uncomment when model will be updated
      foodItems: dayInfo.entries[0].foodItems,
    };
  } catch (err) {
    console.log("Error getting diary", err);
    return 500;
  }
};

module.exports = userGetDayInfo;
