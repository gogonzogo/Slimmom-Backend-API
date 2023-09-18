const { Schema, model } = require('mongoose');



const measurementSchema = new Schema({
  height: {
    type: Number,
    
  },
  weight: {
    type: Number,
    
  },
  age: {
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
  notAllowedFood: {
    type: [],
    
  }
  // averageCalorieIntake: {
  //   type: Number,
  //   required: true,
  // },
});

const Measurements = model('measurements', measurementSchema);

module.exports = {
  Measurements,
};