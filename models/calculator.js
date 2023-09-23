const { Schema, model } = require('mongoose');



const measurementSchema = new Schema({ 
  date: {
    type: String,
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
  measurementType: {
      type: String,
    },
});

const calculatorSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    entries: [measurementSchema], 
  },
  { versionKey: false, timestamps: true },
);

const Calculator = model('calculator', calculatorSchema);

module.exports = {
  Calculator,
};