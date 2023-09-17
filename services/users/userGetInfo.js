const { calcCalories } = require("../../utils/calcCalories");
const { getNotAllowedFood } = require("../../utils/getNotAllowedFood");


const userGetInfo = async (req) => {
  const { currentWeight, height, age, desiredWeight, bloodType } = req.body;

  try {
    const stats = [currentWeight, height, age, desiredWeight, bloodType];

    if (stats.some((variable) => variable === undefined)) {
      return 400;
    }
    const totalCalories = calcCalories(req);
    const notAllowedFood = await getNotAllowedFood(bloodType);

    if (!notAllowedFood) {
      return 404;
    }
    return {
      totalCalories,
      notAllowedFood,
    };
  } catch (err) {
    console.log("Error getting food", err);
  }
};

module.exports = userGetInfo;