const { Diary, Calculator, User } = require("../../models");


const userDeleteAccount = async (req) => {
        try {
        console.log("userdeleteaccount req", req)
                const userId = req.user._id;
                const userEmail = req.user.userEmail
                console.log('req', req)
                console.log('userId', userId)
                console.log('userEmail',userEmail)

        await Diary.deleteMany({ userId });
        await Calculator.findOneAndDelete({ userId });
        await User.findOneAndDelete({_id: userId });
        return 200        

    } catch (err) {
        console.log("Error Archiving data");
      }
    };
    module.exports = userDeleteAccount;