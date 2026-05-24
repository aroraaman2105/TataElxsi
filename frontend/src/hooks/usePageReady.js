import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const DEFAULT_MS = 420;

export function usePageReady(duration = DEFAULT_MS) {
  const location = useLocation();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(false);
    const t = setTimeout(() => setReady(true), duration);
    return () => clearTimeout(t);
  }, [location.pathname, duration]);

  return ready;
}
