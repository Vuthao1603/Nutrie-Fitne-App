const Food = require("../models/food");

// GET all foods
exports.getFoods = async (req, res) => {
    try {
        const foods = await Food.find();
        res.json(foods);
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};

 // Danh muc :category"
exports.getFoodsByCategory = async (req, res) => {
  try {
    const category = decodeURIComponent(req.params.category);

    const foods = await Food.find({ category }); // tìm theo field 'category' trong DB
    if (!foods.length) {
      return res.status(404).json({ message: "Không có món nào trong nhóm này" });
    }

    res.json(foods);
  } catch (error) {
    console.error("❌ Lỗi backend:", error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// GET food by ID
exports.getFoodById = async (req, res) => {
    try {
        const food = await Food.findById(req.params.id);
        if (!food) return res.status(404).json({
            message: "Không tìm thấy món ăn"
        });
        res.json(food);
    }
    catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};



// POST create food
exports.createFood = async (req, res) => {
    try {
        const food = new Food(req.body);
        await food.save();
        res.status(201).json(food);
    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
};

// PUT update food
exports.updateFood = async (req, res) => {
    try {
        const food = await Food.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.json(food);
    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
};

// DELETE food
exports.deleteFood = async (req, res) => {
    try {
        await Food.findByIdAndDelete(req.params.id);
        res.json({
            message: "Food deleted"
        });
    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
};