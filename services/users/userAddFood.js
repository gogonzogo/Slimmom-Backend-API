const { Diary } = require('../../models/');

const userAddFood = async (req, res) => {

    try {
        console.log(req.body);
        const newEntry = await Diary.create({ ...req.body });
        console.log(newEntry);
        return 200;
    } catch (err) {
        console.error('Error adding food item:', err);
        return 400;
    }
};

module.exports = userAddFood;