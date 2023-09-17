const { Food } = require("../models/foods");

const getNotAllowedFood = async (bloodType) => {
  return await Food.find({
    [`groupBloodNotAllowed.${bloodType}`]: false,
  }).limit(20);
};

module.exports = {
  getNotAllowedFood,
};
