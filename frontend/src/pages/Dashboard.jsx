import React, { useState, useEffect } from 'react';
import { api } from '../api';

export default function Dashboard() {
  const [stats, setStats] = useState({ students: 0, streams: 0, subjects: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([api.getStudents(), api.getStreams(), api.getSubjects()])
      .then(([students, streams, subjects]) => {
        console.log('Data loaded:', { students, streams, subjects });
        setStats({
          students: students.length || 0,
          streams: streams.length || 0,
          subjects: subjects.length || 0
        });
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading metrics dashboard:", err);
        setError(`Failed to connect to backend. Error: ${err.message}. Check browser console for details.`);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-800">Ikonex Academy - Student Management System</h2>
        <p className="text-gray-600 mt-1">Dashboard Overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500 uppercase">Enrolled Students</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{stats.students}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500 uppercase">Active Streams</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{stats.streams}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500 uppercase">Tracked Subjects</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{stats.subjects}</p>
        </div>
      </div>

      {stats.students === 0 && stats.streams === 0 && stats.subjects === 0 && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded">
          <p className="font-medium">No data found</p>
          <p className="text-sm mt-1">Backend may not be connected to database. Check browser console (F12) for API errors.</p>
        </div>
      )}
    </div>
  );
}