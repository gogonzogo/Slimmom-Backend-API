const caloriesRouter = require("express").Router();
const { calories: ctrl } = require("../../controllers");
const {
  validation,
  ctrlWrapper,
  authUser,
  upload,
} = require("../../middlewares");

caloriesRouter.route("/calories/").post(ctrlWrapper(ctrl.getCaloriesAndFood));
module.exports = caloriesRouter;
