import PageHeader from '../components/PageHeader';
import ExplainableAIPanel from '../components/masim/ExplainableAIPanel';

export default function ClinicalReview() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Clinical Review"
        subtitle="Multimodal screening evidence and explainable AI findings"
      />
      <ExplainableAIPanel />
    </div>
  );
}
