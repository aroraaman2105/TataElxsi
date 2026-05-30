import { motion } from 'framer-motion';
import Button from '../components/design-system/Button';

const USERS = [
  { id: 1, name: 'Dr. Sarah Chen', role: 'Doctor', email: 's.chen@clinic.org', status: 'Active' },
  { id: 2, name: 'Maria Lopez', role: 'Therapist', email: 'm.lopez@clinic.org', status: 'Active' },
  { id: 3, name: 'James Park', role: 'Parent', email: 'j.park@email.com', status: 'Active' },
  { id: 4, name: 'Admin User', role: 'Administrator', email: 'admin@telport.ai', status: 'Active' },
];

export default function Users() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-semibold text-[var(--app-text-primary)]">Users</h1>
          <p className="text-[var(--app-text-muted)] mt-1">Manage platform users and roles</p>
        </div>
        <Button>Add user</Button>
      </motion.div>

      <div className="glass-card p-6 rounded-xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[var(--app-text-muted)] border-b border-[var(--app-border)]">
              <th className="pb-3 font-medium">Name</th>
              <th className="pb-3 font-medium">Role</th>
              <th className="pb-3 font-medium">Email</th>
              <th className="pb-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {USERS.map((user) => (
              <tr key={user.id} className="border-b border-[var(--app-border)] last:border-0">
                <td className="py-3 text-[var(--app-text-primary)]">{user.name}</td>
                <td className="py-3 text-[var(--app-text-muted)]">{user.role}</td>
                <td className="py-3 text-[var(--app-text-muted)]">{user.email}</td>
                <td className="py-3">
                  <span className="status-pill status-pill-success">{user.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
