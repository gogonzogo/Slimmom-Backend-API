const { User } = require('../../models');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
require('dotenv').config();

// const { nanoid } = require('nanoid');

// no response, return a number of response
// salt and hash
// const generateUniqueToken = () => {
//   return nanoid(32);
// };
const userRegister = async (req) => {
  try {
    // Validate
  const { name, password, email } = req.body;
    // Check if the user already exists by email
    const existingEmail = await User.findOne({ email });
     const existingName = await User.findOne({ name });
      if (existingEmail || existingName) {
        return 409;
    }
    // Create Verification Token
    // const verificationToken = generateUniqueToken();
    // Hash the user's password
    
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    // Create a new User instance
    const newUser = await new User({
      name,
      password: hashedPassword,
      email,
    });

    // Save the user to the database
    await newUser.save();

    // Generate a verification token
    // const verificationToken = generateUniqueToken();
    // Update the user's email verification token in the database
    // newUser.emailVerificationToken = verificationToken;
    // Send verification email (You can add this back if needed)

    // Update session
    req.session.userToken = token;
    req.session.userId = newUser._id;
    req.session.name = name;
    return 201
  } catch (error) {
    console.error(error);
  }
};

module.exports = userRegister;
