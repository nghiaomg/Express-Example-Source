const userService = require('../services/user.service');
const { successResponse, errorResponse } = require('../utils/responseHandler');

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await userService.getAllUsers();
      return successResponse(res, 'Users retrieved successfully', users);
    } catch (error) {
      return errorResponse(res, error.message, 500);
    }
  },

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

  createUser: async (req, res) => {
    try {
      const userData = {
        ...req.body,
        authProvider: 'local' 
      };
      const newUser = await userService.createUser(userData);
      return successResponse(res, 'User created successfully', newUser, 201);
    } catch (error) {
      return errorResponse(res, error.message, 500);
    }
  },

  updateUser: async (req, res) => {
    try {
      const userId = req.params.id;
      const userData = req.body;
      
      if (userData.authProvider) {
        delete userData.authProvider;
      }
      
      const updatedUser = await userService.updateUser(userId, userData);
      if (!updatedUser) {
        return errorResponse(res, 'User not found', 404);
      }
      return successResponse(res, 'User updated successfully', updatedUser);
    } catch (error) {
      return errorResponse(res, error.message, 500);
    }
  },

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

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const result = await userService.loginUser(email, password);
      return successResponse(res, 'Login successful', result);
    } catch (error) {
      return errorResponse(res, error.message, 401);
    }
  },
  
  googleLogin: async (req, res) => {
    try {
      const profile = req.body;
      const result = await userService.oauthLogin(profile, 'google');
      return successResponse(res, 'Google login successful', result);
    } catch (error) {
      return errorResponse(res, error.message, 401);
    }
  },
  
  changePassword: async (req, res) => {
    try {
      const userId = req.user.id; 
      const { oldPassword, newPassword } = req.body;
      const result = await userService.changePassword(userId, oldPassword, newPassword);
      return successResponse(res, 'Password changed successfully', result);
    } catch (error) {
      return errorResponse(res, error.message, 400);
    }
  },
  
  getProfile: async (req, res) => {
    try {
      const userId = req.user.id; 
      const user = await userService.getUserById(userId);
      if (!user) {
        return errorResponse(res, 'User not found', 404);
      }
      return successResponse(res, 'Profile retrieved successfully', user);
    } catch (error) {
      return errorResponse(res, error.message, 500);
    }
  }
};

module.exports = userController;