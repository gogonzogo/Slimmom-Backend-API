const { auth: service } = require('../../services');

const authRegister = async (req, res) => {
  const result = await service.authRegister(req);
  if (result === 409) {
    res.status(409).json({
      status: "Conflict",
      code: 409,
      data: {
        message: "Registration failed: Email already exists.",
      },
    });
    return;
  }
  res.status(201).json({
    status: "Created",
    code: 201,
    data: req.userData,
    message: "Registration Success! Welcome SlimMom!"
  })
};

module.exports = authRegister;
