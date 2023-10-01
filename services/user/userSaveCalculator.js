const { Calculator } = require("../../models");

const userSaveCalculator = async (req) => {
  const { height,  age,bloodType, currentWeight, desiredWeight, totalCalories, measurementType, originalDate, enteredDate, } = req.body;
  try {
 const stats = [height, age,bloodType, currentWeight, desiredWeight, totalCalories, measurementType,originalDate, enteredDate];
console.log(stats)
    
    if (stats.some((variable) => variable === undefined)) {
      return 400;
    }

    const userId = req.user._id;
    // Check for an existing diary add one if it doesn't exist yet
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
    // Throw an error with a meaningful message
    console.error(err);
    throw new Error("Error Adding Calculator: " + err.message);
  }
};

module.exports = userSaveCalculator;