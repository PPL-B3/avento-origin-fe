'use client';

import { Typography } from '@/components/ui/typography';

export default function TypographyShowcase() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-4">Typography Design System</h1>
        <p className="mb-6">
          This page demonstrates the simplified typography components: title,
          subtitle, and body text.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Base Typography Variants</h2>
        <div className="space-y-4 border p-4 rounded-md">
          <Typography variant="title">This is a Title</Typography>
          <Typography variant="subtitle">This is a Subtitle</Typography>
          <Typography variant="body">
            This is regular body text for paragraphs and general content
          </Typography>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Font Weights</h2>
        <div className="space-y-4 border p-4 rounded-md">
          <Typography variant="body" weight="light">
            Light body text
          </Typography>
          <Typography variant="body" weight="normal">
            Normal body text
          </Typography>
          <Typography variant="body" weight="medium">
            Medium body text
          </Typography>
          <Typography variant="body" weight="semibold">
            Semibold body text
          </Typography>
          <Typography variant="body" weight="bold">
            Bold body text
          </Typography>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Customized Element Types</h2>
        <div className="space-y-4 border p-4 rounded-md">
          <Typography variant="title" as="h2">
            Title styled as h2
          </Typography>
          <Typography variant="subtitle" as="h3">
            Subtitle styled as h3
          </Typography>
          <Typography variant="body" as="div">
            Body text as a div element
          </Typography>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">With Custom Classes</h2>
        <div className="space-y-4 border p-4 rounded-md">
          <Typography variant="title" className="text-primary-3">
            Title with primary color
          </Typography>
          <Typography variant="subtitle" className="italic">
            Italic subtitle
          </Typography>
          <Typography variant="body" className="text-secondary-2 underline">
            Colored and underlined body text
          </Typography>
        </div>
      </section>
    </div>
  );
}
