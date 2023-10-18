const { Diary } = require("../../models");
const { findClosestCalculator } = require("../../utils");

const diaryAddEntry = async (req) => {
  try {
    const { date, title, weight, calories } = req.body;
    if (!date || !title || !weight || !calories) {
      return 400;
    }
    const userId = req.user._id;
    let userDiary = await Diary.findOne({ userId });
    if (!userDiary) {
      userDiary = new Diary({
        userId,
        entries: [],
      });
    }
    const existingEntry = userDiary.entries.find(
      (entry) => entry.date === date
    );
    if (existingEntry) {
      existingEntry.foodItems.push({
        title,
        weight,
        calories,
      });
    } else {
      const closest = await findClosestCalculator(userId, date);
      const dailyRate = closest.calculatorEntries.calculatorEntry.dailyRate
      const newEntry = {
        date,
        dailyRate,
        foodItems: [
          {
            title,
            weight,
            calories,
          },
        ],
      };

      userDiary.entries.push(newEntry);
      req.userData = {
        newEntry,
      }
    }
    await userDiary.save();
    const newEntry = userDiary.entries.find(
      (entry) => entry.date === date
    );
    const newDailyRate = newEntry.dailyRate
    const newlyAddedFoodItem = newEntry.foodItems[newEntry.foodItems.length - 1];
    return { newlyAddedFoodItem, newDailyRate };
  } catch (err) {
    console.log(err);
    throw new Error("Error adding diary entry" + err.message)
  }
};

module.exports = diaryAddEntry;
