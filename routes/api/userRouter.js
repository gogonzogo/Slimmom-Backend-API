const userRouter = require('express').Router();
const { user: ctrl } = require('../../controllers');
const { validation, ctrlWrapper, authUser, upload } = require('../../middlewares');
const { joiUserSchema, subscriptionSchema } = require('../../models')

userRouter.route('/users/login').post(validation(joiUserSchema), ctrlWrapper(ctrl.userRegiste));

module.exports = userRouter;