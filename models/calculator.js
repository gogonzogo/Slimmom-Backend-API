const { Schema, model} = require('mongoose')

// Schema for the calculatorItem
const calculatorItemSchema = new Schema(
  {
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
  },
  { versionKey: false, timestamps: true },
);

// Schema for a single calculator entry
const calculatorEntrySchema = new Schema({
  date: {
    type: Date,
    require: [true, "date is required"],
  },
  dailyRate: {
    type: Number,
    required: false
  },
  calculatorItems: [calculatorItemSchema], // An array of calculated items for the day
},
  { versionKey: false, timestamps: true },
);

// Schema for the entire calculator  (collection of calculator entries)
const calculatorSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    entries: [calculatorEntrySchema], // An array of calculator entries for the user
  },
  { versionKey: false, timestamps: true },
);

// const measurementSchema = new({

//   userId: {
//     type: Schema.Types.ObjectId,
//     ref: User,
//     required: [true, "userId is required"],
//   }, 
  
//   height: {
//     type: Number,
    
//   },
//   weight: {
//     type: Number,
    
//   },
//   age: {
//     type: Number,
    
//   },
//   bloodType: {
//     type: Number,
//   },
//   currentWeight: {
//     type: Number,
    
//   },
//   desiredWeight: {
//     type: Number,
    
//   },
//   totalCalories: {
//     type: Number,
    
//   },
//   notAllowedFood: {
//     type: [],
    
//   },
//   measurementType: {
//     type: String
//   },
// });

const Calculator = model('calculator', calculatorSchema);

module.exports = {
  Calculator,
};