import React, { useState, useEffect } from 'react';
import { api } from '../api';

export default function Scores() {
  const [streams, setStreams] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedStream, setSelectedStream] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState({});

  useEffect(() => {
    api.getStreams().then(setStreams).catch(console.error);
    api.getSubjects().then(setSubjects).catch(console.error);
  }, []);

  const handleFetchStudents = () => {
    if (!selectedStream || !selectedSubject) return;
    api.getStudentsByStream(selectedStream).then(data => {
      setStudents(data);
      const initialMarks = {};
      data.forEach(s => {
        initialMarks[s.id] = { ca_score: '', exam_score: '' };
      });
      setMarks(initialMarks);
    }).catch(console.error);
  };

  const handleInputChange = (studentId, field, value) => {
    setMarks({
      ...marks,
      [studentId]: { ...marks[studentId], [field]: value }
    });
  };

  const handleSaveScore = (studentId) => {
    const payload = {
      student_id: studentId,
      subject_id: selectedSubject,
      ca_score: parseFloat(marks[studentId].ca_score) || 0,
      exam_score: parseFloat(marks[studentId].exam_score) || 0
    };

    api.submitScores(payload)
      .then(() => alert('Score entry logged successfully!'))
      .catch(err => alert('Constraint bounds violation. Max values check: CA 30, Exam 70.'));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-wrap gap-4 items-end">
        <div className="w-48">
          <label className="block text-sm font-medium text-gray-700 mb-1">Target Class</label>
          <select value={selectedStream} onChange={e => setSelectedStream(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm bg-white">
            <option value="">Choose...</option>
            {streams.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>
        <div className="w-48">
          <label className="block text-sm font-medium text-gray-700 mb-1">Subject Assessment</label>
          <select value={selectedSubject} onChange={e => setSelectedSubject(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm bg-white">
            <option value="">Choose...</option>
            {subjects.map(sub => <option key={sub.id} value={sub.id}>{sub.name}</option>)}
          </select>
        </div>
        <button onClick={handleFetchStudents} className="bg-slate-800 hover:bg-slate-900 text-white font-medium py-1.5 px-4 rounded text-sm transition">
          Load Grading Roster
        </button>
      </div>

      {students.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase">
              <tr>
                <th className="px-6 py-3">Student Name</th>
                <th className="px-6 py-3 w-32">CA Score (30)</th>
                <th className="px-6 py-3 w-32">Exam Score (70)</th>
                <th className="px-6 py-3 w-24">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm">
              {students.map((student) => (
                <tr key={student.id}>
                  <td className="px-6 py-4 font-medium text-gray-900">{student.name}</td>
                  <td className="px-6 py-4">
                    <input 
                      type="number" 
                      placeholder="Max 30"
                      value={marks[student.id]?.ca_score || ''}
                      onChange={e => handleInputChange(student.id, 'ca_score', e.target.value)}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-indigo-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input 
                      type="number" 
                      placeholder="Max 70"
                      value={marks[student.id]?.exam_score || ''}
                      onChange={e => handleInputChange(student.id, 'exam_score', e.target.value)}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-indigo-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => handleSaveScore(student.id)} className="text-indigo-600 hover:text-indigo-900 font-medium text-sm">
                      Submit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}