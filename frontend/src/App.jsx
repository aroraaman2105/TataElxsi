import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import RequirePersona from './components/RequirePersona';
import Landing from './pages/Landing';
import RoleHome from './pages/RoleHome';
import Dashboard from './pages/Dashboard';
import Assessments from './pages/Assessments';
import Sessions from './pages/Sessions';
import Settings from './pages/Settings';
import MasimScreening from './pages/MasimScreening';
import TherapyPlanning from './pages/TherapyPlanning';
import ParentDashboard from './pages/ParentDashboard';
import AgenticSystem from './pages/AgenticSystem';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route
        path="/dashboard"
        element={
          <RequirePersona>
            <Layout />
          </RequirePersona>
        }
      >
        <Route index element={<RoleHome />} />
        <Route path="masim" element={<MasimScreening />} />
        <Route path="therapy" element={<TherapyPlanning />} />
        <Route path="parent" element={<ParentDashboard />} />
        <Route path="agents" element={<AgenticSystem />} />
        <Route path="assessments" element={<Assessments />} />
        <Route path="sessions" element={<Sessions />} />
        <Route path="settings" element={<Settings />} />
        <Route path="overview" element={<Dashboard />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
