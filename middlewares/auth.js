const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch {
    res.sendStatus(401);
  }
};

import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: 'Sai email hoặc mật khẩu' });
  }

  // so sánh password (ví dụ)
  if (password !== user.password) {
    return res.status(401).json({ message: 'Sai mật khẩu' });
  }

  // tạo token
  const token = jwt.sign(
    {
      userId: user._id,
      role: user.role, // 'admin'
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.json({
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};
