const { users: service } = require('../../services');

const userAddFood = async (req, res) => {
    const result = await service.userAddFood(req);
    console.log(result);
    if (result === 400) {
        res.status(400).json({
            status: "Bad Request",
            code: 400,
            data: {
                message: "Error with entered data, please try again."
            }
        })
        return;
    }
    res.status(200).json({
        status: "Success",
        code: 200,
        data: {
            message: `Awesome, ${req.newEntry} was added to your Diary.`
        }
    });
};

module.exports = userAddFood;