const diaryRouter = require("express").Router();
const { diary: ctrl } = require("../../controllers");
const {
  ctrlWrapper,
  authorizeUser,
} = require("../../middlewares");

diaryRouter
  .route("/diary/add")
  .post(authorizeUser, ctrlWrapper(ctrl.diaryAddEntry));

diaryRouter
  .route("/diary/delete/:data")
  .delete(authorizeUser, ctrlWrapper(ctrl.diaryDeleteEntry));

diaryRouter
  .route("/diary/day")
  .post(authorizeUser, ctrlWrapper(ctrl.diaryGetDayEntries));

diaryRouter.route("/diary/allFoods/search/:title").get(ctrlWrapper(ctrl.diaryAllFoodsSearch));
diaryRouter.route("/badFood").get(ctrlWrapper(ctrl.diaryNotAllowedFoodsSearch)); 

module.exports = diaryRouter;
