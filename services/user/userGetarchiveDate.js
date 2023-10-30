const { DiaryArchive, Calculator, User } = require("../../models");

const userGetarchiveDate = async (req) => {
    const archiveReturnData = []
    const { archiveDate, startDate, endDate } = req.body

    try {
        const userId = req.user._id;
        const userinfo = await User.findOne({ _id: userId }, { _id: 0 });
        const calculatorData = await Calculator.findOne({ userId }, { _id: 0 });


        const userDiary = await DiaryArchive.findOne({ userId });
        if (userDiary) {
            userDiary.entries.map((item) => {
                if (item.archiveDate === archiveDate && item.startDate === startDate && item.endDate === endDate) {

                    if (item.archiveDate === archiveDate && item.startDate === startDate && item.endDate === endDate) {
                        archiveReturnData.push(item)
                    }
                }
                return userDiary
            })
        }
        return { archiveReturnData, userinfo, calculatorData, code: 200 }
    }

    catch (err) {
        console.log("Error geting  Archived data", err);
    }
}

module.exports = userGetarchiveDate;
