// app/sitemap.ts or app/sitemap.js
// This will generate a dynamic sitemap for better SEO

import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ?? 'https://avento-origin.vercel.app';

  // Get the current date for lastModified
  const currentDate = new Date();

  // Define your routes
  const routes = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/upload-document`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    // Add more routes as needed
  ];

  return routes;
}
