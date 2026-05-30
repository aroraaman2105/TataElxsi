import PageHeader from '../components/PageHeader';
import DigitalDevelopmentalTwin from '../components/masim/DigitalDevelopmentalTwin';

export default function ProgressTracker() {
  return (
    <div className="space-y-6">
      <PageHeader title="Progress Tracker" subtitle="Patient developmental progress over time" />
      <DigitalDevelopmentalTwin />
    </div>
  );
}
