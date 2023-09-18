const { calcCalories } = require("../../utils/calcCalories");
const { getNotAllowedFood } = require("../../utils/getNotAllowedFood");
const { Measurements } = require("../../models/measurements");

const userGetInfo = async (req, body) => {
  const { currentWeight, height, age, desiredWeight, bloodType } = req.body;

  try {
    const stats = [currentWeight, height, age, desiredWeight, bloodType];

    if (stats.some((variable) => variable === undefined)) {
      return 400;
    }
    const totalCalories = calcCalories(req);
    const notAllowedFood = await getNotAllowedFood(bloodType);
    const newUserInfo = await new Measurements({
      height,
    bloodType,
    age,
    currentWeight,
    desiredWeight,
    totalCalories,
    notAllowedFood,
    });

    await  newUserInfo.save();

    if (!notAllowedFood) {
      return 404;
    }
    return {
      newUserInfo
    }
    
  } catch (err) {
    console.log("Error getting food", err);
  }
  
  

    
     

  
  
  


};

module.exports = userGetInfo;