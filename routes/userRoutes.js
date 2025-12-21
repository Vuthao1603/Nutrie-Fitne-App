const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

// ===== User =====
router.post("/", userController.addUser); // POST /api/users
router.get("/getall", userController.getUsers); // GET /api/users
router.patch("/:id", userController.updateUser); // PATCH /api/users/:id
router.post("/login", userController.login); // POST /api/users/auth/login
router.post("/register", userController.register); // POST /api/users/auth/register



// ===== Meal Log =====
router.post("/addMeal", userController.addMeal); // POST /api/users/meal
router.get("/meal/:userId/:date", userController.getMealsByDate); // GET /api/users/meal/:userId/:date
router.get("/meal/:userId", userController.getAllMeals); // GET /api/users/meal/:userId

module.exports = router;

