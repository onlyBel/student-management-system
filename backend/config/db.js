const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/ikonex_db',
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};