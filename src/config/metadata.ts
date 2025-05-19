// Configuration file for site-wide metadata and SEO settings
import type { Metadata } from 'next';

// Base metadata configuration that can be extended by individual pages
export const baseMetadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL ?? 'https://avento-origin.vercel.app'
  ),
  title: {
    default: 'Avento Origin | Document Management System',
    template: '%s | Avento Origin',
  },
  description:
    'Secure digital document management system. Kelola Dokumen Digitalmu Sekarang!',
  keywords: [
    'document management',
    'digital documents',
    'secure documents',
    'document tracking',
    'Avento Origin',
  ],
  authors: [{ name: 'Avento Origin Team' }],
  creator: 'Avento Origin',
  publisher: 'Avento Origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: 'Avento Origin',
    title: 'Avento Origin | Secure Document Management',
    description:
      'Safely manage and track your digital documents with Avento Origin.',
    images: [
      {
        url: '/images/momofin-logo.webp',
        width: 373,
        height: 68,
        alt: 'Avento Origin Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Avento Origin | Document Management System',
    description:
      'Secure digital document management with powerful tracking features.',
    images: ['/images/momofin-logo.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
};
