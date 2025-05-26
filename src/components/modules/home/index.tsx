'use client';

import { Typography } from '@/components/ui/typography';

/* istanbul ignore next */
export function HomeModule() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <section className="max-w-4xl mx-auto text-center">
        <Typography variant="title" className="text-4xl md:text-5xl mb-6">
          Avento Origin
        </Typography>

        <Typography
          variant="subtitle"
          className="text-xl md:text-2xl mb-8 text-gray-700"
        >
          Secure Digital Document Management
        </Typography>

        <Typography
          variant="body"
          className="mb-10 text-gray-600 max-w-2xl mx-auto"
        >
          Avento Origin helps you securely manage, track and share your
          important documents with advanced security features and real-time
          tracking.
        </Typography>

        {/* Adding semantic HTML for better SEO */}
        <div className="grid md:grid-cols-3 gap-8 text-left mb-12">
          <div>
            <h2 className="text-xl font-bold mb-3">Secure Storage</h2>
            <p>
              Your documents are encrypted and stored with enterprise-grade
              security.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-3">Track Ownership</h2>
            <p>
              Follow the complete history and chain of ownership for all your
              documents.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-3">Easy Sharing</h2>
            <p>
              Share documents securely with controlled access and permissions.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
