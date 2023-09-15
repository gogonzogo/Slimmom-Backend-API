const { Schema, model } = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
},
  { versionKey: false, timestamps: true }
);

userSchema.methods.checkPassword = async function (loginPW) {
  return bcrypt.compare(loginPW, this.password);
};

const registrationValidationSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: Joi.string()
    // eslint-disable-next-line prefer-regex-literals
    //rachel will update
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .required(),
  username: Joi.string()
  .required(),
});

const User = model('users', userSchema);

module.exports = {
  User,
  registrationValidationSchema,
};
