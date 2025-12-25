// models/MealPlan.js
const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema({
  name: String,
  calories: Number,
  protein: Number,
  carbs: Number,
  fat: Number,
  image: String,
});

const MealSchema = new mongoose.Schema({
  mealType: {
    type: String, // breakfast | lunch | dinner | snack
  },
  foods: [FoodSchema],
});

const DaySchema = new mongoose.Schema({
  day: Number, // 1 → 7
  meals: [MealSchema],
});

const MealPlanSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    caloriesRange: String, // "1200-1400"
    caloriesPerDay: Number,
    mealsPerDay: Number,
    duration: Number, // số ngày (7)
    image: String,
    tags: [String], // ["Eat Clean", "Văn phòng"]
    days: [DaySchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("mealplan", MealPlanSchema);
