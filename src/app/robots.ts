import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/private/',
          '/api/',
          '/_next/',
          '/static/',
        ],
      },
      {
        userAgent: 'GPTBot',
        disallow: '/',
      }
    ],
    sitemap: 'https://www.highphaus.com/sitemap.xml',
  }
}
