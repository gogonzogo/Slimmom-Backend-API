const mongoose = require("mongoose");

// Schema for the FoodItem ??? DO WE WANT THE PRODUCT ID TO BE A NUMBER FROM THE DB?
const foodItemSchema = new mongoose.Schema({
  productId: {
    type: Number,
    required: false
    },
    title: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    calories: {
      type: Number,
      required: true,
    },
  
});

// Schema for a single diary entry
const diaryEntrySchema = new mongoose.Schema({
  date: {
    type: Date,
    required: [true, "userId is required"],
  },
  foodItems: [foodItemSchema], // An array of food items for the day
});

// Schema for the entire diary (collection of diary entries)
const diarySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  entries: [diaryEntrySchema], // An array of diary entries for the user
});

const Diary = mongoose.model("diary", diarySchema);

module.exports = { Diary };