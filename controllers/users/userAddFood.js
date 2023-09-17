const { users: service } = require("../../services");

const userAddFood = async (req, res) => {
  try {const result = await service.userAddFood(req);
    // if there is a service error
    if (result instanceof Error) {
      console.error("Error adding food item:", result.message);
      res.status(400).json({
        status: "Bad Request",
        code: 400,
        data: {
          message: result.message,
        },
      });
    // if the service works
    } else {
      res.status(200).json({
        status: "Success",
        code: 200,
        data: {
          newEntry: result,
          message: `Awesome, a new entry was added to your Diary.`,
        },
      });
    }
  } catch (err) {
    // Handle unexpected server errors
    console.error("Error adding food item:", err);
   res.status(500).json({
      status: "Internal Server Error",
      code: 500,
      data: {
        message: "An unexpected error occurred.",
      },
    });
  }
};

module.exports = userAddFood;
