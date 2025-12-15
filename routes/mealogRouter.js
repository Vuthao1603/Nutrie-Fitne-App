const express = require("express");
const { addMeal, getMealsByDate, getAllMeals } = require("../controllers/mealogController");

const router = express.Router();

router.post("/", addMeal);
router.get("/:userId/:date", getMealsByDate);
router.get("/:userId", getAllMeals);

module.exports = router;