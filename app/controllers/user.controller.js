const userService = require('../services/user.service');
const { successResponse, errorResponse } = require('../utils/responseHandler');

const userController = {
  // Get all users
  getAllUsers: async (req, res) => {
    try {
      const users = await userService.getAllUsers();
      return successResponse(res, 'Users retrieved successfully', users);
    } catch (error) {
      return errorResponse(res, error.message, 500);
    }
  },

  // Get user by ID
  getUserById: async (req, res) => {
    try {
      const user = await userService.getUserById(req.params.id);
      if (!user) {
        return errorResponse(res, 'User not found', 404);
      }
      return successResponse(res, 'User retrieved successfully', user);
    } catch (error) {
      return errorResponse(res, error.message, 500);
    }
  },

  // Create new user
  createUser: async (req, res) => {
    try {
      const userData = req.body;
      const newUser = await userService.createUser(userData);
      return successResponse(res, 'User created successfully', newUser, 201);
    } catch (error) {
      return errorResponse(res, error.message, 500);
    }
  },

  // Update user
  updateUser: async (req, res) => {
    try {
      const userId = req.params.id;
      const userData = req.body;
      const updatedUser = await userService.updateUser(userId, userData);
      if (!updatedUser) {
        return errorResponse(res, 'User not found', 404);
      }
      return successResponse(res, 'User updated successfully', updatedUser);
    } catch (error) {
      return errorResponse(res, error.message, 500);
    }
  },

  // Delete user
  deleteUser: async (req, res) => {
    try {
      const userId = req.params.id;
      const result = await userService.deleteUser(userId);
      if (!result) {
        return errorResponse(res, 'User not found', 404);
      }
      return successResponse(res, 'User deleted successfully', null);
    } catch (error) {
      return errorResponse(res, error.message, 500);
    }
  },

  // User login
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const result = await userService.loginUser(email, password);
      return successResponse(res, 'Login successful', result);
    } catch (error) {
      return errorResponse(res, error.message, 401);
    }
  }
};

module.exports = userController;