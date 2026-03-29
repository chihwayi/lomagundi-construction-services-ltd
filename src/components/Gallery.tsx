import fs from 'fs'
import path from 'path'
import GalleryGrid from './GalleryGrid'

const IMAGE_EXTENSIONS = /\.(jpg|jpeg|png|webp|gif|avif|bmp|tiff?)$/i

export interface GalleryCategory {
  name: string
  slug: string
  images: string[]
}

const CATEGORIES: Pick<GalleryCategory, 'name' | 'slug'>[] = [
  { name: 'Diamond Drilling & Sawing', slug: 'diamond-drilling' },
  { name: 'Construction', slug: 'construction' },
  { name: 'Demolition', slug: 'demolition' },
]

export default function Gallery() {
  const imagesDir = path.join(process.cwd(), 'public', 'images')

  // Try to load categorised images from subdirectories
  const categories: GalleryCategory[] = []
  for (const cat of CATEGORIES) {
    const catDir = path.join(imagesDir, cat.slug)
    try {
      const files = fs.readdirSync(catDir)
      const images = files.filter((f) => IMAGE_EXTENSIONS.test(f)).map((f) => `/images/${cat.slug}/${f}`)
      if (images.length > 0) {
        categories.push({ ...cat, images })
      }
    } catch {
      // subdirectory not yet created — skip
    }
  }

  // Fall back to all images in root /images/ folder
  let allImages: string[] = []
  try {
    const files = fs.readdirSync(imagesDir)
    allImages = files.filter((f) => IMAGE_EXTENSIONS.test(f)).map((f) => `/images/${f}`)
  } catch {
    allImages = []
  }

  return <GalleryGrid images={allImages} categories={categories} />
}
