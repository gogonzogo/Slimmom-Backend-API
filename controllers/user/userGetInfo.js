const { user: service } = require("../../services");

const userGetInfo = async (req, res) => {
  const result = await service.userGetInfo(req);
  console.log(result);

  res.status(200).json({
    status: 'Success',
    code: 200,
    data: req.userInfo,
  });
}

module.exports = userGetInfo;