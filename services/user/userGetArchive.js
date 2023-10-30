const { DiaryArchive, Calculator, User } = require("../../models");

const userGetArchive = async (req) => {

    try {
        const userId = req.user._id;
        const userinfo = await User.find({ _id: userId }, { _id: 0, password: 0, token: 0 });
        const calculatorData = await Calculator.find({ userId }, { _id: 0, userId: 0 });

        const userArchive = await DiaryArchive.aggregate([
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
            { $sort: { "entries.date": 1 } }
        ])
        const archiveinfo = []
        const archiveDate = userArchive[0]._id.archiveDate;
        const startDate = userArchive[0]._id.startDate;
        const endDate = userArchive[0]._id.endDate;

        const diaryInfo = await DiaryArchive.findOne({ userId });
        diaryInfo.entries.map((item) => {
            if (item.archiveDate === archiveDate && item.startDate === startDate && item.endDate === endDate) {
                const newitem = {
                    date: item.date,
                    archiveDate: item.archiveDate,
                    startDate: item.startDate,
                    endDate: item.endDate,
                    dailyRat: item.dailyRate,
                    foodItems: item.foodItems
                }
                archiveinfo.push(newitem)

            }
            return diaryInfo
        })




        return { userArchive, userinfo, calculatorData, archiveinfo, code: 200 }

    } catch (err) {
        console.log("Error geting  Archiving List", err);
    }



}

module.exports = userGetArchive;
