const { Diary } = require('../../models');

const userDeleteFood = async (req, res) => {
    const { date, productId } = req.body;
    try {  
 const userId = req.session.userId;  
    const diaryEntry = await Diary.findOne({
      userId,
      "entries.date": date,
    });
        if (diaryEntry) {
            const foodItemIndex = diaryEntry.entries[0].foodItems.findIndex((item) => item.productId === productId);
        
            const result = await Diary.findOneAndDelete(foodItemIndex);
            await diaryEntry.save();
            return result;
        }
  } catch (err) {
    // Throw an error with a meaningful message
    console.error(err);
    throw new Error("Error deleting food item: " + err.message);
  }
};



module.exports = userDeleteFood;