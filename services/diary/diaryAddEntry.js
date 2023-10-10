const { Diary, Calculator } = require("../../models");

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
      const data = await Calculator.findOne({ userId });
      const dailyRate = data ? data._doc.dailyRate : 0;
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
    }
    await userDiary.save();
    const newEntry = userDiary.entries.find(
      (entry) => entry.date === date
    );
    const newlyAddedFoodItem = newEntry.foodItems[newEntry.foodItems.length - 1];
    return newlyAddedFoodItem;
  } catch (err) {
    console.error(err);
    throw new Error("Error adding diary entry" + err.message)
  }
};

module.exports = diaryAddEntry;
