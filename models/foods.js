const { Schema, model } = require('mongoose');

const foodSchema = new Schema({
  categories: {
    type: String,
  },
  weight: {
    type: String,
    unique: true,
  },
  title: {
    type: String,
  },
  calories: {
    type: String,
  },
  groupBloodNotAllowed: {
    type: [Boolean],
    default: [],
  },
},
  { versionKey: false, timestamps: true }
);

const Food = model('food', foodSchema);

module.exports = {
  Food,
};
