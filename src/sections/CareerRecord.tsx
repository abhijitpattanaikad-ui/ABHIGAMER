import { useMemo } from 'react';
import { useCinematic } from '@/context/CinematicContext';
import { CAREER_RECORDS, TIMELINE_NODES } from '@/data/portfolio';

const DOT_SIZE = 14;

function useCareerRecordStyles() {
  return useMemo(
    () =>
      CAREER_RECORDS.map((r) => {
        const span = r.b - r.a;
        const f = span * 0.15;
        const A = r.a - f;
        const B = r.b + f;
        const opacityExpr = `clamp(0, min(calc((var(--cp, 0) - ${A}) / ${f}), calc((${B} - var(--cp, 0)) / ${f})), 1)`;
        const sideStyle = r.side === 'right' ? { right: '6vw' } : { left: '6vw' };
        const dir = r.side === 'right' ? 24 : -24;
        const transformExpr = `translateY(-50%) translateX(calc((1 - ${opacityExpr}) * ${dir}px))`;
        return { ...r, opacityExpr, transformExpr, sideStyle };
      }),
    []
  );
}

function useTimelineNodeStyles(nodeSpacing: number) {
  return useMemo(
    () =>
      TIMELINE_NODES.map((node, i) => {
        const rec = CAREER_RECORDS[i];
        const activeExpr = `clamp(0, min(calc((var(--cp, 0) - ${rec.a}) / 0.03), calc((${rec.b} - var(--cp, 0)) / 0.03)), 1)`;
        const passedExpr = `clamp(0, calc((var(--cp, 0) - ${rec.b}) / 0.02), 1)`;
        const redPct = `max(calc(${activeExpr} * 100%), calc(${passedExpr} * 55%))`;
        const dotBg = `color-mix(in srgb, #4b5058 calc(100% - ${redPct}), #FF2430 ${redPct})`;
        const dotTransform = `scale(calc(1 + ${activeExpr} * 0.5))`;
        const cellLeft = i * nodeSpacing;
        const dotLeft = cellLeft + nodeSpacing / 2 - DOT_SIZE / 2;
        let lineBg = 'transparent';
        let lineLeft = 0;
        let lineWidth = 0;
        if (i < TIMELINE_NODES.length - 1) {
          const lineExpr = `clamp(0, calc((var(--cp, 0) - ${rec.b}) / 0.02), 1)`;
          lineBg = `color-mix(in srgb, #33383d calc((1 - ${lineExpr}) * 100%), #FF2430 calc(${lineExpr} * 100%))`;
          lineLeft = cellLeft + nodeSpacing / 2 + DOT_SIZE / 2;
          lineWidth = nodeSpacing - DOT_SIZE;
        }
        return { ...node, dotLeft, dotBg, dotTransform, lineLeft, lineWidth, lineBg, textLeft: cellLeft, textWidth: nodeSpacing };
      }),
    [nodeSpacing]
  );
}

export default function CareerRecord() {
  const { engine, careerActiveIndex, layout } = useCinematic();
  const careerRecords = useCareerRecordStyles();
  const timelineNodes = useTimelineNodeStyles(layout.careerNodeSpacing);
  const careerRecordLabel = `RECORD 0${careerActiveIndex + 1}`;

  return (
    <section
      id="career-record"
      aria-label="Career Record"
      ref={engine.careerContainerRef}
      className="career-section relative w-full"
      style={{ height: '650vh' }}
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-[#07090B]">
        <video
          ref={engine.careerVideoRef}
          src="/assets/career-scroll-optimized.mp4"
          muted
          playsInline
          preload="none"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10"
          style={{ background: 'radial-gradient(ellipse at center, transparent 45%, rgba(7,9,11,0.5) 100%)' }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10"
          style={{ background: 'linear-gradient(180deg, rgba(7,9,11,0.35) 0%, transparent 22%, transparent 66%, rgba(7,9,11,0.78) 100%)' }}
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
        <div className="scanlines pointer-events-none absolute inset-0 z-10 opacity-20" aria-hidden="true" />

        <div
          className="absolute left-10 z-[22] max-w-[540px]"
          style={{
            top: 'clamp(80px, 14vh, 120px)',
            opacity: 'max(0.35, calc(clamp(0, calc(var(--cp, 0) / 0.08), 1) - (clamp(0, calc((var(--cp, 0) - 0.18) / 0.10), 1) * 0.65)))',
            transform: 'translateY(calc((1 - clamp(0, calc(var(--cp, 0) / 0.08), 1)) * 24px))',
          }}
        >
          <span className="font-inter text-[13px] font-bold uppercase tracking-[0.28em] text-[#FF2430]">03 / Career Record</span>
          <h2
            className="font-orbitron mt-2.5 font-extrabold uppercase text-[#F1F0EC]"
            style={{ fontSize: 'clamp(1.3rem, 3vw, 2.4rem)', lineHeight: 1.1, letterSpacing: '0.01em' }}
          >
            <span className="block">13 Years.</span>
            <span className="block">Four Chapters.</span>
            <span className="block whitespace-nowrap">One Operating System.</span>
          </h2>
        </div>

        {careerRecords.map((rec) => (
          <div
            key={rec.num}
            className="career-dossier absolute top-1/2 z-[21] box-border max-w-[calc(100vw-48px)] border border-white/[0.12] border-t-2 border-t-[#FF2430] bg-[rgba(7,9,11,0.55)] p-[22px_24px] backdrop-blur-[10px]"
            style={{ width: 'clamp(420px, 32vw, 500px)', opacity: rec.opacityExpr, transform: rec.transformExpr, ...rec.sideStyle }}
          >
            <span className="font-inter text-[10px] font-bold uppercase tracking-[0.24em] text-[#FF2430]">Active Record / {rec.num}</span>
            <h3 className="font-orbitron mt-2.5 font-extrabold uppercase leading-none text-[#F1F0EC]" style={{ fontSize: 'clamp(18px, 2vw, 24px)', marginBottom: 2 }}>
              {rec.company}
            </h3>
            <p className="m-0 font-inter text-xs font-semibold uppercase tracking-[0.08em] text-white/80">{rec.role}</p>
            <p className="mt-1.5 font-inter text-[10px] uppercase tracking-[0.14em] text-[#93999F]">{rec.period}</p>
            <p className="mt-2.5 font-inter text-[10px] uppercase tracking-[0.16em] text-[#FF2430]/75">{rec.supportingLine}</p>
            <ul className="mt-3.5 flex flex-col gap-1.5 p-0" style={{ listStyle: 'none' }}>
              {rec.details.map((line) => (
                <li key={line} className="relative pl-3.5 font-inter text-xs leading-[1.5] text-white/75">
                  <span aria-hidden="true" className="absolute left-0 top-2 h-px w-2 bg-[#FF2430]" />
                  {line}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="absolute left-0 z-20 w-full overflow-hidden py-6" style={{ top: '76vh' }}>
          <div
            ref={engine.careerRailRef}
            className="relative h-24"
            style={{ width: 'max-content', transform: 'translate3d(var(--rail-x, 0px), 0, 0)', willChange: 'transform' }}
          >
            {timelineNodes.map((node) => (
              <div key={node.num}>
                <div
                  className="absolute top-0 h-3.5 w-3.5 rounded-full"
                  style={{ left: `${node.dotLeft}px`, transform: node.dotTransform, background: node.dotBg }}
                />
                <div className="absolute top-1.5 h-0.5" style={{ left: `${node.lineLeft}px`, width: `${node.lineWidth}px`, background: node.lineBg }} />
                <div className="absolute top-[34px] text-center" style={{ left: `${node.textLeft}px`, width: `${node.textWidth}px` }}>
                  <span className="font-orbitron block text-[11px] text-[#FF2430]">
                    {node.num} — {node.year}
                  </span>
                  <span className="mt-1 block font-inter text-xs font-bold uppercase tracking-[0.04em] text-[#F1F0EC]">{node.name}</span>
                  <span className="mt-[3px] block font-inter text-[9px] uppercase tracking-[0.14em] text-[#93999F]">{node.roleLabel}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute left-10 z-[22] flex items-center gap-3.5" style={{ bottom: 'clamp(16px, 3vh, 28px)' }}>
          <span className="font-orbitron text-[11px] tracking-[0.2em] text-white/60">{careerRecordLabel}</span>
          <div className="h-0.5 w-[120px] overflow-hidden bg-white/[0.14]">
            <div className="h-full bg-[#FF2430]" style={{ width: 'calc(var(--cp, 0) * 100%)' }} />
          </div>
        </div>
      </div>
    </section>
  );
}
