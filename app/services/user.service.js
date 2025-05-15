const User = require('../models/user.model.js');
const jwtHelper = require('../helper/jwt.helper');

const userService = {
  // Get all users
  getAllUsers: async () => {
    return await User.find({ active: true }).select('-password');
  },

  // Get user by ID
  getUserById: async (userId) => {
    return await User.findById(userId).select('-password');
  },

  // Create new user
  createUser: async (userData) => {
    // For local auth, ensure we have password
    if (userData.authProvider === 'local' && !userData.password) {
      throw new Error('Password is required for local authentication');
    }
    
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
      userData,
      { new: true, runValidators: true }
    ).select('-password');
  },

  // Delete user (soft delete)
  deleteUser: async (userId) => {
    return await User.findByIdAndUpdate(
      userId,
      { active: false },
      { new: true }
    );
  },

  // User login (local auth)
  loginUser: async (email, password) => {
    // Find user by email
    const user = await User.findOne({ email, active: true });
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // For local auth, check password
    if (user.authProvider === 'local') {
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        throw new Error('Invalid email or password');
      }
    } else {
      throw new Error(`Please login with your ${user.authProvider} account`);
    }

    // Update last login time
    user.lastLogin = new Date();
    await user.save();

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

  // OAuth login (Google, Facebook)
  oauthLogin: async (profile, provider) => {
    let user = await User.findOne({ email: profile.email });
    
    if (!user) {
      // Create new user if not exists
      user = new User({
        email: profile.email,
        name: profile.name,
        avatar: profile.picture || '',
        authProvider: provider
      });
    } else {
      // Update existing user if provider matches
      if (user.authProvider !== provider) {
        throw new Error(`This email is already registered with ${user.authProvider}`);
      }
      
      // Update profile information
      user.name = profile.name || user.name;
      user.avatar = profile.picture || user.avatar;
    }
    
    // Update last login
    user.lastLogin = new Date();
    await user.save();
    
    // Generate token
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

  // Change password (only for local auth)
  changePassword: async (userId, oldPassword, newPassword) => {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    if (user.authProvider !== 'local') {
      throw new Error(`Cannot change password for ${user.authProvider} authentication`);
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