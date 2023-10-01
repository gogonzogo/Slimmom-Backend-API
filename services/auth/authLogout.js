const authLogout = async (req) => {
    try {
        const user = req.user
        console.log('user', user)
        user.token = null;
        await user.save();
        return 200;
    } catch (err) {
        console.log(err);
    }
}

module.exports = authLogout;