const { User } = require('../../models');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
require('dotenv').config();

const authRegister = async (req) => {
  try {
    const { name, password, email } = req.body;
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return 409;
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
   
    const newUser = await new User({
      name,
      password: hashedPassword,
      email,
      token,
    });
    await newUser.save();
    req.userData = {
      token,
      userId: newUser._id,
      name,
    }
    return 200
  } catch (err) {
    console.log(err);
    throw new Error("Error registering" + err.message)
  }
};

module.exports = authRegister;
