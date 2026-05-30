import PageHeader from '../components/PageHeader';

const users = [
  { name: 'Dr. Sarah Chen', role: 'Doctor', status: 'Active' },
  { name: 'Maria Lopez', role: 'Therapist', status: 'Active' },
  { name: 'James Parent', role: 'Parent', status: 'Active' },
  { name: 'Admin User', role: 'Administrator', status: 'Active' },
];

export default function Users() {
  return (
    <div className="space-y-6">
      <PageHeader title="Users" subtitle="Platform users and role assignments" />
      <div className="glass-card rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-[var(--app-text-muted)] border-b border-[var(--app-border)]">
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Role</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="text-[var(--app-text-secondary)]">
            {users.map((u) => (
              <tr key={u.name} className="border-b border-[var(--app-border)] last:border-0">
                <td className="px-5 py-3">{u.name}</td>
                <td className="px-5 py-3">{u.role}</td>
                <td className="px-5 py-3">
                  <span className="status-pill status-pill-success">{u.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
