const { users: service } = require('../../services');

const userLogin = async (req, res) => {
    const result = await service.userLogin(req);
    console.log(result)
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
                message: "Unauthorized user. Please check your email or password."
            }
        });
        return
    }
    res.status(200).json({
        status: "Success",
        code: 200,
        token: req.session.userToken,
        username: req.session.username,
        userId: req.session.userId,
        data: {
            message: "Login Successful, have fun slimMom!"
        },
        
    });
};

module.exports = userLogin;



/* res.status(403).json({
     status: "Forbidden",
     code: "403",
     data: {
     message: "Email not verified. Please check your email for a verification email, or resend the verification email ....",
   }
})
*/

  