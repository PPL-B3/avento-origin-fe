/* istanbul ignore file */
import { Toaster } from '@/components/ui/sonner';
import { baseMetadata } from '@/config/metadata';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap', // Optimize font display for better performance
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap', // Optimize font display for better performance
});

export const metadata: Metadata = baseMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="canonical"
          href={
            process.env.NEXT_PUBLIC_BASE_URL ??
            'https://avento-origin.vercel.app'
          }
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Schema.org structured data for better search engine understanding */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              url:
                process.env.NEXT_PUBLIC_BASE_URL ??
                'https://avento-origin.vercel.app',
              name: 'Avento Origin',
              description: 'Secure digital document management system',
              potentialAction: {
                '@type': 'SearchAction',
                target: `${process.env.NEXT_PUBLIC_BASE_URL ?? 'https://avento-origin.vercel.app'}/search?q={search_term_string}`,
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        {children}
        <Toaster />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
