import { PERSONA_IDS } from './personas';

export const ROUTES = {
  dashboard: '/dashboard',
  preScreening: '/dashboard/pre-screening',
  aiTriage: '/dashboard/ai-triage',
  progress: '/dashboard/progress',
  appointments: '/dashboard/appointments',
  patientQueue: '/dashboard/patient-queue',
  clinicalReview: '/dashboard/clinical-review',
  diagnosisSupport: '/dashboard/diagnosis-support',
  reports: '/dashboard/reports',
  assignedPatients: '/dashboard/assigned-patients',
  therapyPlanner: '/dashboard/therapy-planner',
  progressTracker: '/dashboard/progress-tracker',
  sessionNotes: '/dashboard/session-notes',
  users: '/dashboard/users',
  systemAnalytics: '/dashboard/system-analytics',
  aiAgents: '/dashboard/ai-agents',
  settings: '/dashboard/settings',
  digitalTwin: '/dashboard/digital-twin',
  agenticAi: '/dashboard/agentic-ai',
};

const ICONS = {
  dashboard: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  screening: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z',
  triage: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
  progress: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
  calendar: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  queue: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
  review: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  diagnosis: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
  reports: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  patients: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
  planner: 'M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
  notes: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
  users: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
  analytics: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
  agents: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  settings: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
  twin: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4',
  agentic: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
};

export const SHARED_NAV = [
  { to: ROUTES.digitalTwin, label: 'Digital Twin', icon: ICONS.twin, section: 'shared' },
  { to: ROUTES.agenticAi, label: 'Agentic AI', icon: ICONS.agentic, section: 'shared' },
];

const ROLE_NAV = {
  [PERSONA_IDS.parent]: [
    { to: ROUTES.dashboard, label: 'Dashboard', end: true, icon: ICONS.dashboard, section: 'main' },
    { to: ROUTES.preScreening, label: 'Pre-Screening', icon: ICONS.screening, section: 'main' },
    { to: ROUTES.aiTriage, label: 'AI Triage Report', icon: ICONS.triage, section: 'main' },
    { to: ROUTES.progress, label: 'Progress Tracking', icon: ICONS.progress, section: 'main' },
    { to: ROUTES.appointments, label: 'Appointments', icon: ICONS.calendar, section: 'main' },
  ],
  [PERSONA_IDS.doctor]: [
    { to: ROUTES.dashboard, label: 'Dashboard', end: true, icon: ICONS.dashboard, section: 'main' },
    { to: ROUTES.patientQueue, label: 'Patient Queue', icon: ICONS.queue, section: 'main' },
    { to: ROUTES.clinicalReview, label: 'Clinical Review', icon: ICONS.review, section: 'main' },
    { to: ROUTES.diagnosisSupport, label: 'Diagnosis Support', icon: ICONS.diagnosis, section: 'main' },
    { to: ROUTES.reports, label: 'Reports', icon: ICONS.reports, section: 'main' },
  ],
  [PERSONA_IDS.therapist]: [
    { to: ROUTES.dashboard, label: 'Dashboard', end: true, icon: ICONS.dashboard, section: 'main' },
    { to: ROUTES.assignedPatients, label: 'Assigned Patients', icon: ICONS.patients, section: 'main' },
    { to: ROUTES.therapyPlanner, label: 'Therapy Planner', icon: ICONS.planner, section: 'main' },
    { to: ROUTES.progressTracker, label: 'Progress Tracker', icon: ICONS.progress, section: 'main' },
    { to: ROUTES.sessionNotes, label: 'Session Notes', icon: ICONS.notes, section: 'main' },
  ],
  [PERSONA_IDS.admin]: [
    { to: ROUTES.dashboard, label: 'Dashboard', end: true, icon: ICONS.dashboard, section: 'main' },
    { to: ROUTES.users, label: 'Users', icon: ICONS.users, section: 'main' },
    { to: ROUTES.systemAnalytics, label: 'System Analytics', icon: ICONS.analytics, section: 'main' },
    { to: ROUTES.aiAgents, label: 'AI Agents', icon: ICONS.agents, section: 'main' },
    { to: ROUTES.settings, label: 'Settings', icon: ICONS.settings, section: 'main' },
  ],
};

export const ROLE_ROUTE_ACCESS = {
  [PERSONA_IDS.parent]: [
    ROUTES.dashboard,
    ROUTES.preScreening,
    ROUTES.aiTriage,
    ROUTES.progress,
    ROUTES.appointments,
    ROUTES.digitalTwin,
    ROUTES.agenticAi,
  ],
  [PERSONA_IDS.doctor]: [
    ROUTES.dashboard,
    ROUTES.patientQueue,
    ROUTES.clinicalReview,
    ROUTES.diagnosisSupport,
    ROUTES.reports,
    ROUTES.digitalTwin,
    ROUTES.agenticAi,
  ],
  [PERSONA_IDS.therapist]: [
    ROUTES.dashboard,
    ROUTES.assignedPatients,
    ROUTES.therapyPlanner,
    ROUTES.progressTracker,
    ROUTES.sessionNotes,
    ROUTES.digitalTwin,
    ROUTES.agenticAi,
  ],
  [PERSONA_IDS.admin]: [
    ROUTES.dashboard,
    ROUTES.users,
    ROUTES.systemAnalytics,
    ROUTES.aiAgents,
    ROUTES.settings,
    ROUTES.digitalTwin,
    ROUTES.agenticAi,
  ],
};

export function getNavItemsForPersona(personaId) {
  const roleNav = ROLE_NAV[personaId] ?? ROLE_NAV[PERSONA_IDS.parent];
  const seen = new Set(roleNav.map((item) => item.to));
  const shared = SHARED_NAV.filter((item) => !seen.has(item.to));
  return [...roleNav, ...shared];
}

export function getPersonaHomeRoute(personaId) {
  return ROUTES.dashboard;
}

export function isRouteAllowedForPersona(personaId, pathname) {
  const allowed = ROLE_ROUTE_ACCESS[personaId];
  if (!allowed) return false;
  if (allowed.includes(pathname)) return true;
  return allowed.some(
    (route) => route !== ROUTES.dashboard && pathname.startsWith(`${route}/`)
  );
}

export function getNavSections(personaId) {
  const items = getNavItemsForPersona(personaId);
  return {
    main: items.filter((i) => i.section === 'main'),
    shared: items.filter((i) => i.section === 'shared'),
  };
}

export function isNavActive(pathname, item) {
  if (item.end) return pathname === item.to;
  return pathname === item.to || pathname.startsWith(`${item.to}/`);
}
