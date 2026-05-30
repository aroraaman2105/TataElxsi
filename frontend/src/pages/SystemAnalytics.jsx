import Dashboard from './Dashboard';

export default function SystemAnalytics() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold text-[var(--app-text-primary)]">System Analytics</h1>
        <p className="text-[var(--app-text-muted)] mt-1">Platform-wide usage, engagement, and caseload metrics</p>
      </div>
      <Dashboard hideHeader />
    </div>
  );
}
