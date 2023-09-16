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
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org', 'edu', 'gov', 'us'] } })
    .messages({
      'string.email': 'Email must be a valid email address',
    })
    .required(),
  
  
password: Joi.string()
  .min(8)
  .max(20)
  .custom((value, helpers) => {
    const hasLowerCase = /(?=.*[a-z])/.test(value);
    const hasUpperCase = /(?=.*[A-Z])/.test(value);
    const hasDigit = /(?=.*\d)/.test(value);
    const hasSpecialChar = /(?=.*[!@#$%^&*])/.test(value);
    const hasNoSpaces = !/\s/.test(value);

    const requirementsMet = [hasLowerCase, hasUpperCase, hasDigit, hasSpecialChar, hasNoSpaces].filter(Boolean).length;
if (requirementsMet !== 5) {
      return helpers.message('Password must include at least 1 capital letter, 1 number, 1 special character, and no spaces');
    }

    return value;
  })
  .required()
  .messages({
    'string.min': 'Password must be at least 8 characters long',
    'string.max': 'Password cannot be more than 20 characters long',
  }),

  

  name: Joi.string()
    .min(3)
    .max(20)
    .alphanum()
    .messages({
      'string.min': 'Name must be at least 3 characters long',
      'string.max': 'Name cannot be more than 20 characters long',
      'string.alphanum': 'Name can only contain alphanumeric characters',
    })
    .required(),
});
const User = model('users', userSchema);

module.exports = {
  User,
  registrationValidationSchema,
};
