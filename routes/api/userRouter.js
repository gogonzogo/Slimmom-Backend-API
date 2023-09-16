const userRouter = require('express').Router();
const { user: ctrl } = require('../../controllers');
const { validation, ctrlWrapper, authUser, upload } = require('../../middlewares');
const { registrationValidationSchema, loginValidationSchema } = require('../../models')
// comment workflow 
// route will be validated by joiSchema in model, then the controller is wrapped in a a middleware which catches errors
userRouter.route('/users/register').post(validation(registrationValidationSchema), ctrlWrapper(ctrl.userRegister));
userRouter.route('/users/login').post(validation(loginValidationSchema), ctrlWrapper(ctrl.userLogin));
userRouter.route('/users/addFood').post(ctrlWrapper(ctrl.userAddFood)); 

module.exports = userRouter; 