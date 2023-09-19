const { Schema, model } = require('mongoose');
const { User } = require('./user');


const measurementSchema = new Schema({

  userId: {
    type: Schema.Types.ObjectId,
    ref: User,
    required: [true, "userId is required"],
  }, 
  
  height: {
    type: Number,
    
  },
  weight: {
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
  notAllowedFood: {
    type: [],
    
  },
});

const Calculator = model('calculator', measurementSchema);

module.exports = {
  Calculator,
};