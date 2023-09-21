const { getNotAllowedFood } = require("../../utils/getNotAllowedFood");
const getFoodByQuery = async (req) => {
  try {
    const bloodType = req.body.bloodType;
    const notAllowedFood = await getNotAllowedFood(bloodType);
    if (!notAllowedFood) {
      return 404;
    }
    return notAllowedFood;
  } catch (err) {
    console.error("Who are you..?", err);
  }
};

module.exports = getFoodByQuery;
