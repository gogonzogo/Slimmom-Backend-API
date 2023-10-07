const { Diary } = require("../../models");

const diaryDeleteEntry = async (req) => {
  const data = JSON.parse(req.params.data);
  const { formatDate, entryId } = data;
  try {
    const userId = req.user._id;
    const deleteFoodItem = await Diary.findOneAndUpdate(
      { userId, "entries.date": formatDate, "entries.foodItems._id": entryId },
      { $pull: { "entries.$.foodItems": { _id: entryId } } },
      { new: true }
    );
    const userDiary = await Diary.findOne({ userId });
    const diaryEntry = userDiary.entries.find((entry) => entry.date === formatDate);
    const foodEntryCount = diaryEntry.foodItems.length;
    if (foodEntryCount < 1) {
      userDiary.entries = userDiary.entries.filter((entry) => entry.date !== formatDate);
      await userDiary.save();
    };
    if (!deleteFoodItem) {
      return 404;
    }
    return entryId;
  } catch (err) {
    console.log(err);
    throw new Error("Error deleting food item: " + err.message);
  }
};

module.exports = diaryDeleteEntry;
