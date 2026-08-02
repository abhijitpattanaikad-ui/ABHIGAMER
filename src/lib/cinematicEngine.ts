import { CAREER_RECORDS, MISSIONS } from '@/data/portfolio';

/**
 * Ported near-verbatim from the DCLogic scroll-progress engine that drives
 * Abhijit Hero.dc.html: one scroll/rAF loop reads every section's bounding
 * rect, writes progress as CSS custom properties directly via
 * style.setProperty (no React re-render per scroll frame), and scrubs each
 * section's <video> via a currentTime seek guarded by a pending-target +
 * `seeked` handshake so seeks never pile up faster than the browser can
 * service them.
 */

const HERO_FRAME = 1 / 30;
const MISSION_FRAME = 1 / 24;
const CAREER_FRAME = 1 / 24;
const CONTACT_FRAME = 1 / 24;
const INTEL_FRAME = 1 / 24;

type Ref<T> = { current: T | null };

type PendingKey =
  | 'heroPendingTarget'
  | 'missionPendingTarget'
  | 'careerPendingTarget'
  | 'intelPendingTarget'
  | 'contactPendingTarget';

export type LayoutMetrics = {
  viewportWidth: number;
  careerNodeSpacing: number;
  cardWidth: number;
  cardHeight: number;
};

export type CinematicSetters = {
  setScrolled: (v: boolean) => void;
  setMenuOpen: (v: boolean) => void;
  setMissionActiveIndex: (v: number) => void;
  setCareerActiveIndex: (v: number) => void;
  setIntelStatusIndex: (v: number) => void;
  setBrandStatusIndex: (v: number) => void;
  setIndicatorLabel: (v: string) => void;
  setLayout: (v: LayoutMetrics) => void;
};

const LABELS: Record<string, string> = {
  hero: 'Scroll to Begin',
  mission: 'Scroll to Explore Missions',
  career: 'Scroll Through Career',
  intel: 'Scroll to Decode',
};

function makeRef<T>(): Ref<T> {
  return { current: null };
}

export class CinematicEngine {
  // ---- DOM refs (plain { current } containers, usable directly as React refs) ----
  heroContainerRef = makeRef<HTMLDivElement>();
  heroVideoRef = makeRef<HTMLVideoElement>();
  indicatorRef = makeRef<HTMLDivElement>();

  brandContainerRef = makeRef<HTMLDivElement>();

  missionContainerRef = makeRef<HTMLDivElement>();
  missionVideoRef = makeRef<HTMLVideoElement>();
  missionTrackRef = makeRef<HTMLDivElement>();
  cardEls: (HTMLDivElement | null)[] = [];

  careerContainerRef = makeRef<HTMLDivElement>();
  careerVideoRef = makeRef<HTMLVideoElement>();
  careerRailRef = makeRef<HTMLDivElement>();

  intelContainerRef = makeRef<HTMLDivElement>();
  intelVideoRef = makeRef<HTMLVideoElement>();

  contactContainerRef = makeRef<HTMLDivElement>();
  contactVideoRef = makeRef<HTMLVideoElement>();

  // ---- mutable instance state (mirrors the original class's plain fields) ----
  private reducedMotion = false;
  private scrollActive = false;
  private mobileHasInteracted = false;

  private heroVisible = true;
  private missionVisible = true;
  private careerVisible = true;
  private intelVisible = true;
  private brandVisible = true;
  private contactVisible = true;

  private heroRaw = 0;
  private missionRaw = 0;
  private careerRaw = 0;
  private intelRaw = 0;

  private viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1600;
  private cardPositions: number[] = [];
  private trackWidth = 0;
  private startOffset = 0;
  private maxTravel = 0;
  private careerNodeSpacing = 260;
  private careerAnchors: { p: number; x: number }[] = [];
  private railX = 0;

  private heroPendingTarget: number | null = null;
  private missionPendingTarget: number | null = null;
  private careerPendingTarget: number | null = null;
  private intelPendingTarget: number | null = null;
  private contactPendingTarget: number | null = null;

  private rafScheduled = false;
  private rafId: number | null = null;
  private scrollIdleTimer: ReturnType<typeof setTimeout> | undefined;

  private missionActiveIndex = 0;
  private careerActiveIndex = 0;
  private intelStatusIndex = 0;
  private brandStatusIndex = 0;
  private scrolled = false;

  private heroObserver?: IntersectionObserver;
  private missionObserver?: IntersectionObserver;
  private careerObserver?: IntersectionObserver;
  private contactObserver?: IntersectionObserver;
  private intelObserver?: IntersectionObserver;
  private brandObserver?: IntersectionObserver;
  private trackResizeObserver?: ResizeObserver;

  private onScroll?: () => void;
  private onResize?: () => void;

  constructor(private setters: CinematicSetters) {}

  // ---- lifecycle ----

  mount() {
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.onScroll = () => {
      this.scrollActive = true;
      if (window.innerWidth <= 767) this.mobileHasInteracted = true;
      clearTimeout(this.scrollIdleTimer);
      this.scrollIdleTimer = setTimeout(() => {
        this.scrollActive = false;
        this.scheduleFrame();
      }, 1750);
      this.scheduleFrame();
    };
    this.onResize = () => {
      this.measureLayout();
      this.scheduleFrame();
    };
    window.addEventListener('scroll', this.onScroll, { passive: true, capture: true });
    window.addEventListener('resize', this.onResize, { passive: true });

    if (typeof IntersectionObserver !== 'undefined') {
      this.heroObserver = new IntersectionObserver((entries) => {
        this.heroVisible = entries[0].isIntersecting;
        this.scheduleFrame();
      }, { threshold: 0 });
      if (this.heroContainerRef.current) this.heroObserver.observe(this.heroContainerRef.current);

      this.missionObserver = new IntersectionObserver((entries) => {
        this.missionVisible = entries[0].isIntersecting;
        const track = this.missionTrackRef.current;
        if (track) track.style.willChange = this.missionVisible ? 'transform' : 'auto';
        this.scheduleFrame();
      }, { threshold: 0 });
      if (this.missionContainerRef.current) this.missionObserver.observe(this.missionContainerRef.current);

      this.careerObserver = new IntersectionObserver((entries) => {
        this.careerVisible = entries[0].isIntersecting;
        const rail = this.careerRailRef.current;
        if (rail) rail.style.willChange = this.careerVisible ? 'transform' : 'auto';
        this.scheduleFrame();
      }, { threshold: 0 });
      if (this.careerContainerRef.current) this.careerObserver.observe(this.careerContainerRef.current);

      this.contactObserver = new IntersectionObserver((entries) => {
        this.contactVisible = entries[0].isIntersecting;
        this.scheduleFrame();
      }, { threshold: 0 });
      if (this.contactContainerRef.current) this.contactObserver.observe(this.contactContainerRef.current);

      this.intelObserver = new IntersectionObserver((entries) => {
        this.intelVisible = entries[0].isIntersecting;
        this.scheduleFrame();
      }, { threshold: 0 });
      if (this.intelContainerRef.current) this.intelObserver.observe(this.intelContainerRef.current);

      this.brandObserver = new IntersectionObserver((entries) => {
        this.brandVisible = entries[0].isIntersecting;
        this.scheduleFrame();
      }, { threshold: 0 });
      if (this.brandContainerRef.current) this.brandObserver.observe(this.brandContainerRef.current);
    }

    if (typeof ResizeObserver !== 'undefined' && this.missionTrackRef.current) {
      this.trackResizeObserver = new ResizeObserver(() => this.measureLayout());
      this.trackResizeObserver.observe(this.missionTrackRef.current);
    }

    this.attachVideoLifecycle(this.heroVideoRef.current, HERO_FRAME, 'heroPendingTarget', true);
    this.attachVideoLifecycle(this.missionVideoRef.current, MISSION_FRAME, 'missionPendingTarget', false);
    this.attachVideoLifecycle(this.careerVideoRef.current, CAREER_FRAME, 'careerPendingTarget', true);
    this.attachVideoLifecycle(this.intelVideoRef.current, INTEL_FRAME, 'intelPendingTarget', true);
    this.attachVideoLifecycle(this.contactVideoRef.current, CONTACT_FRAME, 'contactPendingTarget', true);

    // Only the hero video (preload="auto" in markup) loads immediately.
    // The other four (~17MB combined) start as preload="none" and only
    // begin fetching once their section is within reach, so a first mobile
    // visit isn't stuck downloading video it may never scroll to.
    this.setupLazyPreload(this.missionContainerRef.current, this.missionVideoRef.current);
    this.setupLazyPreload(this.careerContainerRef.current, this.careerVideoRef.current);
    this.setupLazyPreload(this.intelContainerRef.current, this.intelVideoRef.current);
    this.setupLazyPreload(this.contactContainerRef.current, this.contactVideoRef.current);

    this.measureLayout();
    this.scheduleFrame();
  }

  private lazyPreloadObservers: IntersectionObserver[] = [];

  private setupLazyPreload(container: HTMLElement | null, video: HTMLVideoElement | null) {
    if (!container || !video || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        video.preload = 'auto';
        video.load();
        observer.disconnect();
      },
      // Positive rootMargin expands the trigger zone so loading starts
      // while the user is still scrolling through the preceding section,
      // not the instant this one becomes visible.
      { rootMargin: '600px 0px 600px 0px', threshold: 0 }
    );
    observer.observe(container);
    this.lazyPreloadObservers.push(observer);
  }

  unmount() {
    if (this.onScroll) window.removeEventListener('scroll', this.onScroll, { capture: true } as EventListenerOptions);
    if (this.onResize) window.removeEventListener('resize', this.onResize);
    this.heroObserver?.disconnect();
    this.missionObserver?.disconnect();
    this.careerObserver?.disconnect();
    this.contactObserver?.disconnect();
    this.intelObserver?.disconnect();
    this.brandObserver?.disconnect();
    this.trackResizeObserver?.disconnect();
    this.lazyPreloadObservers.forEach((o) => o.disconnect());
    this.lazyPreloadObservers = [];
    clearTimeout(this.scrollIdleTimer);
    if (this.rafId != null) cancelAnimationFrame(this.rafId);
    this.rafScheduled = false;
  }

  private attachVideoLifecycle(
    video: HTMLVideoElement | null,
    frameDuration: number,
    pendingKey: PendingKey,
    seekToEndOnReducedMotion: boolean
  ) {
    if (!video) return;
    video.addEventListener('loadedmetadata', () => {
      video.pause();
      video.currentTime = 0.01;
      if (this.reducedMotion) {
        video.currentTime = seekToEndOnReducedMotion ? Math.max(0, (video.duration || 0) - frameDuration) : 0.01;
      }
      this.scheduleFrame();
    });
    video.addEventListener('seeked', () => {
      const target = this[pendingKey];
      if (target != null) {
        this[pendingKey] = null;
        if (Math.abs(video.currentTime - target) >= frameDuration * 0.5) video.currentTime = target;
      }
    });
  }

  // ---- frame scheduling ----

  scheduleFrame = () => {
    if (this.rafScheduled) return;
    this.rafScheduled = true;
    this.rafId = requestAnimationFrame(this.onFrame);
  };

  private onFrame = () => {
    this.rafScheduled = false;
    this.updateProgress();
  };

  // ---- layout measurement (mount + resize only, never mid-scroll) ----

  measureLayout = () => {
    const vw = window.innerWidth;
    this.viewportWidth = vw;
    const trackEl = this.missionTrackRef.current;
    this.trackWidth = trackEl ? trackEl.scrollWidth : this.trackWidth;
    const cardWidth = vw >= 1600 ? 410 : vw <= 767 ? Math.min(vw * 0.84, 340) : 380;
    const cardHeight = vw >= 1600 ? 560 : vw <= 767 ? 480 : 520;
    const cardGap = vw <= 767 ? 16 : 28;
    this.cardPositions = MISSIONS.map((_, i) => i * (cardWidth + cardGap) + cardWidth / 2);
    const finalRightPadding = Math.max(48, vw * 0.12);
    this.maxTravel = Math.max(0, this.trackWidth - vw + finalRightPadding);
    this.startOffset = vw * 0.68;
    const missionEl = this.missionContainerRef.current;
    if (missionEl) {
      missionEl.style.setProperty('--start-offset', this.startOffset + 'px');
      missionEl.style.setProperty('--max-travel', this.maxTravel + 'px');
    }

    this.careerNodeSpacing = vw >= 1024 ? 260 : vw <= 767 ? 190 : 220;
    const vwCenter = vw / 2;
    const ns = this.careerNodeSpacing;
    const mids = CAREER_RECORDS.map((r) => (r.a + r.b) / 2);
    this.careerAnchors = [
      { p: 0, x: vwCenter - 0 * ns + vw * 0.35 },
      { p: mids[0], x: vwCenter - 0 * ns },
      { p: mids[1], x: vwCenter - 1 * ns },
      { p: mids[2], x: vwCenter - 2 * ns },
      { p: mids[3], x: vwCenter - 3 * ns },
      { p: 1, x: vwCenter - 3 * ns - vw * 0.15 },
    ];
    this.railX = this.interpolateRailX(this.careerRaw || 0);
    const careerEl = this.careerContainerRef.current;
    if (careerEl) careerEl.style.setProperty('--rail-x', this.railX + 'px');

    this.setters.setLayout({
      viewportWidth: vw,
      careerNodeSpacing: this.careerNodeSpacing,
      cardWidth,
      cardHeight,
    });
  };

  private interpolateRailX(p: number) {
    const anchors = this.careerAnchors;
    if (!anchors.length) return 0;
    for (let i = 0; i < anchors.length - 1; i++) {
      if (p <= anchors[i + 1].p) {
        const span = anchors[i + 1].p - anchors[i].p || 1;
        const t = (p - anchors[i].p) / span;
        return anchors[i].x + t * (anchors[i + 1].x - anchors[i].x);
      }
    }
    return anchors[anchors.length - 1].x;
  }

  private requestVideoSeek(video: HTMLVideoElement, target: number, frameDuration: number, pendingKey: PendingKey) {
    const safeTarget = Math.max(0, Math.min(target, Math.max(0, video.duration - frameDuration)));
    if (Math.abs(video.currentTime - safeTarget) < frameDuration * 0.5) return;
    if (video.seeking) {
      this[pendingKey] = safeTarget;
      return;
    }
    video.currentTime = safeTarget;
  }

  // ---- the per-frame update ----

  private updateProgress = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const scrolledNow = scrollTop > 40;
    if (scrolledNow !== this.scrolled) {
      this.scrolled = scrolledNow;
      this.setters.setScrolled(scrolledNow);
    }

    if (this.heroVisible && this.heroContainerRef.current) {
      const container = this.heroContainerRef.current;
      const rect = container.getBoundingClientRect();
      const scrollableDistance = container.offsetHeight - window.innerHeight;
      const p = Math.min(1, Math.max(0, -rect.top / (scrollableDistance || 1)));
      this.heroRaw = p;
      container.style.setProperty('--hp', String(p));
      const video = this.heroVideoRef.current;
      if (video && video.duration && !this.reducedMotion) {
        const target = p * Math.max(0, video.duration - HERO_FRAME);
        this.requestVideoSeek(video, target, HERO_FRAME, 'heroPendingTarget');
      }
    }

    if (this.missionVisible && this.missionContainerRef.current) {
      const mcontainer = this.missionContainerRef.current;
      const rect = mcontainer.getBoundingClientRect();
      const scrollableDistance = mcontainer.offsetHeight - window.innerHeight;
      const mp = Math.min(1, Math.max(0, -rect.top / (scrollableDistance || 1)));
      this.missionRaw = mp;
      mcontainer.style.setProperty('--mp', String(mp));
      const mvideo = this.missionVideoRef.current;
      if (mvideo && mvideo.duration && !this.reducedMotion) {
        const target = mp * Math.max(0, mvideo.duration - MISSION_FRAME);
        this.requestVideoSeek(mvideo, target, MISSION_FRAME, 'missionPendingTarget');
      }
      this.updateActiveCard(mp);
    }

    if (this.careerVisible && this.careerContainerRef.current) {
      const ccontainer = this.careerContainerRef.current;
      const rect = ccontainer.getBoundingClientRect();
      const scrollableDistance = ccontainer.offsetHeight - window.innerHeight;
      const cp = Math.min(1, Math.max(0, -rect.top / (scrollableDistance || 1)));
      this.careerRaw = cp;
      ccontainer.style.setProperty('--cp', String(cp));
      const cvideo = this.careerVideoRef.current;
      if (cvideo && cvideo.duration && !this.reducedMotion) {
        const target = cp * Math.max(0, cvideo.duration - CAREER_FRAME);
        this.requestVideoSeek(cvideo, target, CAREER_FRAME, 'careerPendingTarget');
      }
      this.railX = this.interpolateRailX(cp);
      ccontainer.style.setProperty('--rail-x', this.railX + 'px');
      const activeIdx = cp < 0.18 ? 0 : cp < 0.45 ? 1 : cp < 0.70 ? 2 : 3;
      if (activeIdx !== this.careerActiveIndex) {
        this.careerActiveIndex = activeIdx;
        this.setters.setCareerActiveIndex(activeIdx);
      }
    }

    if (this.intelVisible && this.intelContainerRef.current) {
      const icontainer = this.intelContainerRef.current;
      const rect = icontainer.getBoundingClientRect();
      const scrollableDistance = icontainer.offsetHeight - window.innerHeight;
      const sip = Math.min(1, Math.max(0, -rect.top / (scrollableDistance || 1)));
      this.intelRaw = sip;
      icontainer.style.setProperty('--sip', String(sip));
      const ivideo = this.intelVideoRef.current;
      if (ivideo && ivideo.duration && !this.reducedMotion) {
        const videoProgress = Math.max(0, Math.min(1, sip / 0.88));
        const target = videoProgress * Math.max(0, ivideo.duration - INTEL_FRAME);
        this.requestVideoSeek(ivideo, target, INTEL_FRAME, 'intelPendingTarget');
      }
      const statusIdx = sip < 0.12 ? 0 : sip < 0.30 ? 1 : 2;
      if (statusIdx !== this.intelStatusIndex) {
        this.intelStatusIndex = statusIdx;
        this.setters.setIntelStatusIndex(statusIdx);
      }
    }

    if (this.brandVisible && this.brandContainerRef.current) {
      const bcontainer = this.brandContainerRef.current;
      const rect = bcontainer.getBoundingClientRect();
      const scrollableDistance = bcontainer.offsetHeight - window.innerHeight;
      const bp = Math.min(1, Math.max(0, -rect.top / (scrollableDistance || 1)));
      bcontainer.style.setProperty('--bp', String(bp));
      const bStatusIdx = bp >= 0.96 ? 1 : 0;
      if (bStatusIdx !== this.brandStatusIndex) {
        this.brandStatusIndex = bStatusIdx;
        this.setters.setBrandStatusIndex(bStatusIdx);
      }
    }

    if (this.contactVisible && this.contactContainerRef.current) {
      const kcontainer = this.contactContainerRef.current;
      const rect = kcontainer.getBoundingClientRect();
      const scrollableDistance = kcontainer.offsetHeight - window.innerHeight;
      const ctp = Math.min(1, Math.max(0, -rect.top / (scrollableDistance || 1)));
      kcontainer.style.setProperty('--ctp', String(ctp));
      const kvideo = this.contactVideoRef.current;
      if (kvideo && kvideo.duration && !this.reducedMotion) {
        const videoProgress = Math.max(0, Math.min(1, ctp / 0.82));
        const target = videoProgress * Math.max(0, kvideo.duration - CONTACT_FRAME);
        this.requestVideoSeek(kvideo, target, CONTACT_FRAME, 'contactPendingTarget');
      }
    }

    this.updateScrollIndicator();
  };

  private updateScrollIndicator() {
    const el = this.indicatorRef.current;
    if (!el) return;
    let key: string | null = null;
    if (this.heroVisible && this.heroRaw < 0.92) key = 'hero';
    else if (this.missionVisible && this.missionRaw > 0 && this.missionRaw < 0.92) key = 'mission';
    else if (this.careerVisible && this.careerRaw > 0 && this.careerRaw < 0.92) key = 'career';
    else if (this.intelVisible && this.intelRaw > 0 && this.intelRaw < 0.92) key = 'intel';

    const mobileHidden = window.innerWidth <= 767 && this.mobileHasInteracted;
    let opacity = 0;
    if (key && !mobileHidden) {
      opacity = this.scrollActive ? 0.25 : 1;
    }
    el.style.setProperty('--indicator-opacity', String(opacity));

    if (key) this.setters.setIndicatorLabel(LABELS[key]);
  }

  /** Active-center-card emphasis is applied straight to the DOM via refs — no re-render on scroll. */
  private updateActiveCard(mp: number) {
    const cardProgress = this.reducedMotion ? 1 : Math.max(0, Math.min(1, (mp - 0.10) / 0.82));
    const trackX = this.startOffset - cardProgress * (this.maxTravel + this.startOffset);
    const vw = this.viewportWidth;
    let bestIdx = 0;
    let bestNorm = -1;
    this.cardPositions.forEach((centerOffset, i) => {
      const centerPos = trackX + centerOffset;
      const dist = Math.abs(centerPos - vw / 2);
      const norm = Math.max(0, 1 - dist / (vw * 0.6));
      if (norm > bestNorm) {
        bestNorm = norm;
        bestIdx = i;
      }
      const el = this.cardEls[i];
      if (el) {
        el.style.transform = 'scale(' + (0.93 + norm * 0.07).toFixed(4) + ') translateY(' + ((1 - norm) * 20).toFixed(2) + 'px)';
        el.style.opacity = (0.58 + norm * 0.42).toFixed(4);
        el.style.filter = 'saturate(' + (0.85 + norm * 0.15).toFixed(4) + ')';
      }
    });
    if (bestIdx !== this.missionActiveIndex) {
      this.missionActiveIndex = bestIdx;
      this.setters.setMissionActiveIndex(bestIdx);
    }
  }

  setCardRef = (index: number) => (el: HTMLDivElement | null) => {
    this.cardEls[index] = el;
  };

  // ---- scroll navigation helpers ----

  private getScrollRoot(): HTMLElement {
    const doc = document.documentElement;
    if (doc.scrollHeight > doc.clientHeight + 1) return doc;
    if (document.body.scrollHeight > document.body.clientHeight + 1) return document.body;
    return doc;
  }

  /**
   * Fixed-duration eased scroll, independent of distance. Native
   * `scrollTo({behavior:'smooth'})` scales its duration with distance in
   * most browsers, which made nav-link jumps across this ~25,000px page
   * take 6-7s. Every programmatic jump on this site goes through here so
   * it always completes in `duration` regardless of how far it travels.
   */
  private smoothScrollTo(target: number, duration = 750) {
    const root = this.getScrollRoot();
    const startTop = root.scrollTop;
    const startTime = performance.now();
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const step = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration);
      root.scrollTop = startTop + (target - startTop) * ease(t);
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  private smoothScrollBy(delta: number, duration = 500) {
    const root = this.getScrollRoot();
    this.smoothScrollTo(root.scrollTop + delta, duration);
  }

  goToPrevMission = () => {
    const container = this.missionContainerRef.current;
    if (!container) return;
    const scrollableDistance = container.offsetHeight - window.innerHeight;
    const missionStep = scrollableDistance / Math.max(1, MISSIONS.length - 1);
    this.smoothScrollBy(-missionStep);
  };

  goToNextMission = () => {
    const container = this.missionContainerRef.current;
    if (!container) return;
    const scrollableDistance = container.offsetHeight - window.innerHeight;
    const missionStep = scrollableDistance / Math.max(1, MISSIONS.length - 1);
    this.smoothScrollBy(missionStep);
  };

  openMenu = () => this.setters.setMenuOpen(true);
  closeMenu = () => this.setters.setMenuOpen(false);

  private scrollToProgress(ref: Ref<HTMLElement>, progress: number) {
    const el = ref.current;
    if (!el) return;
    const scrollableDistance = el.offsetHeight - window.innerHeight;
    const target = el.offsetTop + progress * scrollableDistance;
    this.smoothScrollTo(target);
  }

  goToProfile = (e?: { preventDefault: () => void }) => {
    e?.preventDefault();
    this.closeMenu();
    this.scrollToProgress(this.heroContainerRef, 0);
  };
  goToMissionsStart = (e?: { preventDefault: () => void }) => {
    e?.preventDefault();
    this.closeMenu();
    this.scrollToProgress(this.missionContainerRef, 0.05);
  };
  goToCareerStart = (e?: { preventDefault: () => void }) => {
    e?.preventDefault();
    this.closeMenu();
    this.scrollToProgress(this.careerContainerRef, 0.05);
  };
  goToIntelSkills = (e?: { preventDefault: () => void }) => {
    e?.preventDefault();
    this.closeMenu();
    this.scrollToProgress(this.intelContainerRef, 0.99);
  };

  /** "Contact Me" should land on the fully-revealed final frame of the Contact section, not its scroll-start. */
  goToContactEnd = (e?: { preventDefault: () => void }) => {
    e?.preventDefault();
    const el = this.contactContainerRef.current;
    if (!el) {
      window.location.hash = '#contact';
      return;
    }
    const target = el.offsetTop + el.offsetHeight - window.innerHeight - 2;
    this.smoothScrollTo(target);
  };

  closeMenuAndGoToContact = (e?: { preventDefault: () => void }) => {
    this.closeMenu();
    this.goToContactEnd(e);
  };
}
