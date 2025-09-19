const express = require("express");
const router = express.Router();
const foodController = require("../controllers/foodController");

// GET all foods
router.get("/", foodController.getFoods);

// POST create food
router.post("/", foodController.createFood);

// PUT update food
router.put("/:id", foodController.updateFood);

// DELETE food
router.delete("/:id", foodController.deleteFood);

module.exports = router;
