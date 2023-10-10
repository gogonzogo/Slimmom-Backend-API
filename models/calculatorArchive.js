const { Schema, model } = require('mongoose');


const calculatorArchiveSchema = new Schema({
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
  dailyRate: {
    type: Number,

  },
  unitOfMeasure: {
    type: String,
  },
  originalWeight: {
    type: Number,
  },
  originalDate: {
    type: Date,
  },
  enteredDate: { type: Date }
});

const CalculatorArchive = model('calculatorArchive', calculatorArchiveSchema);

module.exports = {
  CalculatorArchive,
};