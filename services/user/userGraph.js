const { Diary, Calculator } = require("../../models");

const userGraph = async (req) => {

    try {
        const userId = req.user._id;
        const userDiary = await Diary.findOne({ userId });
        const grapDairyhData = []
        const graphDiaryDates = []
        userDiary.entries.map((item) => {


            graphDiaryDates.push(item.date)
            grapDairyhData.push((Math.round(item.foodItems.reduce(function (prev, cur) {
                return prev + cur.calories;
            }, 0) * 100) / 100))

            return userDiary


        })

        const userCalc = await Calculator.findOne({ userId });
        const graphCalcData = []
        const graphCalcDates = []
        userCalc.calculatorEntries.map((item) => {

            graphCalcDates.push(item.date)
            graphCalcData.push(item.calculatorEntry[0].currentWeightLbs)

            return userCalc


        })

        return { graphCalcDates: graphCalcDates, graphCalcData: graphCalcData, grapDairyhData: grapDairyhData, graphDiaryDates: graphDiaryDates, code: 200 }

    } catch (err) {
        console.log(err);
        throw new Error("Error getting graph data" + err.message);
    }



}

module.exports = userGraph;
