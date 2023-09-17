const foodRouter = require('express').Router();
 const {foods: ctrl } = require('../../controllers');
 const { validation, ctrlWrapper, authorizeUser } = require('../../middlewares');

foodRouter
  .route("/food/query/:title").get(ctrlWrapper(ctrl.getFoodByQuery));

module.exports = foodRouter;