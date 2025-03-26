'use client';

import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { Loader2, Mail, Plus } from 'lucide-react';

export default function ButtonShowcase() {
  return (
    <div className="p-8 space-y-12">
      <div>
        <Typography variant="title" className="mb-4">
          Button Design System
        </Typography>
        <Typography variant="body" className="mb-6">
          This page demonstrates the button components using our color system.
        </Typography>
      </div>

      <section className="space-y-4">
        <Typography variant="subtitle">Button Variants</Typography>
        <div className="flex flex-wrap gap-4 border p-4 rounded-md">
          <Button variant="default">Default (Orange)</Button>
          <Button variant="primary">Primary (Navy)</Button>
          <Button variant="secondary">Secondary (Blue)</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </section>

      <section className="space-y-4">
        <Typography variant="subtitle">Button Sizes</Typography>
        <div className="flex flex-wrap items-center gap-4 border p-4 rounded-md">
          <Button size="lg" variant="primary">
            Large
          </Button>
          <Button size="default" variant="primary">
            Default
          </Button>
          <Button size="sm" variant="primary">
            Small
          </Button>
          <Button size="icon" variant="primary">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <Typography variant="subtitle">Button States</Typography>
        <div className="flex flex-wrap gap-4 border p-4 rounded-md">
          <Button variant="primary">Active</Button>
          <Button variant="primary" disabled>
            Disabled
          </Button>
          <Button variant="secondary" disabled>
            Disabled Secondary
          </Button>
          <Button variant="primary" disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <Typography variant="subtitle">Buttons with Icons</Typography>
        <div className="flex flex-wrap gap-4 border p-4 rounded-md">
          <Button variant="primary">
            <Mail className="mr-2 h-4 w-4" /> Login with Email
          </Button>
          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Button>
          <Button variant="secondary">
            Download <Plus className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <Typography variant="subtitle">Full Width Button</Typography>
        <div className="border p-4 rounded-md">
          <Button variant="primary" className="w-full">
            Full Width Button
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <Typography variant="subtitle">Brand Colors Demonstration</Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 border rounded-md flex flex-col space-y-3">
            <Typography variant="body" weight="semibold">
              Primary 1 (Navy)
            </Typography>
            <div className="p-4 rounded-md bg-primary-1 text-white">
              <Typography variant="body" className="text-white">
                Background: Primary 1
              </Typography>
            </div>
            <Button variant="primary">Primary Button</Button>
          </div>

          <div className="p-6 border rounded-md flex flex-col space-y-3">
            <Typography variant="body" weight="semibold">
              Primary 3 (Orange)
            </Typography>
            <div className="p-4 rounded-md bg-primary-3 text-white">
              <Typography variant="body" className="text-white">
                Background: Primary 3
              </Typography>
            </div>
            <Button variant="default">Default Button</Button>
          </div>

          <div className="p-6 border rounded-md flex flex-col space-y-3">
            <Typography variant="body" weight="semibold">
              Secondary 1 (Light Blue)
            </Typography>
            <div className="p-4 rounded-md bg-secondary-1 text-gray-800">
              <Typography variant="body">Background: Secondary 1</Typography>
            </div>
            <Button className="bg-secondary-1 text-gray-800 hover:bg-secondary-1/80">
              Custom Secondary 1
            </Button>
          </div>

          <div className="p-6 border rounded-md flex flex-col space-y-3">
            <Typography variant="body" weight="semibold">
              Secondary 2 (Blue)
            </Typography>
            <div className="p-4 rounded-md bg-secondary-2 text-white">
              <Typography variant="body" className="text-white">
                Background: Secondary 2
              </Typography>
            </div>
            <Button variant="secondary">Secondary Button</Button>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <Typography variant="subtitle">Button Combinations</Typography>
        <div className="flex flex-wrap gap-4 border p-4 rounded-md">
          <div className="flex space-x-2">
            <Button variant="default">Save</Button>
            <Button variant="outline">Cancel</Button>
          </div>

          <div className="flex space-x-2">
            <Button variant="primary">Confirm</Button>
            <Button variant="ghost">Back</Button>
          </div>

          <div className="flex space-x-2">
            <Button variant="secondary">Submit</Button>
            <Button
              variant="outline"
              className="border-secondary-2 text-secondary-2"
            >
              Reset
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
