const API_BASE_URL = 'http://localhost:5000/api';

export const api = {
  getStreams: () => fetch(`${API_BASE_URL}/streams`).then(res => res.json()),
  createStream: (name) => fetch(`${API_BASE_URL}/streams`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  }).then(res => res.json()),
  getStreamDetails: (id) => fetch(`${API_BASE_URL}/streams/${id}`).then(res => res.json()),

  getStudents: () => fetch(`${API_BASE_URL}/students`).then(res => res.json()),
  getStudentsByStream: (streamId) => fetch(`${API_BASE_URL}/streams/${streamId}/students`).then(res => res.json()),
  getStudentDetails: (id) => fetch(`${API_BASE_URL}/students/${id}`).then(res => res.json()),
  registerStudent: (studentData) => fetch(`${API_BASE_URL}/students`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(studentData)
  }).then(res => res.json()),
  updateStudent: (id, data) => fetch(`${API_BASE_URL}/students/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json()),
  deleteStudent: (id) => fetch(`${API_BASE_URL}/students/${id}`, { method: 'DELETE' }).then(res => res.json()),

  getSubjects: () => fetch(`${API_BASE_URL}/subjects`).then(res => res.json()),
  createSubject: (name) => fetch(`${API_BASE_URL}/subjects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  }).then(res => res.json()),

  submitScores: (scoresData) => fetch(`${API_BASE_URL}/scores`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(scoresData)
  }).then(res => res.json()),

  getStreamRankings: (streamId) => fetch(`${API_BASE_URL}/reports/rankings/${streamId}`).then(res => res.json()),
  getReportCardUrl: (studentId) => `${API_BASE_URL}/reports/student/${studentId}/pdf`
};