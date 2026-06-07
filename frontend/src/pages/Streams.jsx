import React, { useState, useEffect } from 'react';
import { api } from '../api';

export default function Streams() {
  const [streams, setStreams] = useState([]);
  const [newStreamName, setNewStreamName] = useState('');
  const [selectedStreamDetails, setSelectedStreamDetails] = useState(null);

  useEffect(() => {
    loadStreams();
  }, []);

  const loadStreams = () => {
    api.getStreams().then(setStreams).catch(console.error);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newStreamName.trim()) return;
    api.createStream(newStreamName)
      .then(() => {
        setNewStreamName('');
        loadStreams();
      })
      .catch(console.error);
  };

  const handleViewDetails = (id) => {
    api.getStreamDetails(id)
      .then(setSelectedStreamDetails)
      .catch(console.error);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-1 space-y-6">
        <form onSubmit={handleCreate} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Create New Stream</h3>
          <input 
            type="text" 
            placeholder="e.g., Form 1C" 
            value={newStreamName}
            onChange={e => setNewStreamName(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 text-sm mb-3 focus:outline-indigo-500"
          />
          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm py-1.5 rounded font-medium">
            Save Stream
          </button>
        </form>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-gray-50 px-4 py-2 text-xs font-bold text-gray-500 uppercase border-b">All Streams</div>
          <ul className="divide-y divide-gray-100">
            {streams.map(s => (
              <li key={s.id} className="p-3 flex justify-between items-center hover:bg-gray-50">
                <span className="font-medium text-gray-900">{s.name}</span>
                <button onClick={() => handleViewDetails(s.id)} className="text-xs text-indigo-600 hover:underline">
                  View Roster
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="md:col-span-2">
        {selectedStreamDetails ? (
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-gray-900 border-b pb-2">
              Class Roster: {selectedStreamDetails.name}
            </h2>
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b bg-gray-50 text-gray-600 text-xs uppercase font-semibold">
                  <th className="p-2">Adm Number</th>
                  <th className="p-2">Student Name</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {selectedStreamDetails.students?.map(st => (
                  <tr key={st.id}>
                    <td className="p-2 font-mono text-xs">{st.admission_number}</td>
                    <td className="p-2">{st.name}</td>
                  </tr>
                ))}
                {selectedStreamDetails.students?.length === 0 && (
                  <tr>
                    <td colSpan="2" className="text-center py-4 text-gray-400 text-xs">No students inside this class stream.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="h-full border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center p-12 text-gray-400 text-sm">
            Select a class stream to inspect single detailed listings.
          </div>
        )}
      </div>
    </div>
  );
}