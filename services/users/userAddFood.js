const { Diary } = require("../../models/");

const userAddFood = async (req, res) => {
  const { date, productId, title, weight, calories } = req.body;

 console.log("Parsed req.body:", req.body);
 console.log("Parsed productId:", productId);
 console.log("Parsed date:", date);
 console.log("Parsed title:", title);
 console.log("Parsed weight:", weight);
 console.log("Parsed calories:", calories);

  try {
    // Create a new entry
    const userId = req.session.userId;
    let userDiary = await Diary.findOne({ userId });
    if (!userDiary) {
      userDiary = new Diary({
        userId,
        entries: [], // Initialize the entries array
      });
    }

    // Check if there's an existing entry for the specified date
    const existingEntry = userDiary.entries.find(
      (entry) => entry.date.toISOString() === new Date(date).toISOString()
    );

    if (existingEntry) {
    // If the entry exists for the specified date, add the new food item
      existingEntry.foodItems.push({ productId, title, weight, calories });
    } else {
    // If no entry exists for the date, create a new entry
      const newFoodItem = {
        productId,
        title,
        weight,
        calories,
      };

      const newEntry = {
        date,
        foodItems: [newFoodItem],
      };

      userDiary.entries.push(newEntry);
    };

    // Save the entry to the database
    const data = await userDiary.save();
    return data;
  } catch (err) {
    // Throw an error with a meaningful message
    console.error(err);
    throw new Error("Error adding food item: " + err.message);
  }
};

module.exports = userAddFood;
