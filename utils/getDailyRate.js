function getDailyRate(req) {
  const { currentWeight, height, age, desiredWeight } = req.body;
  const dailyRate =
    10 * currentWeight +
    6.25 * height -
    5 * age -
    161 -
    10 * (currentWeight - desiredWeight);
  return dailyRate;
}
module.exports = getDailyRate;
