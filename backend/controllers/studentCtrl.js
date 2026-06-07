const db = require('../config/db');

exports.registerStudent = async (req, res) => {
  const { admission_number, name, stream_id } = req.body;
  if (!admission_number || !name || !stream_id) {
    return res.status(400).json({ error: 'Missing required validation fields' });
  }
  try {
    const result = await db.query(
      'INSERT INTO students (admission_number, name, stream_id) VALUES ($1, $2, $3) RETURNING *',
      [admission_number, name, stream_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: 'Admission number must be completely unique.' });
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT students.*, streams.name AS stream_name 
      FROM students 
      LEFT JOIN streams ON students.stream_id = streams.id
      ORDER BY students.name ASC
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching student registry' });
  }
};

exports.getStudentsByStream = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM students WHERE stream_id = $1 ORDER BY name ASC', [req.params.streamId]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching stream list roster' });
  }
};

exports.getStudentDetails = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT students.*, streams.name AS stream_name 
      FROM students 
      LEFT JOIN streams ON students.stream_id = streams.id
      WHERE students.id = $1
    `, [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Student not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching profile details' });
  }
};

exports.updateStudent = async (req, res) => {
  const { name, admission_number, stream_id } = req.body;
  try {
    const result = await db.query(`
      UPDATE students 
      SET name = $1, admission_number = $2, stream_id = $3 
      WHERE id = $4 RETURNING *
    `, [name, admission_number, stream_id, req.params.id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: 'Failed to complete update operation.' });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    await db.query('DELETE FROM students WHERE id = $1', [req.params.id]);
    res.json({ message: 'Student successfully removed' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to destroy tracking artifact profile' });
  }
};