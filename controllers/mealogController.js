import User from "../models/user.js";

export const addMeal = async (req, res) => {
  try {
    // Lấy và kiểm tra dữ liệu đầu vào
    const { userId, foodName, calories, date, time } = req.body;


    if (!userId || !foodName || calories == null || !date || !time) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Chuyển đổi calories thành số nếu cần
    const parsedCalories = Number(calories);
    if (isNaN(parsedCalories)) {
      return res.status(400).json({ message: "Calories must be a number" });
    }

    // Tìm user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Tìm hoặc tạo log cho ngày tương ứng
    let dayLog = user.mealLogs.find((d) => d.date === date);
    if (!dayLog) {
      user.mealLogs.push({ date, meals: [] });
      dayLog = user.mealLogs[user.mealLogs.length - 1]; // Lấy reference mới nhất
    }

    // Thêm món ăn
    dayLog.meals.push({ foodName, calories: parsedCalories, time });

    // Lưu thay đổi
    await user.save();

    res.status(200).json({
      message: "Meal added successfully",
      data: user,
    });
  } catch (error) {
    console.error("❌ Lỗi thêm meal:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};