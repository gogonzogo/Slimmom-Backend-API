const athorizeUser = (req, res, next) => {
  if (!req.session.userToken) {
    res.status(401).json({
      status: "Unathorized",
      code: 401,
      data: {
        message: 'You are not authorized. Please login.',
      },
    });
  } else {
    next();
  }
};

module.exports = athorizeUser;