
const dayjs = require('dayjs');
const { findClosestCalculator } = require("../../utils");

const userGetCalculator = async (req) => {
  try {
    const userId = req.user._id;
    const date = dayjs().format('DD-MM-YYYY') || req.query.date;
    const  closest  = await findClosestCalculator(userId, date)
    if (!closest) {
      return 404;
    }
    return { closest };
  } catch (err) {
    console.log(err);
    throw new Error("Error getting calculator" + err.message)
  }
};
module.exports = userGetCalculator;
