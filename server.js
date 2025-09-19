const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");


const app = express();
app.use(cors());
app.use(express.json());

// Kết nối DB
connectDB();

// Routes
const postRoutes = require("./routes/postroutes");
const videoRoutes = require("./routes/videoRoutes");
const foodRoutes = require("./routes/foodRoutes");

app.use("/api/foods", foodRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/videos", videoRoutes);
app.use("/api/posts", postRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server chạy tại http://localhost:${PORT}`));
