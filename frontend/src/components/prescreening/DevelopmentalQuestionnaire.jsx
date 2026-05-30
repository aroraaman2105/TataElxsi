import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Button, ProgressBar } from '../design-system';
import {
  CATEGORIES,
  QUESTIONS,
  isQuestionnaireComplete,
  buildQuestionnaireSummary,
} from './questionnaireData';

function RadioQuestion({ question, value, onChange }) {
  return (
    <fieldset className="space-y-2">
      <legend className="sr-only">{question.text}</legend>
      {question.options.map((opt) => (
        <label
          key={opt.value}
          className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
            value === opt.value
              ? 'bg-[var(--accent-primary-muted)] border-[var(--accent-primary)]'
              : 'bg-[var(--app-surface)] border-[var(--app-border)] hover:border-[color-mix(in_srgb,var(--accent-primary)_25%,var(--app-border))]'
          }`}
        >
          <input
            type="radio"
            name={question.id}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
            className="mt-0.5 accent-[var(--accent-primary)]"
          />
          <span className="text-sm text-[var(--app-text-primary)]">{opt.label}</span>
        </label>
      ))}
    </fieldset>
  );
}

function ChoiceQuestion({ question, value, onChange }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {question.options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`text-left p-3 rounded-xl border text-sm transition-colors ${
            value === opt.value
              ? 'bg-[var(--accent-primary-muted)] border-[var(--accent-primary)] text-[var(--accent-primary)] font-medium'
              : 'bg-[var(--app-surface)] border-[var(--app-border)] text-[var(--app-text-primary)] hover:border-[color-mix(in_srgb,var(--accent-primary)_25%,var(--app-border))]'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function SliderQuestion({ question, value, onChange }) {
  const current = value ?? question.defaultValue ?? question.min;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm">
        <span className="text-[var(--app-text-muted)]">{question.minLabel}</span>
        <span className="font-semibold text-[var(--accent-primary)] tabular-nums text-lg">{current}</span>
        <span className="text-[var(--app-text-muted)]">{question.maxLabel}</span>
      </div>
      <input
        type="range"
        min={question.min}
        max={question.max}
        step={1}
        value={current}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[var(--accent-primary)] h-2 rounded-full cursor-pointer"
      />
      <div className="flex justify-between text-[10px] text-[var(--app-text-muted)] px-0.5">
        {Array.from({ length: question.max - question.min + 1 }, (_, i) => question.min + i).map((n) => (
          <span key={n}>{n}</span>
        ))}
      </div>
    </div>
  );
}

function QuestionBlock({ question, value, onChange, index }) {
  const renderInput = () => {
    if (question.type === 'radio') {
      return <RadioQuestion question={question} value={value} onChange={onChange} />;
    }
    if (question.type === 'choice') {
      return <ChoiceQuestion question={question} value={value} onChange={onChange} />;
    }
    return <SliderQuestion question={question} value={value} onChange={onChange} />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      className="theme-list-row rounded-xl p-4 sm:p-5"
    >
      <p className="text-sm font-medium text-[var(--app-text-primary)] mb-4">{question.text}</p>
      {renderInput()}
    </motion.div>
  );
}

function CategorySection({ category, questions, answers, onAnswer, startIndex }) {
  const answered = questions.filter((q) => answers[q.id] !== undefined && answers[q.id] !== '').length;

  return (
    <section className="space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-[var(--app-text-primary)]">{category.title}</h3>
          <p className="text-xs text-[var(--app-text-muted)] mt-0.5">{category.description}</p>
        </div>
        <span className="text-xs text-[var(--app-text-muted)] shrink-0 tabular-nums">
          {answered}/{questions.length}
        </span>
      </div>
      <div className="space-y-3">
        {questions.map((q, i) => (
          <QuestionBlock
            key={q.id}
            question={q}
            value={answers[q.id]}
            onChange={(val) => onAnswer(q.id, val)}
            index={startIndex + i}
          />
        ))}
      </div>
    </section>
  );
}

function RiskScoreBadge({ score, level }) {
  const toneClass =
    level.tone === 'success'
      ? 'border-[var(--accent-success)] bg-[color-mix(in_srgb,var(--accent-success)_10%,var(--app-surface))] text-[var(--accent-success)]'
      : level.tone === 'warning'
        ? 'border-[color-mix(in_srgb,#d97706_50%,var(--app-border))] bg-[color-mix(in_srgb,#d97706_8%,var(--app-surface))] text-[#d97706]'
        : 'border-[var(--accent-primary)] bg-[var(--accent-primary-muted)] text-[var(--accent-primary)]';

  return (
    <div className={`rounded-2xl border p-6 text-center ${toneClass}`}>
      <p className="text-xs uppercase tracking-wider font-semibold opacity-80">Behavioral Risk Score</p>
      <p className="text-5xl font-bold tabular-nums my-2">{score}</p>
      <p className="text-sm font-semibold">{level.label}</p>
      <p className="text-xs mt-2 opacity-90 max-w-sm mx-auto leading-relaxed">{level.description}</p>
    </div>
  );
}

function SummaryView({ summary, onEdit, onSubmit, submitting }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-muted)] p-4 sm:p-5">
        <h3 className="text-lg font-semibold text-[var(--app-text-primary)]">Questionnaire summary</h3>
        <p className="text-sm text-[var(--app-text-muted)] mt-1">
          Review your answers before submitting. This helps your care team prepare for your visit.
        </p>
      </div>

      <RiskScoreBadge score={summary.risk.overall} level={summary.level} />

      <div className="space-y-4">
        {summary.responses.map((category) => (
          <div
            key={category.id}
            className="rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)] overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-[var(--app-border)] bg-[var(--app-surface-muted)] flex items-center justify-between gap-3">
              <h4 className="text-sm font-semibold text-[var(--app-text-primary)]">{category.title}</h4>
              <span className="text-xs font-medium text-[var(--app-text-muted)] tabular-nums">
                Category score: {category.score}
              </span>
            </div>
            <ul className="divide-y divide-[var(--app-border)]">
              {category.items.map((item) => (
                <li key={item.id} className="px-4 py-3">
                  <p className="text-xs text-[var(--app-text-muted)]">{item.question}</p>
                  <p className="text-sm text-[var(--app-text-primary)] font-medium mt-1">{item.answer}</p>
                </li>
              ))}
            </ul>
            <div className="px-4 py-2 border-t border-[var(--app-border)]">
              <ProgressBar value={category.score} showLabel={false} height="sm" />
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-end pt-2">
        <Button variant="secondary" onClick={onEdit}>
          Edit answers
        </Button>
        <Button onClick={onSubmit} disabled={submitting}>
          {submitting ? 'Submitting…' : 'Submit questionnaire'}
        </Button>
      </div>
    </motion.div>
  );
}

export default function DevelopmentalQuestionnaire({ answers, onChange, submitted, onSubmit }) {
  const [view, setView] = useState(submitted ? 'done' : 'form');
  const [submitting, setSubmitting] = useState(false);

  const complete = isQuestionnaireComplete(answers);
  const answeredCount = QUESTIONS.filter((q) => answers[q.id] !== undefined && answers[q.id] !== '').length;
  const progress = Math.round((answeredCount / QUESTIONS.length) * 100);

  const summary = useMemo(() => (complete ? buildQuestionnaireSummary(answers) : null), [answers, complete]);

  const handleAnswer = (id, value) => {
    onChange({ ...answers, [id]: value });
  };

  const handleReview = () => {
    if (complete) setView('summary');
  };

  const handleSubmit = async () => {
    if (!summary) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 400));
    onSubmit({
      answers,
      riskScore: summary.risk.overall,
      riskLevel: summary.level.label,
      categoryScores: summary.risk.categories,
      summary,
    });
    setSubmitting(false);
    setView('done');
  };

  if (view === 'done' || submitted) {
    const result = summary ?? buildQuestionnaireSummary(answers);
    return (
      <div className="space-y-4">
        <div className="rounded-xl border border-[color-mix(in_srgb,var(--accent-success)_30%,var(--app-border))] bg-[color-mix(in_srgb,var(--accent-success)_8%,var(--app-surface))] p-5">
          <p className="text-sm font-semibold text-[var(--app-text-primary)]">Questionnaire submitted</p>
          <p className="text-sm text-[var(--app-text-muted)] mt-1">
            Behavioral Risk Score: <span className="font-semibold text-[var(--app-text-primary)]">{result.risk.overall}</span>
            {' '}· {result.level.label}
          </p>
        </div>
        <RiskScoreBadge score={result.risk.overall} level={result.level} />
      </div>
    );
  }

  if (view === 'summary' && summary) {
    return (
      <SummaryView
        summary={summary}
        onEdit={() => setView('form')}
        onSubmit={handleSubmit}
        submitting={submitting}
      />
    );
  }

  let questionIndex = 0;

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-muted)] p-4">
        <div className="flex items-center justify-between gap-3 mb-2">
          <p className="text-sm font-medium text-[var(--app-text-primary)]">Developmental screening questionnaire</p>
          <span className="text-xs text-[var(--app-text-muted)] tabular-nums">
            {answeredCount}/{QUESTIONS.length} answered
          </span>
        </div>
        <ProgressBar value={progress} showLabel={false} height="sm" />
        <p className="text-xs text-[var(--app-text-muted)] mt-2">
          Answer based on everyday behavior over the past few weeks. There are no right or wrong answers.
        </p>
      </div>

      <div className="space-y-8">
        {CATEGORIES.map((category) => {
          const categoryQuestions = QUESTIONS.filter((q) => q.categoryId === category.id);
          const start = questionIndex;
          questionIndex += categoryQuestions.length;
          return (
            <CategorySection
              key={category.id}
              category={category}
              questions={categoryQuestions}
              answers={answers}
              onAnswer={handleAnswer}
              startIndex={start}
            />
          );
        })}
      </div>

      <div className="flex justify-end pt-2">
        <Button onClick={handleReview} disabled={!complete}>
          Review summary
        </Button>
      </div>
    </div>
  );
}

export { isQuestionnaireComplete, buildQuestionnaireSummary };
