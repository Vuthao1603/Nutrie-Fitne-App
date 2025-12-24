const express = require("express");
const router = express.Router();
const foodController = require("../controllers/foodController");

// GET all foods
router.get("/", foodController.getFoods);

// POST create food
router.post("/create", foodController.createFood);

// PUT update food
router.put("/:id", foodController.updateFood);

// DELETE food
router.delete("/:id", foodController.deleteFood);

//lọc theo danh muc
router.get("/category/:category", foodController.getFoodsByCategory); 

// GET food by ID
router.get("/:id", foodController.getFoodById);


module.exports = router;
