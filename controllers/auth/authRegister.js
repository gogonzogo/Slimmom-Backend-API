const { auth: service } = require('../../services');

const authRegister = async (req, res) => {
  const result = await service.authRegister(req);
  console.log(result);
  if(result === 409) {
    res.status(409).json({
      status: "Conflict",
      code: 409,
      data: {
        message: "Registration failed: Email already exists.",
      },
    });
    return;
  }
  if (result === 201) {
    res.status(201).json({
      status: "Created",
      code: 201,
      token: req.session.userToken,
      name: req.session.name,
      data: {
        message: "Registration Success! Welcome SlimMom!"
      }
    })
}
    
  
};

module.exports = authRegister;
