const userGetCalculator = require("./userGetCalculator");
const userGetCaloriesAndFood = require("./userGetCaloriesAndFood");
const userSaveCalculator = require('./userSaveCalculator')
const userGetInfo = require('./userGetInfo')
const userArchive = require('./userArchive');
const userDeleteAccount = require('./userDeleteAccount');
const userDeleteDiary = require('./userDeleteDiary');
const userDownloadDiary = require('./userDownloadDiary');


module.exports = {
  userGetCalculator,
  userGetCaloriesAndFood,
  userSaveCalculator,
  userGetInfo,
  userArchive,
  userDeleteDiary,
  userDownloadDiary,
  userDeleteAccount
};
