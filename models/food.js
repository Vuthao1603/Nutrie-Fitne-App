const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true, // Xóa khoảng trắng đầu/cuối
    },
    category: {
        type: String,
        enum: [
            "Cơm - Mì - Bún",
            "Thịt - Cá - Hải sản",
            "Rau củ - Trái cây",
            "Đồ uống",
            "Đồ ăn vặt",
            "Khác",
        ],
        default: "Khác",
    },
    calories: {
        type: Number,
        required: true, // calo tổng tính theo 100g hoặc 1 khẩu phần
    },
    macronutrients: {
        //dinh duong chinh
        protein: {
            type: Number,
            default: 0
        }, // gam
        carbs: {
            type: Number,
            default: 0
        }, // gam
        fat: {
            type: Number,
            default: 0
        }, // gam
        fiber: {
            type: Number,
            default: 0
        }, // gam
    },
    micronutrients: {
        vitaminA: {
            type: Number,
            default: 0
        }, // IU
        vitaminC: {
            type: Number,
            default: 0
        }, // mg
        calcium: {
            type: Number,
            default: 0
        }, // mg
        iron: {
            type: Number,
            default: 0
        }, // mg
        potassium: {
            type: Number,
            default: 0
        }, // mg
    },
    portionSize: {
        value: {
            type: Number,
            default: 100
        }, // khối lượng khẩu phần
        unit: {
            type: String,
            default: "g"
        }, // đơn vị: g, ml, cái...
    },
    imageUrl: {
        type: String,
        default: "",
    },
    description: {
        type: String,
        trim: true,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("Food", FoodSchema);