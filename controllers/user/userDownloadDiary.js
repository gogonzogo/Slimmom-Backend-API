const { user: service } = require("../../services");

const userDownloadDiary = async (req, res) => {
  const result = await service.userDownloadDiary(req, res);
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
    const { url } = result
    res.download(url)

  }
};

module.exports = userDownloadDiary;