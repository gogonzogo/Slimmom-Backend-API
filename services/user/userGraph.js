const { Diary, Calculator } = require("../../models");

const userGraph = async (req) => {

    try {
        const userId = req.user._id;
        const userDiary = await Diary.findOne({ userId });
        const grapDairyhData = []
        const graphDiaryDates = []
        console.log('userDiary', userDiary)
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
            console.log('item.date', item.date)
            console.log('item.calculatorEntry[0].currentWeightLbs', item.calculatorEntry[0].currentWeightLbs)

            graphCalcDates.push(item.date)
            graphCalcData.push(item.calculatorEntry[0].currentWeightLbs)

            return userCalc


        })
        console.log('graphCalcDates', graphCalcDates)
        console.log('grapCalcData', graphCalcData)



        return { graphCalcDates: graphCalcDates, graphCalcData: graphCalcData, grapDairyhData: grapDairyhData, graphDiaryDates: graphDiaryDates, code: 200 }

    } catch (err) {
        console.log("Error geting  Archiving List", err);
    }



}

module.exports = userGraph;
