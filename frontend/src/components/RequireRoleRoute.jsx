import { Navigate, useLocation } from 'react-router-dom';
import { usePersona } from '../context/PersonaContext';
import { getPersonaHomeRoute, isRouteAllowedForPersona } from '../config/routes';

export default function RequireRoleRoute({ children }) {
  const { persona } = usePersona();
  const location = useLocation();

  if (!isRouteAllowedForPersona(persona, location.pathname)) {
    return <Navigate to={getPersonaHomeRoute(persona)} replace state={{ denied: location.pathname }} />;
  }

  return children;
}
