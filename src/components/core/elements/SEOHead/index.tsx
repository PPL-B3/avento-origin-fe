'use client';

import Head from 'next/head';
import { usePathname } from 'next/navigation';

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  ogImage?: string;
  noindex?: boolean;
}

export default function SEOHead({
  title = 'Document Management System',
  description = 'Secure digital document management with powerful tracking features',
  canonicalPath,
  ogImage = '/images/momofin-logo.webp',
  noindex = false,
}: Readonly<SEOHeadProps>) {
  const pathname = usePathname();
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ?? 'https://avento-origin.vercel.app';
  const canonical = canonicalPath
    ? `${baseUrl}${canonicalPath}`
    : `${baseUrl}${pathname}`;

  // Full title with brand
  const fullTitle = `${title} | Avento Origin`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${baseUrl}${ogImage}`} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${baseUrl}${ogImage}`} />

      {/* Instruct robots for no indexing if specified */}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
    </Head>
  );
}
