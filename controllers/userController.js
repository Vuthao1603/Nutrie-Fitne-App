
const User = require("../models/user");

// GET all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};


exports.addUser = async (req, res) => {
    try {
        const {
            name,
            day,
            month,
            year
        } = req.body;

        if (!name || !day || !month || !year) {
            return res.status(400).json({
                message: "Thiếu dữ liệu"
            });
        }

        const user = new User({
            name,
            day,
            month,
            year
        });
        await user.save();

        res.status(201).json({
            message: "Lưu thông tin thành công!",
            user
        });
    } catch (err) {
        res.status(500).json({
            message: "Lỗi server",
            error: err.message
        });
    }
};