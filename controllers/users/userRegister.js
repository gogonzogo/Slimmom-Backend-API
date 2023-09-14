const { user: service } = require('../../services');

const userSignup = async (req, res) => {
  const result = await service.userSignup(req);
  console.log(result)
};

module.exports = userSignup;
