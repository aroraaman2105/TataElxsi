import PageHeader from '../components/PageHeader';
import Dashboard from './Dashboard';

export default function SystemAnalytics() {
  return (
    <div className="space-y-6">
      <PageHeader title="System Analytics" subtitle="Platform usage, screening volume, and health metrics" />
      <Dashboard />
    </div>
  );
}
