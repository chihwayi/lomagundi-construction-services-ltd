import { Hammer, CheckCircle, AlertTriangle } from 'lucide-react'
import FadeIn from './FadeIn'

const services = [
  'Structural Demolition',
  'Selective & Partial Demolition',
  'Internal Soft Strip',
  'Strip Out & Clearance',
  'Concrete Breaking & Removal',
  'Hazardous Material Management',
]

const safeguards = [
  'Full method statements & risk assessments',
  'COSHH & CDM compliance',
  'Waste management & recycling plans',
  'Traffic management if required',
]

export default function DemolitionSection() {
  return (
    <section id="demolition" className="py-24 bg-dark relative overflow-hidden">
      <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — card */}
          <FadeIn direction="right">
            <div className="bg-dark-100 border border-accent/20 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
                  <Hammer size={20} className="text-accent" />
                </div>
                <h3 className="font-display text-xl font-bold text-white">Our Demolition Services</h3>
              </div>
              <div className="space-y-3 mb-6">
                {services.map((svc) => (
                  <div key={svc} className="flex items-center gap-3 py-2.5 border-b border-white/5 last:border-0">
                    <CheckCircle size={15} className="text-accent flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{svc}</span>
                  </div>
                ))}
              </div>

              <div className="bg-accent/5 border border-accent/15 rounded-xl p-4">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle size={14} className="text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-xs font-semibold text-accent tracking-wide">Safety First</span>
                </div>
                <div className="space-y-1">
                  {safeguards.map((s) => (
                    <p key={s} className="text-xs text-gray-400">• {s}</p>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Right — text */}
          <FadeIn direction="left" delay={0.1}>
            <span className="text-accent text-sm font-semibold tracking-[0.2em] uppercase">Secondary Service</span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mt-3 mb-5">
              Demolition
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Controlled Demolition requires expert planning. We co-ordinate specialist demolition
              contractors with proven track records in structural and selective Demolition — always
              operating under our strict oversight and safety management framework.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              From simple soft strip to complex structural takedowns, we ensure every project is
              delivered safely, legally, and with minimum disruption to the surrounding area.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-white font-semibold py-3 px-7 rounded-lg transition-colors text-sm"
            >
              Get Demolition Quote
            </a>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
