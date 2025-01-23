const pool = require("../db");

const ImageCarouselModel = {
  async getAll() {
    try {
      const result = await pool.query("SELECT * FROM image_carousel ORDER BY id ASC");
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  async getById(id) {
    try {
      const result = await pool.query("SELECT * FROM image_carousel WHERE id = $1", [id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  async create({ image_url }) {
    try {
      const result = await pool.query(
        "INSERT INTO image_carousel (image_url) VALUES ($1) RETURNING *",
        [image_url]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  async update(id, { image_url }) {
    try {
      const result = await pool.query(
        "UPDATE image_carousel SET image_url = $1 WHERE id = $2 RETURNING *",
        [image_url, id]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  async delete(id) {
    try {
      await pool.query("DELETE FROM image_carousel WHERE id = $1", [id]);
      return true;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = ImageCarouselModel;