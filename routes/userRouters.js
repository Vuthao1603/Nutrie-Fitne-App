const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/", userController.addUser); // gửi POST tới /api/users để thêm người dùng mới
router.get("/", userController.getUsers); // gửi GET tới /api/users để lấy danh sách người dùng

module.exports = router;
