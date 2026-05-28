// Fiskostar ROBOCINQUE product catalogue data + shared SVG renderings.

const FINISHES = [
  {
    id: 'me',
    code: 'ME',
    name: 'läikiv messing',
    label: 'Läikiv messing',
    photo: 'https://colombodesignamerica.com/wp-content/uploads/2021/12/maniglia-robocinque-oroplus.jpg',
    // Polished brass — warm gold
    swatch: 'linear-gradient(135deg, #f7e6a8 0%, #d4a945 45%, #8a6817 100%)',
    lever: { base: '#d4a945', highlight: '#fbeeb0', shadow: '#7c5d10', edge: '#e6c460' },
    rosette: { base: '#c99a37', highlight: '#fae89b', shadow: '#6e520f' },
  },
  {
    id: 'cr',
    code: 'CR',
    name: 'läikiv kroom',
    label: 'Läikiv kroom',
    photo: 'https://colombodesignamerica.com/wp-content/uploads/2021/12/maniglia-robocinque-cromo.jpg',
    swatch: 'linear-gradient(135deg, #ffffff 0%, #c8ccd1 45%, #6e7780 100%)',
    lever: { base: '#c5cad0', highlight: '#ffffff', shadow: '#4f565d', edge: '#dde0e4' },
    rosette: { base: '#b6bcc3', highlight: '#ffffff', shadow: '#4a5158' },
  },
  {
    id: 'hcr',
    code: 'HCR',
    name: 'matt kroom',
    label: 'Matt kroom',
    photo: 'https://colombodesignamerica.com/wp-content/uploads/2021/12/maniglia-robocinque-cromat.jpg',
    swatch: 'linear-gradient(135deg, #d8dcdf 0%, #b3b8bd 50%, #8a9097 100%)',
    lever: { base: '#b9bec3', highlight: '#dcdfe2', shadow: '#7a7f85', edge: '#c4c8cc' },
    rosette: { base: '#b0b5ba', highlight: '#d5d8db', shadow: '#75797f' },
  },
  {
    id: 'mu',
    code: 'MU',
    name: 'matt must',
    label: 'Matt must',
    photo: 'https://colombodesignamerica.com/wp-content/uploads/2021/12/maniglia-robocinque-neromat.jpg',
    swatch: 'linear-gradient(135deg, #3a3a3a 0%, #1c1c1c 60%, #050505 100%)',
    lever: { base: '#1f1f1f', highlight: '#3a3a3a', shadow: '#000000', edge: '#2a2a2a' },
    rosette: { base: '#1a1a1a', highlight: '#333333', shadow: '#000000' },
  },
  {
    id: 'va',
    code: 'VA',
    name: 'matt valge',
    label: 'Matt valge',
    photo: 'https://colombodesignamerica.com/wp-content/uploads/2021/12/maniglia-robocinque-biancomat.jpg',
    swatch: 'linear-gradient(135deg, #ffffff 0%, #ececec 60%, #c8c8c8 100%)',
    lever: { base: '#f3f3f3', highlight: '#ffffff', shadow: '#cfcfcf', edge: '#e6e6e6' },
    rosette: { base: '#ededed', highlight: '#ffffff', shadow: '#c4c4c4' },
  },
];

const F_BY_ID = Object.fromEntries(FINISHES.map((f) => [f.id, f]));

// Door-handle variants (Ukselink). 4 product types share each finish.
const DOOR_TYPES = [
  {
    id: 'rsb',
    codePrefix: 'COL ID61RSB',
    name: 'Ukselink ROBOCINQUE',
    sub: 'Põhimudel, ilma võtmekilbita',
    prices: { me: 44.24, cr: 36.85, hcr: 42.16, mu: 34.96, va: 34.96 },
    estd: true,
  },
  {
    id: 'r',
    codePrefix: 'COL ID61R',
    name: 'Ukselink ROBOCINQUE',
    sub: 'Võtmekilbiga',
    prices: { me: 54.19, cr: 44.91, hcr: 51.54, mu: 42.63, va: 42.63 },
    estd: true,
  },
  {
    id: 'ry',
    codePrefix: 'COL ID61RY',
    name: 'Ukselink ROBOCINQUE',
    sub: 'Südamikukattega',
    prices: { me: 54.19, cr: 44.91, hcr: 51.54, mu: 42.63, va: 42.63 },
    estd: true,
  },
  {
    id: 'wc',
    codePrefix: 'COL CD49BZG6G',
    name: 'WC-sulgur',
    sub: '10×50 mm · 6 mm kara',
    prices: { me: 35.62, cr: 28.33, hcr: 33.82, mu: 26.81, va: 26.81 },
    estd: true,
  },
];

// Window-handle (Aknalink DK). Single type, 5 finishes.
const WINDOW_PRODUCT = {
  codePrefix: 'COL ID62 DK',
  name: 'Aknalink DK ROBOCINQUE',
  sub: 'Dreh-Kipp aknalink',
  prices: { me: 27.38, cr: 22.55, hcr: 25.96, mu: 21.51, va: 21.51 },
  estd: false,
};

function fmtPrice(n) {
  return '€ ' + n.toFixed(2).replace('.', ',');
}

function codeFor(type, finishId) {
  return `${type.codePrefix}-${finishId.toUpperCase()}`;
}

// ─────────────────────────────────────────────────────────────
// Handle SVG — stylised L-shaped door handle on a round rosette.
// Renders with the finish's gradient stops baked into <linearGradient>.
// ─────────────────────────────────────────────────────────────
function HandleSVG({ finish, type = 'door', size = 180, angle = 0 }) {
  const f = finish.lever;
  const r = finish.rosette;
  const uid = React.useId();

  if (type === 'window') {
    return (
      <svg viewBox="0 0 200 200" width={size} height={size} style={{ display: 'block' }}>
        <defs>
          <linearGradient id={`lev-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={f.highlight} />
            <stop offset="40%" stopColor={f.base} />
            <stop offset="100%" stopColor={f.shadow} />
          </linearGradient>
          <linearGradient id={`ros-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={r.highlight} />
            <stop offset="50%" stopColor={r.base} />
            <stop offset="100%" stopColor={r.shadow} />
          </linearGradient>
        </defs>
        {/* oval base */}
        <ellipse cx="100" cy="50" rx="28" ry="20" fill={`url(#ros-${uid})`} />
        <ellipse cx="100" cy="48" rx="22" ry="14" fill="none" stroke={r.shadow} strokeWidth="0.5" opacity="0.4" />
        {/* vertical lever */}
        <rect x="92" y="48" width="16" height="120" rx="2" fill={`url(#lev-${uid})`} />
        <rect x="92" y="48" width="3" height="120" fill={f.highlight} opacity="0.4" />
        {/* tip */}
        <rect x="92" y="160" width="16" height="14" rx="3" fill={`url(#lev-${uid})`} />
      </svg>
    );
  }

  // Door handle (L-shape with round rosette)
  return (
    <svg viewBox="0 0 240 200" width={size} height={size * (200 / 240)} style={{ display: 'block' }}>
      <defs>
        <linearGradient id={`lev-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={f.highlight} />
          <stop offset="50%" stopColor={f.base} />
          <stop offset="100%" stopColor={f.shadow} />
        </linearGradient>
        <linearGradient id={`lev-side-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={f.edge} />
          <stop offset="100%" stopColor={f.shadow} />
        </linearGradient>
        <radialGradient id={`ros-${uid}`} cx="0.35" cy="0.3" r="0.8">
          <stop offset="0%" stopColor={r.highlight} />
          <stop offset="55%" stopColor={r.base} />
          <stop offset="100%" stopColor={r.shadow} />
        </radialGradient>
      </defs>
      <g transform={`rotate(${angle} 120 100)`}>
        {/* rosette */}
        <circle cx="58" cy="100" r="42" fill={`url(#ros-${uid})`} />
        <circle cx="58" cy="100" r="42" fill="none" stroke={r.shadow} strokeWidth="0.5" opacity="0.5" />
        {/* L vertical (neck rising from rosette) */}
        <rect x="46" y="68" width="28" height="42" rx="2" fill={`url(#lev-side-${uid})`} />
        {/* L horizontal (lever extending right) */}
        <rect x="46" y="88" width="160" height="24" rx="3" fill={`url(#lev-${uid})`} />
        {/* tip */}
        <rect x="196" y="88" width="14" height="24" rx="3" fill={`url(#lev-side-${uid})`} />
        {/* top edge highlight on lever */}
        <rect x="46" y="88" width="160" height="3" fill={f.highlight} opacity="0.45" />
        {/* bottom edge shadow */}
        <rect x="46" y="109" width="160" height="2" fill={f.shadow} opacity="0.5" />
      </g>
    </svg>
  );
}

// Lifestyle background — abstract dark interior placeholder. Used behind
// the hero. No external images required.
function LifestyleBg({ tone = 'warm' }) {
  // Subtle interior: wall plane on the right, soft floor below, light wash.
  const palettes = {
    warm: { wall: '#d8cfc3', wallDark: '#a39685', floor: '#8a7a66', light: '#f0e5d5', shadow: '#43382a' },
    cool: { wall: '#cdd1d4', wallDark: '#8a9097', floor: '#5d6469', light: '#e8ebed', shadow: '#2a2e31' },
    dark: { wall: '#3d3d3d', wallDark: '#1f1f1f', floor: '#161616', light: '#5e5e5e', shadow: '#000000' },
  };
  const p = palettes[tone] || palettes.warm;
  return (
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" style={{ display: 'block' }}>
      <defs>
        <linearGradient id={`wall-${tone}`} x1="0" y1="0" x2="1" y2="0.4">
          <stop offset="0%" stopColor={p.light} />
          <stop offset="60%" stopColor={p.wall} />
          <stop offset="100%" stopColor={p.wallDark} />
        </linearGradient>
        <linearGradient id={`floor-${tone}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.wallDark} />
          <stop offset="100%" stopColor={p.floor} />
        </linearGradient>
        <radialGradient id={`light-${tone}`} cx="0.25" cy="0.2" r="0.7">
          <stop offset="0%" stopColor={p.light} stopOpacity="0.7" />
          <stop offset="100%" stopColor={p.light} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="500" fill={`url(#wall-${tone})`} />
      <rect y="360" width="400" height="140" fill={`url(#floor-${tone})`} />
      {/* door frame edge */}
      <rect x="0" y="0" width="100" height="500" fill={p.shadow} opacity="0.18" />
      <rect x="98" y="0" width="2" height="500" fill={p.shadow} opacity="0.3" />
      {/* light pool */}
      <rect width="400" height="500" fill={`url(#light-${tone})`} />
      {/* subtle floor shadow band */}
      <rect y="358" width="400" height="3" fill={p.shadow} opacity="0.25" />
    </svg>
  );
}

Object.assign(window, {
  FINISHES,
  F_BY_ID,
  DOOR_TYPES,
  WINDOW_PRODUCT,
  fmtPrice,
  codeFor,
  HandleSVG,
  LifestyleBg,
});
