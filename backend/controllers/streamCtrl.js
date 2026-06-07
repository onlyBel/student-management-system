const db = require('../config/db');

exports.createStream = async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Stream name is required' });
  try {
    const result = await db.query('INSERT INTO streams (name) VALUES ($1) RETURNING *', [name]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: 'Stream name must be unique' });
  }
};

exports.getAllStreams = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM streams ORDER BY name ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching streams' });
  }
};

exports.getStreamDetails = async (req, res) => {
  try {
    const stream = await db.query('SELECT * FROM streams WHERE id = $1', [req.params.id]);
    if (stream.rows.length === 0) return res.status(404).json({ error: 'Stream not found' });
    const students = await db.query('SELECT id, name, admission_number FROM students WHERE stream_id = $1 ORDER BY name ASC', [req.params.id]);
    res.json({ ...stream.rows[0], students: students.rows });
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching stream details' });
  }
};