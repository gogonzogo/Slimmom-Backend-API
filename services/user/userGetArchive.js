const { DiaryArchive } = require("../../models");

const userGetArchive = async (req) => {

    try {
        const userId = req.user._id;

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
        return { userArchive, code: 200 }

    } catch (err) {
        console.log("Error geting  Archiving List", err);
    }



}

module.exports = userGetArchive;
