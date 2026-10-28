// Ilustrasi ikan cupang dalam SVG. Bentuk ekor menyesuaikan jenis ikan.
const EKOR = {
  Halfmoon: 'M70 60 C 20 -10, -10 40, 6 60 C -10 80, 20 130, 70 60 Z',
  Plakat: 'M70 60 C 45 35, 22 40, 24 60 C 22 80, 45 85, 70 60 Z',
  Crowntail: 'M70 60 L10 22 L28 42 L4 46 L26 56 L2 62 L26 68 L4 78 L28 80 L12 100 Z',
  'Double Tail': 'M70 60 C 30 10, 0 20, 10 50 L 30 60 L 10 70 C 0 100, 30 110, 70 60 Z',
  Giant: 'M70 60 C 35 25, 12 38, 16 60 C 12 82, 35 95, 70 60 Z',
  Veiltail: 'M70 60 C 40 30, 10 50, 4 100 C 20 95, 40 90, 70 60 Z',
};

export default function BettaSvg({ hex = '#d62839', jenis = 'Halfmoon', className }) {
  const giant = jenis === 'Giant';
  return (
    <svg viewBox="0 0 200 120" className={className} role="img" aria-label={`Ilustrasi cupang ${jenis}`}>
      <defs>
        <linearGradient id={`g-${hex}`} x1="0" x2="1">
          <stop offset="0" stopColor={hex} stopOpacity="0.55" />
          <stop offset="1" stopColor={hex} />
        </linearGradient>
      </defs>
      <path d={EKOR[jenis] || EKOR.Halfmoon} fill={`url(#g-${hex})`} />
      <path d="M95 44 C 105 10, 140 14, 150 42 Z" fill={hex} opacity="0.75" />
      <path d="M95 76 C 105 108, 135 104, 145 78 Z" fill={hex} opacity="0.75" />
      <ellipse cx="120" cy="60" rx={giant ? 58 : 52} ry={giant ? 22 : 18} fill={hex} />
      <path d="M150 64 C 145 80, 135 88, 128 92" stroke={hex} strokeWidth="4" fill="none" opacity="0.8" />
      <circle cx="158" cy="55" r="5" fill="#fff" />
      <circle cx="159" cy="55" r="2.6" fill="#111" />
      <path d="M100 52 Q 118 46 136 52" stroke="#fff" strokeOpacity="0.25" strokeWidth="3" fill="none" />
    </svg>
  );
}
