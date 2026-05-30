import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import RequirePersona from './components/RequirePersona';
import ProtectedPage, { LegacyRedirect } from './components/ProtectedPage';
import Landing from './pages/Landing';
import RoleDashboard from './pages/RoleDashboard';
import MasimScreening from './pages/MasimScreening';
import TherapyPlanning from './pages/TherapyPlanning';
import AgenticSystem from './pages/AgenticSystem';
import Settings from './pages/Settings';
import AITriageReport from './pages/AITriageReport';
import ProgressTracking from './pages/ProgressTracking';
import Appointments from './pages/Appointments';
import PatientQueue from './pages/PatientQueue';
import ClinicalReview from './pages/ClinicalReview';
import DiagnosisSupport from './pages/DiagnosisSupport';
import Reports from './pages/Reports';
import AssignedPatients from './pages/AssignedPatients';
import ProgressTracker from './pages/ProgressTracker';
import SessionNotes from './pages/SessionNotes';
import Users from './pages/Users';
import SystemAnalytics from './pages/SystemAnalytics';
import DigitalTwinPage from './pages/DigitalTwinPage';

function P({ children }) {
  return <ProtectedPage>{children}</ProtectedPage>;
}

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
        <Route index element={<P><RoleDashboard /></P>} />

        {/* Parent */}
        <Route path="pre-screening" element={<P><MasimScreening /></P>} />
        <Route path="ai-triage" element={<P><AITriageReport /></P>} />
        <Route path="progress" element={<P><ProgressTracking /></P>} />
        <Route path="appointments" element={<P><Appointments /></P>} />

        {/* Doctor */}
        <Route path="patient-queue" element={<P><PatientQueue /></P>} />
        <Route path="clinical-review" element={<P><ClinicalReview /></P>} />
        <Route path="diagnosis-support" element={<P><DiagnosisSupport /></P>} />
        <Route path="reports" element={<P><Reports /></P>} />

        {/* Therapist */}
        <Route path="assigned-patients" element={<P><AssignedPatients /></P>} />
        <Route path="therapy-planner" element={<P><TherapyPlanning /></P>} />
        <Route path="progress-tracker" element={<P><ProgressTracker /></P>} />
        <Route path="session-notes" element={<P><SessionNotes /></P>} />

        {/* Admin */}
        <Route path="users" element={<P><Users /></P>} />
        <Route path="system-analytics" element={<P><SystemAnalytics /></P>} />
        <Route path="ai-agents" element={<P><AgenticSystem /></P>} />
        <Route path="settings" element={<P><Settings /></P>} />

        {/* Shared */}
        <Route path="digital-twin" element={<P><DigitalTwinPage /></P>} />
        <Route path="agentic-ai" element={<P><AgenticSystem /></P>} />

        {/* Legacy redirects */}
        <Route path="masim" element={<LegacyRedirect />} />
        <Route path="therapy" element={<LegacyRedirect />} />
        <Route path="parent" element={<LegacyRedirect />} />
        <Route path="agents" element={<LegacyRedirect />} />
        <Route path="assessments" element={<LegacyRedirect />} />
        <Route path="sessions" element={<LegacyRedirect />} />
        <Route path="overview" element={<LegacyRedirect />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
