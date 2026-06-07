const db = require('../config/db');

exports.createSubject = async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Subject name is required' });
  try {
    const result = await db.query('INSERT INTO subjects (name) VALUES ($1) RETURNING *', [name]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: 'Subject names must be unique' });
  }
};

exports.getAllSubjects = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM subjects ORDER BY name ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error running subjects lookup' });
  }
};