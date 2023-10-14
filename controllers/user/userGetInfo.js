const { user: service } = require("../../services");

const userGetInfo = async (req, res) => {
  const result = await service.userGetInfo(req);
  if (result === 404) {
    res.status(404).json({
      status: 'Not Found',
      code: 200,
      data: req.userInfo,
    });
    return;
  }

  res.status(200).json({
    status: 'Success',
    code: 200,
    data: req.userInfo,
  });
}

module.exports = userGetInfo;