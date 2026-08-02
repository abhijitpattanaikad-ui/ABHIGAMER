import { useCinematic } from '@/context/CinematicContext';
import { MISSIONS } from '@/data/portfolio';

export default function MissionDebrief() {
  const { engine, missionActiveIndex, layout } = useCinematic();
  const missionNumberLabel = `MISSION 0${missionActiveIndex + 1}`;

  return (
    <section
      id="projects"
      aria-label="Mission Debrief"
      ref={engine.missionContainerRef}
      className="mission-section relative w-full"
      style={{ height: '720vh' }}
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-[#07090B]">
        <video
          ref={engine.missionVideoRef}
          src="/assets/mission-scroll-optimized.mp4"
          muted
          playsInline
          preload="none"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: 'clamp(0.3, calc(0.3 + var(--mp, 0) / 0.02 * 0.7), 1)' }}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10"
          style={{ background: 'linear-gradient(180deg, rgba(7,9,11,0.55) 0%, transparent 30%, transparent 55%, rgba(7,9,11,0.95) 100%)' }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10"
          style={{ background: 'radial-gradient(circle at 72% 38%, rgba(255,36,48,0.10) 0%, transparent 50%)' }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[25] bg-[#07090B]"
          style={{ transform: 'translateY(calc(clamp(0, calc(var(--mp, 0) / 0.02), 1) * -100%))' }}
        />

        <div
          className="absolute left-10 z-[22]"
          style={{
            top: 'clamp(80px, 14vh, 120px)',
            opacity: 'clamp(0, calc(var(--mp, 0) / 0.02), 1)',
            transform: 'translateY(calc((1 - clamp(0, calc(var(--mp, 0) / 0.02), 1)) * 20px))',
          }}
        >
          <span className="font-inter text-[13px] font-bold uppercase tracking-[0.28em] text-[#FF2430]">02 / Mission Dossiers</span>
          <h2
            className="font-orbitron mt-2.5 font-extrabold uppercase text-[#F1F0EC]"
            style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3.6rem)', lineHeight: 0.95, letterSpacing: '0.01em' }}
          >
            <span className="block">Selected</span>
            <span className="block">Operations</span>
          </h2>
        </div>

        <div className="absolute bottom-0 left-0 z-20 w-full overflow-hidden" style={{ paddingBottom: 'clamp(40px, 8vh, 80px)' }}>
          <div
            ref={engine.missionTrackRef}
            className="mission-track flex"
            style={{
              width: 'max-content',
              padding: '0 40px',
              opacity: 'clamp(0, calc((var(--mp, 0) - 0.08) / 0.04), 1)',
              transform:
                'translate3d(calc(var(--start-offset, 0px) - clamp(0, calc((var(--mp, 0) - 0.10) / 0.82), 1) * (var(--max-travel, 0px) + var(--start-offset, 0px))), 0, 0)',
            }}
          >
            {MISSIONS.map((mission, i) => (
              <article
                key={mission.id}
                tabIndex={0}
                ref={engine.setCardRef(i)}
                className="mission-card group/card relative flex-shrink-0"
                style={{ width: `${layout.cardWidth}px`, height: `${layout.cardHeight}px`, transform: 'none', opacity: 1, filter: 'none' }}
              >
                <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/[0.14] transition-[box-shadow,border-color,transform] duration-300 ease-out hover:-translate-y-1.5 hover:border-white/35 hover:shadow-[0_24px_80px_-28px_rgba(255,36,48,0.42)]">
                  <img
                    src={mission.img}
                    alt={mission.projectName}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover/card:scale-110"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-[0.15]"
                    style={{
                      backgroundImage:
                        'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                      backgroundSize: '28px 28px',
                    }}
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{ background: 'radial-gradient(circle at 50% 100%, rgba(255,36,48,0.16) 0%, transparent 60%)' }}
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{ background: 'linear-gradient(to top, #07090B 0%, rgba(7,9,11,0.6) 45%, transparent 80%)' }}
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 p-[22px] pb-5">
                    <h3
                      className="font-orbitron m-0 max-w-[95%] font-extrabold uppercase text-[#F1F0EC]"
                      style={{ fontSize: 'clamp(20px, 2vw, 28px)', lineHeight: 0.95, letterSpacing: '-0.01em' }}
                    >
                      {mission.projectName}
                    </h3>
                    <p className="mt-2.5 font-inter text-[11px] font-medium uppercase tracking-[0.2em] text-[#93999F]">{mission.location}</p>
                  </div>
                  {mission.href && (
                    <a
                      href={mission.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${mission.projectName}`}
                      className="absolute inset-0"
                    />
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="absolute left-10 z-[22] flex items-center gap-3.5" style={{ bottom: 'clamp(16px, 3vh, 28px)' }}>
          <span className="font-orbitron text-[11px] tracking-[0.2em] text-white/60">{missionNumberLabel}</span>
          <div className="h-0.5 w-[120px] overflow-hidden bg-white/[0.14]">
            <div className="h-full bg-[#FF2430]" style={{ width: 'calc(var(--mp, 0) * 100%)' }} />
          </div>
        </div>

        <div className="absolute right-10 z-[22] flex items-center gap-2.5" style={{ bottom: 'clamp(16px, 3vh, 28px)' }}>
          <button
            type="button"
            onClick={engine.goToPrevMission}
            aria-label="Previous mission"
            className="flex h-10 w-10 items-center justify-center border border-white/20 bg-[rgba(7,9,11,0.5)] text-[#F1F0EC] transition-colors duration-300 hover:border-[#FF2430] hover:text-[#FF2430]"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={engine.goToNextMission}
            aria-label="Next mission"
            className="flex h-10 w-10 items-center justify-center border border-white/20 bg-[rgba(7,9,11,0.5)] text-[#F1F0EC] transition-colors duration-300 hover:border-[#FF2430] hover:text-[#FF2430]"
          >
            ›
          </button>
        </div>

        <div
          className="absolute left-1/2 z-[22] -translate-x-1/2"
          style={{ bottom: 'clamp(64px, 9vh, 88px)', opacity: 'clamp(0, calc((var(--mp, 0) - 0.92) / 0.06), 1)' }}
        >
          <span className="font-inter text-[10px] uppercase tracking-[0.24em] text-white/55">Continue to Career Record</span>
        </div>
      </div>
    </section>
  );
}
