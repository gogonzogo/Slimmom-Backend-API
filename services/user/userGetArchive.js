const { DiaryArchive, Calculator, User } = require("../../models");

const userGetArchive = async (req) => {

    try {
        const userId = req.user._id;
        const userinfo = await User.find({ _id: userId }, { _id: 0, password: 0, token: 0 });
        const calculatorInfo = await Calculator.find({ userId }, { _id: 0, userId: 0 });

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
        const archiveinfo = []
        const archiveDate = archiveDates[0]._id.archiveDate;
        const startDate = archiveDates[0]._id.startDate;
        const endDate = archiveDates[0]._id.endDate;

        const diaryInfo = await DiaryArchive.findOne({ userId });
        diaryInfo.entries.map((item) => {
            if (item.archiveDate === archiveDate && item.startDate === startDate && item.endDate === endDate) {
                const newitem = {
                    date: item.date,
                    archiveDate: item.archiveDate,
                    startDate: item.startDate,
                    endDate: item.endDate,
                    dailyRate: item.dailyRate,
                    foodItems: item.foodItems
                }
                archiveinfo.push(newitem)

            }
            return diaryInfo
        })




        return { archiveDates, userinfo, calculatorInfo, archiveinfo, code: 200 }

    } catch (err) {
        console.log("Error geting  Archiving List", err);
    }



}

module.exports = userGetArchive;
