'use client'
import { motion } from 'framer-motion'
import { Drill, HardHat, Hammer, ArrowRight } from 'lucide-react'
import FadeIn from './FadeIn'

const services = [
  {
    icon: Drill,
    title: 'Diamond Drilling & Sawing',
    subtitle: 'Our Core Expertise',
    description:
      'As qualified diamond drilling specialists, we deliver unmatched precision for any substrate — concrete, reinforced concrete, brick, stone, or asphalt. This is where our expertise runs deepest.',
    features: ['Core Drilling', 'Wall Sawing', 'Wire Sawing', 'Floor Sawing', 'Ring Sawing', 'Stitch Drilling'],
    href: '#drilling',
    accent: 'crimson',
    large: true,
  },
  {
    icon: HardHat,
    title: 'Construction',
    subtitle: 'Managed by Professionals',
    description:
      'From structural works and commercial refurbishment to new builds and extensions — delivered through our trusted network of specialist contractors operating under our management.',
    features: ['New Builds', 'Refurbishment', 'Structural Works', 'Extensions'],
    href: '#construction',
    accent: 'royal',
    large: false,
  },
  {
    icon: Hammer,
    title: 'Demolition',
    subtitle: 'Safe & Controlled',
    description:
      'Controlled structural and selective demolition services, strip-outs, and soft strip works. Planned, managed, and executed to the highest UK safety standards.',
    features: ['Structural Demolition', 'Soft Strip', 'Selective Demolition', 'Strip Out'],
    href: '#demolition',
    accent: 'accent',
    large: false,
  },
]

const accentMap: Record<string, { border: string; icon: string; badge: string; btn: string }> = {
  crimson: {
    border: 'border-crimson/30 hover:border-crimson/60',
    icon: 'text-crimson bg-crimson/10',
    badge: 'bg-crimson/10 text-crimson',
    btn: 'bg-crimson hover:bg-crimson-light text-white',
  },
  royal: {
    border: 'border-royal/30 hover:border-royal/60',
    icon: 'text-royal bg-royal/10',
    badge: 'bg-royal/10 text-royal',
    btn: 'bg-royal hover:bg-royal-light text-white',
  },
  accent: {
    border: 'border-accent/30 hover:border-accent/60',
    icon: 'text-accent bg-accent/10',
    badge: 'bg-accent/10 text-accent',
    btn: 'bg-accent hover:bg-accent-light text-white',
  },
}

export default function ServicesOverview() {
  return (
    <section id="services" className="py-24 bg-dark-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <span className="text-crimson text-sm font-semibold tracking-[0.2em] uppercase">What We Do</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mt-3">
            Our Services
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            Specialised construction services built on precision, expertise, and the highest UK standards.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-3 gap-6">
          {services.map((svc, i) => {
            const colors = accentMap[svc.accent]
            const Icon = svc.icon
            return (
              <FadeIn
                key={svc.title}
                delay={i * 0.1}
                className={svc.large ? 'lg:col-span-1 lg:row-span-1' : ''}
              >
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25 }}
                  className={`h-full bg-dark-200 border ${colors.border} rounded-2xl p-7 flex flex-col transition-all duration-300`}
                >
                  <div className={`w-12 h-12 rounded-xl ${colors.icon} flex items-center justify-center mb-5`}>
                    <Icon size={24} strokeWidth={1.8} />
                  </div>

                  <div className="mb-3">
                    <span className={`text-xs font-semibold tracking-widest uppercase ${colors.badge} px-2.5 py-1 rounded-full`}>
                      {svc.subtitle}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-white mb-3">{svc.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-grow">{svc.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {svc.features.map((f) => (
                      <span key={f} className="text-xs text-gray-400 bg-white/5 px-3 py-1 rounded-full">
                        {f}
                      </span>
                    ))}
                  </div>

                  <a
                    href={svc.href}
                    className={`flex items-center justify-center gap-2 ${colors.btn} py-2.5 px-5 rounded-lg text-sm font-semibold transition-colors`}
                  >
                    Learn More <ArrowRight size={15} />
                  </a>
                </motion.div>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
