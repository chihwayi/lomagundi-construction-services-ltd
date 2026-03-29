import { Building2, CheckCircle } from 'lucide-react'
import FadeIn from './FadeIn'

const services = [
  'New Build Residential & Commercial',
  'Structural Alterations & Refurbishment',
  'Enablement Works',
  'Extensions & Conversions',
  'Commercial Fit-Out',
  'Planned Maintenance Works',
  'Project Management & Coordination',
]

export default function ConstructionSection() {
  return (
    <section id="construction" className="py-24 bg-dark-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <FadeIn direction="right">
            <span className="text-royal text-sm font-semibold tracking-[0.2em] uppercase">Secondary Service</span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-slate-900 mt-3 mb-5">
              Construction
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              We manage a curated network of qualified subcontractors across residential and commercial
              Construction disciplines. You get a single point of accountability — our management,
              coordination, and quality oversight — backed by a professional supply chain.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              From planning and procurement to handover, every project is run under our direct
              supervision to ensure compliance, programme, and quality standards are met.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-royal hover:bg-royal-light text-white font-semibold py-3 px-7 rounded-lg transition-colors text-sm"
            >
              Discuss Your Project
            </a>
          </FadeIn>

          {/* Right */}
          <FadeIn direction="left" delay={0.1}>
            <div className="bg-dark-200 border border-royal/20 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-royal/10 rounded-xl flex items-center justify-center">
                  <Building2 size={20} className="text-royal" />
                </div>
                <h3 className="font-display text-xl font-bold text-slate-900">Our Construction Services</h3>
              </div>
              <div className="space-y-3">
                {services.map((svc) => (
                  <div key={svc} className="flex items-center gap-3 py-2.5 border-b border-slate-100 last:border-0">
                    <CheckCircle size={15} className="text-royal flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{svc}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 bg-royal/5 border border-royal/15 rounded-xl p-4">
                <p className="text-xs text-gray-600 leading-relaxed">
                  All Construction works are carried out by vetted, insured subcontractors working
                  directly under Lomagundi Construction Services Ltd as principal contractor.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
