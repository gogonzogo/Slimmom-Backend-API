const userRouter = require('express').Router();
const { user: ctrl } = require('../../controllers');
const { validation, ctrlWrapper, authUser, upload } = require('../../middlewares');
const { registrationValidationSchema, loginValidationSchema } = require('../../models')
// comment workflow 
userRouter.route('/users/register').post(validation(registrationValidationSchema), ctrlWrapper(ctrl.userRegister));
userRouter.route('/users/login').post(validation(loginValidationSchema), ctrlWrapper(ctrl.userLogin)); // route will be validated by joiSchema then the controller is wrapped in a a middleware which catches errors
module.exports = userRouter;