const { diary: service } = require("../../services");

const diaryGetDayEntries = async (req, res) => {
  const result = await service.diaryGetDayEntries(req);
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
  res.status(200).json({
    status: "Success",
    code: 200,
    data: result,
  });
};

module.exports = diaryGetDayEntries;
