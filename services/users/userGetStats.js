const { Calculator } = require("../../models/calculator");

const userGetStats = async (req) => {
  try {
    const userId = req.session.userId;
    const stats = await Calculator.findOne({ userId });
    if (!stats) {
      return 404;
    }
    return { stats };
  } catch (err) {
    console.log("Error getting stats", err);
    return 500;
  }
};
module.exports = userGetStats;
