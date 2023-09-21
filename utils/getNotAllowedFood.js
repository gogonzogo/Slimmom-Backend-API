const { Food } = require("../models/foods");

const getNotAllowedFood = async (bloodType) => {
  let newBloodType;
  switch (bloodType) {
    case "A":
      newBloodType = 1;
      break;
    case "B":
      newBloodType = 2;
      break;
    case "AB":
      newBloodType = 3;
      break;
    case "O":
      newBloodType = 4;
      break;
    default:
      newBloodType = bloodType;
      break;
  }
  return await Food.find({
    [`groupBloodNotAllowed.${newBloodType}`]: true,
  }).limit(20);
};

module.exports = {
  getNotAllowedFood,
};
