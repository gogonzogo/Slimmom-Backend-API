const { Calculator } = require("../../models");

const userSaveCalculator = async (req) => {
  const { height,  age,bloodType, currentWeight, desiredWeight, totalCalories, measurementType, originalDate, enteredDate, } = req.body;
  try {
 const stats = [height, age,bloodType, currentWeight, desiredWeight, totalCalories, measurementType,originalDate, enteredDate];
    
    if (stats.some((variable) => variable === undefined)) {
      return 400;
    }

    const userId = req.user._id;
    const CalcFindRec = await Calculator.findOne({ userId });
    if (!CalcFindRec) {
     const newCal = new Calculator({
        userId,height, age,bloodType, currentWeight, desiredWeight, totalCalories, measurementType, originalWeight: currentWeight, originalDate, enteredDate  
      });
      await newCal.save();
      return 201
    }

await Calculator.findOneAndUpdate({ userId }, {height, age,bloodType, currentWeight, desiredWeight, totalCalories, enteredDate})
        return 201
  } catch (err) {

    console.error(err);
    throw new Error("Error Adding Calculator: " + err.message);
  }
};

module.exports = userSaveCalculator;