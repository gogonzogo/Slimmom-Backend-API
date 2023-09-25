const { calculator: service } = require("../../services");

const saveCalulator = async (req, res) => {
  const result = await service.saveCalculator(req);
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
  if (result) {
    res.status(201).json({
      status: "Success",
      code: 201,
      data: result,
    });
  }
};

module.exports = saveCalulator;