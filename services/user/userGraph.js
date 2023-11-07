const { Diary } = require("../../models");

const userGraph = async (req) => {

    try {
        const userId = req.user._id;
        const userDiary = await Diary.findOne({ userId });
        const graphData = []
        const graphDates = []
        console.log('userDiary', userDiary)
        userDiary.entries.map((item) => {


            graphDates.push(item.date)
            graphData.push((Math.round(item.foodItems.reduce(function (prev, cur) {
                return prev + cur.calories;
            }, 0) * 100) / 100))

            return userDiary


        })





        return { graphData: graphData, graphDates: graphDates, code: 200 }

    } catch (err) {
        console.log("Error geting  Archiving List", err);
    }



}

module.exports = userGraph;
