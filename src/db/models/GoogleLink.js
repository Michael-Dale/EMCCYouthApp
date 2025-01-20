const pool = require("../db");

const FormLinkModel = {
  // Fetch all form links from the database
  async getAll() {
    try {
      const result = await pool.query("SELECT * FROM form_link");
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  // Fetch the latest form link from the database
  async getLatest() {
    try {
      const result = await pool.query(
        "SELECT * FROM form_link ORDER BY id DESC LIMIT 1"
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Insert a new form link into the database
  async create({ title, description, form_link, form_image_url }) {
    try {
      const result = await pool.query(
        "INSERT INTO form_link (title, description, form_link, form_image_url) VALUES ($1, $2, $3, $4) RETURNING *",
        [title, description, form_link, form_image_url]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Update an existing form link in the database
  async update(id, { title, description, form_link, form_image_url }) {
    try {
      const result = await pool.query(
        "UPDATE form_link SET title = $1, description = $2, form_link = $3, form_image_url = $4 WHERE id = $5 RETURNING *",
        [title, description, form_link, form_image_url, id]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Fetch a form link by ID
async getById(id) {
    try {
      const result = await pool.query("SELECT * FROM form_link WHERE id = $1", [id]);
      return result.rows[0]; // Return the first matching record
    } catch (error) {
      throw error; // Propagate the error for debugging
    }
  },
  

  // Delete a form link from the database
  async delete(id) {
    try {
      await pool.query("DELETE FROM form_link WHERE id = $1", [id]);
      return true;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = FormLinkModel;
