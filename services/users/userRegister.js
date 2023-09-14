const { User } = require('../../models')
const bcrypt = require('bcrypt');
const { verifyUserEmail } = require('../../middlewares');
const { nanoid } = require('nanoid');

const userRegister = async (req) => {
  try {
    console.log(req)
  } catch (error) {
    console.log(error)
  }
}

module.exports = userRegister;
