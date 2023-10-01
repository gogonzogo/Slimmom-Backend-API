const { Calculator } = require("../../models/calculator");

const userGetStats = async (req) => {
  try {
    const userId = req.user._Id;
    const stats = await Calculator.findOne({ userId });
    if (!stats) {
      return 404;
    }
    return { stats };
  } catch (err) {
    console.log("Error getting stats", err);
  }
};
module.exports = userGetStats;
