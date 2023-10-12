const { Schema, model } = require("mongoose");

// Schema for the FoodItem
const foodItemSchema = new Schema(
  {
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
  },
  { versionKey: false, timestamps: true }
);

// Schema for a single diary entry
const diaryEntrySchema = new Schema(
  {
    date: {
      type: String,
      required: [true, "userId is required"],
    },
    dailyRate: {
      type: Number,
      default: 0,
    },
    foodItems: [foodItemSchema], // An array of food items for the day
  },
  { versionKey: false, timestamps: true }
);

// Schema for the entire diary (collection of diary entries)
const diaryArchiveSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    entries: [diaryEntrySchema], // An array of diary entries for the user
    archiveDate: {
      type: Date
    }
  },
  { versionKey: false, timestamps: true }
);

const DiaryArchive = model("diaryArchive", diaryArchiveSchema);

module.exports = { DiaryArchive };
