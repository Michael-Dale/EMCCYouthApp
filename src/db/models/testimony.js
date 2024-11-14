const pool = require("../db");

const TestimonyModel = {
  // Get all testimonies
  async getAll() {
    try {
      const result = await pool.query("SELECT * FROM testimony ORDER BY post_datetime DESC");
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  // Get the latest testimony
  async getLatest() {
    try {
      const result = await pool.query(
        "SELECT * FROM testimony ORDER BY post_datetime DESC LIMIT 1"
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Get a testimony by ID
  async getById(id) {
    try {
      const result = await pool.query("SELECT * FROM testimony WHERE id = $1", [id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Create a new testimony
  async create({ author, post_datetime, title, message }) {
    try {
      const result = await pool.query(
        "INSERT INTO testimony (author, post_datetime, title, message) VALUES ($1, $2, $3, $4) RETURNING *",
        [author, post_datetime, title, message]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Delete a testimony by ID
  async delete(id) {
    try {
      await pool.query("DELETE FROM testimony WHERE id = $1", [id]);
      return true;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = TestimonyModel;
