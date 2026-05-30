import TherapyPlanning from './TherapyPlanning';

export default function TherapyPlannerPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold text-[var(--app-text-primary)]">Therapy Planner</h1>
        <p className="text-[var(--app-text-muted)] mt-1">Adaptive therapy plans tailored to each child</p>
      </div>
      <TherapyPlanning hideHeader />
    </div>
  );
}
