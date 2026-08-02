import { useCinematic } from '@/context/CinematicContext';

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.95v5.66H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45z" />
    </svg>
  );
}

function SteamIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.76 2 2.44 5.94 1.9 11h6.28a3.3 3.3 0 0 1 2.13-1.28l1.86-2.7v-.04a3.9 3.9 0 1 1 3.9 3.9h-.09l-2.66 1.9v.07a3.02 3.02 0 0 1-5.94.55L2 12.68C2.7 18.05 7.87 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zM8.35 17.63l-1.36-.56a2.28 2.28 0 0 0 1.19 1.11 2.31 2.31 0 0 0 3-1.24 2.28 2.28 0 0 0-1.24-3 2.27 2.27 0 0 0-1.71-.04l1.4.58a1.68 1.68 0 1 1-1.28 3.11v.04zm7.55-8.25a2.6 2.6 0 1 1 0-5.2 2.6 2.6 0 0 1 0 5.2zm0-.87a1.73 1.73 0 1 0 0-3.46 1.73 1.73 0 0 0 0 3.46z" />
    </svg>
  );
}

function DiscordIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.32 5.36A18.9 18.9 0 0 0 15.72 4a13.4 13.4 0 0 0-.6 1.24 17.6 17.6 0 0 0-5.24 0A13.4 13.4 0 0 0 9.28 4a18.9 18.9 0 0 0-4.6 1.37C1.85 9.24 1.1 13 1.46 16.72a19 19 0 0 0 5.75 2.9 14 14 0 0 0 1.23-2 12.4 12.4 0 0 1-1.94-.93q.24-.18.47-.36a13.5 13.5 0 0 0 11.06 0q.24.18.47.36a12.4 12.4 0 0 1-1.95.93 14 14 0 0 0 1.23 2 19 19 0 0 0 5.76-2.9c.43-4.32-.7-8.05-2.99-11.36zM8.68 14.4c-.99 0-1.8-.93-1.8-2.06 0-1.14.79-2.07 1.8-2.07s1.82.93 1.8 2.07c0 1.13-.8 2.06-1.8 2.06zm6.65 0c-.99 0-1.8-.93-1.8-2.06 0-1.14.8-2.07 1.8-2.07s1.82.93 1.8 2.07c0 1.13-.8 2.06-1.8 2.06z" />
    </svg>
  );
}

export default function Contact() {
  const { engine } = useCinematic();

  return (
    <section
      id="contact"
      aria-label="Contact"
      ref={engine.contactContainerRef}
      className="contact-section relative w-full"
      style={{ height: '320vh' }}
    >
      <div
        className="contact-stage sticky top-0 grid h-[100svh] w-full"
        style={{ gridTemplateColumns: 'minmax(0, 58fr) minmax(400px, 42fr)', gridTemplateRows: '100%' }}
      >
        <div className="relative overflow-hidden bg-black">
          <video
            ref={engine.contactVideoRef}
            src="/assets/contact-scroll-optimized.mp4"
            muted
            playsInline
            preload="none"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: 'center' }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10"
            style={{ background: 'radial-gradient(ellipse at center, transparent 55%, rgba(7,9,11,0.45) 100%)' }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10"
            style={{ background: 'linear-gradient(90deg, transparent 55%, rgba(7,9,11,0.85) 100%)' }}
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
          <div className="scanlines pointer-events-none absolute inset-0 z-10 opacity-[0.18]" aria-hidden="true" />

          <div className="absolute left-8 z-20" style={{ top: 'clamp(24px, 4vh, 40px)' }}>
            <span className="block font-inter text-[10px] font-bold uppercase tracking-[0.24em] text-[#FF2430]">Final Transmission</span>
            <span className="mt-1 block font-inter text-[9px] uppercase tracking-[0.18em] text-white/50">AP-1306 / Dubai — UAE</span>
          </div>

          <div aria-hidden="true" className="contact-divider-v absolute right-0 top-0 z-20 h-full w-px bg-white/[0.12]">
            <div className="absolute h-[60px] w-0.5 bg-[#FF2430]" style={{ left: '-0.5px', top: 'calc(var(--ctp, 0) * (100% - 60px))' }} />
            <div
              className="absolute h-1.5 w-1.5 rotate-45 bg-[#FF2430]"
              style={{ left: '-3px', top: 'calc(var(--ctp, 0) * (100% - 60px) + 60px)' }}
            />
          </div>
        </div>

        <div
          className="contact-content-panel relative box-border flex h-full items-[safe_center] overflow-y-auto bg-[#07090B]"
          style={{ paddingTop: 'clamp(96px, 13vh, 140px)' }}
        >
          <div aria-hidden="true" className="contact-divider-h hidden" />
          <div className="mx-auto w-full max-w-[600px]" style={{ padding: 'clamp(28px, 3.5vw, 72px)' }}>
            <span
              className="block font-inter text-xs font-bold uppercase tracking-[0.28em] text-[#FF2430]"
              style={{ opacity: 'clamp(0, calc(var(--ctp, 0) / 0.15), 1)' }}
            >
              04 / Contact Me
            </span>

            <h2 className="font-orbitron m-0 mt-2.5 font-extrabold text-[#F1F0EC]" style={{ fontSize: 'clamp(2.2rem, 4.2vw, 6rem)', lineHeight: 0.96, letterSpacing: '-0.02em' }}>
              <span
                className="block"
                style={{
                  opacity: 'clamp(0, calc((var(--ctp, 0) - 0.15) / 0.27), 1)',
                  transform: 'translateX(calc((clamp(0, calc((var(--ctp, 0) - 0.15) / 0.27), 1) - 1) * 40px))',
                }}
              >
                Let&rsquo;s build something
              </span>
              <span
                className="relative inline-block"
                style={{
                  opacity: 'clamp(0, calc((var(--ctp, 0) - 0.28) / 0.24), 1)',
                  transform: 'translateX(calc((clamp(0, calc((var(--ctp, 0) - 0.28) / 0.24), 1) - 1) * 40px))',
                }}
              >
                worth scaling.
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1.5 left-0 h-0.5 bg-[#FF2430]"
                  style={{ width: 'calc(clamp(0, calc((var(--ctp, 0) - 0.28) / 0.24), 1) * 100%)' }}
                />
              </span>
            </h2>

            <p
              className="mt-4 max-w-[540px] font-inter leading-[1.55] text-[#93999F]"
              style={{
                fontSize: 'clamp(15px, 1.2vw, 18px)',
                marginTop: 'clamp(10px, 2vh, 18px)',
                opacity: 'clamp(0, calc((var(--ctp, 0) - 0.45) / 0.23), 1)',
                transform: 'translateY(calc((1 - clamp(0, calc((var(--ctp, 0) - 0.45) / 0.23), 1)) * 24px))',
              }}
            >
              Available for <span className="text-[#F1F0EC]">advisory roles</span>, <span className="text-[#F1F0EC]">partnership architecture</span>,
              and <span className="text-[#F1F0EC]">full-scale IP development</span> across AI, esports, and sim racing. Reach out with a brief and
              I&rsquo;ll respond within 48 hours.
            </p>

            <div
              className="contact-buttons flex flex-wrap gap-3.5"
              style={{
                marginTop: 'clamp(14px, 2.5vh, 26px)',
                opacity: 'clamp(0, calc((var(--ctp, 0) - 0.62) / 0.20), 1)',
                transform: 'translateY(calc((1 - clamp(0, calc((var(--ctp, 0) - 0.62) / 0.20), 1)) * 20px))',
              }}
            >
              <a
                href="mailto:abhijit.pattanaik.prof@gmail.com?subject=Project%20Enquiry%20%E2%80%94%20Abhijit%20Pattanaik"
                aria-label="Email Abhijit Pattanaik"
                className="inline-flex min-h-[52px] items-center justify-center gap-2.5 border border-white/30 bg-transparent px-7 font-inter text-xs font-semibold uppercase tracking-[0.18em] text-[#F1F0EC] transition-[transform,border-color,background-color] duration-[180ms] ease-out hover:-translate-y-0.5 hover:border-[#FF2430] hover:bg-[rgba(255,36,48,0.08)]"
              >
                Let&rsquo;s Connect <span aria-hidden="true">↗</span>
              </a>
              <a
                href="https://calendar.app.google/Za587a3GgNx3TEFm7"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Book a call with Abhijit Pattanaik"
                className="inline-flex min-h-[52px] items-center justify-center gap-2.5 border border-[#9c7d42] bg-[#C8A45C] px-7 font-inter text-xs font-bold uppercase tracking-[0.18em] text-[#07090B] transition-[transform,background-color] duration-[180ms] ease-out hover:-translate-y-0.5 hover:bg-[#D8B86D]"
              >
                Book a Call <span aria-hidden="true">↗</span>
              </a>
            </div>

            <div
              className="mt-3.5 flex items-center gap-2.5"
              style={{ opacity: 'clamp(0, calc((var(--ctp, 0) - 0.62) / 0.20), 1)' }}
            >
              <span aria-hidden="true" className="contact-status-dot animate-status-pulse-green inline-block h-1.5 w-1.5 rounded-full bg-[#39FF14]" />
              <span className="font-inter text-[10px] uppercase tracking-[0.18em] text-[#93999F]">Response Window / Within 48 Hours</span>
            </div>

            <div className="mt-[30px] border-t border-white/10 pt-3">
              <p className="m-0 font-inter text-[10px] uppercase tracking-[0.14em] text-[#93999F]/70">
                © 2026 Abhijit Pattanaik
                <br />
                Dubai, UAE
              </p>
              <p className="mt-1.5 font-inter text-[9px] uppercase tracking-[0.2em] text-[#93999F]/45">AI • Esports • Gaming • Sim Racing</p>
              <div className="mt-2.5 flex items-center gap-3.5">
                <a
                  href="https://www.linkedin.com/in/abhijit-gamer/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="inline-flex text-[#93999F]/70 transition-colors duration-200 hover:text-[#FF2430]"
                >
                  <LinkedInIcon />
                </a>
                <a
                  href="https://steamcommunity.com/id/maverick369/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Steam"
                  className="inline-flex text-[#93999F]/70 transition-colors duration-200 hover:text-[#FF2430]"
                >
                  <SteamIcon />
                </a>
                <a
                  href="https://discordapp.com/users/205760236999409668/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Discord"
                  className="inline-flex text-[#93999F]/70 transition-colors duration-200 hover:text-[#FF2430]"
                >
                  <DiscordIcon />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
