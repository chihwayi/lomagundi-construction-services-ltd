'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Menu, X, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#drilling', label: 'Diamond Drilling' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-dark-100/95 backdrop-blur-md border-b border-white/5 shadow-lg shadow-black/20'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 flex-shrink-0">
            <div className="relative w-9 h-9 lg:w-11 lg:h-11 rounded overflow-hidden ring-2 ring-crimson/30">
              <Image
                src="/logo.jpeg"
                alt="Lomagundi Construction Services Ltd"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <p className="font-display text-white text-sm lg:text-[15px] font-bold tracking-wide leading-none">
                LOMAGUNDI
              </p>
              <p className="text-crimson text-[10px] lg:text-[11px] font-semibold tracking-[0.2em] mt-0.5">
                CONSTRUCTION SERVICES
              </p>
            </div>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-400 hover:text-white text-sm font-medium tracking-wide transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-crimson group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+447853518902"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
            >
              <Phone size={15} className="text-crimson" />
              +44 7853 518902
            </a>
            <a
              href="#contact"
              className="bg-crimson hover:bg-crimson-light text-white px-5 py-2.5 rounded font-semibold text-sm tracking-wide transition-colors glow-crimson"
            >
              Get Free Quote
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-white p-2 rounded hover:bg-white/5 transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-dark-100/98 backdrop-blur-md border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 py-5 space-y-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block text-gray-300 hover:text-white py-3 px-2 text-base font-medium border-b border-white/5 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <a
                href="tel:+447853518902"
                className="flex items-center gap-2 text-gray-300 py-2 text-sm"
              >
                <Phone size={15} className="text-crimson" />
                +44 7853 518902
              </a>
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="bg-crimson text-white text-center py-3 rounded font-semibold"
              >
                Get Free Quote
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
