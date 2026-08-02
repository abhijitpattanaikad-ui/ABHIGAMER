import { useMemo } from 'react';
import { useCinematic } from '@/context/CinematicContext';
import { BRAND_LOGOS } from '@/data/portfolio';

const BRAND_ROW_WINDOWS: [number, number][] = [
  [0.12, 0.34],
  [0.28, 0.5],
  [0.44, 0.66],
  [0.6, 0.82],
  [0.76, 0.96],
];

const brandRamp = (a: number, b: number) => `clamp(0, calc((var(--bp, 0) - ${a}) / ${b - a}), 1)`;
const brandTri = (a: number, b: number, f: number) =>
  `clamp(0, min(calc((var(--bp, 0) - ${a}) / ${f}), calc((${b} - var(--bp, 0)) / ${f})), 1)`;

function useBrandLogoStyles() {
  return useMemo(
    () =>
      BRAND_LOGOS.map((brand, i) => {
        const row = Math.floor(i / 5);
        const col = i % 5;
        const [a, b] = BRAND_ROW_WINDOWS[row];
        const span = b - a;
        const start = a + col * span * 0.06;
        const end = start + span * 0.55;
        const rampExpr = brandRamp(start, end);
        const flash = brandTri(start, start + span * 0.3, span * 0.15);
        return {
          ...brand,
          src: `/assets/logos/${brand.file}`,
          logoFilter: brand.forceWhite ? 'brightness(0) invert(1)' : 'none',
          transformExpr: `translateZ(calc((1 - ${rampExpr}) * -60px)) scale(calc(0.94 + ${rampExpr} * 0.06))`,
          opacityExpr: `calc(0.28 + ${rampExpr} * 0.64)`,
          filterExpr: `grayscale(calc((1 - ${rampExpr}) * 100%)) brightness(calc(0.75 + ${rampExpr} * 0.3))`,
          borderExpr: `color-mix(in srgb, rgba(255,255,255,0.08) calc(100% - ${flash} * 100%), #FF2430 calc(${flash} * 100%))`,
        };
      }),
    []
  );
}

export default function BrandCredentials() {
  const { engine, brandStatusIndex } = useCinematic();
  const brandLogos = useBrandLogoStyles();
  const brandStatusLabel = brandStatusIndex === 1 ? 'Brand Network Verified / 25 Records' : 'Verifying Partner Credentials';

  return (
    <section
      id="brand-credentials"
      aria-label="Brands I've Worked With"
      ref={engine.brandContainerRef}
      className="brand-section relative w-full"
      style={{ height: '140vh' }}
    >
      <div className="brand-stage sticky top-0 flex h-[100svh] w-full items-center overflow-hidden bg-[#07090B]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
          style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(255,36,48,0.05) 0%, transparent 60%)' }}
        />

        <div className="brand-layout relative z-[2] mx-auto flex w-full max-w-[1600px] items-center gap-[clamp(24px,4vw,64px)] px-10">
          <div className="brand-heading-col w-[30%] flex-shrink-0">
            <span
              className="block font-inter text-xs font-bold uppercase tracking-[0.26em] text-[#FF2430]"
              style={{ opacity: 'clamp(0, calc(var(--bp, 0) / 0.10), 1)' }}
            >
              Selected Brand Ecosystem
            </span>
            <h2
              className="font-orbitron mt-3.5 font-extrabold uppercase text-[#F1F0EC]"
              style={{
                fontSize: 'clamp(1.8rem, 3vw, 3rem)',
                lineHeight: 1,
                letterSpacing: '-0.01em',
                opacity: 'clamp(0, calc(var(--bp, 0) / 0.18), 1)',
                transform: 'translateY(calc((1 - clamp(0, calc(var(--bp, 0) / 0.18), 1)) * 24px))',
              }}
            >
              <span className="block">Brands I&rsquo;ve</span>
              <span className="block">Worked With.</span>
            </h2>
            <p
              className="mt-3.5 max-w-[320px] font-inter text-[13px] leading-[1.5] text-[#93999F]"
              style={{ opacity: 'clamp(0, calc(var(--bp, 0) / 0.18), 1)' }}
            >
              Across gaming, technology, media, hospitality and global esports.
            </p>
            <span
              className="mt-[18px] block font-inter text-[10px] uppercase tracking-[0.18em] text-[#93999F]/70"
              style={{ opacity: 'clamp(0, calc(var(--bp, 0) / 0.18), 1)' }}
            >
              25 Featured Brands / Global Experience
            </span>

            <div className="mt-[22px] flex items-center gap-2.5">
              <span aria-hidden="true" className="h-px w-full max-w-[60px] bg-[#FF2430]" />
              <span className="whitespace-nowrap font-inter text-[9px] uppercase tracking-[0.16em] text-white/50">{brandStatusLabel}</span>
            </div>
          </div>

          <div className="relative flex-1" style={{ perspective: '1200px' }}>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-0 right-0 z-[3] h-px"
              style={{
                background: 'rgba(255,36,48,0.45)',
                boxShadow: '0 0 8px rgba(255,36,48,0.4)',
                top: 'calc(min(var(--bp, 0), 0.96) / 0.96 * 100%)',
                opacity: 'clamp(0, calc((0.96 - var(--bp, 0)) / 0.04), 1)',
              }}
            />

            <div
              className="brand-grid grid grid-cols-5 gap-[22px]"
              style={{ gridAutoRows: 'clamp(70px, 7vw, 96px)', transformStyle: 'preserve-3d' }}
            >
              {brandLogos.map((brand) => (
                <div
                  key={brand.name}
                  tabIndex={0}
                  aria-label={`${brand.name} logo`}
                  className="brand-cell relative box-border flex items-center justify-center overflow-hidden rounded-sm bg-[rgba(16,20,25,0.42)] p-2.5 transition-transform duration-200 ease-out hover:-translate-y-[3px] hover:scale-[1.03]"
                  style={{ height: 'clamp(70px, 7vw, 96px)', border: `1px solid ${brand.borderExpr}` }}
                >
                  <div
                    className="flex h-full w-full items-center justify-center"
                    style={{ transform: brand.transformExpr, opacity: brand.opacityExpr, filter: brand.filterExpr }}
                  >
                    <img
                      src={brand.src}
                      alt={`${brand.name} logo`}
                      loading="lazy"
                      decoding="async"
                      className="h-auto max-h-[50px] w-auto object-contain"
                      style={{ maxWidth: '76%', filter: brand.logoFilter }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
