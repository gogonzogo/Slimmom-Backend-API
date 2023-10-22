const { Schema, model } = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    token: {
      type: String,
      required: false,
    },
    avatar: {
      type: String,
      required: false,
    },
  },
  { versionKey: false, timestamps: true }
);

// create a method for our userSchema
// this method will hash the password and compare it to the hashed password in the database
userSchema.methods.checkPassword = async function (loginPW) {
  return bcrypt.compare(loginPW, this.password);
};


const registrationValidationSchema = Joi.object({
 name: Joi.string()
    .min(3) 
    .max(20)
    .custom((value, helpers) => {
      const hasNoSpaces = /^[a-zA-Z0-9]+(([a-zA-Z0-9- ])?[a-zA-Z0-9]*)*$/.test(value)
      if (!hasNoSpaces) {
        return helpers.message('Invalid name format, cannot start with a space, no special characters')
      }
      return value
    })
    .messages({
      'string.min': 'Name must be at least 3 characters long',
      'string.max': 'Name cannot be more than 20 characters long',
    })
    .required(), 

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
      const hasUpperCase = /(?=.*[A-Z])/.test(value);
      const hasDigit = /(?=.*\d)/.test(value);
      const hasSpecialChar = /[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/.test(value);
      const hasNoSpaces = !/\s/.test(value);

 
      const requirementsMet = [ hasUpperCase, hasDigit, hasSpecialChar, hasNoSpaces].filter(Boolean).length;
      
      if (requirementsMet !== 4) { 
        return helpers.message('Password must include at least 1 capital letter, 1 number, 1 special character, and no spaces');
      }

      return value;
    })
    .required(),

});

const loginValidationSchema = Joi.object({
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
      const hasUpperCase = /(?=.*[A-Z])/.test(value);
      const hasDigit = /(?=.*\d)/.test(value);
      const hasSpecialChar = /[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/.test(value);
      const hasNoSpaces = !/\s/.test(value);

      const requirementsMet = [hasUpperCase, hasDigit, hasSpecialChar, hasNoSpaces].filter(Boolean).length;
      
      if (requirementsMet !== 4) { 
        return helpers.message('Password must include at least 1 capital letter, 1 number, 1 special character, and no spaces');
      }

      return value;
    })
    .required(), 
});

const User = model('users', userSchema);

module.exports = {
  User,
  registrationValidationSchema,
  loginValidationSchema
};
