const pool = require("../db");

const DevotionModel = {
  async getAll() {
    try {
      const result = await pool.query(
        "SELECT * FROM devotion ORDER BY devotion_datetime DESC"
      );
      return result.rows;
    } catch (error) {
      throw error;
    }
  },
  async getLatest() {
    try {
      const result = await pool.query(
        "SELECT * FROM devotion ORDER BY devotion_datetime DESC LIMIT 1"
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  async getById(id) {
    try {
      const result = await pool.query("SELECT * FROM devotion WHERE id = $1", [
        id,
      ]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  async create({ verse, devotion_datetime, message }) {
    try {
      const result = await pool.query(
        "INSERT INTO devotion (verse, devotion_datetime, message) VALUES ($1, $2, $3) RETURNING *",
        [verse, devotion_datetime, message]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  async update(id, { verse, devotion_datetime, message }) {
    try {
      const result = await pool.query(
        "UPDATE devotion SET verse = $1, devotion_datetime = $2, message = $3 WHERE id = $4 RETURNING *",
        [verse, devotion_datetime, message, id]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  async delete(id) {
    try {
      await pool.query("DELETE FROM devotion WHERE id = $1", [id]);
      return true;
    } catch (error) {
      throw error;
    }
  },
  
};

module.exports = DevotionModel;
