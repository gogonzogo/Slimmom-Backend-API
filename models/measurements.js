const { Schema, model } = require('mongoose');

const measurementSchema = new Schema({
  height: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  currentWeight: {
    type: Number,
    required: true,
  },
  desiredWeight: {
    type: Number,
    required: true,
  },
  dailyCalorieIntake: {
    type: Number,
    required: true,
  },
  averageCalorieIntake: {
    type: Number,
    required: true,
  },
});

const Measurements = model('measurements', measurementSchema);

module.exports = {
  Measurements,
};