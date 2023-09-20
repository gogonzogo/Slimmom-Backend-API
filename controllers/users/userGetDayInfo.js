const { users: service } = require("../../services");

const userGetInfo = async (req, res) => {
  const result = await service.userGetDayInfo(req);
  console.log(result);
  if (result === 404) {
    res.status(404).json({
      status: "Not found",
      code: 404,
      data: {
        message: "No info for this day",
      },
    });
    return;
  }
  if (result === 500) {
    res.status(500).json({
      status: "Server error",
      code: 500,
      data: {
        message: "Unexpected server error",
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
