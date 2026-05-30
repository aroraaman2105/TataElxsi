import { usePersona } from '../context/PersonaContext';
import { PERSONA_IDS } from '../config/personas';
import ParentDashboard from './ParentDashboard';
import Dashboard from './Dashboard';
import TherapistHome from './TherapistHome';

export default function RoleDashboard() {
  const { persona } = usePersona();

  switch (persona) {
    case PERSONA_IDS.parent:
      return <ParentDashboard />;
    case PERSONA_IDS.doctor:
      return <Dashboard />;
    case PERSONA_IDS.therapist:
      return <TherapistHome />;
    case PERSONA_IDS.admin:
      return <Dashboard />;
    default:
      return <ParentDashboard />;
  }
}
