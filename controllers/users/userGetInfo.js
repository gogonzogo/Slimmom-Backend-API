const { users: service } = require("../../services");

const userGetInfo = async (req, res) => {
  const result = await service.userGetInfo(req);
  console.log(result);
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
    res.status(200).json({
      status: "Success",
      code: 200,
      data: result,
    });
  }
};

module.exports = userGetInfo;
