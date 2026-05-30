import PageHeader from '../components/PageHeader';

const patients = [
  { name: 'Emma L.', plan: 'Speech + Social', sessions: '3/wk', progress: '+12%' },
  { name: 'Noah K.', plan: 'Motor skills', sessions: '2/wk', progress: '+8%' },
  { name: 'Sophia M.', plan: 'ABA + Speech', sessions: '4/wk', progress: '+5%' },
];

export default function AssignedPatients() {
  return (
    <div className="space-y-6">
      <PageHeader title="Assigned Patients" subtitle="Your active therapy caseload" />
      <ul className="space-y-3">
        {patients.map((p) => (
          <li key={p.name} className="theme-list-row flex flex-wrap items-center gap-4 py-4 px-4 rounded-lg">
            <span className="font-medium text-[var(--app-text-primary)] w-28">{p.name}</span>
            <span className="text-sm text-[var(--app-text-muted)]">{p.plan}</span>
            <span className="text-sm text-[var(--app-text-muted)]">{p.sessions}</span>
            <span className="ml-auto text-sm text-[#00ffcc] font-medium">{p.progress}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
