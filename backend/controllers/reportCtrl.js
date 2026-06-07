const db = require('../config/db');

function calculateGrade(score) {
  if (score >= 80) return 'A';
  if (score >= 70) return 'B';
  if (score >= 60) return 'C';
  if (score >= 50) return 'D';
  return 'E/F';
}

exports.getStreamRankings = async (req, res) => {
  const { streamId } = req.params;
  try {
    const studentsRes = await db.query('SELECT id, name FROM students WHERE stream_id = $1', [streamId]);
    const students = studentsRes.rows;
    if (students.length === 0) return res.json([]);

    const scoresRes = await db.query(`
      SELECT student_id, subject_id, total_score 
      FROM scores 
      WHERE student_id IN (SELECT id FROM students WHERE stream_id = $1)
    `, [streamId]);
    const allScores = scoresRes.rows;

    const leaderboard = students.map(student => {
      const studentScores = allScores.filter(s => s.student_id === student.id);
      const totalMarks = studentScores.reduce((sum, s) => sum + parseFloat(s.total_score || 0), 0);
      const averageScore = studentScores.length > 0 ? totalMarks / studentScores.length : 0;
      return {
        student_id: student.id,
        name: student.name,
        totalMarks: totalMarks,
        averageScore: averageScore,
        subjectsCount: studentScores.length
      };
    });

    leaderboard.sort((a, b) => b.totalMarks - a.totalMarks);

    let position = 1;
    const rankedLeaderboard = leaderboard.map((record, index) => {
      if (index > 0 && record.totalMarks < leaderboard[index - 1].totalMarks) {
        position = index + 1;
      }
      return { ...record, position };
    });

    res.json(rankedLeaderboard);
  } catch (err) {
    res.status(500).json({ error: 'Failed to process ranking algorithms calculation pipeline' });
  }
};

exports.getStudentReportCard = async (req, res) => {
  const { studentId } = req.params;
  try {
    const studentInfo = await db.query(`
      SELECT s.*, st.name as stream_name 
      FROM students s JOIN streams st ON s.stream_id = st.id WHERE s.id = $1
    `, [studentId]);
    if (studentInfo.rows.length === 0) return res.status(404).send('Student record data completely missing');

    const scoresInfo = await db.query(`
      SELECT s.*, sub.name as subject_name FROM scores s 
      JOIN subjects sub ON s.subject_id = sub.id WHERE s.student_id = $1
    `, [studentId]);

    const student = studentInfo.rows[0];
    
    let htmlOutput = `
      <html>
        <head>
          <title>Report Card - ${student.name}</title>
          <style>
            body { font-family: sans-serif; padding: 40px; color: #333; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
            th { background-color: #f5f5f5; }
            .header { text-align: center; margin-bottom: 30px; }
            @media print { .no-print { display: none; } }
          </style>
        </head>
        <body>
          <button class="no-print" onclick="window.print()" style="margin-bottom: 20px; padding: 8px 16px; background:#4f46e5; color:white; border:none; border-radius:4px; cursor:pointer;">Print Report Card</button>
          <div class="header">
            <h2>IKONEX ACADEMY OFFICIAL REPORT CARD</h2>
            <p><strong>Name:</strong> ${student.name} | <strong>Adm:</strong> ${student.admission_number} | <strong>Class:</strong> ${student.stream_name}</p>
          </div>
          <table>
            <thead>
              <tr><th>Subject</th><th>CA Score (30)</th><th>Exam Score (70)</th><th>Total (100)</th><th>Grade</th></tr>
            </thead>
            <tbody>
    `;

    scoresInfo.rows.forEach(row => {
      htmlOutput += `
        <tr>
          <td>${row.subject_name}</td>
          <td>${row.ca_score}</td>
          <td>${row.exam_score}</td>
          <td>${row.total_score}</td>
          <td><strong>${calculateGrade(row.total_score)}</strong></td>
        </tr>
      `;
    });

    htmlOutput += `</tbody></table></body></html>`;
    res.send(htmlOutput);
  } catch (err) {
    res.status(500).send('Error generating printable asset artifact window.');
  }
};