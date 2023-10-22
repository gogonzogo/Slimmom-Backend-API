const { User } = require('../../models');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
// const boringAvatars = require('boring-avatars')
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
    // const avatarStyles = {
    //   name: email,
    //   style: "beam",
    //   size: 40,
    //   colors: ["#7B6C96","#E0E0E0","#FC842D","#337A02","#E6E119" ]
    // };
    // const avatarStyle = boringAvatars.getStyle("marble"); // You can choose a different style
    // const avatarSvg = boringAvatars.create({ seed: email, style: avatarStyle });

    const newUser = await new User({
      name,
      password: hashedPassword,
      email,
      token,
      // avatar: avatarSvg,
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
