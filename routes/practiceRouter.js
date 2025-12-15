const express = require("express");
const router = express.Router();
const User = require("../models/user");

// ============================
// ============================
// POST /api/practice/add
router.post("/add", async (req, res) => {
  try {
    const { userId, date, activity } = req.body; 
    // activity: { type, distance, duration, calories }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // tìm ngày trong mảng practice
    let dayPractice = user.practice.find(p => p.date === date);

    if (dayPractice) {
      dayPractice.activities.push(activity);
    } else {
      user.practice.push({
        date,
        activities: [activity],
      });
    }

    await user.save();
    res.json({ message: "Cập nhật hoạt động thành công", practice: user.practice });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Lỗi server" });
  }
});

// ============================
// 📋 Route: Lấy hoạt động theo ngày
// ============================
// GET /api/practice/get-by-date?userId=xxx&date=2025-10-20
router.get("/get-by-date", async (req, res) => {
  try {
    const { userId, date } = req.query;

    if (!userId || !date) {
      return res.status(400).json({ error: "userId và date là bắt buộc" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Tìm hoạt động theo ngày
    const dayPractice = user.practice.find(p => p.date === date);

    if (!dayPractice) {
      return res.json({ activities: [], date });
    }

    res.json({ 
      activities: dayPractice.activities, 
      date 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Lỗi server" });
  }
});

// ============================
// ✅ Xuất router
// ============================
module.exports = router;