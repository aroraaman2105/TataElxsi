import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Assessments from './pages/Assessments';
import Sessions from './pages/Sessions';
import Settings from './pages/Settings';
import MasimScreening from './pages/MasimScreening';
import TherapyPlanning from './pages/TherapyPlanning';
import ParentDashboard from './pages/ParentDashboard';
import AgenticSystem from './pages/AgenticSystem';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/dashboard" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="masim" element={<MasimScreening />} />
        <Route path="therapy" element={<TherapyPlanning />} />
        <Route path="parent" element={<ParentDashboard />} />
        <Route path="agents" element={<AgenticSystem />} />
        <Route path="assessments" element={<Assessments />} />
        <Route path="sessions" element={<Sessions />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
