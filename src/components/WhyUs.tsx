'use client'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, Users, Clock, MapPin } from 'lucide-react'
import FadeIn from './FadeIn'

const stats = [
  { value: 15, suffix: '+', label: 'Years in the Industry' },
  { value: 500, suffix: '+', label: 'Projects Delivered' },
  { value: 100, suffix: '%', label: 'CSCS Certified Team' },
  { value: 24, suffix: '/7', label: 'Emergency Coverage' },
]

const differentiators = [
  {
    icon: ShieldCheck,
    title: 'Qualified & Certified',
    description:
      'Our lead operatives hold CSCS cards, and we carry full public liability and professional indemnity insurance. Every job comes with a full method statement and RAMS.',
  },
  {
    icon: Users,
    title: 'Single Point of Accountability',
    description:
      "Whether it's drilling, construction, or demolition — you deal with one company. We manage the coordination, compliance, and quality control end-to-end.",
  },
  {
    icon: Clock,
    title: '24/7 Emergency Response',
    description:
      "Construction doesn't stop at 5pm. Neither do we. Our emergency line is always open for urgent drilling and construction situations across the UK.",
  },
  {
    icon: MapPin,
    title: 'UK Nationwide Coverage',
    description:
      'Registered in England & Wales, we operate across all major UK regions. No job is too far — we bring our precision wherever you need it.',
  },
]

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          let start = 0
          const step = Math.ceil(target / 50)
          const timer = setInterval(() => {
            start += step
            if (start >= target) {
              setCount(target)
              clearInterval(timer)
            } else {
              setCount(start)
            }
          }, 30)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

export default function WhyUs() {
  return (
    <section className="py-24 bg-dark-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-crimson/5 via-transparent to-royal/5" />
      <div className="absolute inset-0 bg-grid-pattern" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <span className="text-crimson text-sm font-semibold tracking-[0.2em] uppercase">Why Choose Us</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mt-3">
            Built on Trust & Precision
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            Every project we take on carries our name — so we make sure it&apos;s done right.
          </p>
        </FadeIn>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.1}>
              <div className="text-center bg-dark-200 border border-white/8 rounded-2xl py-8 px-4">
                <div className="font-display text-4xl sm:text-5xl font-bold text-white mb-2">
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-gray-500 text-sm">{stat.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Differentiators */}
        <div className="grid sm:grid-cols-2 gap-6">
          {differentiators.map((item, i) => {
            const Icon = item.icon
            return (
              <FadeIn key={item.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -3 }}
                  className="bg-dark-200 border border-white/8 hover:border-crimson/30 rounded-2xl p-6 flex gap-5 transition-all duration-300"
                >
                  <div className="w-11 h-11 bg-crimson/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon size={20} className="text-crimson" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
