const authLogout = async (req) => {
    try {
        const user = req.user
        user.token = null;
        await user.save();
        return 200;
    } catch (err) {
        console.log(err);
        throw new Error("Error logging out" + err.message)
    }
}

module.exports = authLogout;