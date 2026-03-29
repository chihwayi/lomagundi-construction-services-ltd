'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, Clock, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react'
import FadeIn from './FadeIn'

const SERVICES = [
  'Diamond Drilling & Sawing',
  'Core Drilling',
  'Wall/Track Sawing',
  'Wire Sawing',
  'Floor Sawing',
  'Construction',
  'Demolition',
  'Enablement Works',
  'Emergency Works',
  'Other',
]

type FormState = { name: string; email: string; phone: string; service: string; message: string }
type Status = 'idle' | 'loading' | 'success' | 'error'

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  })
  const [status, setStatus] = useState<Status>('idle')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', phone: '', service: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputCls =
    'w-full bg-dark-300/60 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-crimson/60 focus:ring-1 focus:ring-crimson/30 transition-all'

  return (
    <section id="contact" className="py-24 bg-dark-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-crimson/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <span className="text-crimson text-sm font-semibold tracking-[0.2em] uppercase">Get in Touch</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mt-3">
            Request a Free Quote
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            Tell us about your project and we&apos;ll get back to you within 24 hours with a tailored proposal.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Form */}
          <FadeIn className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="bg-dark-200 border border-white/8 rounded-2xl p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="John Smith"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="john@company.co.uk"
                    className={inputCls}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+44 7xxx xxxxxx"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">
                    Service Required
                  </label>
                  <select name="service" value={form.service} onChange={handleChange} className={inputCls}>
                    <option value="">Select a service…</option>
                    {SERVICES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wider">
                  Project Details *
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Describe your project — location, substrate, hole sizes, quantities, timescale…"
                  className={inputCls + ' resize-none'}
                />
              </div>

              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 bg-green-500/10 border border-green-500/30 rounded-xl px-4 py-3"
                >
                  <CheckCircle size={16} className="text-green-400" />
                  <p className="text-green-400 text-sm">
                    Message sent! We&apos;ll be in touch within 24 hours.
                  </p>
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 bg-crimson/10 border border-crimson/30 rounded-xl px-4 py-3"
                >
                  <AlertCircle size={16} className="text-crimson" />
                  <p className="text-crimson text-sm">Something went wrong. Please call us directly.</p>
                </motion.div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full flex items-center justify-center gap-2 bg-crimson hover:bg-crimson-light disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-colors text-sm tracking-wide"
              >
                {status === 'loading' ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending…
                  </span>
                ) : (
                  <>
                    Send Enquiry <Send size={15} />
                  </>
                )}
              </button>
            </form>
          </FadeIn>

          {/* Info */}
          <FadeIn className="lg:col-span-2" delay={0.1} direction="left">
            <div className="space-y-6">
              {[
                {
                  icon: Phone,
                  title: 'Phone & WhatsApp',
                  lines: ['+44 7853 518902'],
                  href: 'tel:+447853518902',
                  color: 'crimson',
                },
                {
                  icon: Mail,
                  title: 'Email',
                  lines: ['info@lomagundiconstructionservicesltd.co.uk'],
                  href: 'mailto:info@lomagundiconstructionservicesltd.co.uk',
                  color: 'royal',
                },
                {
                  icon: Clock,
                  title: 'Working Hours',
                  lines: ['Mon – Fri: 7:00am – 6:00pm', 'Saturday: 8:00am – 2:00pm', 'Emergency: 24/7'],
                  color: 'accent',
                },
                {
                  icon: MapPin,
                  title: 'Coverage',
                  lines: ['Nationwide UK Coverage', 'Registered in England & Wales'],
                  color: 'crimson',
                },
              ].map(({ icon: Icon, title, lines, href, color }) => (
                <div
                  key={title}
                  className="bg-dark-200 border border-white/8 rounded-2xl p-5 flex gap-4 items-start"
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      color === 'crimson'
                        ? 'bg-crimson/10'
                        : color === 'royal'
                        ? 'bg-royal/10'
                        : 'bg-accent/10'
                    }`}
                  >
                    <Icon
                      size={18}
                      className={
                        color === 'crimson'
                          ? 'text-crimson'
                          : color === 'royal'
                          ? 'text-royal'
                          : 'text-accent'
                      }
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{title}</p>
                    {lines.map((line) =>
                      href ? (
                        <a
                          key={line}
                          href={href}
                          className="block text-sm text-gray-300 hover:text-white transition-colors break-all"
                        >
                          {line}
                        </a>
                      ) : (
                        <p key={line} className="text-sm text-gray-300">
                          {line}
                        </p>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
