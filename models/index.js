const { Food } = require('./foods');
const { Diary } = require('./diary');
const { DiaryArchive } = require('./diaryArchive');

const { Calculator } = require('./calculator');
const { User, registrationValidationSchema, loginValidationSchema } = require('./user');

module.exports = {
  Food,
  Diary,
  Calculator,
  User,
  registrationValidationSchema,
  loginValidationSchema,
  DiaryArchive,

};