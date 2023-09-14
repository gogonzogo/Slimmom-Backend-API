const { User } = require('../../models')
const bcrypt = require('bcrypt');
const { verifyUserEmail } = require('../../middlewares');
const { nanoid } = require('nanoid');

const userRegister = async (req) => {
  try {
    const message = `Welcome ${req.body.username}`
    return message;
  } catch (error) {
    console.log(error)
  }
}

module.exports = userRegister;
