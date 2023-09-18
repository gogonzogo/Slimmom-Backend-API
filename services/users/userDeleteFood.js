const { Diary } = require('../../models');



const userDeleteFood = async (req, res) => {
    try {
        const { productId } = req.params;
        const result = await Diary.findOneAndDelete(productId);
        console.log(result);
        return 201;
    } catch (err) {
        console.log('Error removing food item', err);
        return 400;
    }
  
};


module.exports = userDeleteFood;