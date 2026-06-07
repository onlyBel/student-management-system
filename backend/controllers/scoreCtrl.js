const db = require('../config/db');

exports.submitScore = async (req, res) => {
  const { student_id, subject_id, ca_score, exam_score } = req.body;
  const ca = parseFloat(ca_score) || 0;
  const exam = parseFloat(exam_score) || 0;

  if (ca < 0 || ca > 30 || exam < 0 || exam > 70) {
    return res.status(400).json({ error: 'Scores bounds violated: CA max 30, Exam max 70' });
  }

  try {
    const result = await db.query(`
      INSERT INTO scores (student_id, subject_id, ca_score, exam_score)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (student_id, subject_id) 
      DO UPDATE SET ca_score = EXCLUDED.ca_score, exam_score = EXCLUDED.exam_score
      RETURNING *
    `, [student_id, subject_id, ca, exam]);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to record entry score verification sequence' });
  }
};