const { Diary } = require("../../models/");

const userAddFood = async (req, res) => {
  try {
    // Extract necessary data from the request
    const { date, eatenProduct } = req.body;
    // check if this is a new entry
    const userId = req.session.userId;
    let newEntry = await Diary.findOne({ userId });
    if (!newEntry) {
      // If there is no existing entry for the user, create a new one
      newEntry = new Diary({
        userId,
        entries: [{ date, eatenProduct }],
      });
      // Save the new entry to the database
      const data = await newEntry.save();

      // Return the newly created entry
      return data;
    }
    // if userId exists in diary db check for the date
    const entryToUpdate = newEntry.entries.find(
      (entry) => entry.date.toISOString() === new Date(date).toISOString()
    );

    if (!entryToUpdate) {
      // if there is not an existing date, add one
      newEntry.entries.push({ date, eatenProduct });
      await newEntry.save();
      return newEntry;
    }
    // if an entry for the date exists add to the entry
    entryToUpdate.eatenProduct = {
      ...entryToUpdate.eatenProduct,
      ...eatenProduct,
    };
    await newEntry.save();
    return newEntry;
  } catch (err) {
    // Throw an error with a meaningful message
    console.error(err)
    throw new Error("Error adding food item: " + err.message);
  }
};

module.exports = userAddFood;
