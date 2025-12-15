const User = require("../models/user");
const Food = require("../models/food");

// ================= USER =================

// Lấy tất cả user
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Thêm user mới
const addUser = async (req, res) => {
  try {
    const {
      name,
      yearold,
      weight,
      height,
      goal,
      gender,
      desiredWeight,
      activityLevel,
      username,
      password,
    } = req.body;

    console.log("📥 Dữ liệu nhận được từ FE:", req.body);

    // Kiểm tra các trường bắt buộc
    if (!name || !yearold || !goal || !gender) {
      return res.status(400).json({ message: "Thiếu thông tin bắt buộc: name, yearold, goal, gender" });
    }

    // Tạo user mới với các trường tùy chọn
    const userData = {
      name,
      yearold,
      goal,
      gender,
    };

    // Thêm các trường tùy chọn nếu có
    if (weight !== undefined) userData.weight = weight;
    if (height !== undefined) userData.height = height;
    if (desiredWeight !== undefined) userData.desiredWeight = desiredWeight;
    if (activityLevel !== undefined) userData.activityLevel = activityLevel;
    if (username !== undefined) userData.username = username;
    if (password !== undefined) userData.password = password;

    const user = new User(userData);

    await user.save();
    res.status(201).json({ message: "Lưu thông tin thành công!", user });
  } catch (err) {
    console.error("❌ Lỗi addUser:", err);
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

// Cập nhật user theo ID
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const user = await User.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!user) return res.status(404).json({ message: "Không tìm thấy user" });

    res.json({ message: "Cập nhật thông tin thành công!", user });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

// Đăng ký user (cập nhật username và password cho user đã tồn tại)
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Thiếu dữ liệu" });
    }

    const existedUser = await User.findOne({ email });
    if (existedUser) {
      return res.status(400).json({ message: "Email đã tồn tại" });
    }

    const newUser = new User({
      name,
      email,
      password, 
    });

    await newUser.save();

    res.status(201).json({
      message: "Đăng ký thành công",
      user: newUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Đăng nhập user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Thiếu email hoặc mật khẩu",
      });
    }

    // Tìm user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Email không tồn tại",
      });
    }

    // So sánh password (chưa hash)
    if (user.password !== password) {
      return res.status(401).json({
        message: "Sai mật khẩu",
      });
    }

    // Login thành công
    res.json({
      message: "Login success",
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Lỗi server",
    });
  }
};

// ================= MEAL LOG =================

// ====================== ADD MEAL ======================

const addMeal = async (req, res) => {
  try {
    const { userId, foodId, date } = req.body;

    console.log("📥 Dữ liệu FE gửi:", req.body);

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "Không tìm thấy user" });

    const newMeal = {
      food: foodId,
      quantity: 1,
      customCalories: null,
    };
    console.log("🍱 Thêm món ăn:", newMeal);

    // tìm log theo ngày
    let dayLog = user.mealLogs.find((log) => log.date === date);

    if (dayLog) {
      // nếu ngày đã có thì push thêm món ăn
      dayLog.meals.push(newMeal);
    } else {
      // nếu chưa có ngày thì tạo mới
      user.mealLogs.push({ date, meals: [newMeal] });
    }

    // 🔥 Cực kỳ quan trọng:
    user.markModified("mealLogs");

    await user.save();

    console.log("✅ Đã thêm món ăn cho ngày:", date);

    res.status(200).json({ message: "Thêm món ăn thành công", user });
  } catch (err) {
    console.error("❌ Lỗi addMeal:", err);
    res.status(500).json({ error: err.message });
  }
};

// 📅 Lấy meal theo ngày
// GET /api/users/meal/:userId/:date
const getMealsByDate = async (req, res) => {
  try {
    const { userId, date } = req.params;

    const user = await User.findById(userId)
      .populate({
        path: "mealLogs.meals.food", // populate món ăn
        model: "Food",
      })
      .lean();

    if (!user) return res.status(404).json({ message: "Không tìm thấy user" });

    // tìm meal log theo ngày
    const log = user.mealLogs.find(
      (log) => log.date === date
    );

    if (!log || !log.meals.length)
      return res.json([]); // không có dữ liệu

    // chuyển dữ liệu sang format FE cần
    const meals = log.meals.map((item) => {
      const food = item.food;
      if (!food) return null;
      return {
        foodName: food.name,
        calories: item.customCalories || food.calories,
        protein: food.macronutrients?.protein || 0,
        carbs: food.macronutrients?.carbs || 0,
        fat: food.macronutrients?.fat || 0,
        fiber: food.macronutrients?.fiber || 0,
        calcium: food.macronutrients?.calcium || 0,
        iron: food.macronutrients?.iron || 0,
        potassium: food.macronutrients?.potassium || 0,
        time: item.time,
      };
    }).filter(Boolean);

    res.json(meals);
  } catch (err) {
    console.error("❌ Lỗi getMealsByDate:", err);
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};


// 📊 Lấy toàn bộ meal logs của user
const getAllMeals = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).populate("mealLogs.meals.food");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user.mealLogs);
  } catch (error) {
    console.error("❌ Lỗi getAllMeals:", error);
    res.status(500).json({ message: "Error fetching all meals" });
  }
};

// ================= EXPORT =================
module.exports = {
  getUsers,
  addUser,
  updateUser,
  addMeal,
  getMealsByDate,
  getAllMeals,
  login,
  register,
};
