'use client'
import { motion } from 'framer-motion'
import { CheckCircle, Zap, Shield, Wrench } from 'lucide-react'
import FadeIn from './FadeIn'

const drillingServices = [
  {
    title: 'Core Drilling',
    description: 'Circular penetrations through concrete, masonry and brick for cables, pipes, conduits and ventilation — any diameter, any depth.',
  },
  {
    title: 'Wall/Track Sawing',
    description: 'Precise vertical and horizontal cuts for new door and window openings, structural modifications and service penetrations.',
  },
  {
    title: 'Floor / Flat Sawing',
    description: 'Flat bed sawing for expansion joints, road reinstatement, slab removal and utility trenches with minimal disruption.',
  },
  {
    title: 'Wire Sawing',
    description: 'Removal of large or complex concrete sections where conventional sawing cannot reach. Ideal for bridges, foundations and heavy structures.',
  },
  {
    title: 'Ring Sawing',
    description: 'Restricted-access cutting for internal corners and areas inaccessible to larger equipment.',
  },
  {
    title: 'Stitch Drilling',
    description: 'Series of overlapping core holes to form clean openings — perfect where saw cuts are not viable.',
  },
  {
    title: 'Anchor Drilling',
    description: 'High-precision drilling for structural anchor installation, including post-installed rebar connections and fixings.',
  },
  {
    title: 'GPR Scanning',
    description: 'Ground Penetrating Radar surveys prior to any drilling to locate rebar, post-tension cables and utilities — zero compromise on safety.',
  },
]

const capabilities = [
  'Diameters from 10mm – 1500mm',
  'Reinforced concrete up to 3000mm thick',
  '3 Phase Power',
  'Generator Power 3kva – 100kva',
  'Depths up to 10 metres',
  'Wet & dry drilling available',
  'Dust suppression systems',
]

const certifications = [
  { icon: Shield, text: 'CSCS Certified Operatives' },
  { icon: CheckCircle, text: 'Fully Insured (£5m+)' },
  { icon: Zap, text: '24/7 Emergency Response' },
  { icon: Wrench, text: 'Latest Diamond Tooling' },
]

export default function DiamondDrilling() {
  return (
    <section id="drilling" className="py-24 bg-dark relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-grid-pattern" />
      <div className="absolute -top-48 -right-48 w-[600px] h-[600px] bg-crimson/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeIn className="mb-16">
          <div className="flex flex-wrap items-end gap-6 justify-between">
            <div>
              <span className="text-crimson text-sm font-semibold tracking-[0.2em] uppercase">Core Expertise</span>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-slate-900 mt-3 max-w-xl">
                Diamond Drilling &amp; Sawing
              </h2>
              <p className="text-gray-600 mt-4 max-w-2xl leading-relaxed">
                Diamond Drilling &amp; Sawing is our Specialty, our cup of tea — it&apos;s what we do best.
                Every operator holds recognised industry certifications, and we invest in the latest equipment
                to deliver cuts of surgical precision, on time, every time.
              </p>
            </div>
            <div className="hidden md:flex flex-col gap-3">
              {certifications.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-sm text-gray-700">
                  <Icon size={15} className="text-crimson flex-shrink-0" />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Services grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {drillingServices.map((svc, i) => (
            <FadeIn key={svc.title} delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -3, borderColor: 'rgba(220,20,60,0.5)' }}
                className="bg-dark-100 border border-slate-200 rounded-xl p-5 h-full transition-all duration-300 group"
              >
                <div className="w-8 h-0.5 bg-crimson mb-4 group-hover:w-12 transition-all duration-300" />
                <h4 className="font-display text-base font-bold text-slate-900 mb-2">{svc.title}</h4>
                <p className="text-gray-600 text-xs leading-relaxed">{svc.description}</p>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        {/* Capabilities + CTA bar */}
        <FadeIn>
          <div className="bg-dark-200 border border-crimson/20 rounded-2xl p-8 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-display text-2xl font-bold text-slate-900 mb-5">Technical Capabilities</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {capabilities.map((cap) => (
                  <div key={cap} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle size={14} className="text-crimson flex-shrink-0" />
                    {cap}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-gray-600 leading-relaxed text-sm">
                Whether you need a single core hole or a complex multi-phase drilling programme, our
                team provides full method statements, risk assessments, and site-specific engineering
                support.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center justify-center bg-crimson hover:bg-crimson-light text-white font-semibold py-3 px-8 rounded-lg transition-colors text-sm tracking-wide"
              >
                Request a Drilling Quote
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
