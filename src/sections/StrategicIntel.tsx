import { useMemo } from 'react';
import { useCinematic } from '@/context/CinematicContext';
import { CAPABILITY_GROUPS } from '@/data/portfolio';

const INTEL_STATUS = ['Accessing Operative Record', 'Identity Confirmed', 'Clearance Verified / AP-1306'];

const sipTri = (a: number, b: number, f: number) => `clamp(0, min(calc((var(--sip, 0) - ${a}) / ${f}), calc((${b} - var(--sip, 0)) / ${f})), 1)`;
const sipRamp = (a: number, b: number) => `clamp(0, calc((var(--sip, 0) - ${a}) / ${b - a}), 1)`;

function useCapabilityGroupStyles() {
  return useMemo(
    () =>
      CAPABILITY_GROUPS.map((g, gi) => {
        const presence = sipRamp(g.a, g.a + 0.05);
        let opacityExpr: string;
        if (gi < CAPABILITY_GROUPS.length - 1) {
          const dim = sipRamp(g.b, g.b + 0.04);
          const restore = sipRamp(0.74, 0.8);
          opacityExpr = `calc(${presence} * (1 - (0.4 * ${dim} * (1 - ${restore}))))`;
        } else {
          opacityExpr = presence;
        }
        const tagSpan = (g.b - g.a) / g.tags.length;
        const tags = g.tags.map((label, ti) => {
          const tStart = g.a + ti * tagSpan;
          const tEnd = tStart + tagSpan * 0.6;
          const tagOpacity = sipRamp(tStart, tEnd);
          const flash = sipTri(tStart, tStart + tagSpan * 0.5, tagSpan * 0.2);
          return {
            label,
            opacityExpr: tagOpacity,
            transformExpr: `translateY(calc((1 - ${tagOpacity}) * 10px))`,
            borderExpr: `color-mix(in srgb, rgba(241,240,236,0.3) calc(100% - ${flash} * 70%), #FF2430 calc(${flash} * 70%))`,
          };
        });
        return { title: g.title, opacityExpr, tags };
      }),
    []
  );
}

export default function StrategicIntel() {
  const { engine, intelStatusIndex } = useCinematic();
  const capabilityGroups = useCapabilityGroupStyles();
  const intelStatusLabel = INTEL_STATUS[intelStatusIndex];

  return (
    <section
      id="strategic-intel"
      aria-label="Strategic Intel"
      ref={engine.intelContainerRef}
      className="intel-section relative w-full"
      style={{ height: '450vh' }}
    >
      <div className="intel-stage sticky top-0 h-[100svh] w-full overflow-hidden bg-[#07090B]">
        <video
          ref={engine.intelVideoRef}
          src="/assets/strategic-intel-scroll-optimized.mp4"
          muted
          playsInline
          preload="none"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: 'center', background: '#000' }}
        />

        <div
          aria-hidden="true"
          className="intel-gradient pointer-events-none absolute inset-0 z-10"
          style={{ background: 'linear-gradient(to right, rgba(7,9,11,0.96) 0%, rgba(7,9,11,0.82) 42%, rgba(7,9,11,0.20) 68%, transparent 82%)' }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10"
          style={{ background: 'radial-gradient(ellipse at center, transparent 55%, rgba(7,9,11,0.4) 100%)' }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
        <div className="scanlines pointer-events-none absolute inset-0 z-10 opacity-[0.15]" aria-hidden="true" />

        <div
          className="absolute z-[25]"
          style={{ top: 'clamp(24px, 4vh, 40px)', left: 'clamp(24px, 4vw, 72px)', opacity: 'clamp(0, calc(var(--sip, 0) / 0.06), 1)' }}
        >
          <span className="block font-inter text-xs font-bold uppercase tracking-[0.28em] text-[#FF2430]">04 / Strategic Intel</span>
          <span className="mt-1 block font-inter text-[10px] uppercase tracking-[0.18em] text-[#93999F]">Operative Capability Assessment</span>
        </div>

        <div
          className="intel-dossier absolute top-1/2 z-[22] box-border max-h-[82svh] max-w-[calc(100vw-48px)] overflow-auto border border-white/20 bg-[rgba(7,9,11,0.72)] p-[26px_28px] backdrop-blur-[10px]"
          style={{
            left: 'clamp(24px, 4vw, 72px)',
            transform: 'translateY(-50%)',
            width: 'clamp(440px, 40vw, 610px)',
            opacity: 'clamp(0, calc(var(--sip, 0) / 0.06), 1)',
          }}
        >
          <div aria-hidden="true" className="absolute bottom-0 left-0 top-0 w-[3px] bg-[#FF2430]" />

          <div
            aria-hidden="true"
            className="absolute left-0 top-0 h-px w-full bg-white/40"
            style={{ transformOrigin: 'left', transform: 'scaleX(clamp(0, calc(var(--sip, 0) / 0.03), 1))' }}
          />
          <div
            aria-hidden="true"
            className="absolute right-0 top-0 h-full w-px bg-white/40"
            style={{ transformOrigin: 'top', transform: 'scaleY(clamp(0, calc((var(--sip, 0) - 0.03) / 0.03), 1))' }}
          />
          <div
            aria-hidden="true"
            className="absolute bottom-0 right-0 h-px w-full bg-white/40"
            style={{ transformOrigin: 'right', transform: 'scaleX(clamp(0, calc((var(--sip, 0) - 0.06) / 0.03), 1))' }}
          />
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-0 h-full w-px bg-white/40"
            style={{ transformOrigin: 'bottom', transform: 'scaleY(clamp(0, calc((var(--sip, 0) - 0.09) / 0.03), 1))' }}
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 h-px w-full bg-[rgba(255,36,48,0.5)]"
            style={{ top: 'calc(min(var(--sip, 0), 0.94) / 0.94 * 100%)', opacity: 'clamp(0, calc((0.94 - var(--sip, 0)) / 0.04), 1)' }}
          />

          <span className="block font-inter text-[10px] uppercase tracking-[0.2em] text-[#93999F]" style={{ opacity: 'clamp(0, calc((var(--sip, 0) - 0.12) / 0.06), 1)' }}>
            Operative
          </span>
          <h3
            className="font-orbitron mt-1.5 font-extrabold uppercase leading-none text-[#F1F0EC]"
            style={{
              fontSize: 'clamp(26px, 2.4vw, 34px)',
              clipPath: 'inset(0 calc((1 - clamp(0, calc((var(--sip, 0) - 0.12) / 0.10), 1)) * 100%) 0 0)',
            }}
          >
            Abhijit Pattanaik
          </h3>
          <p
            className="mt-3 font-inter text-[15px] leading-[1.55] text-[#93999F]"
            style={{
              opacity: 'clamp(0, calc((var(--sip, 0) - 0.18) / 0.10), 1)',
              transform: 'translateY(calc((1 - clamp(0, calc((var(--sip, 0) - 0.18) / 0.10), 1)) * 18px))',
            }}
          >
            Certified GenAI and esports professional based in Dubai, UAE. 13 years across technology, gaming and marketing—building scalable global IPs
            at the intersection of <span className="text-[#F1F0EC]">AI</span>, <span className="text-[#F1F0EC]">competitive gaming</span>, and{' '}
            <span className="text-[#F1F0EC]">sim racing</span>.
          </p>

          <div className="mt-[18px] flex flex-col gap-2 border-t border-white/[0.12] pt-3.5">
            <div className="flex items-center justify-between" style={{ opacity: 'clamp(0, calc((var(--sip, 0) - 0.30) / 0.047), 1)' }}>
              <span className="font-inter text-[10px] uppercase tracking-[0.18em] text-[#93999F]">Base</span>
              <span className="font-inter text-xs uppercase tracking-[0.1em] text-[#F1F0EC]">Dubai, UAE</span>
            </div>
            <div className="flex items-center justify-between" style={{ opacity: 'clamp(0, calc((var(--sip, 0) - 0.347) / 0.047), 1)' }}>
              <span className="font-inter text-[10px] uppercase tracking-[0.18em] text-[#93999F]">Clearance</span>
              <span className="font-inter text-xs uppercase tracking-[0.1em] text-[#FF2430]">AP-1306</span>
            </div>
            <div className="flex items-center justify-between" style={{ opacity: 'clamp(0, calc((var(--sip, 0) - 0.393) / 0.047), 1)' }}>
              <span className="font-inter text-[10px] uppercase tracking-[0.18em] text-[#93999F]">Status</span>
              <span className="inline-flex items-center gap-1.5 font-inter text-xs uppercase tracking-[0.1em] text-[#F1F0EC]">
                <span
                  aria-hidden="true"
                  className="intel-status-dot inline-block h-1.5 w-1.5 rounded-full"
                  style={{
                    background:
                      'color-mix(in srgb, #4b5058 calc(100% - clamp(0, calc((var(--sip, 0) - 0.393) / 0.047), 1) * 100%), #39FF14 calc(clamp(0, calc((var(--sip, 0) - 0.393) / 0.047), 1) * 100%))',
                  }}
                />
                Available
              </span>
            </div>
          </div>

          {capabilityGroups.map((grp) => (
            <div key={grp.title} className="mt-[18px]" style={{ opacity: grp.opacityExpr }}>
              <span className="font-inter text-[11px] font-bold uppercase tracking-[0.2em] text-[#FF2430]">{grp.title}</span>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {grp.tags.map((tag) => (
                  <span
                    key={tag.label}
                    className="inline-block rounded-sm bg-[rgba(7,9,11,0.4)] px-2.5 py-1.5 font-inter text-[10px] uppercase tracking-[0.08em] text-[#F1F0EC]"
                    style={{ border: `1px solid ${tag.borderExpr}`, opacity: tag.opacityExpr, transform: tag.transformExpr }}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>
          ))}

          <div className="mt-5 border-t border-white/[0.12] pt-3.5" style={{ opacity: 'clamp(0, calc((var(--sip, 0) - 0.94) / 0.04), 1)' }}>
            <p className="m-0 font-inter text-[11px] uppercase tracking-[0.16em] text-[#F1F0EC]">Strategic Profile Complete</p>
            <p className="mt-1 font-inter text-[10px] uppercase tracking-[0.14em] text-[#93999F]">12 Capabilities Verified</p>
            <p className="mt-1 font-inter text-[10px] uppercase tracking-[0.14em] text-[#93999F]">Available for Collaboration</p>
            <p className="mt-2.5 font-inter text-[9px] uppercase tracking-[0.2em] text-[#FF2430]">Next / Contact Me</p>
          </div>
        </div>

        <div className="absolute z-[25] flex items-center gap-3.5" style={{ bottom: 'clamp(16px, 3vh, 28px)', left: 'clamp(24px, 4vw, 72px)' }}>
          <span className="font-orbitron text-[11px] tracking-[0.2em] text-white/60">{intelStatusLabel}</span>
          <div className="h-0.5 w-[120px] overflow-hidden bg-white/[0.14]">
            <div className="h-full bg-[#FF2430]" style={{ width: 'calc(var(--sip, 0) * 100%)' }} />
          </div>
        </div>
      </div>
    </section>
  );
}
