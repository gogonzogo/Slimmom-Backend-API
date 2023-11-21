const { Diary, Calculator } = require("../../models");

const userGraph = async (req) => {

    try {
        const userId = req.user._id;
        // const userDiary = await Diary.findOne({ userId });
        const userDiary = await Diary.findOne({ userId });
        const diaryEntry = userDiary.entries.sort((a, b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0))

        const grapDairyhData = []
        const graphDiaryDates = []

        if (diaryEntry.length > 0) {
            diaryEntry.map((item) => {


                graphDiaryDates.push(item.date)
                grapDairyhData.push((Math.round(item.foodItems.reduce(function (prev, cur) {
                    return prev + cur.calories;
                }, 0) * 100) / 100))

                return userDiary


            })
        }

        const userCalc = await Calculator.findOne({ userId });

        const graphCalcData = []
        const graphCalcDates = []
        if (userCalc) {
            userCalc.calculatorEntries.map((item) => {

                graphCalcDates.push(item.date)
                graphCalcData.push(item.calculatorEntry[0].currentWeightLbs)

                return userCalc


            })
        }
        return { diaryEntry: diaryEntry, graphCalcDates: graphCalcDates, graphCalcData: graphCalcData, grapDairyhData: grapDairyhData, graphDiaryDates: graphDiaryDates, code: 200 }

    } catch (err) {
        console.log(err);
        throw new Error("Error getting graph data" + err.message);
    }



}

module.exports = userGraph;
