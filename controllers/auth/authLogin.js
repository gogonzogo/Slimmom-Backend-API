const { auth: service } = require('../../services');

const authLogin = async (req, res) => {
    const result = await service.authLogin(req);
    if (result === 404) {
        res.status(404).json({
            status: "Not Found",
            code: 404,
            data: {
                message: "User not found. Please check your email."
            }
        });
        return
    }
    if (result === 401) {
        res.status(401).json({
            status: "Unauthorized",
            code: 401,
            data: {
                message: "Unauthorized user. Incorrect password."
            }
        });
        return
    }
    res.status(200).json({
        status: "Success",
        code: 200,
        data: req.userData,
        message: "Login Successful, have fun slimMom!"
    });
};

module.exports = authLogin;
