const { User } = require('../../models');
const jwt = require("jsonwebtoken");

const authLogin = async (req) => {
    try {
        const { email, password } = req.body;
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return 404
        };
        const validatePW = await validUser.checkPassword(password);
        if (!validatePW) {
            return 401
        };
        const token = jwt.sign({ email }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        validUser.token = token;
        await validUser.save();
        req.userData = {
            token,
            userId: validUser._id,
            name: validUser.name,
        }
        return 200;
    } catch (err) {
        console.error(err)
        throw new Error("Error logging in" + err.message)
    }
};

module.exports = authLogin;