const { User } = require('../../models')

const authLogout = async (req, res) => {
    try {
        const userLoggedIn = req.session.userId
        const userExists = await User.findById(`${userLoggedIn}`) !== null;
        if (userExists) {
            req.session.destroy()
            return 200
        }
        return 404;
    } catch (err) {
        res.json({ message: "There was an error with service." });
        console.log(err);
    }
}

module.exports = authLogout;