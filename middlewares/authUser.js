const jwt = require("jsonwebtoken");

const authorizeUser = (req, res, next) => {
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
    jwt.verify(authToken, process.env.JWT_SECRET);
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
