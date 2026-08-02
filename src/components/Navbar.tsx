import { useEffect } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { useCinematic } from '@/context/CinematicContext';
import { NAV_LINKS } from '@/data/portfolio';

function BrandMark() {
  return (
    <a href="#hero" className="flex items-center gap-3" aria-label="Abhijit Pattanaik — home">
      <span className="block h-9 w-px bg-[#FF2430]" aria-hidden="true" />
      <div className="flex flex-col">
        <span className="font-orbitron text-lg font-bold uppercase leading-[0.85] tracking-wider text-white sm:text-xl lg:text-2xl">ABHIJIT</span>
        <span className="font-orbitron text-lg font-bold uppercase leading-[0.85] tracking-wider text-white sm:text-xl lg:text-2xl">PATTANAIK</span>
        <span className="mt-1 font-inter text-[7px] uppercase tracking-[0.22em] text-white/50 sm:text-[8px]">ESPORTS · GAMING · GENAI</span>
      </div>
    </a>
  );
}

export default function Navbar() {
  const { engine, scrolled, menuOpen } = useCinematic();

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [menuOpen]);

  const handlerFor = (target: (typeof NAV_LINKS)[number]['scrollTarget']) => {
    switch (target) {
      case 'profile':
        return engine.goToProfile;
      case 'missions':
        return engine.goToMissionsStart;
      case 'career':
        return engine.goToCareerStart;
      case 'intel':
        return engine.goToIntelSkills;
    }
  };

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-40 w-full border-b transition-colors duration-500 ${
          scrolled ? 'border-white/10 bg-[#07090B]/80 backdrop-blur-md' : 'border-transparent bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4 sm:px-10 lg:px-16 lg:py-5">
          <BrandMark />

          <nav className="hidden items-center gap-6 md:flex lg:gap-10" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={handlerFor(link.scrollTarget)}
                className="group relative font-inter text-xs uppercase tracking-[0.16em] text-white/70 transition-colors duration-300 hover:text-white lg:text-sm"
              >
                <span className="mr-1.5 text-[10px] text-[#FF2430]/80">{link.num}</span>
                {link.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-[#FF2430] transition-all duration-300 group-hover:w-full" aria-hidden="true" />
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            onClick={engine.goToContactEnd}
            className="group hidden items-center gap-2 border border-white/25 bg-[#07090B]/58 px-5 py-2.5 font-inter text-xs uppercase tracking-widest text-white backdrop-blur-md transition-all duration-300 hover:border-[#FF2430] hover:bg-[#FF2430] md:inline-flex"
          >
            Contact Me
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <button
            type="button"
            onClick={engine.openMenu}
            aria-label="Open menu"
            aria-expanded={false}
            aria-controls="mobile-menu"
            className="flex flex-col items-end justify-center space-y-1.5 py-2 md:hidden"
          >
            <span className="block h-px w-6 bg-white" aria-hidden="true" />
            <span className="block h-px w-6 bg-white" aria-hidden="true" />
            <span className="block h-px w-4 bg-white" aria-hidden="true" />
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-50 bg-[#07090B]/95 backdrop-blur-xl transition-all duration-500 ${
          menuOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 sm:px-10">
          <BrandMark />
          <button
            type="button"
            onClick={engine.closeMenu}
            aria-label="Close menu"
            className="flex h-11 w-11 items-center justify-center text-white transition-colors hover:text-[#FF2430]"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex flex-col px-6 py-8 sm:px-10" aria-label="Mobile primary">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              onClick={handlerFor(link.scrollTarget)}
              className="group flex items-baseline gap-4 py-4"
              style={{
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 80 + 100}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 80 + 100}ms`,
              }}
            >
              <span className="font-orbitron text-base text-[#FF2430]">{link.num}</span>
              <span className="font-orbitron text-4xl font-semibold uppercase leading-none text-white transition-colors group-hover:text-[#FF2430] sm:text-5xl">
                {link.label}
              </span>
            </a>
          ))}

          <div
            className="mt-8"
            style={{
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
              transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${NAV_LINKS.length * 80 + 100}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${
                NAV_LINKS.length * 80 + 100
              }ms`,
            }}
          >
            <a
              href="#contact"
              onClick={engine.closeMenuAndGoToContact}
              className="group inline-flex w-full items-center justify-between border border-white/25 px-6 py-5 font-inter text-sm uppercase tracking-widest text-white transition-all duration-300 hover:border-[#FF2430] hover:bg-[#FF2430]"
            >
              Contact Me
              <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
