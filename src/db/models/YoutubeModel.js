const pool = require("../db");

const YoutubeModel = {
  // Fetch all YouTube data from the database
  async getAll() {
    try {
      const result = await pool.query("SELECT * FROM youtube_component");
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  // Fetch the latest YouTube video from the database
  async getLatest() {
    try {
      const result = await pool.query(
        "SELECT * FROM youtube_component ORDER BY id DESC LIMIT 1"
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Insert a new YouTube video into the database
  async create({ title, thumbnail_url, video_link }) {
    try {
      const result = await pool.query(
        "INSERT INTO youtube_component (title, thumbnail_url, video_link) VALUES ($1, $2, $3) RETURNING *",
        [title, thumbnail_url, video_link]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Update an existing YouTube video entry in the database
  async update(id, { title, thumbnail_url, video_link }) {
    try {
      const result = await pool.query(
        "UPDATE youtube_component SET title = $1, thumbnail_url = $2, video_link = $3 WHERE id = $4 RETURNING *",
        [title, thumbnail_url, video_link, id]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Delete a YouTube video from the database
  async delete(id) {
    try {
      await pool.query("DELETE FROM youtube_component WHERE id = $1", [id]);
      return true;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = YoutubeModel;
