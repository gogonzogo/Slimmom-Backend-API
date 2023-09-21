const { users: service } = require("../../services");

const userDeleteFood = async (req, res) => {
  const result = await service.userDeleteFood(req);
  console.log(result);

  if (result === 400) {
    res.status(400).json({
      status: "Bad Request",
      code: 400,
      data: {
        message: "Error with entered data, please try again.",
      },
    });
    return;
  }

  if (result === 404) {
    res.status(404).json({
      status: "Product not found",
      code: 404,
      data: {
        message:
          "There is no such product. Please check the product you want to delete.",
      },
    });
    return;
  }

  res.status(201).json({
    status: "Success",
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = userDeleteFood;
