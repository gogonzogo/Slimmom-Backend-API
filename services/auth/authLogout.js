require('dotenv').config();

const authLogout = (req, res) => {
    try {
        // check if user is logged in
        if(req.session.userToken) {
            // if logged in, destroy session
            req.session.destroy(() => {
                res.json({message: "You have been logged out."});
            });
            // if not logged in, send message
        } else {
            res.json({message: "You are not logged in."});
        }
    } catch (err) {
        // if error, send error
        res.json({message: "There was an error with service."});
        console.log(err);
    }
    
}

module.exports = authLogout;