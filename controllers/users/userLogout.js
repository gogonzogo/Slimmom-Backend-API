const { users: service } = require('../../services');

const userLogout = async(req, res) => {
    // grab user from req.session
    const user = await service.userLogin(req);
    // console.log(user)
    // if user is not found, send message
    if (!user) {
        res.status(404).json({
            status: "Not Found",
            code: 404,
            data: {
                message: "User not found. Please check your email."
            }
        });
        return
        // if user is found, send message
    } else {
        res.status(200).json({
            status: "Success",
            code: 200,
            data: {
                message: "User logged out."
            }
        });
        return
    }
}

module.exports = userLogout;