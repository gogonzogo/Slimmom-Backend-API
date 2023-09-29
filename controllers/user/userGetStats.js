const { user: service } = require("../../services");

const userGetStats = async (req, res, body) => {
  const result = await service.userGetStats(req, body);
  if (result === 404) {
    res.status(404).json({
      status: "Not found",
      code: 404,
      data: {
        message: "No data yet",
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

module.exports = userGetStats;
