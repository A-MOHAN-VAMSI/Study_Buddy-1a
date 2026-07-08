const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

console.log("Authorization Header:", req.headers.authorization);
console.log("Token:", JSON.stringify(token));
console.log("Length:", token.length);

try {
  const decoded = jwt.verify(
    token.trim(),
    process.env.JWT_SECRET || "StudyBuddy@2026"
  );

  console.log("Decoded:", decoded);

  req.user = await User.findByPk(decoded.id, {
    attributes: { exclude: ["password"] },
  });

  if (!req.user) {
    return res.status(401).json({
      message: "User not found",
    });
  }

  return next();
} catch (err) {
  console.error("VERIFY ERROR:", err.name);
  console.error("MESSAGE:", err.message);
  console.error("TOKEN:", JSON.stringify(token));

  return res.status(401).json({
    message: err.message,
  });
}

      // Get user from token
      req.user = await User.findByPk(decoded.id, {
        attributes: { exclude: ['password'] }
      });

      if (!req.user) {
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }

      next();
    } catch (error) {
  console.error("JWT ERROR:", error);
  res.status(401).json({
    message: "Not authorized, token failed",
    error: error.message,
  });
}
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as an admin' });
  }
};

module.exports = { protect, adminOnly };
