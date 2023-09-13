const { Schema, model } = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcrypt');

const diarySchema = new Schema({
  entries: [{
    date: {
      type: Date,
      required: true,
    },
    product: {
      type: String,
      required: true,
    },
    grams: {
      type: String,
      required: true,
    },
    calories: {
      type: Number,
      required: true,
    },
    totalCalories: {
      type: String,
      required: true,
    },
  }],
});

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
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
  measurementType: {
    type: String,
    required: true,
  },
  diary: {
    type: diarySchema,
    default: {},
  },
},
  { versionKey: false, timestamps: true }
);

userSchema.methods.checkPassword = async function (loginPW) {
  return bcrypt.compare(loginPW, this.password);
};

const userValidationSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: Joi.string()
    // eslint-disable-next-line prefer-regex-literals
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .required(),
});

const User = model('users', userSchema);

module.exports = {
  User,
  userValidationSchema,
};
