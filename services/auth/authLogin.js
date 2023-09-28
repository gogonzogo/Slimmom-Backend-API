const { User } = require('../../models');
const jwt = require("jsonwebtoken");

const authLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const validUser = await User.findOne({ email });

        if (!validUser) {
            return 404
        };

        // if (!validUser.verify) {
        //     return res.status(403).json({ error: 'Email not verified' });
        // }
        const validatePW = await validUser.checkPassword(password);
        if (!validatePW) {
            return 401
        };

        const token = jwt.sign({ email }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        req.session.userToken = token;
        req.session.userId = validUser._id;
        req.session.name = validUser.name;
        return 200
    } catch (err) {
        // Throw an error with a custom message
        console.error(err)
        throw new Error("Error logging in user: " + err.message);
    }
};

module.exports = authLogin;