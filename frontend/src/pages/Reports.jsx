import PageHeader from '../components/PageHeader';

const reports = [
  { title: 'Screening Summary — Emma L.', date: 'Mar 17, 2025', type: 'PDF' },
  { title: 'XAI Evidence Pack — Noah K.', date: 'Mar 16, 2025', type: 'PDF' },
  { title: 'Visit Summary — Sophia M.', date: 'Mar 15, 2025', type: 'PDF' },
];

export default function Reports() {
  return (
    <div className="space-y-6">
      <PageHeader title="Reports" subtitle="Clinical and screening report exports" />
      <ul className="space-y-3">
        {reports.map((r) => (
          <li key={r.title} className="theme-list-row flex items-center justify-between py-4 px-4 rounded-lg">
            <div>
              <p className="font-medium text-[var(--app-text-primary)]">{r.title}</p>
              <p className="text-sm text-[var(--app-text-muted)]">{r.date}</p>
            </div>
            <button type="button" className="text-sm text-[var(--accent-primary)] hover:underline">
              Download {r.type}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
