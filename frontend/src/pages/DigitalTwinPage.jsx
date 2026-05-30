import PageHeader from '../components/PageHeader';
import DigitalDevelopmentalTwin from '../components/masim/DigitalDevelopmentalTwin';

export default function DigitalTwinPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Digital Twin"
        subtitle="Developmental trajectory — expected vs actual progress with risk forecasting"
      />
      <DigitalDevelopmentalTwin />
    </div>
  );
}
