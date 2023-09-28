const { calcCalories } = require("../../utils/calcCalories");
const { getNotAllowedFood } = require("../../utils/getNotAllowedFood");
const { Calculator } = require("../../models/calculator");

const userGetInfo = async (req, body) => {
  const {  currentWeight, height, age, desiredWeight, bloodType, measurementType } = req.body;

  try {
    const stats = [currentWeight, height, age, desiredWeight, bloodType, measurementType];

    if (stats.some((variable) => variable === undefined)) {
      return 400;
    }
    const totalCalories = calcCalories(req);
    const notAllowedFood = await getNotAllowedFood(bloodType);
    if (!notAllowedFood) {
      return 404;
    }

    const userId = req.session.userId;
    let userInfo = await Calculator.findOne({ userId });
    
    
    if (!userInfo) {
      userInfo = new Calculator({
        userId,
        entries: [],
      });
    }
        
  
    const newEntry = {
          currentWeight,
          height,
          age,
          desiredWeight,
          bloodType,
          totalCalories,
          notAllowedFood,
          measurementType
    };

    userInfo.entries.push(newEntry);
    
    const data = await userInfo.save();
    return data;

    
    
    
  }catch (err) {
    console.log("Error getting Info", err);
  }
  
  

    
     

  
  
  


};

module.exports = userGetInfo;