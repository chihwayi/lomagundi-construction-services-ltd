'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ImageIcon, LayoutGrid } from 'lucide-react'
import FadeIn from './FadeIn'

// ─── How many thumbnails to show in the page grid ────────────────────────────
const PREVIEW_COUNT = 9   // 3 × 3

// ─── Lightbox ────────────────────────────────────────────────────────────────
interface LightboxProps {
  images: string[]
  initialIndex: number
  onClose: () => void
}

function Lightbox({ images, initialIndex, onClose }: LightboxProps) {
  const [index, setIndex] = useState(initialIndex)
  const [dir, setDir] = useState(0)
  const activeThumbRef = useRef<HTMLButtonElement>(null)

  const prev = useCallback(() => {
    setDir(-1)
    setIndex((i) => (i - 1 + images.length) % images.length)
  }, [images.length])

  const next = useCallback(() => {
    setDir(1)
    setIndex((i) => (i + 1) % images.length)
  }, [images.length])

  // Keyboard navigation + lock body scroll
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape')     onClose()
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, prev, next])

  // Auto-scroll active thumbnail into view
  useEffect(() => {
    activeThumbRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    })
  }, [index])

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? '55%' : '-55%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:  (d: number) => ({ x: d > 0 ? '-55%' : '55%', opacity: 0 }),
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[200] bg-black/96 backdrop-blur-sm flex flex-col"
    >
      {/* ── Header bar ── */}
      <div className="flex-shrink-0 flex items-center justify-between px-5 py-3 border-b border-white/8">
        <span className="text-gray-400 text-sm font-mono tracking-wider">
          {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
        </span>
        <p className="hidden sm:block text-xs text-gray-600 tracking-widest uppercase font-semibold">
          Project Gallery
        </p>
        <button
          onClick={onClose}
          className="w-9 h-9 rounded-full bg-white/8 hover:bg-white/16 flex items-center justify-center transition-colors"
          aria-label="Close gallery"
        >
          <X size={17} className="text-white" />
        </button>
      </div>

      {/* ── Main image area ── */}
      <div className="flex-1 relative overflow-hidden flex items-center justify-center">

        {/* Prev arrow */}
        <button
          onClick={prev}
          className="absolute left-3 sm:left-5 z-20 w-11 h-11 rounded-full bg-white/8 hover:bg-white/18 border border-white/10 flex items-center justify-center transition-all hover:scale-105"
          aria-label="Previous image"
        >
          <ChevronLeft size={20} className="text-white" />
        </button>

        {/* Sliding image */}
        <AnimatePresence initial={false} custom={dir} mode="wait">
          <motion.div
            key={index}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: [0.32, 0, 0.67, 0] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.08}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) next()
              else if (info.offset.x > 60) prev()
            }}
            className="absolute inset-0 flex items-center justify-center px-16 cursor-grab active:cursor-grabbing"
          >
            <div className="relative w-full h-full max-w-5xl mx-auto">
              <Image
                src={images[index]}
                alt={`Project photo ${index + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 80vw"
                priority
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Next arrow */}
        <button
          onClick={next}
          className="absolute right-3 sm:right-5 z-20 w-11 h-11 rounded-full bg-white/8 hover:bg-white/18 border border-white/10 flex items-center justify-center transition-all hover:scale-105"
          aria-label="Next image"
        >
          <ChevronRight size={20} className="text-white" />
        </button>
      </div>

      {/* ── Thumbnail strip ── */}
      <div className="flex-shrink-0 border-t border-white/8 bg-black/40">
        <div
          className="flex gap-2 px-4 py-3 overflow-x-auto"
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#DC143C #1a1a26' }}
        >
          {images.map((src, i) => (
            <button
              key={i}
              ref={i === index ? activeThumbRef : null}
              onClick={() => {
                setDir(i > index ? 1 : -1)
                setIndex(i)
              }}
              className={`
                relative flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden
                transition-all duration-200
                ${i === index
                  ? 'ring-2 ring-crimson ring-offset-1 ring-offset-black scale-105'
                  : 'opacity-40 hover:opacity-75 ring-1 ring-white/10 hover:ring-white/25'
                }
              `}
              aria-label={`Go to photo ${i + 1}`}
            >
              <Image src={src} alt="" fill className="object-cover" sizes="64px" />
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// ─── Main Gallery Grid ────────────────────────────────────────────────────────
export default function GalleryGrid({ images }: { images: string[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const preview   = images.slice(0, PREVIEW_COUNT)
  const remaining = images.length - PREVIEW_COUNT

  return (
    <>
      <section id="gallery" className="py-24 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <FadeIn className="text-center mb-14">
            <span className="text-crimson text-sm font-semibold tracking-[0.2em] uppercase">Our Work</span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mt-3">
              Project Gallery
            </h2>
            {images.length > 0 && (
              <p className="text-gray-500 mt-3 text-sm">
                {images.length} photos — click any image to browse
              </p>
            )}
          </FadeIn>

          {images.length > 0 ? (
            <>
              {/* ── 3×3 preview grid ── */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                {preview.map((src, i) => {
                  const isLastCell = i === PREVIEW_COUNT - 1 && remaining > 0

                  return (
                    <FadeIn key={src} delay={i * 0.04}>
                      <motion.button
                        whileHover={{ scale: 1.015 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.18 }}
                        onClick={() => setLightboxIndex(i)}
                        className="relative w-full aspect-square rounded-xl overflow-hidden bg-dark-200 group block focus:outline-none focus-visible:ring-2 focus-visible:ring-crimson"
                        aria-label={isLastCell ? `View all ${images.length} photos` : `Open photo ${i + 1}`}
                      >
                        <Image
                          src={src}
                          alt={`Project ${i + 1}`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 50vw, 33vw"
                        />

                        {/* Standard hover darkening */}
                        {!isLastCell && (
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                        )}

                        {/* "+N more" overlay on the final cell */}
                        {isLastCell && (
                          <div className="absolute inset-0 bg-black/72 flex flex-col items-center justify-center gap-1.5 group-hover:bg-black/60 transition-colors">
                            <LayoutGrid size={26} className="text-white/80" />
                            <span className="font-display text-3xl font-bold text-white leading-none">
                              +{remaining}
                            </span>
                            <span className="text-xs text-gray-300 tracking-wide">more photos</span>
                          </div>
                        )}
                      </motion.button>
                    </FadeIn>
                  )
                })}
              </div>

              {/* ── View all button ── */}
              <FadeIn className="mt-8 text-center" delay={0.1}>
                <button
                  onClick={() => setLightboxIndex(0)}
                  className="inline-flex items-center gap-2.5 border border-white/12 hover:border-crimson/50 hover:text-white text-gray-400 px-8 py-3 rounded-xl font-semibold text-sm transition-all hover:bg-crimson/5"
                >
                  <LayoutGrid size={15} />
                  View all {images.length} photos
                </button>
              </FadeIn>
            </>
          ) : (
            <FadeIn>
              <div className="border-2 border-dashed border-white/10 rounded-2xl py-24 px-8 text-center">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <ImageIcon size={28} className="text-gray-600" />
                </div>
                <h3 className="font-display text-xl font-bold text-gray-500 mb-2">Gallery Coming Soon</h3>
                <p className="text-gray-600 text-sm max-w-sm mx-auto">
                  Drop any images (JPG, PNG, WebP, AVIF) into{' '}
                  <code className="text-crimson/70 bg-white/5 px-1 rounded">public/images/</code> and
                  they appear here automatically — uniformly cropped, no stretching.
                </p>
              </div>
            </FadeIn>
          )}
        </div>
      </section>

      {/* ── Lightbox portal ── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={images}
            initialIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
