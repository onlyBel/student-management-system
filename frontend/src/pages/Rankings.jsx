import React, { useState, useEffect } from 'react';
import { api } from '../api';

export default function Rankings() {
  const [streams, setStreams] = useState([]);
  const [selectedStream, setSelectedStream] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    api.getStreams().then(setStreams).catch(console.error);
  }, []);

  const handleLoadRankings = () => {
    if (!selectedStream) return;
    api.getStreamRankings(selectedStream)
      .then(setLeaderboard)
      .catch(console.error);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex gap-4 items-end">
        <div className="w-56">
          <label className="block text-sm font-medium text-gray-700 mb-1">Target Class Stream</label>
          <select value={selectedStream} onChange={e => setSelectedStream(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm bg-white">
            <option value="">Choose Class...</option>
            {streams.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>
        <button onClick={handleLoadRankings} className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-1.5 px-4 rounded text-sm transition">
          Generate Rankings Ledger
        </button>
      </div>

      {leaderboard.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3 w-20">Position</th>
                <th className="px-6 py-3">Student Name</th>
                <th className="px-6 py-3">Total Score</th>
                <th className="px-6 py-3">Average Mark</th>
                <th className="px-6 py-3 text-right">Report Cards</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
              {leaderboard.map((record) => (
                <tr key={record.student_id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-bold text-indigo-600">#{record.position}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{record.name}</td>
                  <td className="px-6 py-4 font-mono">{record.totalMarks}</td>
                  <td className="px-6 py-4 font-mono">{Number(record.averageScore).toFixed(1)}%</td>
                  <td className="px-6 py-4 text-right">
                    <a 
                      href={api.getReportCardUrl(record.student_id)}
                      target="_blank"
                      rel="noreferrer" 
                      className="inline-block bg-gray-100 hover:bg-indigo-50 hover:text-indigo-600 border border-gray-200 rounded px-3 py-1 text-xs font-medium transition"
                    >
                      View Report Card
                    </a>
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