const jwt = require('jsonwebtoken');

/**
 * JWT Helper for token generation and verification
 */
const jwtHelper = {
  /**
   * Generate JWT token
   * @param {Object} payload - Data to be encoded in the token
   * @param {String} expiresIn - Token expiration time (e.g., '1d', '1h')
   * @returns {String} JWT token
   */
  generateToken: (payload, expiresIn = '1d') => {
    return jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn }
    );
  },

  /**
   * Verify JWT token
   * @param {String} token - JWT token to verify
   * @returns {Object} Decoded token payload
   * @throws {Error} If token is invalid or expired
   */
  verifyToken: (token) => {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  },

  /**
   * Decode JWT token without verification
   * @param {String} token - JWT token to decode
   * @returns {Object|null} Decoded token payload or null if invalid
   */
  decodeToken: (token) => {
    return jwt.decode(token);
  }
};

module.exports = jwtHelper;