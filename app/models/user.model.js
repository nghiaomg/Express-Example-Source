const bcrypt = require('bcrypt');
const { pool } = require('../config/database');

class User {
  constructor(data) {
    this.id = data.id;
    this.username = data.username;
    this.email = data.email;
    this.password = data.password;
    this.isActive = data.isActive;
    this.lastLogin = data.lastLogin;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  // Create a new user
  static async create(userData) {
    try {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const [result] = await pool.query(
        'INSERT INTO users (username, email, password, isActive) VALUES (?, ?, ?, ?)',
        [userData.username, userData.email, hashedPassword, true]
      );
      
      const [user] = await pool.query('SELECT * FROM users WHERE id = ?', [result.insertId]);
      return new User(user[0]);
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  // Find user by ID
  static async findById(id) {
    try {
      const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
      return rows[0] ? new User(rows[0]) : null;
    } catch (error) {
      throw new Error(`Error finding user: ${error.message}`);
    }
  }

  // Find user by email
  static async findByEmail(email) {
    try {
      const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
      return rows[0] ? new User(rows[0]) : null;
    } catch (error) {
      throw new Error(`Error finding user: ${error.message}`);
    }
  }

  // Find user by username
  static async findByUsername(username) {
    try {
      const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
      return rows[0] ? new User(rows[0]) : null;
    } catch (error) {
      throw new Error(`Error finding user: ${error.message}`);
    }
  }

  // Update user
  async update(updateData) {
    try {
      const updates = [];
      const values = [];

      Object.keys(updateData).forEach(key => {
        if (key !== 'id' && key !== 'password') {
          updates.push(`${key} = ?`);
          values.push(updateData[key]);
        }
      });

      if (updateData.password) {
        updates.push('password = ?');
        values.push(await bcrypt.hash(updateData.password, 10));
      }

      values.push(this.id);

      await pool.query(
        `UPDATE users SET ${updates.join(', ')} WHERE id = ?`,
        values
      );

      const [updated] = await pool.query('SELECT * FROM users WHERE id = ?', [this.id]);
      Object.assign(this, updated[0]);
      return this;
    } catch (error) {
      throw new Error(`Error updating user: ${error.message}`);
    }
  }

  // Delete user
  async delete() {
    try {
      await pool.query('DELETE FROM users WHERE id = ?', [this.id]);
      return true;
    } catch (error) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
  }

  // Compare password
  async comparePassword(candidatePassword) {
    try {
      return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
      throw new Error(`Error comparing password: ${error.message}`);
    }
  }

  // Update last login
  async updateLastLogin() {
    try {
      await pool.query(
        'UPDATE users SET lastLogin = CURRENT_TIMESTAMP WHERE id = ?',
        [this.id]
      );
      this.lastLogin = new Date();
    } catch (error) {
      throw new Error(`Error updating last login: ${error.message}`);
    }
  }

  // Get public profile (exclude sensitive data)
  toPublicJSON() {
    const { password, ...publicData } = this;
    return publicData;
  }

  // Find all users with pagination
  static async findAll({ page = 1, limit = 10, isActive = null } = {}) {
    try {
      const offset = (page - 1) * limit;
      let query = 'SELECT * FROM users';
      const values = [];

      if (isActive !== null) {
        query += ' WHERE isActive = ?';
        values.push(isActive);
      }

      query += ' ORDER BY createdAt DESC LIMIT ? OFFSET ?';
      values.push(limit, offset);

      const [rows] = await pool.query(query, values);
      const [countResult] = await pool.query('SELECT COUNT(*) as total FROM users');
      
      return {
        users: rows.map(row => new User(row)),
        total: countResult[0].total,
        page,
        totalPages: Math.ceil(countResult[0].total / limit)
      };
    } catch (error) {
      throw new Error(`Error finding users: ${error.message}`);
    }
  }
}

module.exports = User; 