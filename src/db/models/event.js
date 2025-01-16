const pool = require("../db");

const EventModel = {
  async getAll() {
    try {
      const result = await pool.query(
        "SELECT * FROM event ORDER BY event_datetime DESC"
      );
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  async getUpcoming() {
    try {
      const result = await pool.query(
        // "SELECT * FROM event WHERE event_datetime >= NOW() ORDER BY event_datetime ASC"
        "SELECT * FROM event WHERE event_datetime >= NOW() ORDER BY event_datetime ASC LIMIT 3"
      );
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  async getById(id) {
    try {
      const result = await pool.query("SELECT * FROM event WHERE id = $1", [
        id,
      ]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  async create({ image_url, title, location, event_datetime }) {
    try {
      const result = await pool.query(
        "INSERT INTO event (image_url, title, location, event_datetime) VALUES ($1, $2, $3, $4) RETURNING *",
        [image_url, title, location, event_datetime]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  async update(id, { image_url, title, location, event_datetime }) {
    try {
      const result = await pool.query(
        "UPDATE event SET image_url = $1, title = $2, location = $3, event_datetime = $4 WHERE id = $5 RETURNING *",
        [image_url, title, location, event_datetime, id]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  async delete(id) {
    try {
      await pool.query("DELETE FROM event WHERE id = $1", [id]);
      return true;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = EventModel;
