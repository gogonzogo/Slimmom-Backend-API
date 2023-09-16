const { Schema, model } = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
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

// create a method for our userSchema
// this method will hash the password and compare it to the hashed password in the database
userSchema.methods.checkPassword = async function (loginPW) {
  return bcrypt.compare(loginPW, this.password);
};

// Define the Joi validation schema for user registration
const registrationValidationSchema = Joi.object({// joi validations are objects
 name: Joi.string()// name validation starts here
    .min(3) // these are found in the joi documentation
    .max(20)
    .alphanum()
    .messages({// attaches a message when a validation error occurs
      'string.min': 'Name must be at least 3 characters long',
      'string.max': 'Name cannot be more than 20 characters long',
      'string.alphanum': 'Name can only contain alphanumeric characters',
    })
    .required(), // // if empty, will send a default error message 

  email: Joi.string()// email validation 
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org', 'edu', 'gov', 'us'] } })
    .messages({
    'string.email': 'Email must be a valid email address', // Custom error message for invalid email
    })
    .required(), // if empty, will send a default error message 
  
  password: Joi.string()
    .min(8)
    .max(20)
    .custom((value, helpers) => {// password.requirements
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
    .required(), 
});

const User = model('users', userSchema);

module.exports = {
  User,
  registrationValidationSchema,
  loginValidationSchema
};
