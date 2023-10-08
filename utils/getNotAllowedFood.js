const { Food } = require("../models/foods");

const getNotAllowedFood = async (bloodType, title) => {
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
  const searchQuery = {
    $and: [
      title && { title: { $regex: title, $options: "i" } }, // Only include this condition if title is provided
      { [`groupBloodNotAllowed.${newBloodType}`]: true },
    ].filter(Boolean), // Filter out undefined conditions (in case title is not provided)
  };

  const data = await Food.find(searchQuery).select("title").limit(20);
  return data;
};
module.exports = getNotAllowedFood;
