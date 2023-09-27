const { getNotAllowedFood } = require("../../utils/getNotAllowedFood");
const getFoodByQuery = async (req) => {
  try {
    const title = req.query.title;
    const bloodType = req.query.bloodType;
    const notAllowedFood = await getNotAllowedFood(bloodType, title);
    if (!notAllowedFood) {
      return 404;
    }
    return notAllowedFood;
  } catch (err) {
    console.error("Nothing found", err);
  }
};

module.exports = getFoodByQuery;
