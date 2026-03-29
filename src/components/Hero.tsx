'use client'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown, Shield, Star, Clock, Award } from 'lucide-react'
import DrillBitViz from './DrillBitViz'

const stats = [
  { icon: Award, value: '15+', label: 'Years Experience' },
  { icon: Star, value: '500+', label: 'Projects Completed' },
  { icon: Shield, value: 'CSCS', label: 'Certified Operators' },
  { icon: Clock, value: '24/7', label: 'Emergency Response' },
]

// Simple per-element fade-up, each with an explicit delay — no variant propagation
function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  }
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-dark">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-pattern" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-crimson/15 rounded-full blur-3xl animate-pulse-glow" />
      <div
        className="absolute bottom-1/4 -right-32 w-96 h-96 bg-royal/15 rounded-full blur-3xl animate-pulse-glow"
        style={{ animationDelay: '1.5s' }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-44 lg:pt-60 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* ── Left — content ── */}
          <div>
            {/* Badge */}
            <motion.div {...fadeUp(0.1)} className="inline-flex items-center gap-2 bg-sky-100 border border-crimson/30 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-crimson rounded-full animate-ping" />
              <span className="text-xs sm:text-sm text-slate-700 font-medium tracking-wide">
                UK Diamond Drilling &amp; Construction Specialists
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              {...fadeUp(0.22)}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6"
            >
              <span className="text-slate-900">Precision Core</span>
              <br />
              <span className="text-gradient-crimson">Drilling.</span>
              <br />
              <span className="text-slate-900">Built to Last.</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              {...fadeUp(0.34)}
              className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8 max-w-lg"
            >
              Lomagundi Construction Services Ltd delivers world-class Diamond Drilling &amp; Sawing,
              Construction, and Demolition across the UK. Qualified operators. Uncompromising standards.
            </motion.p>

            {/* CTAs */}
            <motion.div {...fadeUp(0.46)} className="flex flex-wrap gap-4 mb-12">
              <a
                href="#services"
                className="flex items-center gap-2 bg-crimson hover:bg-crimson-light text-white px-7 py-3.5 rounded font-semibold tracking-wide transition-all hover:shadow-lg hover:shadow-crimson/25 text-sm sm:text-base"
              >
                Explore Services <ArrowRight size={18} />
              </a>
              <a
                href="#contact"
                className="flex items-center gap-2 border border-slate-300 hover:border-crimson/50 text-slate-900 hover:text-crimson px-7 py-3.5 rounded font-semibold tracking-wide transition-all text-sm sm:text-base"
              >
                Get Free Quote
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              {...fadeUp(0.58)}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {stats.map(({ icon: Icon, value, label }) => (
                <div key={label} className="flex flex-col items-start">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon size={14} className="text-crimson" />
                    <span className="font-display text-xl font-bold text-slate-900">{value}</span>
                  </div>
                  <span className="text-xs text-gray-500 leading-tight">{label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right — drill bit ── */}
          <motion.div
            {...fadeUp(0.2)}
            className="hidden lg:flex items-center justify-center relative"
          >
            <DrillBitViz />

            <motion.div
              className="absolute top-8 right-0 bg-white/90 border border-slate-200 rounded-xl px-4 py-3 backdrop-blur-sm"
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <p className="text-xs text-gray-500 mb-0.5">Core Expertise</p>
              <p className="text-sm font-bold text-crimson font-display tracking-wide">DIAMOND DRILLING</p>
            </motion.div>

            <motion.div
              className="absolute bottom-8 left-0 bg-white/90 border border-slate-200 rounded-xl px-4 py-3 backdrop-blur-sm"
              animate={{ y: [0, 7, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            >
              <p className="text-xs text-gray-500 mb-0.5">Coverage</p>
              <p className="text-sm font-bold text-royal font-display tracking-wide">UK NATIONWIDE</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-gray-500 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ChevronDown size={18} className="text-gray-500" />
        </motion.div>
      </motion.div>
    </section>
  )
}
