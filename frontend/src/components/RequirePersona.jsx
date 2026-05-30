import { Navigate, useLocation } from 'react-router-dom';
import { usePersona } from '../context/PersonaContext';

export default function RequirePersona({ children }) {
  const { isAuthenticated } = usePersona();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/" replace state={{ from: location.pathname }} />;
  }

  return children;
}
