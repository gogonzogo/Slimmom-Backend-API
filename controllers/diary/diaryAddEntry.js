const { diary: service } = require("../../services");

const diaryAddEntry = async (req, res) => {
  const result = await service.diaryAddEntry(req);
  if (result === 400) {
    console.error("Error adding food item:", result.message);
    res.status(400).json({
      status: "Bad Request",
      code: 400,
      data: {
        message: "Missing required body field. (date, title, weight, calories)",
      },
    });
    return;
  }
  res.status(200).json({
    status: "Success",
    code: 200,
    data: {
      newEntry: result.newlyAddedFoodItem,
      dailyRate: result.newDailyRate,
      message: `Awesome, a new entry was added to your Diary.`,
    },
  });
};

module.exports = diaryAddEntry;
