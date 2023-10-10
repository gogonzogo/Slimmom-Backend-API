const { getNotAllowedFood, getDailyRate } = require("../../utils");

const userGetCaloriesAndFood = async (req) => {
  const { currentWeight, height, age, desiredWeight, bloodType } = req.body;
  try {
    const stats = [currentWeight, height, age, desiredWeight, bloodType];
    if (stats.some((variable) => variable === undefined)) {
      return 400;
    }
    const dailyRate = getDailyRate(req);
    const notAllowedFood = await getNotAllowedFood(bloodType);

    if (!notAllowedFood) {
      return 404;
    }
    return {
      dailyRate,
      notAllowedFood,
    };
  } catch (err) {
    console.log(err);
    throw new Error("Error getting food" + err.message)
  }
};

module.exports = userGetCaloriesAndFood;
