const { Diary } = require("../../models");

const userDeleteFood = async (req) => {
  const { date, entryId } = req.body;
  try {
    const userId = req.session.userId;
    const deleteFoodItem = await Diary.findOneAndUpdate(
      { userId, "entries.date": date, "entries.foodItems._id": entryId },
      { $pull: { "entries.$.foodItems": { _id: entryId } } },
      { new: true }
    );
    if (!deleteFoodItem) {
      return 404;
    }
    return deleteFoodItem;
  } catch (err) {
    // Throw an error with a meaningful message
    console.error(err);
    throw new Error("Error deleting food item: " + err.message);
  }
};

module.exports = userDeleteFood;
