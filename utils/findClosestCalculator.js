const { Calculator } = require('../models');

const findClosestCalculator = async (userId, targetDate) => {
  try {
    const calculatorEntries = await Calculator.aggregate([
      {
        $match: {
          userId: userId,
        },
      },
      {
        $unwind: '$calculatorEntries',
      },
      {
        $unwind: '$calculatorEntries.calculatorEntry',
      },
      {
        $sort: {
          'calculatorEntries.date': -1,
        },
      },
    ]); 
    if (!calculatorEntries.length) {
      return 404;
    }
    const latestEntry = calculatorEntries[0];
    let closest = latestEntry;
    let latestDateDiff = Math.abs(
      new Date(targetDate) - new Date(latestEntry.calculatorEntries.date)
    );
    for (const entry of calculatorEntries) {
      const currentEntryDateDiff = Math.abs(
        new Date(targetDate) - new Date(entry.calculatorEntries.date)
      );
      if (currentEntryDateDiff > latestDateDiff) {
        closest = entry;
        latestDateDiff = currentEntryDateDiff;
      };
    };
    return closest;
  } catch (err) {
    console.log(err);
    throw new Error("Error finding closest calculator entry: " + err.message);
  }
};

module.exports = findClosestCalculator;
