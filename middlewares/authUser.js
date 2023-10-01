const jwt = require("jsonwebtoken");
const { User } = require("../models");

const authorizeUser = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    return res.status(401).json({
      status: "Unauthorized",
      code: 401,
      data: {
        message: "You are not authorized. Please provide a valid token.",
      },
    });
  }
  try {
    const authToken = authHeader.replace("Bearer ", "");
    const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET);
    const user = await User.findOne({email: decodedToken.email});
    if (!user) {
      return res.status(401).json({
        status: "Unauthorized",
        code: 401,
        data: {
          message: "User not found. You are not authorized.",
        },
      });
    }
    if (user.token !== authToken) {
      return res.status(401).json({
        status: "Unauthorized",
        code: 401,
        data: {
          message: "Invalid token. You are not authorized.",
        },
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      status: "Unauthorized",
      code: 401,
      data: {
        message: "JWT verification failed. You are not authorized.",
      },
    });
  }
};

module.exports = authorizeUser;
