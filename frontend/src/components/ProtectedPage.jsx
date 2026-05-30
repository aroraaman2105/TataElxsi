import { Navigate } from 'react-router-dom';
import RequireRoleRoute from './RequireRoleRoute';

export default function ProtectedPage({ children }) {
  return <RequireRoleRoute>{children}</RequireRoleRoute>;
}

/** Redirect legacy dashboard paths to home */
export function LegacyRedirect() {
  return <Navigate to="/dashboard" replace />;
}
