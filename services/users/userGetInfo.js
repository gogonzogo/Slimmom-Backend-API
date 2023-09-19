const { calcCalories } = require("../../utils/calcCalories");
const { getNotAllowedFood } = require("../../utils/getNotAllowedFood");
const { Calculator } = require("../../models/calculator");

const userGetInfo = async (req, body) => {
  const { currentWeight, height, age, desiredWeight, bloodType } = req.body;

  try {
    const stats = [currentWeight, height, age, desiredWeight, bloodType];

    if (stats.some((variable) => variable === undefined)) {
      return 400;
    }
    const totalCalories = calcCalories(req);
    const notAllowedFood = await getNotAllowedFood(bloodType);
    const userId = req.session.userId;
    let newEntry = await Calculator.findOne({ userId });
    if (!newEntry) {
      newEntry = new Calculator({
        userId,
        height,
    bloodType,
    age,
    currentWeight,
    desiredWeight,
    totalCalories,
    notAllowedFood,
      });
      const data = await newEntry.save();
      return data;
    }

    if (!notAllowedFood) {
      return 404;
    }
    return {
      newEntry
    }
    
  } catch (err) {
    console.log("Error getting food", err);
  }
  
  

    
     

  
  
  


};

module.exports = userGetInfo;