const { Calculator } = require("../../models");

const userSaveCalculator = async (req) => {
  try {
    const userId = req.user._id;
    const { date, height, age, bloodType, currentWeight, desiredWeight, dailyRate, unitOfMeasure, heightFeet, heightInch, currentWeightLbs, desiredWeightLbs, startDate, originalWeight } = req.body
    const measurementUnit = unitOfMeasure === "M" ? "M" : "S";
    let userInputs;
    if (measurementUnit === 'M') {
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
      userInputs = { height, age, bloodType: newBloodType, currentWeight, desiredWeight, dailyRate, unitOfMeasure, startDate, originalWeight };
    } else {
      userInputs = { heightFeet, heightInch, age, bloodType, currentWeightLbs, desiredWeightLbs, dailyRate, unitOfMeasure: "S", startDate, originalWeight };
    };
    if (Object.values(userInputs).some(input => !input)) return 400;
    let userCalculator = await Calculator.findOne({ userId });
    if (!userCalculator) {
      userCalculator = new Calculator({
        userId,
        calculatorEntries: [],
      });
    } else {
      const originalEntry = userCalculator.calculatorEntries
      if (originalEntry.unitOfMeasure !== unitOfMeasure) {
        const kgToLbsMultiplier = 2.20462;
        const lbsToKgMultiplier = 0.45359237;
        const convertedDesiredWeight = unitOfMeasure === "M" ? originalWeight * lbsToKgMultiplier : originalWeight * kgToLbsMultiplier;
        userInputs.originalWeight = convertedDesiredWeight.toFixed(2);
      };
    };
    const existingEntryIndex = userCalculator.calculatorEntries.findIndex(
      (entry) => entry.date === date
    );

    if (existingEntryIndex !== -1) {
      userCalculator.calculatorEntries[existingEntryIndex] = {
        date,
        calculatorEntry: [userInputs],
      };
    } else {
      const newEntry = {
        date,
        calculatorEntry: [userInputs],
      };
      userCalculator.calculatorEntries.push(newEntry);
    }
    await userCalculator.save();
    const newEntry = userCalculator.calculatorEntries.find(
      (entry) => entry.date === date
    );
    const newlyAddedCalculatorEntry = newEntry.calculatorEntry[newEntry.calculatorEntry.length - 1];
    return newlyAddedCalculatorEntry;
  } catch (err) {
    throw new Error("Error Adding Calculator: " + err.message);
  }
};

module.exports = userSaveCalculator;