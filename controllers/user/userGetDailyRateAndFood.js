const { user: service } = require("../../services");

const userGetDailyRateAndFood = async (req, res) => {
  const result = await service.userGetDailyRateAndFood(req);
  if (result === 400) {
    res.status(400).json({
      status: "Bad request",
      code: 400,
      data: {
        message: "Missing required fields",
      },
    });
    return;
  }
  res.status(200).json({
    status: "Success",
    code: 200,
    data: result,
  });

};

module.exports = userGetDailyRateAndFood;
