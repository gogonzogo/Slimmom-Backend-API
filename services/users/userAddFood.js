const { Diary } = require("../../models/");

const userAddFood = async (req, res) => {
  const { date, title, weight, calories } = req.body;

  try {
    // Grab id from session
    const userId = req.session.userId;
    // Check for an existing diary add one if it doesn't exist yet
    let userDiary = await Diary.findOne({ userId });
    if (!userDiary) {
      userDiary = new Diary({
        userId,
        entries: [], // Initialize the entries array
      });
    }
  
    // Check if there's an existing entry in diary for the specified date
  const existingEntry = userDiary.entries.find((entry) => entry.date === date);
    
  if (existingEntry) {
    // If the entry exists for the specified date, add the new food item
    existingEntry.foodItems.push({
      title,
      weight,
      calories,
    });
  } else {
    // If no entry exists for the date, create a new entry
    const newEntry = {
      date,
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
