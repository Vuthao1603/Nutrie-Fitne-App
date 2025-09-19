    const express = require("express");
    const multer = require("multer");
    const path = require("path");
    const { uploadVideo, getVideos } = require("../controllers/videoController");
    const videoController = require("../controllers/videoController");

    const router = express.Router();

    // Setup multer (lưu file vào /uploads/videos)
    const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/videos/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    },
    });

    const upload = multer({ storage: storage });

    // Route upload video
    router.post("/upload", upload.single("video"), videoController.uploadVideo);

    // Route get danh sách video
    router.get("/", getVideos);

    module.exports = router;
