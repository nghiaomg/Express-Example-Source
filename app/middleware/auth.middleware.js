const jwt = require('jsonwebtoken');
const jwtHelper = require('../helper/jwt.helper');
const { errorResponse } = require('../utils/responseHandler');
const User = require('../models/user.model');

const authMiddleware = {
  // Authenticate user
  authenticate: async (req, res, next) => {
    try {
      // Get token from header
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return errorResponse(res, 'Access denied. No token provided', 401);
      }

      const token = authHeader.split(' ')[1];
      
      // Verify token using the helper
      const decoded = jwtHelper.verifyToken(token);
      
      // Find user
      const user = await User.findById(decoded.id).select('-password');
      if (!user || !user.isActive) {
        return errorResponse(res, 'Invalid token or user not found', 401);
      }
      
      // Add user to request object
      req.user = user;
      next();
    } catch (error) {
      return errorResponse(res, 'Invalid token', 401);
    }
  },

  // Check if user is admin
  isAdmin: (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
      next();
    } else {
      return errorResponse(res, 'Access denied. Admin privileges required', 403);
    }
  }
};

module.exports = authMiddleware;