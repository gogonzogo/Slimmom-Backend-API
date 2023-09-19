const { Food } = require('./foods');
const { Diary } = require('./diary');
const { Calculator } = require('./calculator');
const { User, registrationValidationSchema, loginValidationSchema } = require('./user');

module.exports = {
  Food,
  Diary,
  Calculator,
  User,
  registrationValidationSchema,
  loginValidationSchema,

};