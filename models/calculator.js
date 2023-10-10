const { Schema, model } = require('mongoose');

const calculatorInputsSchema = new Schema(
  {
    height: {
      type: Number,
    },
    age: {
      type: Number,
      required: true,
    },
    bloodType: {
      type: Number,
      required: true,
    },
    currentWeight: {
      type: Number,
    },
    desiredWeight: {
      type: Number,
    },
    heightFeet: {
      type: String,
    },
    heightInch: {
      type: String,
    },
    currentWeightLbs: {
      type: String,
    },
    desiredWeightLbs: {
      type: String,
    },
    dailyRate: {
      type: Number,
      required: true,
    },
    unitOfMeasure: {
      type: String,
      required: true,
    },
  }
);

const calculatorEntrySchema = new Schema(
  {
    date: {
      type: String,
      required: true,
    },
    calculatorEntry: [calculatorInputsSchema],
  }
);

const calculatorSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    calculatorEntries: [calculatorEntrySchema],
  },
  { versionKey: false, timestamps: true }
);

const Calculator = model('calculator', calculatorSchema);

module.exports = {
  Calculator,
};