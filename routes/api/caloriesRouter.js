const caloriesRouter = require("express").Router();
const { calories: ctrl } = require("../../controllers");
const {
  validation,
  ctrlWrapper,
  authUser,
  upload,
} = require("../../middlewares");

caloriesRouter.route("/calories/").get(ctrlWrapper(ctrl.getCaloriesAndFood));
module.exports = caloriesRouter;
