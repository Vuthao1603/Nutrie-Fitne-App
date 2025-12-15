const mongoose = require("mongoose");

// ==========================
// 1️⃣ Schema cho bài tập (Practice)
// ==========================
const PracticeSchema = new mongoose.Schema({
  date: { type: String, required: true }, // dạng YYYY-MM-DD
  activities: [
    {
      type: { type: String, required: true }, // ví dụ: "running"
      distance: Number, // km
      duration: Number, // phút
      calories: Number, // kcal
    },
  ],
});

// ==========================
// 2️⃣ Schema cho món ăn trong ngày
// ==========================
const MealSchema = new mongoose.Schema({
  food: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Food",
    required: true,
  },
  quantity: {
    type: Number,
    default: 1, // số khẩu phần ăn
  },
  customCalories: Number, // nếu user tự điều chỉnh
});

// ==========================
// 3️⃣ Schema cho nhật ký ăn trong ngày
// ==========================
const DayLogSchema = new mongoose.Schema({
  date: { type: String, required: true }, // YYYY-MM-DD
  meals: [MealSchema],
});

// ==========================
// 4️⃣ Schema chính cho người dùng
// ==========================
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  yearold: { type: Number, dafault: null },
  weight: Number,
  height: Number,
  goal: { type: String, dafault: null },
  gender: { type: String, dafault: null },
  desiredWeight: Number,
  activityLevel: { type: String },
  tdee: Number,
  weeklyCalories: Number,
  mealLogs: [DayLogSchema], // nhật ký bữa ăn
  practice: [PracticeSchema], // nhật ký bài tập
  email: { type: String, unique: true, sparse: true },
  password: { type: String }, 
});


// ==========================
// 5️⃣ Xuất model duy nhất
// ==========================
module.exports = mongoose.model("User", UserSchema);
