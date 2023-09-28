const { auth: service } = require('../../services');

const authLogout = async (req, res) => {
    const result = await service.authLogout(req);

    if (result === 404) {
        res.status(404).json({
            status: "Not Found",
            code: 404,
            data: {
                message: "User not found. Please check your email."
            }
        });
        return;
    }
    res.status(200).json({
        status: "Success",
        code: 200,
        data: {
            message: "User logged out."
        }
    });
}

module.exports = authLogout;