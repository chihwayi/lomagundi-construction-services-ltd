'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ImageIcon, LayoutGrid } from 'lucide-react'
import FadeIn from './FadeIn'
import type { GalleryCategory } from './Gallery'

const PREVIEW_COUNT = 9

// ─── Lightbox ────────────────────────────────────────────────────────────────
interface LightboxProps {
  images: string[]
  initialIndex: number
  onClose: () => void
}

function Lightbox({ images, initialIndex, onClose }: LightboxProps) {
  const [index, setIndex]     = useState(initialIndex)
  const [dir, setDir]         = useState(0)
  const [imgLoaded, setImgLoaded] = useState(false)
  const activeThumbRef        = useRef<HTMLButtonElement>(null)
  const touchStartX           = useRef<number | null>(null)

  const prev = useCallback(() => {
    setDir(-1)
    setImgLoaded(false)
    setIndex((i) => (i - 1 + images.length) % images.length)
  }, [images.length])

  const next = useCallback(() => {
    setDir(1)
    setImgLoaded(false)
    setIndex((i) => (i + 1) % images.length)
  }, [images.length])

  // ── Preload adjacent images so navigation feels instant ──────────────────
  useEffect(() => {
    const load = (src: string) => { const i = new window.Image(); i.src = src }
    load(images[(index + 1) % images.length])
    load(images[(index - 1 + images.length) % images.length])
    load(images[(index + 2) % images.length])
  }, [index, images])

  // ── Keyboard navigation + body scroll lock ───────────────────────────────
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

  // ── Keep active thumbnail in view ────────────────────────────────────────
  useEffect(() => {
    activeThumbRef.current?.scrollIntoView({
      behavior: 'smooth', block: 'nearest', inline: 'center',
    })
  }, [index])

  // ── Touch swipe handlers ─────────────────────────────────────────────────
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const delta = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(delta) > 40) delta > 0 ? next() : prev()
    touchStartX.current = null
  }

  const variants = {
    enter:  (d: number) => ({ x: d >= 0 ? '100%' : '-100%', opacity: 0   }),
    center:              ({ x: 0,                             opacity: 1   }),
    exit:   (d: number) => ({ x: d >= 0 ? '-40%' : '40%',   opacity: 0   }),
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className="fixed inset-0 z-[200] bg-black flex flex-col"
    >
      {/* ── Header ── */}
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
          aria-label="Close"
        >
          <X size={17} className="text-white" />
        </button>
      </div>

      {/* ── Main image area ── */}
      <div
        className="flex-1 relative overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <button
          onClick={prev}
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/8 hover:bg-white/18 border border-white/10 flex items-center justify-center transition-all hover:scale-105"
          aria-label="Previous"
        >
          <ChevronLeft size={20} className="text-white" />
        </button>

        <AnimatePresence initial={false} custom={dir}>
          <motion.div
            key={index}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-0 flex items-center justify-center px-14 sm:px-20"
          >
            {!imgLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 border-2 border-white/15 border-t-crimson rounded-full animate-spin" />
              </div>
            )}
            <div
              className="relative w-full h-full transition-opacity duration-200"
              style={{ opacity: imgLoaded ? 1 : 0 }}
            >
              <Image
                src={images[index]}
                alt={`Project photo ${index + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 85vw"
                priority
                onLoad={() => setImgLoaded(true)}
              />
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={next}
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/8 hover:bg-white/18 border border-white/10 flex items-center justify-center transition-all hover:scale-105"
          aria-label="Next"
        >
          <ChevronRight size={20} className="text-white" />
        </button>
      </div>

      {/* ── Thumbnail strip ── */}
      <div className="flex-shrink-0 border-t border-white/8 bg-black/50">
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
                setImgLoaded(false)
                setIndex(i)
              }}
              className={`
                relative flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden
                transition-all duration-200
                ${i === index
                  ? 'ring-2 ring-crimson ring-offset-1 ring-offset-black scale-110'
                  : 'opacity-40 hover:opacity-80 ring-1 ring-white/10'}
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

// ─── Gallery Grid ─────────────────────────────────────────────────────────────
interface GalleryGridProps {
  images: string[]
  categories: GalleryCategory[]
}

function ImageGrid({ images, onOpen }: { images: string[]; onOpen: (i: number) => void }) {
  const preview   = images.slice(0, PREVIEW_COUNT)
  const remaining = images.length - PREVIEW_COUNT

  if (images.length === 0) {
    return (
      <FadeIn>
        <div className="border-2 border-dashed border-slate-300 rounded-2xl py-24 px-8 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <ImageIcon size={28} className="text-gray-400" />
          </div>
          <h3 className="font-display text-xl font-bold text-gray-500 mb-2">No photos yet</h3>
          <p className="text-gray-500 text-sm max-w-sm mx-auto">
            Photos will appear here once added to this category folder.
          </p>
        </div>
      </FadeIn>
    )
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
        {preview.map((src, i) => {
          const isLastCell = i === PREVIEW_COUNT - 1 && remaining > 0
          return (
            <FadeIn key={src} delay={i * 0.04}>
              <motion.button
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.18 }}
                onClick={() => onOpen(i)}
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
                {!isLastCell && (
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                )}
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

      <FadeIn className="mt-8 text-center" delay={0.1}>
        <button
          onClick={() => onOpen(0)}
          className="inline-flex items-center gap-2.5 border border-slate-300 hover:border-crimson/50 hover:text-crimson text-gray-600 px-8 py-3 rounded-xl font-semibold text-sm transition-all hover:bg-crimson/5"
        >
          <LayoutGrid size={15} />
          View all {images.length} photos
        </button>
      </FadeIn>
    </>
  )
}

export default function GalleryGrid({ images, categories }: GalleryGridProps) {
  const hasCats = categories.length > 0
  const [activeTab, setActiveTab] = useState<string>(hasCats ? categories[0].slug : '__all__')
  const [lightboxImages, setLightboxImages] = useState<string[]>([])
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const activeImages = hasCats
    ? (categories.find((c) => c.slug === activeTab)?.images ?? [])
    : images

  const openLightbox = (i: number) => {
    setLightboxImages(activeImages)
    setLightboxIndex(i)
  }

  return (
    <>
      <section id="gallery" className="py-24 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-14">
            <span className="text-crimson text-sm font-semibold tracking-[0.2em] uppercase">Our Work</span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-slate-900 mt-3">Project Gallery</h2>
          </FadeIn>

          {/* Category tabs */}
          {hasCats && (
            <FadeIn className="mb-10">
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => setActiveTab(cat.slug)}
                    className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                      activeTab === cat.slug
                        ? 'bg-crimson text-white shadow-lg shadow-crimson/20'
                        : 'bg-slate-100 text-gray-600 hover:bg-slate-200 border border-slate-200'
                    }`}
                  >
                    {cat.name}
                    <span className={`ml-2 text-xs ${activeTab === cat.slug ? 'text-white/70' : 'text-gray-400'}`}>
                      ({cat.images.length})
                    </span>
                  </button>
                ))}
              </div>
            </FadeIn>
          )}

          {/* Fallback: no categories, show all images */}
          {!hasCats && images.length > 0 && (
            <FadeIn className="mb-4 text-center">
              <p className="text-gray-500 text-sm">
                {images.length} photos — click any image to browse
              </p>
            </FadeIn>
          )}

          {!hasCats && images.length === 0 ? (
            <FadeIn>
              <div className="border-2 border-dashed border-slate-300 rounded-2xl py-24 px-8 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <ImageIcon size={28} className="text-gray-400" />
                </div>
                <h3 className="font-display text-xl font-bold text-gray-500 mb-2">Gallery Coming Soon</h3>
                <p className="text-gray-500 text-sm max-w-sm mx-auto">
                  Drop images into{' '}
                  <code className="text-crimson/70 bg-slate-100 px-1 rounded">public/images/</code> and
                  they appear here automatically.
                </p>
              </div>
            </FadeIn>
          ) : (
            <ImageGrid images={activeImages} onOpen={openLightbox} />
          )}
        </div>
      </section>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={lightboxImages}
            initialIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
