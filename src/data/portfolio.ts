export type NavLink = {
  num: string;
  label: string;
  href: string;
  scrollTarget: 'profile' | 'missions' | 'career' | 'intel';
};

export const NAV_LINKS: NavLink[] = [
  { num: '01', label: 'Profile', href: '#hero', scrollTarget: 'profile' },
  { num: '02', label: 'Missions', href: '#projects', scrollTarget: 'missions' },
  { num: '03', label: 'Career Record', href: '#career-record', scrollTarget: 'career' },
  { num: '04', label: 'Strategic Intel', href: '#strategic-intel', scrollTarget: 'intel' },
];

export type Stat = { value: string; label: string };

export const HERO_STATS: Stat[] = [
  { value: '13+', label: 'Years in Industry' },
  { value: '1.5M', label: 'Gamers Connected' },
  { value: '50+', label: 'IP Created' },
];

export type Mission = {
  id: string;
  projectName: string;
  location: string;
  href?: string;
  img: string;
};

export const MISSIONS: Mission[] = [
  { id: 'def-simr-challenge', projectName: 'DEF SIMR Challenge', location: 'Dubai, UAE', href: 'https://www.youtube.com/watch?v=y4dBUQdEruc', img: '/assets/missions/def-simr-challenge.png' },
  { id: 'f1-sim-racing-open', projectName: 'F1 Sim Racing Open', location: 'Mumbai, India', href: 'https://www.instagram.com/p/Da0PVXKNqAl/', img: '/assets/missions/f1-sim-racing-open.png' },
  { id: 'red-bull-tetris-championship', projectName: 'Red Bull Tetris Championship', location: 'Dubai, UAE', href: 'https://www.instagram.com/reels/DSPBNcRkdW5/', img: '/assets/missions/red-bull-tetris.avif' },
  { id: 'appgallery-pubg-mobile', projectName: 'AppGallery Gamers Cup: PUBG Mobile', location: 'Riyadh, Saudi Arabia', href: 'https://youtu.be/4J_R03ZuEhE?si=9ImFB4_N1LaX6A9h', img: '/assets/missions/appgallery-pubg-saudi.avif' },
  { id: 'appgallery-yalla-ludo', projectName: 'AppGallery Gamers Cup: Yalla Ludo', location: 'Abu Dhabi, UAE', href: 'https://youtu.be/4pndAgeD9ww?si=U1K0iXbdrKw_LJ_o', img: '/assets/missions/yalla-ludo.webp' },
  { id: 'hp-asia-challenger-series', projectName: 'HP Asia Challenger Series 2019', location: 'Jakarta, Indonesia', href: 'https://www.youtube.com/live/gRqM7N6I7HM?si=-TdVz3D4ad9TL_jG', img: '/assets/missions/hp-asia-challenger.jpg' },
  { id: 'pubg-mobile-india-tour', projectName: 'PUBG Mobile India Tour', location: 'Kolkata, India', href: 'https://youtu.be/33SLLuoAuaw?si=jqhKvwcWpdFVoixa', img: '/assets/missions/pubg-india-tour.jpg' },
  { id: 'conquerors-insignia', projectName: 'Conquerors Insignia 2019', location: 'Kuala Lumpur, Malaysia', href: 'https://www.youtube.com/watch?v=7UvbRzvPLJQ&t=219s', img: '/assets/missions/conquerors-insignia.jpg' },
  { id: 'pubg-campus-championship', projectName: 'PUBG Mobile Campus Championship 2018', location: 'Bangalore, India', href: 'https://youtu.be/f9PmoV0mUNA?si=GiCcYFvQCsLdLPJY', img: '/assets/missions/pubg-campus-championship.jpg' },
];

export type BrandLogo = { name: string; file: string; forceWhite?: boolean };

export const BRAND_LOGOS: BrandLogo[] = [
  { name: 'KRAFTON', file: 'krafton.png', forceWhite: true },
  { name: 'PlayStation', file: 'playstation.png', forceWhite: true },
  { name: 'ASUS Republic of Gamers', file: 'asus-rog.png' },
  { name: 'e&', file: 'e-and.png' },
  { name: 'HP OMEN', file: 'hp-omen.png' },
  { name: 'Red Bull', file: 'red-bull.png' },
  { name: 'Garena', file: 'garena.png' },
  { name: 'IndiaJoy', file: 'indiajoy.png', forceWhite: true },
  { name: 'Monster Energy', file: 'monster-energy.png' },
  { name: 'Razer', file: 'razer.png' },
  { name: 'Nimo TV', file: 'nimo-tv.png' },
  { name: 'Acer Predator', file: 'acer-predator.png' },
  { name: 'Twitch', file: 'twitch.png' },
  { name: 'Bigg', file: 'bigg.png' },
  { name: 'Trinity Gaming', file: 'trinity-gaming.png' },
  { name: 'ViewSonic', file: 'viewsonic.png' },
  { name: 'PublishMe', file: 'publishme.png' },
  { name: 'ASUS', file: 'asus.png' },
  { name: 'Rove Hotels', file: 'rove-hotels.png' },
  { name: 'Tencent Games', file: 'tencent-games.png' },
  { name: 'Ubisoft', file: 'ubisoft.png' },
  { name: "Gold's Gym", file: 'golds-gym.png' },
  { name: 'Xiaomi', file: 'xiaomi.png' },
  { name: "Domino's", file: 'dominos.png' },
  { name: 'TechXHub', file: 'techxhub.png' },
];

export type CareerRecord = {
  num: string;
  company: string;
  role: string;
  period: string;
  supportingLine: string;
  side: 'left' | 'right';
  /** Scroll-progress window [a, b] within the Career Record section (0–1) during which this record is the active one. */
  a: number;
  b: number;
  details: string[];
};

export const CAREER_RECORDS: CareerRecord[] = [
  {
    num: '01',
    company: 'IT Career',
    role: 'Senior Network Administrator',
    period: 'Jan 2011 — Oct 2016',
    supportingLine: 'Infrastructure • Support Operations • Team Leadership',
    side: 'right',
    a: 0,
    b: 0.18,
    details: [
      'Managed enterprise network and server-support operations.',
      'Progressed through NComputing, HCL Infosystems, Connectix and Ever Electronics.',
      'Led technical teams and handled large-scale support delivery.',
    ],
  },
  {
    num: '02',
    company: 'Playtonia Esports',
    role: 'Chief Gaming Officer',
    period: 'Nov 2016 — Mar 2024',
    supportingLine: 'Startup Building • Esports IP • Platform Growth',
    side: 'right',
    a: 0.18,
    b: 0.45,
    details: [
      'Built an esports technology platform serving 1.5M gamers.',
      'Created and executed more than 50 esports IPs.',
      'Built partnerships with more than 100 brands and game publishers.',
      'Generated approximately $1M through B2B, B2C and B2B2C strategies.',
    ],
  },
  {
    num: '03',
    company: 'ITP Media Group',
    role: 'Senior Esports Operations Manager',
    period: 'Mar 2024 — Feb 2025',
    supportingLine: 'MENA Operations • Campaigns • Commercial Delivery',
    side: 'left',
    a: 0.45,
    b: 0.70,
    details: [
      'Developed creative marketing concepts and multi-channel strategies.',
      'Secured approximately $650K in revenue through campaigns and new clients.',
      'Saved 47% of allocated budgets through efficient vendor management.',
      'Delivered major gaming and esports experiences across the MENA region.',
    ],
  },
  {
    num: '04',
    company: 'TechXHub DMCC',
    role: 'Head of Gaming & Esports',
    period: 'Apr 2025 — Present',
    supportingLine: 'Sim Racing • AI Esports Platform • AI & Gaming Strategy',
    side: 'left',
    a: 0.70,
    b: 1.00,
    details: [
      'Developed the XeSports brand and supporting platform.',
      'Secured approximately $500K through new technology offerings and clients.',
      'Created scalable sim-racing concepts using premium racing ecosystems.',
      'Integrated gaming brands into grassroots and retail-focused experiences.',
    ],
  },
];

export type TimelineNode = { num: string; year: string; name: string; roleLabel: string };

export const TIMELINE_NODES: TimelineNode[] = [
  { num: '01', year: '2011', name: 'IT Foundation', roleLabel: 'Network Admin' },
  { num: '02', year: '2016', name: 'Playtonia Esports', roleLabel: 'Chief Gaming Officer' },
  { num: '03', year: '2024', name: 'ITP Media Group', roleLabel: 'Ops Manager' },
  { num: '04', year: '2025', name: 'TechXHub DMCC', roleLabel: 'Head of Gaming' },
];

export type CapabilityGroup = {
  title: string;
  /** Scroll-progress window [a, b] within the Strategic Intel section (0–1) during which this group reveals. */
  a: number;
  b: number;
  tags: string[];
};

export const CAPABILITY_GROUPS: CapabilityGroup[] = [
  { title: 'Strategy & Leadership', a: 0.42, b: 0.62, tags: ['Go-to-Market Strategy', 'IP Scaling', 'Partnership Development', 'Team Leadership'] },
  { title: 'Gaming & Esports', a: 0.58, b: 0.78, tags: ['Tournament Operations', 'Broadcast Production', 'Sim Racing', 'Community Building'] },
  { title: 'AI & Technology', a: 0.74, b: 0.94, tags: ['Generative AI Pipelines', 'Content Automation', 'Data Analytics', 'Platform Architecture'] },
];
