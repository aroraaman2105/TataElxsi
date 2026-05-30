import PageHeader from '../components/PageHeader';
import ExplainableAIPanel from '../components/masim/ExplainableAIPanel';

export default function AITriageReport() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Triage Report"
        subtitle="Screening summary and specialist referral recommendation"
      />
      <div className="glass-card p-5 rounded-xl border-l-4 border-l-[#00ffcc]">
        <p className="text-xs uppercase tracking-wider text-[#00ffcc] font-semibold mb-1">Recommendation</p>
        <p className="text-[var(--app-text-primary)] font-medium">Refer to pediatric neurologist within 2 weeks</p>
        <p className="text-sm text-[var(--app-text-muted)] mt-2">
          Moderate risk signals across video and EEG modalities. Early specialist review advised.
        </p>
      </div>
      <ExplainableAIPanel />
    </div>
  );
}
