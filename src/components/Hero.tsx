import { useCinematic } from '@/context/CinematicContext';
import { HERO_STATS } from '@/data/portfolio';

function CinematicOverlays() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{ background: 'linear-gradient(90deg, rgba(7,9,11,0.92) 0%, rgba(7,9,11,0.55) 38%, rgba(7,9,11,0.18) 70%, rgba(7,9,11,0.35) 100%)' }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{ background: 'linear-gradient(180deg, rgba(7,9,11,0.45) 0%, transparent 25%, transparent 55%, rgba(7,9,11,0.9) 100%)' }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{ background: 'radial-gradient(circle at 28% 42%, rgba(255,36,48,0.10) 0%, transparent 50%)' }}
        aria-hidden="true"
      />
      <div className="scanlines pointer-events-none absolute inset-0 z-10 opacity-30" aria-hidden="true" />
      <div className="vignette pointer-events-none absolute inset-0 z-10" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
        aria-hidden="true"
      />
    </>
  );
}

function HUDCorners() {
  return (
    <div className="hud-corners pointer-events-none absolute inset-0 z-30" aria-hidden="true">
      <div className="absolute left-6 top-20 h-12 w-12 border-l border-t border-white/20" />
      <div className="absolute right-6 top-20 h-12 w-12 border-r border-t border-white/20" />
      <div className="absolute bottom-4 left-6 h-12 w-12 border-b border-l border-[#FF2430]/30" />
      <div className="absolute bottom-4 right-6 h-12 w-12 border-b border-r border-[#FF2430]/30" />
    </div>
  );
}

function DossierStats() {
  return (
    <div className="dossier-stats absolute bottom-8 left-10 z-30 hidden lg:block">
      <div className="flex items-center gap-3">
        <span className="block h-8 w-px bg-[#FF2430]" aria-hidden="true" />
        <div className="flex flex-col gap-0.5">
          <span className="font-inter text-[8px] uppercase tracking-[0.2em] text-white/40">Active Profile</span>
          <span className="font-inter text-[10px] uppercase tracking-[0.2em] text-white/75">AP-1306</span>
          <span className="font-inter text-[8px] uppercase tracking-[0.2em] text-white/40">Dubai · UAE</span>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const { engine } = useCinematic();

  return (
    <section id="hero" ref={engine.heroContainerRef} aria-label="Hero" className="relative w-full" style={{ height: '500vh' }}>
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-[#07090B]">
        <video
          ref={engine.heroVideoRef}
          src="/assets/hero-scroll-optimized.mp4"
          poster="/assets/hero-poster.png"
          muted
          playsInline
          preload="auto"
          aria-label="Cinematic scroll-controlled portrait of Abhijit Pattanaik wearing a tailored suit and glasses, revealed frame by frame as the page scrolls"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <CinematicOverlays />
        <HUDCorners />
        <DossierStats />

        <div className="relative z-20 mx-auto flex h-full max-w-[1600px] items-start px-6" style={{ paddingTop: 'clamp(130px, 15vh, 160px)', paddingBottom: 'clamp(8px, 2vh, 16px)' }}>
          <div className="w-full max-w-[720px]">

            <h1
              className="font-orbitron m-0 max-w-[640px] font-bold uppercase text-white"
              style={{
                fontSize: 'clamp(1.7rem, min(6vw, 6.2vh), 5.5rem)',
                lineHeight: 0.9,
                letterSpacing: '-0.025em',
                opacity: 'clamp(0, calc((var(--hp, 0) - 0.75) / 0.07), 1)',
                transform: 'translateX(calc((clamp(0, calc((var(--hp, 0) - 0.75) / 0.07), 1) - 1) * 140px))',
              }}
            >
              <span className="block">Building the</span>
              <span className="block">future of</span>
              <span className="relative inline-block">
                <span className="text-outline">AI &amp; Gaming</span>
                <span aria-hidden="true" className="absolute -bottom-1 left-0 h-px w-full bg-[#FF2430]" />
              </span>
              <span className="block">Experiences.</span>
            </h1>

            <p
              className="font-inter mt-4 max-w-[560px] leading-[1.5] text-white/65"
              style={{
                fontSize: 'clamp(12px, 1.9vh, 15px)',
                marginTop: 'clamp(8px, 2.2vh, 18px)',
                opacity: 'clamp(0, calc((var(--hp, 0) - 0.88) / 0.07), 1)',
                transform: 'translateY(calc((1 - clamp(0, calc((var(--hp, 0) - 0.88) / 0.07), 1)) * 100px))',
              }}
            >
              Certified GenAI and esports professional with 13 years across technology, gaming and marketing—transforming ambitious ideas into scalable global IPs. Awarded with GOLDEN VISA by UAE.
            </p>

            <div
              className="mt-5 flex flex-wrap items-center gap-5"
              style={{
                marginTop: 'clamp(10px, 2.4vh, 22px)',
                opacity: 'clamp(0, calc((var(--hp, 0) - 0.88) / 0.07), 1)',
                transform: 'translateY(calc((1 - clamp(0, calc((var(--hp, 0) - 0.88) / 0.07), 1)) * 100px))',
              }}
            >
              <a
                href="#contact"
                onClick={engine.goToContactEnd}
                className="inline-flex items-center gap-2 bg-[#FF2430] font-inter text-xs font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-white hover:text-[#07090B]"
                style={{ padding: 'clamp(9px, 2vh, 14px) 28px' }}
              >
                Contact Me <span aria-hidden="true">↗</span>
              </a>
              <a
                href="https://www.youtube.com/@MaverickMode2026"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-b border-white/30 px-0.5 py-2 font-inter text-xs uppercase tracking-[0.2em] text-white/70 transition-all duration-300 hover:border-[#FF2430] hover:text-white"
              >
                <span aria-hidden="true" className="text-[#FF2430]">▶</span> Check Maverick Mode
              </a>
            </div>

            <div
              className="flex flex-wrap gap-10"
              style={{
                marginTop: 'clamp(10px, 2.8vh, 26px)',
                opacity: 'clamp(0, calc((var(--hp, 0) - 0.88) / 0.07), 1)',
                transform: 'translateY(calc((1 - clamp(0, calc((var(--hp, 0) - 0.88) / 0.07), 1)) * 100px))',
              }}
            >
              {HERO_STATS.map((stat, i) => (
                <div key={stat.label} className={i > 0 ? 'flex flex-col border-l border-white/15 pl-8' : 'flex flex-col'}>
                  <span className="font-inter font-bold tracking-tight text-white" style={{ fontSize: 'clamp(20px, 4.4vh, 34px)' }}>
                    {stat.value}
                  </span>
                  <span className="mt-1 font-inter text-[10px] uppercase tracking-[0.16em] text-white/45">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="operative-status absolute bottom-6 right-6 z-30 hidden items-center gap-2.5 sm:flex">
          <span aria-hidden="true" className="animate-status-pulse-green inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: '#39FF14' }} />
          <div className="flex flex-col">
            <span className="font-inter text-[8px] uppercase tracking-[0.14em] text-white/45">Operative Status</span>
            <span className="font-inter text-[8px] uppercase tracking-[0.14em] text-white/45">Online · Available for Collaboration</span>
          </div>
        </div>
      </div>
    </section>
  );
}
