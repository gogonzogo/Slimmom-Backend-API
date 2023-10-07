const { Calculator } = require("../../models/calculator");

const userGetStats = async (req) => {
  try {
    const userId = req.user._id;
    const stats = await Calculator.findOne({ userId });
    if (!stats) {
      return 404;
    }
    return { stats };
  } catch (err) {
    console.log(err);
    throw new Error("Error getting stats" + err.message)
  }
};
module.exports = userGetStats;
