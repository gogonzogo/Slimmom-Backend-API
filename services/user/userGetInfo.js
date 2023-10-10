const { findDiaryEntry } = require('../../utils');
const { Calculator } = require('../../models');

const userGetInfo = async (req) => {
  try {
    const date = req.query.date;
    const user = req.user;
    const userId = user._id;
    const diary = await findDiaryEntry(date, user);
    const calculator = await Calculator.findOne({ userId });
    req.userInfo = {
      name: user.name,
      date,
      calculator,
      diary,
    }
    return 200;
  } catch (err) {
    console.log(err)
    throw new Error("Error getting info" + err.message)
  }
}

module.exports = userGetInfo;