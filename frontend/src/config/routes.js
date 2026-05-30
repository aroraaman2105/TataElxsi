const ICONS = {
  dashboard: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  preScreening: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z',
  aiTriage: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  progress: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
  appointments: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  patientQueue: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
  clinicalReview: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  diagnosis: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
  reports: 'M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z',
  assignedPatients: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
  therapyPlanner: 'M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
  progressTracker: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
  sessionNotes: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
  users: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
  analytics: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
  aiAgents: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  settings: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
  digitalTwin: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
  agenticAi: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
};

export const ROUTES = {
  DASHBOARD: '/dashboard',
  PRE_SCREENING: '/dashboard/pre-screening',
  AI_TRIAGE: '/dashboard/ai-triage',
  PROGRESS: '/dashboard/progress',
  APPOINTMENTS: '/dashboard/appointments',
  PATIENT_QUEUE: '/dashboard/patient-queue',
  CLINICAL_REVIEW: '/dashboard/clinical-review',
  DIAGNOSIS_SUPPORT: '/dashboard/diagnosis-support',
  REPORTS: '/dashboard/reports',
  ASSIGNED_PATIENTS: '/dashboard/assigned-patients',
  THERAPY_PLANNER: '/dashboard/therapy-planner',
  PROGRESS_TRACKER: '/dashboard/progress-tracker',
  SESSION_NOTES: '/dashboard/session-notes',
  USERS: '/dashboard/users',
  SYSTEM_ANALYTICS: '/dashboard/system-analytics',
  AI_AGENTS: '/dashboard/ai-agents',
  SETTINGS: '/dashboard/settings',
  DIGITAL_TWIN: '/dashboard/digital-twin',
  AGENTIC_AI: '/dashboard/agentic-ai',
};

export const ROLE_NAV = {
  parent: [
    { to: ROUTES.DASHBOARD, label: 'Dashboard', end: true, icon: ICONS.dashboard },
    { to: ROUTES.PRE_SCREENING, label: 'Pre-Screening', icon: ICONS.preScreening },
    { to: ROUTES.AI_TRIAGE, label: 'AI Triage Report', icon: ICONS.aiTriage },
    { to: ROUTES.PROGRESS, label: 'Progress Tracking', icon: ICONS.progress },
    { to: ROUTES.APPOINTMENTS, label: 'Appointments', icon: ICONS.appointments },
  ],
  doctor: [
    { to: ROUTES.DASHBOARD, label: 'Dashboard', end: true, icon: ICONS.dashboard },
    { to: ROUTES.PATIENT_QUEUE, label: 'Patient Queue', icon: ICONS.patientQueue },
    { to: ROUTES.CLINICAL_REVIEW, label: 'Clinical Review', icon: ICONS.clinicalReview },
    { to: ROUTES.DIAGNOSIS_SUPPORT, label: 'Diagnosis Support', icon: ICONS.diagnosis },
    { to: ROUTES.REPORTS, label: 'Reports', icon: ICONS.reports },
  ],
  therapist: [
    { to: ROUTES.DASHBOARD, label: 'Dashboard', end: true, icon: ICONS.dashboard },
    { to: ROUTES.ASSIGNED_PATIENTS, label: 'Assigned Patients', icon: ICONS.assignedPatients },
    { to: ROUTES.THERAPY_PLANNER, label: 'Therapy Planner', icon: ICONS.therapyPlanner },
    { to: ROUTES.PROGRESS_TRACKER, label: 'Progress Tracker', icon: ICONS.progressTracker },
    { to: ROUTES.SESSION_NOTES, label: 'Session Notes', icon: ICONS.sessionNotes },
  ],
  admin: [
    { to: ROUTES.DASHBOARD, label: 'Dashboard', end: true, icon: ICONS.dashboard },
    { to: ROUTES.USERS, label: 'Users', icon: ICONS.users },
    { to: ROUTES.SYSTEM_ANALYTICS, label: 'System Analytics', icon: ICONS.analytics },
    { to: ROUTES.AI_AGENTS, label: 'AI Agents', icon: ICONS.aiAgents },
    { to: ROUTES.SETTINGS, label: 'Settings', icon: ICONS.settings },
  ],
};

export const SHARED_NAV = [
  { to: ROUTES.DIGITAL_TWIN, label: 'Digital Twin', icon: ICONS.digitalTwin },
  { to: ROUTES.AGENTIC_AI, label: 'Agentic AI', icon: ICONS.agenticAi },
];

export function getNavSections(personaId) {
  return {
    main: ROLE_NAV[personaId] ?? ROLE_NAV.parent,
    shared: SHARED_NAV,
  };
}

export function getNavItemsForPersona(personaId) {
  const { main, shared } = getNavSections(personaId);
  return [...main, ...shared];
}

export function getAllowedRoutesForPersona(personaId) {
  const { main, shared } = getNavSections(personaId);
  return [...main, ...shared].map((item) => item.to);
}

export function isRouteAllowedForPersona(pathname, personaId) {
  const allowed = getAllowedRoutesForPersona(personaId);
  return allowed.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

export function getPersonaHomeRoute() {
  return ROUTES.DASHBOARD;
}

export function isNavActive(pathname, item) {
  if (item.end) return pathname === item.to;
  return pathname === item.to || pathname.startsWith(`${item.to}/`);
}
