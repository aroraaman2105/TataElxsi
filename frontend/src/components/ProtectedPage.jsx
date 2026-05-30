import RequireRoleRoute from './RequireRoleRoute';

export default function ProtectedPage({ children }) {
  return <RequireRoleRoute>{children}</RequireRoleRoute>;
}
