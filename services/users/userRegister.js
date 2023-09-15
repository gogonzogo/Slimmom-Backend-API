const { User } = require('../../models');
const bcrypt = require('bcrypt');
const { nanoid } = require('nanoid');
require('dotenv').config();
// no response, return a number of response
// salt and hash
const generateUniqueToken = () => {
  return nanoid(32);
};

const userRegister = async (req) => {
  try {
    // Validate
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
  return { status: 400, message: 'Invalid input data' };
    }

    // Check if the user already exists by email
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return { status: 409, message: 'User with this email already exists' };
    }

    // Hash the user's password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new User instance
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Generate a verification token
    const verificationToken = generateUniqueToken();

    // Update the user's email verification token in the database
    savedUser.emailVerificationToken = verificationToken;
    await savedUser.save();

    // Send verification email (You can add this back if needed)

    return { status: 201, message: `Welcome ${username}` };
  } catch (error) {
    console.error(error);
    return { status: 500, message: 'Server error' };
  }
};

module.exports = userRegister;
