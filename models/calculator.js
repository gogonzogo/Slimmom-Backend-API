const { Schema, model } = require('mongoose');


const calculatorSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  height: {
    type: Number,

  },

  age: {
    type: Number,

  },
  bloodType: {
    type: Number,
  },
  currentWeight: {
    type: Number,

  },
  desiredWeight: {
    type: Number,

  },
  totalCalories: {
    type: Number,

  },
  measurementType: {
    type: String,
  },
  originalWeight: {
    type: Number,
  },
originalDate: {
    type: Date,
  },
  enteredDate: { type: Date}
});

const Calculator = model('calculator', calculatorSchema);

module.exports = {
  Calculator,
};