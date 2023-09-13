const { Schema, model } = require('mongoose');

const diarySchema = new Schema({
  entries: [{
    date: {
      type: Date,
      required: true,
    },
    product: {
      type: String,
      required: true,
    },
    grams: {
      type: String,
      required: true,
    },
    calories: {
      type: Number,
      required: true,
    },
    totalCalories: {
      type: String,
      required: true,
    },
  }],
});

const Diary = model('diary', diarySchema);

module.exports = {
  Diary,
};