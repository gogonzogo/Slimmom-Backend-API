const { Diary } = require('../../models');



const userDeleteFood = async (req, res) => {
    try {
        const { Id } = req.params;
        const result = await Diary.findOneAndDelete(Id);
        console.log(result);
        return 201;
    } catch (err) {
        console.log('Error removing food item', err);
        return 400;
    }
  
};


module.exports = userDeleteFood;