import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { PERSONAS } from '../config/personas';

const STORAGE_KEY = 'teliport-persona';

const PersonaContext = createContext(null);

function readStoredPersona() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && PERSONAS[stored]) return stored;
  } catch {
    /* ignore */
  }
  return null;
}

export function PersonaProvider({ children }) {
  const [persona, setPersonaState] = useState(readStoredPersona);

  const setPersona = useCallback((personaId) => {
    if (!PERSONAS[personaId]) return;
    localStorage.setItem(STORAGE_KEY, personaId);
    setPersonaState(personaId);
  }, []);

  const clearPersona = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setPersonaState(null);
  }, []);

  const personaConfig = persona ? PERSONAS[persona] : null;

  const value = useMemo(
    () => ({
      persona,
      personaConfig,
      isAuthenticated: Boolean(persona),
      setPersona,
      clearPersona,
    }),
    [persona, personaConfig, setPersona, clearPersona]
  );

  return <PersonaContext.Provider value={value}>{children}</PersonaContext.Provider>;
}

export function usePersona() {
  const ctx = useContext(PersonaContext);
  if (!ctx) throw new Error('usePersona must be used within PersonaProvider');
  return ctx;
}
