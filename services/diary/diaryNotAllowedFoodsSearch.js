const { getNotAllowedFood } = require("../../utils");

const diaryNotAllowedFoodsSearch = async (req) => {
  try {
    const title = req.query.title;
    const bloodType = req.query.bloodType;
    const notAllowedFood = await getNotAllowedFood(bloodType, title);
    if (!notAllowedFood) {
      return 404;
    }
    return notAllowedFood;
  } catch (err) {
    console.log(err);
    throw new Error("Error searching" + err.message);
  }
};

module.exports = diaryNotAllowedFoodsSearch;
