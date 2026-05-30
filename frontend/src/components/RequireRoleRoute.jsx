import { Navigate, useLocation } from 'react-router-dom';
import { usePersona } from '../context/PersonaContext';
import { getPersonaHomeRoute, isRouteAllowedForPersona } from '../config/routes';

export default function RequireRoleRoute({ children }) {
  const { persona } = usePersona();
  const location = useLocation();

  if (!isRouteAllowedForPersona(location.pathname, persona)) {
    return <Navigate to={getPersonaHomeRoute(persona)} replace />;
  }

  return children;
}
