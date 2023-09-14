const { users: service } = require('../../services');

const userRegister = async (req, res) => {
  const result = await service.userRegister(req);
  console.log(result)
  res.send({
  message: result,
})
};

module.exports = userRegister;
