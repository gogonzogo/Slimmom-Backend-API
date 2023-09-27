const foodRouter = require("express").Router();
const { foods: ctrl } = require("../../controllers");
const { validation, ctrlWrapper, authorizeUser } = require("../../middlewares");

foodRouter.route("/food/query/:title").get(ctrlWrapper(ctrl.getFoodByQuery));
foodRouter.route("/badFood").get(ctrlWrapper(ctrl.searchBadFood)); //add params for blood type and querry. Querry is optional

module.exports = foodRouter;
