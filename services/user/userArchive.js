const { Diary, DiaryArchive } = require("../../models");

const userArchive = async (req) => {
  const { startDate, endDate, currentDate } = req.body
  const startDateParse = Date.parse(startDate)
  const endDateParse = Date.parse(endDate)

  try {
    const userId = req.user._id;
    let daysArchived = 0;
    // let updateDairy = ''
    const userDiary = await Diary.findOne({ userId });
    if (userDiary) {
      let userDiaryArchive = await DiaryArchive.findOne({ userId });
      if (!userDiaryArchive) {
        userDiaryArchive = new DiaryArchive({
          userId,
          entries: [],
        });
      }
      userDiary.entries.map((item) => {
        if (Date.parse(item.date) >= startDateParse && Date.parse(item.date) <= endDateParse) {
          const newEntry = {
            date: item.date,
            dailyRate: item.dailyRate,
            foodItems: item.foodItems,
            archiveDate: currentDate,
            startDate: startDate,
            endDate: endDate
          }
          userDiaryArchive.entries.push(newEntry);

          daysArchived++
          console.log('userDiaryArchive', userDiaryArchive)
        }

        return userDiary
      });
      console.log('daysArchived', daysArchived)
      if (daysArchived !== 0) {
        await userDiaryArchive.save();
        // updateDairy = Diary.findOneAndUpdate({ userId }, { $pull: { 'entries.date': { $gte: startDate, $lte: endDate } } })

      }
      return { userDiaryArchive, daysArchived, code: 200 }
    }
  } catch (err) {
    console.log("Error Archiving data", err);
  }
};

module.exports = userArchive;

module.exports = userArchive;