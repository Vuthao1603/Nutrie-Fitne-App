const express = require("express");
const MealPlan = require("../models/mealplan");
const Food = require("../models/food");
const User = require("../models/user");

const router = express.Router();

/* DASHBOARD */
router.get("/dashboard", async (req, res) => {
  try {
    const [
      totalMeals,
      totalFoods,
      totalUsers,
      foodsByCategoryRaw,
      mealByMonthRaw,
      mealByCaloriesRaw,
    ] = await Promise.all([
      MealPlan.countDocuments(),
      Food.countDocuments(),
      User.countDocuments(),

      Food.aggregate([
        { $group: { _id: "$category", total: { $sum: 1 } } },
      ]),

      MealPlan.aggregate([
        {
          $group: {
            _id: { $month: "$createdAt" },
            total: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]),

      MealPlan.aggregate([
        {
          $group: {
            _id: "$caloriesRange",
            total: { $sum: 1 },
          },
        },
      ]),
    ]);

    res.json({
      summary: {
        totalMeals,
        totalFoods,
        totalUsers,
        totalCategories: foodsByCategoryRaw.length,
      },
      foodsByCategory: foodsByCategoryRaw.map(i => ({
        label: i._id,
        value: i.total,
      })),
      mealByMonth: {
        categories: mealByMonthRaw.map(i => `Tháng ${i._id}`),
        series: mealByMonthRaw.map(i => i.total),
      },
      mealByCalories: {
        categories: mealByCaloriesRaw.map(i => i._id),
        series: mealByCaloriesRaw.map(i => i.total),
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Stats error" });
  }
});


module.exports = router;
