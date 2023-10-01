const userRouter = require("express").Router();
const { user: ctrl } = require("../../controllers");
const {
  ctrlWrapper,
  authorizeUser,
} = require("../../middlewares");

userRouter.route("/user/calories/").post(ctrlWrapper(ctrl.userGetCaloriesAndFood));

userRouter
  .route("/user/stats/")
  .get(authorizeUser, ctrlWrapper(ctrl.userGetStats));

userRouter.route("/user/calcuator/").post(authorizeUser, ctrlWrapper(ctrl.userSaveCalculator));

module.exports = userRouter;
