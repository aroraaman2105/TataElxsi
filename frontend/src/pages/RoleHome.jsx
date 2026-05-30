import { Navigate } from 'react-router-dom';
import { usePersona } from '../context/PersonaContext';
import { getPersonaHomeRoute } from '../config/routes';

export default function RoleHome() {
  const { persona } = usePersona();
  return <Navigate to={getPersonaHomeRoute(persona)} replace />;
}
