import { usePersona } from '../context/PersonaContext';
import { PERSONA_IDS } from '../config/personas';
import Dashboard from './Dashboard';
import ParentDashboard from './ParentDashboard';
import TherapyPlanning from './TherapyPlanning';

export default function RoleDashboard() {
  const { persona } = usePersona();

  if (persona === PERSONA_IDS.parent) {
    return <ParentDashboard />;
  }

  if (persona === PERSONA_IDS.therapist) {
    return <TherapyPlanning />;
  }

  return <Dashboard />;
}
