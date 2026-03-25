'use client'
import { motion } from 'framer-motion'

// ─── Geometry ──────────────────────────────────────────────────────────────
const S = 380              // viewBox size
const C = S / 2            // centre = 190

const CROWN_OUTER_R = 158  // outer edge of cutting crown
const CROWN_INNER_R = 100  // inner edge of cutting crown (= barrel inner wall)
const BARREL_OUTER_R = 168 // outer barrel wall (slightly wider than crown)
const CORE_R = 84          // hollow core radius

// 8 segments × (30° segment + 15° gullet) = 360°
const N_SEG = 8
const SEG_SPAN = 30
const GULLET_SPAN = 15

// Diamond grit particle positions: [angleOffset°, radialFraction 0→1 across crown width]
const GRIT_DOTS: [number, number][] = [
  [4, 0.12], [14, 0.12], [24, 0.12],   // outer row (near cutting face)
  [7, 0.48], [20, 0.48],               // middle row
  [4, 0.82], [14, 0.82], [24, 0.82],  // inner row
]

// ─── Helpers ───────────────────────────────────────────────────────────────
function polar(deg: number, r: number): [number, number] {
  const rad = ((deg - 90) * Math.PI) / 180
  const round = (n: number) => Math.round(n * 1e4) / 1e4
  return [round(C + r * Math.cos(rad)), round(C + r * Math.sin(rad))]
}

function annularSector(
  startDeg: number,
  spanDeg: number,
  outerR: number,
  innerR: number
): string {
  const [ox1, oy1] = polar(startDeg, outerR)
  const [ox2, oy2] = polar(startDeg + spanDeg, outerR)
  const [ix2, iy2] = polar(startDeg + spanDeg, innerR)
  const [ix1, iy1] = polar(startDeg, innerR)
  const lg = spanDeg > 180 ? 1 : 0
  return (
    `M${ox1} ${oy1}` +
    `A${outerR} ${outerR} 0 ${lg} 1 ${ox2} ${oy2}` +
    `L${ix2} ${iy2}` +
    `A${innerR} ${innerR} 0 ${lg} 0 ${ix1} ${iy1}Z`
  )
}

// ─── Component ─────────────────────────────────────────────────────────────
export default function DrillBitViz() {
  const segments = Array.from({ length: N_SEG }, (_, i) => i * (SEG_SPAN + GULLET_SPAN))

  return (
    <div className="relative flex items-center justify-center select-none">
      {/* Ambient crimson glow behind bit */}
      <div className="absolute w-72 h-72 rounded-full bg-crimson/10 blur-3xl animate-pulse-glow" />

      <svg
        width={S}
        height={S}
        viewBox={`0 0 ${S} ${S}`}
        aria-label="Diamond core drill bit cross-section"
      >
        <defs>
          {/* Metallic steel gradient for crown segments — brighter for visibility */}
          <linearGradient id="seg-steel" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="#d8dfe8" />
            <stop offset="35%"  stopColor="#a0aab8" />
            <stop offset="100%" stopColor="#6a7585" />
          </linearGradient>

          {/* Segment side highlight (light edge) */}
          <linearGradient id="seg-highlight" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="rgba(255,255,255,0.25)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>

          {/* Diamond-matrix cutting face (crimson outer edge) */}
          <linearGradient id="cutting-face" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="#FF3A5C" />
            <stop offset="60%"  stopColor="#DC143C" />
            <stop offset="100%" stopColor="#9a0f2a" />
          </linearGradient>

          {/* Barrel body — visible steel, not too dark */}
          <linearGradient id="barrel" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="#4a5468" />
            <stop offset="50%"  stopColor="#323a4a" />
            <stop offset="100%" stopColor="#252d3d" />
          </linearGradient>

          {/* Outer barrel ring — slightly lighter to frame the crown */}
          <linearGradient id="barrel-outer" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="#5a6478" />
            <stop offset="100%" stopColor="#3a4255" />
          </linearGradient>

          {/* Radial vignette for depth */}
          <radialGradient id="depth-vignette" cx="50%" cy="50%" r="50%">
            <stop offset="60%"  stopColor="transparent" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.45)" />
          </radialGradient>

          {/* Inner core borehole gradient */}
          <radialGradient id="core-hole" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#1a1a26" />
            <stop offset="70%"  stopColor="#0d0d16" />
            <stop offset="100%" stopColor="#05050a" />
          </radialGradient>

          {/* Subtle highlight on segment tops */}
          <filter id="seg-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Soft glow for diamond particles */}
          <filter id="particle-glow">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Cutting edge shimmer */}
          <filter id="edge-glow">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── ROTATING ASSEMBLY ─────────────────────────────────── */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: `${C}px ${C}px` }}
        >
          {/* Outer barrel body ring — visible steel collar */}
          <circle cx={C} cy={C} r={BARREL_OUTER_R}      fill="url(#barrel-outer)" />
          <circle cx={C} cy={C} r={BARREL_OUTER_R - 10} fill="url(#barrel)" />
          {/* Bright outer edge ring — makes the drill clearly visible against dark bg */}
          <circle cx={C} cy={C} r={BARREL_OUTER_R}      fill="none" stroke="#7a8898" strokeWidth="1.5" />
          <circle cx={C} cy={C} r={BARREL_OUTER_R + 2}  fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

          {/* ─ Crown segments ─ */}
          {segments.map((startDeg, i) => {
            const crownWidth = CROWN_OUTER_R - CROWN_INNER_R  // 58px

            return (
              <g key={i}>
                {/* Segment body — steel matrix */}
                <path
                  d={annularSector(startDeg, SEG_SPAN, CROWN_OUTER_R, CROWN_INNER_R)}
                  fill="url(#seg-steel)"
                  stroke="#aab4c4"
                  strokeWidth="0.8"
                />

                {/* Cutting face — outermost 22% of crown, crimson diamond matrix */}
                <path
                  d={annularSector(startDeg, SEG_SPAN, CROWN_OUTER_R, CROWN_INNER_R + crownWidth * 0.78)}
                  fill="url(#cutting-face)"
                  filter="url(#edge-glow)"
                  opacity="0.85"
                />

                {/* Segment bevel highlight (top-left bright edge) */}
                <path
                  d={annularSector(startDeg, 3, CROWN_OUTER_R, CROWN_OUTER_R - 6)}
                  fill="rgba(255,255,255,0.18)"
                />
                <path
                  d={annularSector(startDeg, SEG_SPAN, CROWN_INNER_R + 2, CROWN_INNER_R)}
                  fill="rgba(255,255,255,0.08)"
                />

                {/* ─ Diamond grit particles ─ */}
                {GRIT_DOTS.map(([aOff, rFrac], j) => {
                  const angle = startDeg + aOff
                  const r = CROWN_INNER_R + crownWidth * rFrac
                  const [px, py] = polar(angle, r)
                  // Outer-row particles are brighter (embedded in cutting matrix)
                  const isCuttingZone = rFrac < 0.3
                  return (
                    <circle
                      key={j}
                      cx={px} cy={py}
                      r={isCuttingZone ? 3.2 : 2.4}
                      fill={isCuttingZone ? '#ffffff' : '#e8edf3'}
                      opacity={1}
                      filter="url(#particle-glow)"
                    />
                  )
                })}
              </g>
            )
          })}

          {/* ─ Gullets (dark voids between segments) ─
              These let coolant & debris escape — critical feature of any drill bit */}
          {segments.map((startDeg, i) => {
            const gulletStart = startDeg + SEG_SPAN
            // Small water port indicator at centre of each gullet
            const gulletMidDeg = gulletStart + GULLET_SPAN / 2
            const [wx, wy] = polar(gulletMidDeg, (CROWN_OUTER_R + CROWN_INNER_R) / 2)
            return (
              <g key={`g-${i}`}>
                {/* Gullet is simply the dark background showing through — but we add
                    a subtle highlight on each side wall */}
                <path
                  d={annularSector(gulletStart, 2, CROWN_OUTER_R + 2, CROWN_INNER_R - 2)}
                  fill="rgba(255,255,255,0.05)"
                />
                {/* Water port hole */}
                <circle cx={wx} cy={wy} r={3.5} fill="#08080f" stroke="#2a3040" strokeWidth="1" />
              </g>
            )
          })}

          {/* ─ Inner barrel wall ─ */}
          <circle
            cx={C} cy={C} r={CROWN_INNER_R}
            fill="url(#barrel)"
            stroke="#3a4255"
            strokeWidth="1.5"
          />

          {/* Depth vignette over entire assembly */}
          <circle cx={C} cy={C} r={BARREL_OUTER_R} fill="url(#depth-vignette)" />
        </motion.g>

        {/* ── STATIC ELEMENTS (don't rotate — reference frame) ───── */}

        {/* Core borehole — hollow centre where the core sample passes through */}
        <circle cx={C} cy={C} r={CORE_R} fill="url(#core-hole)" />
        {/* Core inner wall rings — machined steel look */}
        <circle cx={C} cy={C} r={CORE_R}      fill="none" stroke="#2a3040" strokeWidth="3" />
        <circle cx={C} cy={C} r={CORE_R - 6}  fill="none" stroke="#1e2535" strokeWidth="1" />
        <circle cx={C} cy={C} r={CORE_R - 14} fill="none" stroke="#161c28" strokeWidth="0.5" strokeDasharray="3 5" />

        {/* Centre axis marker */}
        <circle cx={C} cy={C} r={5}   fill="#DC143C" opacity="0.9" />
        <circle cx={C} cy={C} r={2.5} fill="#ffffff" />
        {/* Crosshair lines */}
        <line x1={C - 12} y1={C} x2={C + 12} y2={C} stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />
        <line x1={C} y1={C - 12} x2={C} y2={C + 12} stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />

        {/* ─ Technical annotation rings (static — look like engineering drawing callouts) ─ */}
        <circle
          cx={C} cy={C} r={BARREL_OUTER_R + 16}
          fill="none"
          stroke="rgba(65,105,225,0.18)"
          strokeWidth="1"
          strokeDasharray="6 4"
        />
        <circle
          cx={C} cy={C} r={CORE_R - 22}
          fill="none"
          stroke="rgba(65,105,225,0.12)"
          strokeWidth="0.8"
          strokeDasharray="3 5"
        />

        {/* ─ Dimension callout lines ─ */}
        {/* Diameter callout at 3 o'clock */}
        <line x1={C + BARREL_OUTER_R + 8} y1={C} x2={C + BARREL_OUTER_R + 22} y2={C}
          stroke="rgba(65,105,225,0.4)" strokeWidth="0.8" />
        <line x1={C + CORE_R + 4} y1={C} x2={C + BARREL_OUTER_R + 6} y2={C}
          stroke="rgba(65,105,225,0.2)" strokeWidth="0.5" strokeDasharray="2 3" />

        {/* ─ RPM / status badge ─ */}
        <motion.g
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <rect x={C + 88} y={C + 118} width={82} height={26} rx={6}
            fill="rgba(10,10,20,0.85)" stroke="rgba(220,20,60,0.5)" strokeWidth="1" />
          <text x={C + 129} y={C + 135} textAnchor="middle"
            fill="#DC143C" fontSize="9" fontFamily="monospace" letterSpacing="1.5">
            ⚙ DRILLING
          </text>
        </motion.g>

        {/* ─ Cooling spray lines (faint radial streaks from gullets) ─ */}
        <motion.g
          animate={{ opacity: [0, 0.6, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
          style={{ transformOrigin: `${C}px ${C}px` }}
        >
          {segments.map((startDeg, i) => {
            const gulletMidDeg = startDeg + SEG_SPAN + GULLET_SPAN / 2
            const [x1, y1] = polar(gulletMidDeg, CROWN_OUTER_R + 4)
            const [x2, y2] = polar(gulletMidDeg, CROWN_OUTER_R + 22)
            return (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="rgba(100,160,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
            )
          })}
        </motion.g>
      </svg>

    </div>
  )
}
