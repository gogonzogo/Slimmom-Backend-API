const userGetCalculator = require("./userGetCalculator");
const userGetDailyRateAndFood = require("./userGetDailyRateAndFood");
const userSaveCalculator = require('./userSaveCalculator')
const userGetInfo = require('./userGetInfo')
const userArchive = require('./userArchive');
const userGetArchive = require('./userGetArchive');

const userDeleteAccount = require('./userDeleteAccount');
const userDeleteDiary = require('./userDeleteDiary');
const userDownloadDiary = require('./userDownloadDiary');




module.exports = {
  userGetCalculator,
  userGetDailyRateAndFood,
  userSaveCalculator,
  userGetInfo,
  userArchive,
  userGetArchive,
  userDownloadDiary,
  userDeleteDiary,
  userDeleteAccount,
};
