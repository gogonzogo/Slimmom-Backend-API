const userRouter = require("express").Router();
const { user: ctrl } = require("../../controllers");
const {
  validation,
  ctrlWrapper,
  authorizeUser,
  upload,
} = require("../../middlewares");
const {
  registrationValidationSchema,
  loginValidationSchema,
} = require("../../models");

// comment workflow
// @POST /api/users/register
userRouter
  .route("/users/register")
  .post(
    validation(registrationValidationSchema),
    ctrlWrapper(ctrl.userRegister)
  );

// @POST /api/users/login
userRouter
  .route("/users/login")
  .post(validation(loginValidationSchema), ctrlWrapper(ctrl.userLogin)); // route will be validated by joiSchema then the controller is wrapped in a a middleware which catches errors

// @POST /api/users/addFood
userRouter
  .route("/users/addFood")
  .post(authorizeUser, ctrlWrapper(ctrl.userAddFood)); // can not access route without login

// @POST /api/users/logout
userRouter.route("/users/logout").post(ctrlWrapper(ctrl.userLogout));

userRouter
  .route("/users/deleteFood/:data")
  .delete(authorizeUser, ctrlWrapper(ctrl.userDeleteFood));

module.exports = userRouter;
