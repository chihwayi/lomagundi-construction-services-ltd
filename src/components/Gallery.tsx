import fs from 'fs'
import path from 'path'
import GalleryGrid from './GalleryGrid'

const IMAGE_EXTENSIONS = /\.(jpg|jpeg|png|webp|gif|avif|bmp|tiff?)$/i

export default function Gallery() {
  const imagesDir = path.join(process.cwd(), 'public', 'images')
  let images: string[] = []

  try {
    const files = fs.readdirSync(imagesDir)
    images = files.filter((f) => IMAGE_EXTENSIONS.test(f)).map((f) => `/images/${f}`)
  } catch {
    images = []
  }

  return <GalleryGrid images={images} />
}
