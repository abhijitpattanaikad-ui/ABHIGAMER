import { createContext, useContext, type ReactNode } from 'react';
import { useCinematicEngineState, type CinematicEngineState } from '@/hooks/useCinematicEngine';

const CinematicContext = createContext<CinematicEngineState | null>(null);

export function CinematicProvider({ children }: { children: ReactNode }) {
  const state = useCinematicEngineState();
  return <CinematicContext.Provider value={state}>{children}</CinematicContext.Provider>;
}

export function useCinematic(): CinematicEngineState {
  const ctx = useContext(CinematicContext);
  if (!ctx) throw new Error('useCinematic must be used within a CinematicProvider');
  return ctx;
}
