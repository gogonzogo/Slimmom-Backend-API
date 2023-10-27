const { Diary, DiaryArchive } = require("../../models");

const userArchive = async (req) => {
  const { startDate, endDate, currentDate } = req.body
  const startDateParse = Date.parse(startDate)
  const endDateParse = Date.parse(endDate)

  try {
    const userId = req.user._id;
    let daysArchived = 0;
    let diaryenteies = ''
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

        }

        return userDiary
      });
      if (daysArchived !== 0) {
        await userDiaryArchive.save();
        const convertStart = startDate.replaceAll('/', '-')
        const convertEnd = endDate.replaceAll('/', '-')
        diaryenteies = await Diary.updateMany(
          { userId },
          { $pull: { entries: { date: { $gte: convertStart, $lte: convertEnd } } } }
        )

      }
      return { diaryenteies, userDiary, code: 200 }
    }
  } catch (err) {
    console.log("Error Archiving data", err);
  }
};

module.exports = userArchive;

module.exports = userArchive;