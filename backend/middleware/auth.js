const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes - verify JWT token
exports.protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'User not found',
      });
    }

    if (req.user.isBlocked) {
      return res.status(403).json({
        success: false,
        message: 'Your account has been blocked',
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route',
    });
  }
};

// Admin only middleware
exports.admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Access denied. Admin only.',
    });
  }
};

// Check subscription for premium content
exports.checkSubscription = async (req, res, next) => {
  try {
    if (req.user.role === 'admin') {
      return next();
    }

    const subscription = req.user.subscription;

    if (!subscription || subscription.status !== 'active') {
      return res.status(403).json({
        success: false,
        message: 'Active subscription required to access this content',
      });
    }

    if (subscription.endDate && new Date() > subscription.endDate) {
      req.user.subscription.status = 'expired';
      await req.user.save();
      
      return res.status(403).json({
        success: false,
        message: 'Your subscription has expired',
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error checking subscription',
    });
  }
};
