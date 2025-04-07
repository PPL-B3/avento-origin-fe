'use client';

import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { cn } from '@/lib';

interface ColorSwatchProps {
  colorName: string;
  colorValue: string;
  textColor?: string;
  tailwindClass?: string;
}

const ColorSwatch = ({
  colorName,
  colorValue,
  textColor = 'text-white',
  tailwindClass,
}: ColorSwatchProps) => (
  <div className="flex flex-col">
    <div
      className={cn(
        'w-32 h-32 rounded-md shadow-md flex items-center justify-center',
        textColor,
        tailwindClass
      )}
      style={!tailwindClass ? { backgroundColor: colorValue } : {}}
    >
      <span className="font-bold">{colorValue}</span>
    </div>
    <div className="mt-2 text-center">
      <Typography variant="body" weight="semibold">
        {colorName}
      </Typography>
    </div>
  </div>
);

export default function ColorsShowcase() {
  const primaryColors = [
    {
      name: 'Primary 1',
      value: '#001D3D',
      textColor: 'text-white',
      tailwindClass: 'bg-primary-1',
    },
    {
      name: 'Primary 2',
      value: '#FFFFFF',
      textColor: 'text-gray-800',
      tailwindClass: 'bg-primary-2',
    },
    {
      name: 'Primary 3',
      value: '#FF5D00',
      textColor: 'text-white',
      tailwindClass: 'bg-primary-3',
    },
  ];

  const secondaryColors = [
    {
      name: 'Secondary 1',
      value: '#E6EEF4',
      textColor: 'text-gray-800',
      tailwindClass: 'bg-secondary-1',
    },
    {
      name: 'Secondary 2',
      value: '#0067CC',
      textColor: 'text-white',
      tailwindClass: 'bg-secondary-2',
    },
  ];

  return (
    <div className="p-8 space-y-12">
      <div>
        <Typography variant="title" className="mb-4">
          Color Palette
        </Typography>
        <Typography variant="body" className="mb-6">
          This page showcases the primary and secondary colors used in our
          design system.
        </Typography>
      </div>

      <section className="space-y-6">
        <Typography variant="subtitle">Primary Colors</Typography>
        <div className="flex flex-wrap gap-8 p-6 border rounded-md">
          {primaryColors.map((color) => (
            <ColorSwatch
              key={color.name}
              colorName={color.name}
              colorValue={color.value}
              textColor={color.textColor}
              tailwindClass={color.tailwindClass}
            />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <Typography variant="subtitle">Secondary Colors</Typography>
        <div className="flex flex-wrap gap-8 p-6 border rounded-md">
          {secondaryColors.map((color) => (
            <ColorSwatch
              key={color.name}
              colorName={color.name}
              colorValue={color.value}
              textColor={color.textColor}
              tailwindClass={color.tailwindClass}
            />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <Typography variant="subtitle">
          Button Examples with Brand Colors
        </Typography>
        <div className="flex flex-wrap gap-4 p-6 border rounded-md">
          <Button variant="primary">Primary 1 (Navy)</Button>
          <Button variant="default">Primary 3 (Orange)</Button>
          <Button variant="secondary">Secondary 2 (Blue)</Button>
          <Button className="bg-secondary-1 text-gray-800 hover:bg-secondary-1/80">
            Secondary 1 (Light Blue)
          </Button>
        </div>
      </section>
    </div>
  );
}
