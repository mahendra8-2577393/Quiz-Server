// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');

const auth = async (req, res, next) => {
  try {
    // Only validate JWT for protected routes
    if (req.method === 'POST' && req.path === '/api/login') {
      return next(); // Skip authentication for login
    }

    // Extract token from Authorization header
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    
    // Find user by ID in the token
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Check if the user is admin for admin routes
    if (req.user.isAdmin) {
      next(); // Proceed to next middleware
    } else {
      return res.status(403).json({ message: 'Access forbidden: Admins only' });
    }
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = auth;
