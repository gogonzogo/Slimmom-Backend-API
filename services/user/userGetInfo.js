const { diaryGetDayEntries } = require("../diary");
const userGetCalculator = require("./userGetCalculator");


const userGetInfo = async (req) => {
  try {
    const name = req.user.name;
    const date = req.query.date;
    const diary = await diaryGetDayEntries(req);
    const calculator = await userGetCalculator(req);
    req.userInfo = {
      name,
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