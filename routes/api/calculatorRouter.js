const calculatorRouter = require("express").Router();
const { calculator: ctrl } = require("../../controllers");
const {
  validation,
  ctrlWrapper,
  authUser,
  upload,
} = require("../../middlewares");

calculatorRouter.route("/calcuator/").post(ctrlWrapper(ctrl.saveCalulator));
module.exports = calculatorRouter;