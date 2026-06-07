import React from 'react';

export default function Layout({ children, activeTab, setActiveTab }) {
  const menus = [
    { id: 'dashboard', label: 'Dashboard Overview' },
    { id: 'streams', label: 'Class Streams Management' },
    { id: 'students', label: 'Student Directory Database' },
    { id: 'scores', label: 'Score Entries Board' },
    { id: 'rankings', label: 'Performance Leaderboards' }
  ];

  return (
    <div className="flex h-screen bg-gray-100 font-sans text-gray-800">
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-5 text-xl font-bold border-b border-slate-800 tracking-wide text-indigo-400">
          Ikonex Academy
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {menus.map((menu) => (
            <button
              key={menu.id}
              onClick={() => setActiveTab(menu.id)}
              className={`w-full text-left px-4 py-2.5 rounded transition-all text-sm font-medium ${
                activeTab === menu.id 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'text-gray-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {menu.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-800 text-xs text-gray-500">
          Technical Evaluation Build
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-y-auto">
        <header className="bg-white border-b border-gray-200 h-16 flex items-center px-8 shadow-sm">
          <h1 className="text-xl font-semibold text-gray-800 capitalize">
            {activeTab.replace('-', ' ')}
          </h1>
        </header>
        <div className="p-8 max-w-7xl w-full mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}