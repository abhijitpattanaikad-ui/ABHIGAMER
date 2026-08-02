import { useEffect, useRef, useState } from 'react';
import { CinematicEngine, type LayoutMetrics } from '@/lib/cinematicEngine';

export function useCinematicEngineState() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [missionActiveIndex, setMissionActiveIndex] = useState(0);
  const [careerActiveIndex, setCareerActiveIndex] = useState(0);
  const [intelStatusIndex, setIntelStatusIndex] = useState(0);
  const [brandStatusIndex, setBrandStatusIndex] = useState(0);
  const [indicatorLabel, setIndicatorLabel] = useState('Scroll to Begin');
  const [layout, setLayout] = useState<LayoutMetrics>({
    viewportWidth: typeof window !== 'undefined' ? window.innerWidth : 1600,
    careerNodeSpacing: 260,
    cardWidth: 380,
    cardHeight: 520,
  });

  const engineRef = useRef<CinematicEngine>();
  if (!engineRef.current) {
    engineRef.current = new CinematicEngine({
      setScrolled,
      setMenuOpen,
      setMissionActiveIndex,
      setCareerActiveIndex,
      setIntelStatusIndex,
      setBrandStatusIndex,
      setIndicatorLabel,
      setLayout,
    });
  }
  const engine = engineRef.current;

  useEffect(() => {
    engine.mount();
    return () => engine.unmount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    engine,
    scrolled,
    menuOpen,
    missionActiveIndex,
    careerActiveIndex,
    intelStatusIndex,
    brandStatusIndex,
    indicatorLabel,
    layout,
  };
}

export type CinematicEngineState = ReturnType<typeof useCinematicEngineState>;
