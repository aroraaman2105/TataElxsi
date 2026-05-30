export const CATEGORIES = [
  {
    id: 'eye_contact',
    title: 'Eye Contact',
    description: 'How your child connects visually during play and conversation',
  },
  {
    id: 'speech_development',
    title: 'Speech Development',
    description: 'Words, phrases, and communication progress',
  },
  {
    id: 'social_interaction',
    title: 'Social Interaction',
    description: 'Interest in people, peers, and shared activities',
  },
  {
    id: 'motor_coordination',
    title: 'Motor Coordination',
    description: 'Movement, balance, and physical play skills',
  },
  {
    id: 'sensory_sensitivity',
    title: 'Sensory Sensitivity',
    description: 'Reactions to sounds, textures, and bright environments',
  },
  {
    id: 'response_to_name',
    title: 'Response to Name',
    description: 'How your child reacts when you call their name',
  },
];

export const QUESTIONS = [
  {
    id: 'eye_contact_frequency',
    categoryId: 'eye_contact',
    type: 'radio',
    text: 'During play or conversation, how often does your child make eye contact with you?',
    options: [
      { value: 'always', label: 'Always or almost always', risk: 5 },
      { value: 'often', label: 'Often', risk: 20 },
      { value: 'sometimes', label: 'Sometimes', risk: 45 },
      { value: 'rarely', label: 'Rarely', risk: 70 },
      { value: 'never', label: 'Almost never', risk: 90 },
    ],
  },
  {
    id: 'eye_contact_shared',
    categoryId: 'eye_contact',
    type: 'choice',
    text: 'When you point at something interesting, does your child look where you are pointing?',
    options: [
      { value: 'yes_consistently', label: 'Yes, most of the time', risk: 5 },
      { value: 'sometimes', label: 'Sometimes', risk: 40 },
      { value: 'rarely', label: 'Rarely', risk: 75 },
      { value: 'not_yet', label: 'Not yet / unsure', risk: 55 },
    ],
  },
  {
    id: 'speech_level',
    categoryId: 'speech_development',
    type: 'choice',
    text: 'Which best describes your child\'s speech right now?',
    options: [
      { value: 'sentences', label: 'Uses sentences or long phrases', risk: 5 },
      { value: 'phrases', label: 'Uses short phrases (2–3 words)', risk: 20 },
      { value: 'words', label: 'Uses single words', risk: 50 },
      { value: 'sounds', label: 'Mostly sounds, not clear words', risk: 75 },
      { value: 'minimal', label: 'Very little or no speech yet', risk: 90 },
    ],
  },
  {
    id: 'speech_progress',
    categoryId: 'speech_development',
    type: 'radio',
    text: 'Compared to a few months ago, how is speech changing?',
    options: [
      { value: 'clear_progress', label: 'Clear progress', risk: 10 },
      { value: 'some_progress', label: 'Some progress', risk: 30 },
      { value: 'little_change', label: 'Little change', risk: 55 },
      { value: 'regression', label: 'Seems to have lost words or skills', risk: 85 },
    ],
  },
  {
    id: 'social_peers',
    categoryId: 'social_interaction',
    type: 'radio',
    text: 'Does your child show interest in other children?',
    options: [
      { value: 'yes_regularly', label: 'Yes, regularly', risk: 10 },
      { value: 'sometimes', label: 'Sometimes', risk: 35 },
      { value: 'rarely', label: 'Rarely', risk: 65 },
      { value: 'not_yet', label: 'Not yet', risk: 50 },
    ],
  },
  {
    id: 'social_play',
    categoryId: 'social_interaction',
    type: 'choice',
    text: 'During play, your child most often…',
    options: [
      { value: 'shared', label: 'Enjoys shared or turn-taking play', risk: 10 },
      { value: 'parallel', label: 'Plays near others but not with them', risk: 40 },
      { value: 'solo', label: 'Prefers playing alone', risk: 55 },
      { value: 'avoidance', label: 'Avoids social play when possible', risk: 80 },
    ],
  },
  {
    id: 'motor_coordination',
    categoryId: 'motor_coordination',
    type: 'slider',
    text: 'How would you rate your child\'s coordination during movement and play?',
    min: 1,
    max: 10,
    minLabel: 'Needs a lot of support',
    maxLabel: 'Very coordinated',
    defaultValue: 5,
  },
  {
    id: 'motor_fine',
    categoryId: 'motor_coordination',
    type: 'radio',
    text: 'How are fine motor tasks (holding crayons, stacking blocks)?',
    options: [
      { value: 'age_appropriate', label: 'Age-appropriate', risk: 10 },
      { value: 'slightly_delayed', label: 'Slightly behind peers', risk: 40 },
      { value: 'noticeably_delayed', label: 'Noticeably delayed', risk: 70 },
      { value: 'very_difficult', label: 'Very difficult for them', risk: 85 },
    ],
  },
  {
    id: 'sensory_reaction',
    categoryId: 'sensory_sensitivity',
    type: 'choice',
    text: 'How does your child react to loud sounds, bright lights, or certain textures?',
    options: [
      { value: 'no_issues', label: 'No unusual issues', risk: 10 },
      { value: 'mild', label: 'Mild discomfort sometimes', risk: 35 },
      { value: 'often_upset', label: 'Often upset or overwhelmed', risk: 70 },
      { value: 'very_distressed', label: 'Very distressed or avoids situations', risk: 90 },
    ],
  },
  {
    id: 'sensory_seeking',
    categoryId: 'sensory_sensitivity',
    type: 'slider',
    text: 'How sensitive is your child to everyday sensory input (noise, touch, light)?',
    min: 1,
    max: 10,
    minLabel: 'Not sensitive',
    maxLabel: 'Very sensitive',
    defaultValue: 5,
  },
  {
    id: 'name_response',
    categoryId: 'response_to_name',
    type: 'radio',
    text: 'When you call your child\'s name, they usually…',
    options: [
      { value: 'always', label: 'Turn and look right away', risk: 5 },
      { value: 'usually', label: 'Respond most of the time', risk: 20 },
      { value: 'sometimes', label: 'Respond sometimes', risk: 50 },
      { value: 'rarely', label: 'Rarely respond', risk: 75 },
      { value: 'never', label: 'Almost never respond', risk: 90 },
    ],
  },
  {
    id: 'name_distraction',
    categoryId: 'response_to_name',
    type: 'choice',
    text: 'If the TV or music is on, does your child still respond to their name?',
    options: [
      { value: 'yes', label: 'Yes, usually', risk: 10 },
      { value: 'sometimes', label: 'Sometimes', risk: 45 },
      { value: 'rarely', label: 'Rarely', risk: 70 },
      { value: 'no', label: 'No, not really', risk: 85 },
    ],
  },
];

function sliderToRisk(value, min, max, invertSensitivity = false) {
  const normalized = (Number(value) - min) / (max - min);
  const risk = invertSensitivity ? normalized * 100 : (1 - normalized) * 100;
  return Math.round(Math.min(100, Math.max(0, risk)));
}

function getQuestionRisk(question, answer) {
  if (answer === undefined || answer === null || answer === '') return null;

  if (question.type === 'slider') {
    const invert = question.id === 'sensory_seeking';
    return sliderToRisk(answer, question.min, question.max, invert);
  }

  const option = question.options.find((opt) => opt.value === answer);
  return option?.risk ?? null;
}

function getAnswerLabel(question, answer) {
  if (question.type === 'slider') {
    return `${answer} / ${question.max}`;
  }
  return question.options.find((opt) => opt.value === answer)?.label ?? '—';
}

export function isQuestionnaireComplete(answers) {
  return QUESTIONS.every((q) => {
    const val = answers[q.id];
    return val !== undefined && val !== null && val !== '';
  });
}

export function calculateRiskScore(answers) {
  const categoryScores = CATEGORIES.map((category) => {
    const categoryQuestions = QUESTIONS.filter((q) => q.categoryId === category.id);
    const risks = categoryQuestions
      .map((q) => getQuestionRisk(q, answers[q.id]))
      .filter((r) => r !== null);

    const score =
      risks.length > 0 ? Math.round(risks.reduce((sum, r) => sum + r, 0) / risks.length) : 0;

    return { ...category, score };
  });

  const overall =
    categoryScores.length > 0
      ? Math.round(categoryScores.reduce((sum, c) => sum + c.score, 0) / categoryScores.length)
      : 0;

  return { overall, categories: categoryScores };
}

export function getRiskLevel(score) {
  if (score <= 33) {
    return { label: 'Low concern', tone: 'success', description: 'Responses suggest typical patterns for now. Continue routine check-ins.' };
  }
  if (score <= 66) {
    return { label: 'Moderate concern', tone: 'info', description: 'Some areas may benefit from closer follow-up with your care team.' };
  }
  return { label: 'Elevated concern', tone: 'warning', description: 'Several responses suggest follow-up screening and a doctor conversation are recommended.' };
}

export function buildQuestionnaireSummary(answers) {
  const risk = calculateRiskScore(answers);
  const level = getRiskLevel(risk.overall);

  const responses = CATEGORIES.map((category) => {
    const items = QUESTIONS.filter((q) => q.categoryId === category.id).map((q) => ({
      id: q.id,
      question: q.text,
      answer: getAnswerLabel(q, answers[q.id]),
      risk: getQuestionRisk(q, answers[q.id]),
    }));
    const categoryScore = risk.categories.find((c) => c.id === category.id)?.score ?? 0;
    return { ...category, score: categoryScore, items };
  });

  return { risk, level, responses };
}
