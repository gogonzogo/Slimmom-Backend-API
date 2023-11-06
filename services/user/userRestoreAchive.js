const { Diary, DiaryArchive } = require("../../models");

const userArchive = async (req) => {
    const { startDate, endDate, archiveDate } = req.body

    try {
        const userId = req.user._id;
        let daysArchived = 0;
        // let diaryenteies = ''
        const userarchive = await DiaryArchive.findOne({ userId });
        if (userarchive) {
            let userDiary = await Diary.findOne({ userId });
            if (!userDiary) {
                userDiary = new Diary({
                    userId,
                    entries: [],
                });
            }
            userarchive.entries.map((item) => {
                if (item.startDate === startDate && item.endDate === endDate && item.archiveDate === archiveDate) {
                    console.log('item', item)
                    const newEntry = {
                        date: item.date,
                        dailyRate: item.dailyRate,
                        foodItems: item.foodItems,

                    }
                    userDiary.entries.push(newEntry);

                    daysArchived++

                }

                return userDiary
            });
            if (daysArchived !== 0) {
                await userDiary.save();

                await DiaryArchive.updateMany(
                    { userId },
                    { $pull: { entries: { archiveDate: archiveDate, startDate: startDate, endDate: endDate } } }
                )

            }
            const userDiary1 = await Diary.findOne({ userId });
            console.log('userDiary1', userDiary1)
            console.log('userarchive', userarchive)

            const archiveDates = await DiaryArchive.aggregate([
                { $match: { userId } },
                { $unwind: "$entries" },
                {
                    $group: {
                        _id: {
                            "archiveDate": "$entries.archiveDate",
                            "startDate": "$entries.startDate",
                            "endDate": "$entries.endDate"
                        }
                    }
                },
                { $sort: { "_id.archiveDate": 1, "_id.startDate": 1 } }
            ])


            return { code: 200, archiveDates: archiveDates }
        }
    } catch (err) {
        console.log("Error Archiving data", err);
    }
};

module.exports = userArchive;