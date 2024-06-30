import MillionLint from '@million/lint'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
      },
    ],
  },
  cleanDistDir: true,
}

export default MillionLint.next({
  rsc: true,
  // telemetry: true,
  // optimizeDOM: true,
})(nextConfig)
