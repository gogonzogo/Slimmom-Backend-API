const userRouter = require('express').Router();
const { user: ctrl } = require('../../controllers');
const { validation, ctrlWrapper, authUser, upload } = require('../../middlewares');
const { registrationValidationSchema } = require('../../models')
// xomment workflow 
userRouter.route('/users/register').post(validation(registrationValidationSchema), ctrlWrapper(ctrl.userRegister));

module.exports = userRouter;