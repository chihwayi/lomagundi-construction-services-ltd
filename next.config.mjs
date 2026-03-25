/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // required for static export — no Image Optimisation API
  },
  trailingSlash: true, // SiteGround serves index.html inside folders cleanly
}

export default nextConfig
