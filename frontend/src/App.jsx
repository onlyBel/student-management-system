import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Streams from './pages/Streams';
import Students from './pages/Students';
import Scores from './pages/Scores';
import Rankings from './pages/Rankings';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'streams': return <Streams />;
      case 'students': return <Students />;
      case 'scores': return <Scores />;
      case 'rankings': return <Rankings />;
      default: return <Dashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
}