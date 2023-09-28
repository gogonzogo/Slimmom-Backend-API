const { diary: service } = require("../../services");

const diaryNotAllowedFoodsSearch = async (req, res) => {
  const result = await service.diaryNotAllowedFoodsSearch(req);
  console.log(result);
  if (result.length === 0) {
    res.status(404).json({
      status: "Not Found",
      code: 404,
      data: {
        message: "Who are you..?",
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

module.exports = diaryNotAllowedFoodsSearch;
