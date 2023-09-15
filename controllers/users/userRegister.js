const { users: service } = require('../../services');
const userRegister = async (req, res) => {
  try {
    const result = await service.userRegister(req);
    return res.status(201).json({ message: result });
  } catch (error) {
    console.error(error);

    if (error.message === 'Registration failed: User with this email already exists') {
      return res.status(400).json({ error: error.message });
    } else {
      return res.status(500).json({ error: 'Server error' });
    }
  }
};

module.exports = userRegister;














