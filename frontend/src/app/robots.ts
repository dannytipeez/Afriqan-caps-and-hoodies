import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/checkout', '/order-confirmed'],
    },
    sitemap: 'https://afriqan-caps-and-hoodies.onrender.com/sitemap.xml',
  };
}

