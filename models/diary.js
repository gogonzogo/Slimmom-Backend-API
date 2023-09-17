const { Schema, model } = require('mongoose');
const { User } = require ('user')

const productSchema = new Schema({
  productId: {
    title: {
      type: String,
      required: true
    },
    weight: {
      type: Number,
      required: true,
    },
    calories: {
      type: Number,
      required: true
    }
  }
})

const diarySchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: User,
    required: [true, "userId is required"],
  },
  entries: [
    {
      date: {
        type: Date,
        required: [true, "date is required"],
      },
      eatenProduct: productSchema,
    },
  ],
});

const Diary = model('diary', diarySchema);

module.exports = {
  Diary,
};


// about the Date: 

// A BSON Date is a 64 - bit integer representing the number of milliseconds since 
// the Unix epoch(January 1, 1970, at 00:00:00 UTC).

// When you retrieve a date from MongoDB using a library like Mongoose in your Node.js application,
//   it will typically be converted back to a JavaScript Date object.This conversion ensures that 
//   the date remains compatible with the rest of your JavaScript code.