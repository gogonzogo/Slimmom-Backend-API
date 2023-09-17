const { users: service } = require('../../services');

const userRegister = async (req, res) => {
  const result = await service.userRegister(req);
  console.log(result);
  if(result === 409) {
    res.status(409).json({
      status: "Conflict",
      code: 409,
      data: {
        message: "Registration failed: A user with this name or email already exists.",
      },
    });
    return;
  }
  if (result === 201) {
    res.status(200).json({
      status: "Created",
      code: 200,
      token: req.session.userToken,
      name: req.session.name,
      data: {
        message: "Registration Success! See you soon slimMom!"
      }
    })
}
    
  
};

module.exports = userRegister;
