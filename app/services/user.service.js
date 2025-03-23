const User = require('../models/user.model.js');
const jwtHelper = require('../helper/jwt.helper');

const userService = {
  // Get all users
  getAllUsers: async () => {
    return await User.find({ isActive: true }).select('-password');
  },

  // Get user by ID
  getUserById: async (userId) => {
    return await User.findById(userId).select('-password');
  },

  // Create new user
  createUser: async (userData) => {
    const user = new User(userData);
    await user.save();
    return user;
  },

  // Update user
  updateUser: async (userId, userData) => {
    // Don't allow password updates through this method
    if (userData.password) {
      delete userData.password;
    }
    
    return await User.findByIdAndUpdate(
      userId,
      { ...userData, updatedAt: Date.now() },
      { new: true, runValidators: true }
    ).select('-password');
  },

  // Delete user (soft delete)
  deleteUser: async (userId) => {
    return await User.findByIdAndUpdate(
      userId,
      { isActive: false, updatedAt: Date.now() },
      { new: true }
    );
  },

  // User login
  loginUser: async (email, password) => {
    // Find user by email
    const user = await User.findOne({ email, isActive: true });
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error('Invalid email or password');
    }

    // Generate JWT token using the helper
    const token = jwtHelper.generateToken({
      id: user._id,
      email: user.email,
      role: user.role
    });

    return {
      user: user.toJSON(),
      token
    };
  },

  // Change password
  changePassword: async (userId, oldPassword, newPassword) => {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Verify old password
    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) {
      throw new Error('Current password is incorrect');
    }

    // Update password
    user.password = newPassword;
    await user.save();
    
    return { success: true };
  }
};

module.exports = userService;