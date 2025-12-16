const express = require("express");
const router = express.Router();
const User = require("../models/user");
const auth = require("../middlewares/auth");
const roleAdmin = require("../middlewares/roleAdmin");

// GET all users
router.get("/users", auth, roleAdmin, async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

// DELETE user
router.delete("/users/:id", auth, roleAdmin, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
