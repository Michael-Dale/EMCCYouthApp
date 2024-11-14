// src/db/models/sermon.js
const pool = require("../db");

const SermonModel = {
  async getAll() {
    try {
      const result = await pool.query("SELECT * FROM sermon ORDER BY id DESC");
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  async getLatest() {
    try {
      const result = await pool.query(
        "SELECT * FROM sermon ORDER BY id DESC LIMIT 1"
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  async getById(id) {
    try {
      const result = await pool.query("SELECT * FROM sermon WHERE id = $1", [id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  async create({ title, sermon_pdf_url, sermon_image_url }) {
    try {
      const result = await pool.query(
        "INSERT INTO sermon (title, sermon_pdf_url, sermon_image_url) VALUES ($1, $2, $3) RETURNING *",
        [title, sermon_pdf_url, sermon_image_url]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  async delete(id) {
    try {
      await pool.query("DELETE FROM sermon WHERE id = $1", [id]);
      return true;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = SermonModel;
