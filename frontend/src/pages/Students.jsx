import React, { useState, useEffect } from 'react';
import { api } from '../api';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [streams, setStreams] = useState([]);
  const [formData, setFormData] = useState({ name: '', admission_number: '', stream_id: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    Promise.all([
      api.getStudents(),
      api.getStreams()
    ])
      .then(([studentsData, streamsData]) => {
        setStudents(studentsData);
        setStreams(streamsData);
      })
      .catch(err => {
        console.error('Error loading data:', err);
        alert('Failed to load data. Please check if backend is running.');
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.admission_number || !formData.stream_id) return;
    
    if (editingId) {
      api.updateStudent(editingId, formData)
        .then(() => {
          setEditingId(null);
          setFormData({ name: '', admission_number: '', stream_id: '' });
          loadData();
        }).catch(console.error);
    } else {
      api.registerStudent(formData)
        .then(() => {
          setFormData({ name: '', admission_number: '', stream_id: '' });
          loadData();
        }).catch(console.error);
    }
  };

  const handleEditInit = (student) => {
    setEditingId(student.id);
    setFormData({
      name: student.name,
      admission_number: student.admission_number,
      stream_id: student.stream_id || ''
    });
  };

  const handleDelete = (id) => {
    if (!window.confirm('Confirm deletion of student profile record?')) return;
    api.deleteStudent(id).then(() => loadData()).catch(console.error);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Student Full Name</label>
          <input 
            type="text" 
            value={formData.name} 
            onChange={e => setFormData({...formData, name: e.target.value})} 
            className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-indigo-500"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Admission Index No</label>
          <input 
            type="text" 
            value={formData.admission_number} 
            onChange={e => setFormData({...formData, admission_number: e.target.value})} 
            className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-indigo-500"
            placeholder="IKX-2026-001"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Class Assignment</label>
          <select 
            value={formData.stream_id} 
            onChange={e => setFormData({...formData, stream_id: e.target.value})} 
            className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm bg-white focus:outline-indigo-500"
          >
            <option value="">Select Target Class...</option>
            {streams.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>
        <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-1.5 px-4 rounded text-sm transition shadow-sm">
          {editingId ? 'Update Record' : 'Register Student'}
        </button>
      </form>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3">Adm Number</th>
              <th className="px-6 py-3">Full Name</th>
              <th className="px-6 py-3">Class Stream</th>
              <th className="px-6 py-3 text-right">Actions Management</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="px-6 py-3.5 font-mono text-xs">{student.admission_number}</td>
                <td className="px-6 py-3.5 font-medium text-gray-900">{student.name}</td>
                <td className="px-6 py-3.5 text-gray-500">{student.stream_name || 'Unassigned'}</td>
                <td className="px-6 py-3.5 text-right space-x-3">
                  <button onClick={() => handleEditInit(student)} className="text-indigo-600 hover:text-indigo-900 font-medium text-xs">Edit</button>
                  <button onClick={() => handleDelete(student.id)} className="text-rose-600 hover:text-rose-900 font-medium text-xs">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}