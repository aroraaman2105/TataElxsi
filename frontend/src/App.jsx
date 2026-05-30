import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/Layout';

import RequirePersona from './components/RequirePersona';

import ProtectedPage from './components/ProtectedPage';

import Landing from './pages/Landing';

import RoleHome from './pages/RoleHome';

import RoleDashboard from './pages/RoleDashboard';

import PreScreeningHub from './pages/PreScreeningHub';
import MasimScreening from './pages/MasimScreening';
import AITriageReport from './pages/AITriageReport';

import ProgressTracking from './pages/ProgressTracking';

import Appointments from './pages/Appointments';

import PatientQueue from './pages/PatientQueue';

import ClinicalReview from './pages/ClinicalReview';

import DiagnosisSupport from './pages/DiagnosisSupport';
import AIEvaluation from './pages/AIEvaluation';
import Reports from './pages/Reports';

import AssignedPatients from './pages/AssignedPatients';

import TherapyPlannerPage from './pages/TherapyPlannerPage';

import ProgressTracker from './pages/ProgressTracker';

import SessionNotes from './pages/SessionNotes';

import Users from './pages/Users';

import SystemAnalytics from './pages/SystemAnalytics';

import AIAgentsPage from './pages/AIAgentsPage';

import Settings from './pages/Settings';

import DigitalTwinPage from './pages/DigitalTwinPage';

import AgenticSystem from './pages/AgenticSystem';



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



        <Route path="pre-screening" element={<P><PreScreeningHub /></P>} />

        <Route path="ai-triage" element={<P><AITriageReport /></P>} />

        <Route path="progress" element={<P><ProgressTracking /></P>} />

        <Route path="appointments" element={<P><Appointments /></P>} />



        <Route path="patient-queue" element={<P><PatientQueue /></P>} />

        <Route path="clinical-review" element={<P><ClinicalReview /></P>} />

        <Route path="diagnosis-support" element={<P><DiagnosisSupport /></P>} />
        <Route path="ai-insights" element={<P><AIEvaluation /></P>} />
        <Route path="reports" element={<P><Reports /></P>} />



        <Route path="assigned-patients" element={<P><AssignedPatients /></P>} />

        <Route path="therapy-planner" element={<P><TherapyPlannerPage /></P>} />

        <Route path="progress-tracker" element={<P><ProgressTracker /></P>} />

        <Route path="session-notes" element={<P><SessionNotes /></P>} />



        <Route path="users" element={<P><Users /></P>} />

        <Route path="system-analytics" element={<P><SystemAnalytics /></P>} />

        <Route path="ai-agents" element={<P><AIAgentsPage /></P>} />

        <Route path="settings" element={<P><Settings /></P>} />



        <Route path="digital-twin" element={<P><DigitalTwinPage /></P>} />

        <Route path="agentic-ai" element={<P><AgenticSystem /></P>} />



        {/* Legacy route redirects */}
        <Route path="masim" element={<P><MasimScreening /></P>} />
        <Route path="therapy" element={<Navigate to="/dashboard" replace />} />

        <Route path="parent" element={<Navigate to="/dashboard" replace />} />

        <Route path="agents" element={<Navigate to="/dashboard/agentic-ai" replace />} />

        <Route path="assessments" element={<Navigate to="/dashboard" replace />} />

        <Route path="sessions" element={<Navigate to="/dashboard" replace />} />

      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>

  );

}

