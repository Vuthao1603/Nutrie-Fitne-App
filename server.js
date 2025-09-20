
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
const userRoutes = require("./routes/userRouters");

app.use("/api/foods", foodRoutes);
app.use("/api/users", userRoutes);


const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server chạy tại http://localhost:${PORT}`));
