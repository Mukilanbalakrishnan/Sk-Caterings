const pool = require('../config/db');

const ServiceModel = {
  // Get all services
  getAllServices: async () => {
    const result = await pool.query('SELECT * FROM services ORDER BY id ASC');
    return result.rows;
  },

  // Get a single service by ID
  getServiceById: async (id) => {
    const result = await pool.query('SELECT * FROM services WHERE id = $1', [id]);
    return result.rows[0];
  },

  // Create a new service
  createService: async (id, title, description, image, icon) => {
    const query = `
      INSERT INTO services (id, title, description, image, icon)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const values = [id, title, description, image, icon];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  // Update an existing service
  updateService: async (id, title, description, image, icon) => {
    const query = `
      UPDATE services 
      SET title = $1, description = $2, image = $3, icon = $4
      WHERE id = $5
      RETURNING *
    `;
    const values = [title, description, image, icon, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  // Delete a service
  deleteService: async (id) => {
    const query = 'DELETE FROM services WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
};

module.exports = ServiceModel;