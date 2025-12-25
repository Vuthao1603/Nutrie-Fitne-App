// routes/mealPlanRoutes.js
const express = require("express");
const mealplan = require("../models/mealplan");
const router = express.Router();

// GET all meal plans
router.get("/", async (req, res) => {
  const plans = await mealplan.find();
  res.json(plans);
});

// GET meal plan by ID
router.get("/:id", async (req, res) => {
  const plan = await mealplan.findById(req.params.id);
  res.json(plan);
});

module.exports = router;
