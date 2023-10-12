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
    const closestEntry = calculatorEntries[0];
    let closest = closestEntry;
    let closestDateDiff = Math.abs(
      new Date(targetDate) - new Date(closestEntry.calculatorEntries.date)
    );
    for (const entry of calculatorEntries) {
      const currentDateDiff = Math.abs(
        new Date(targetDate) - new Date(entry.calculatorEntries.date)
      );
      if (currentDateDiff < closestDateDiff) {
        closest = entry.calculatorEntries[0];
        closestDateDiff = currentDateDiff;
      };
    };
    return closest;
  } catch (err) {
    console.log(err);
    throw new Error("Error finding closest calculator entry: " + err.message);
  }
};

module.exports = findClosestCalculator;
