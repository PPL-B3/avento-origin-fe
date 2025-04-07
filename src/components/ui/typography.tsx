'use client';

import { cn } from '@/lib';
import { VariantProps, cva } from 'class-variance-authority';
import React from 'react';

const typographyVariants = cva('', {
  variants: {
    variant: {
      title: 'text-2xl font-bold text-blue-700',
      subtitle: 'text-lg font-medium text-blue-600',
      body: 'text-base text-gray-800',
    },
    weight: {
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
  },
  defaultVariants: {
    variant: 'body',
    weight: 'normal',
  },
});

export interface TypographyProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof typographyVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
}

const Typography = React.forwardRef<HTMLParagraphElement, TypographyProps>(
  ({ className, variant, weight, as, children, ...props }, ref) => {
    const Component =
      as || (variant === 'title' ? 'h1' : variant === 'subtitle' ? 'h2' : 'p');

    return (
      <Component
        className={cn(typographyVariants({ variant, weight, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Typography.displayName = 'Typography';

export { Typography, typographyVariants };
