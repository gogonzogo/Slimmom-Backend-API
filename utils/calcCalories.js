function calcCalories(req) {
  const { currentWeight, height, age, desiredWeight } = req.body;

  console.log({ currentWeight, height, age, desiredWeight });
  const totalCalories =
    10 * currentWeight +
    6.25 * height -
    5 * age -
    161 -
    10 * (currentWeight - desiredWeight);
  return totalCalories;
}
module.exports = { calcCalories };
