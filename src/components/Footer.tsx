import Image from 'next/image'
import { Phone, Mail, MapPin } from 'lucide-react'

const quickLinks = [
  { href: '#services', label: 'Services' },
  { href: '#drilling', label: 'Diamond Drilling' },
  { href: '#construction', label: 'Construction' },
  { href: '#demolition', label: 'Demolition' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#contact', label: 'Contact' },
]

const services = [
  'Core Drilling',
  'Wall Sawing',
  'Wire Sawing',
  'Floor Sawing',
  'Ring Sawing',
  'Stitch Drilling',
  'GPR Scanning',
  'Anchor Drilling',
]

export default function Footer() {
  return (
    <footer className="bg-dark border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-10 h-10 rounded overflow-hidden ring-2 ring-crimson/20">
                <Image src="/logo.jpeg" alt="Lomagundi Construction" fill sizes="40px" className="object-cover" />
              </div>
              <div>
                <p className="font-display text-white text-sm font-bold tracking-wide leading-none">LOMAGUNDI</p>
                <p className="text-crimson text-[10px] font-semibold tracking-[0.15em] mt-0.5">
                  CONSTRUCTION SERVICES LTD
                </p>
              </div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-5">
              UK-registered specialists in diamond drilling &amp; sawing, construction, and demolition.
              Precision work. Professional standards.
            </p>
            <div className="space-y-2.5">
              <a href="tel:+447853518902" className="flex items-center gap-2 text-gray-500 hover:text-crimson transition-colors text-xs">
                <Phone size={13} className="text-crimson" />
                +44 7853 518902
              </a>
              <a
                href="mailto:info@lomagundiconstructionservicesltd.co.uk"
                className="flex items-center gap-2 text-gray-500 hover:text-royal transition-colors text-xs break-all"
              >
                <Mail size={13} className="text-royal" />
                info@lomagundiconstructionservicesltd.co.uk
              </a>
              <div className="flex items-center gap-2 text-gray-500 text-xs">
                <MapPin size={13} className="text-accent" />
                Registered in England &amp; Wales
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display text-sm font-bold text-white uppercase tracking-widest mb-5">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-500 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-crimson group-hover:w-3 transition-all duration-200" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-sm font-bold text-white uppercase tracking-widest mb-5">
              Drilling Services
            </h4>
            <ul className="space-y-2.5">
              {services.map((svc) => (
                <li key={svc}>
                  <a
                    href="#drilling"
                    className="text-gray-500 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-crimson group-hover:w-3 transition-all duration-200" />
                    {svc}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h4 className="font-display text-sm font-bold text-white uppercase tracking-widest mb-5">
              Emergency Line
            </h4>
            <p className="text-gray-500 text-sm leading-relaxed mb-5">
              For urgent drilling or construction requirements, we&apos;re available around the clock.
            </p>
            <a
              href="tel:+447853518902"
              className="block bg-crimson hover:bg-crimson-light text-white text-center font-semibold py-3 px-5 rounded-lg transition-colors text-sm mb-3"
            >
              Call Now: +44 7853 518902
            </a>
            <a
              href="https://wa.me/447853518902"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-[#25D366] text-center font-semibold py-3 px-5 rounded-lg transition-colors text-sm"
            >
              WhatsApp Us
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">
            &copy; {new Date().getFullYear()} Lomagundi Construction Services Ltd. All rights reserved.
            Registered in England &amp; Wales.
          </p>
          <p className="text-gray-700 text-xs">
            Diamond Drilling &bull; Construction &bull; Demolition
          </p>
        </div>
      </div>
    </footer>
  )
}
