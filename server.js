require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
app.use(cors());
app.use(express.json());

// Kết nối DB
connectDB();

// Routes

const foodRoutes = require("./routes/foodRoutes");
const userRoutes = require("./routes/userRoutes");
const practiceRouter = require("./routes/practiceRouter");
const adminRoutes = require("./routes/admin");
const mealPlanRoutes = require("./routes/mealplanRouter");

app.use("/api/mealplans", mealPlanRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/users", userRoutes);
app.use("/api/practice", practiceRouter);

// Khởi động server


const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server chạy tại http://localhost:${PORT}`));
