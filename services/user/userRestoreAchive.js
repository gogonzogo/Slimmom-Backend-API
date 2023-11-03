const { Diary, DiaryArchive } = require("../../models");

const userArchive = async (req) => {
    const { startDate, endDate, currentDate } = req.body

    try {
        const userId = req.user._id;
        let daysArchived = 0;
        // let diaryenteies = ''
        const userarchive = await Diary.findOne({ DiaryArchive });
        if (userarchive) {
            let userDiary = await Diary.findOne({ userId });
            if (userDiary) {
                userDiary = new DiaryArchive({
                    userId,
                    entries: [],
                });
            }
            userarchive.entries.map((item) => {
                if (item.startDate === startDate && item.endDate === endDate && item.currentDate === currentDate) {
                    const newEntry = {
                        date: item.date,
                        dailyRate: item.dailyRate,
                        foodItems: item.foodItems,

                    }
                    userarchive.entries.push(newEntry);

                    daysArchived++

                }

                return userDiary
            });
            if (daysArchived !== 0) {
                await userarchive.save();
                // const convertStart = startDate.replaceAll('/', '-')
                // const convertEnd = endDate.replaceAll('/', '-')
                // diaryenteies = await Diary.updateMany(
                //     { userId },
                //     { $pull: { entries: { date: { $gte: convertStart, $lte: convertEnd } } } }
                // )

            }
            return { code: 200 }
        }
    } catch (err) {
        console.log("Error Archiving data", err);
    }
};

module.exports = userArchive;