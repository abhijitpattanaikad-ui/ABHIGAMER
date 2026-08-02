import { useCinematic } from '@/context/CinematicContext';

export default function ScrollIndicator() {
  const { engine, indicatorLabel } = useCinematic();

  return (
    <div
      ref={engine.indicatorRef}
      aria-hidden="true"
      className="pointer-events-none fixed bottom-6 left-1/2 z-[60] flex -translate-x-1/2 flex-col items-center gap-2.5 transition-opacity duration-[600ms] ease-out"
      style={{ opacity: 'var(--indicator-opacity, 0)' }}
    >
      <span className="whitespace-nowrap rounded-full border border-white/15 bg-[#07090B]/60 px-3 py-1 font-inter text-[11px] font-semibold uppercase tracking-[0.22em] text-white/90 backdrop-blur-sm">
        {indicatorLabel}
      </span>
      <div className="flex h-10 w-0.5 overflow-hidden rounded-full bg-white/15">
        <div className="h-1/2 w-full animate-[scroll-hint_1.8s_ease-in-out_infinite] bg-[#FF2430]" />
      </div>
      <span className="animate-bounce text-sm leading-none text-[#FF2430]">▾</span>
    </div>
  );
}
