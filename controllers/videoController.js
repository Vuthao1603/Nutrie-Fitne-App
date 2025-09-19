    const Video = require("../models/video");
    const path = require("path");

    // Upload video
    exports.uploadVideo = async (req, res) => {
    try {
        if (!req.file) {
        return res.status(400).json({ message: "Vui lòng chọn file video!" });
        }

        const video = new Video({
        title: req.body.title || req.file.originalname,
        filename: req.file.filename,
        filepath: `/uploads/videos/${req.file.filename}`,
        mimetype: req.file.mimetype,
        size: req.file.size,
        });

        await video.save();

        res.status(201).json({
        message: "Upload video thành công",
        video,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    };

    // Lấy danh sách video
    exports.getVideos = async (req, res) => {
    try {
        const videos = await Video.find();
        res.json(videos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    };
