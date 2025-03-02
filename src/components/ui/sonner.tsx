'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      position="top-center"
      toastOptions={{
        classNames: {
          error: '!bg-red-500',
          success: '!bg-[#54ba25]',
          warning: '!bg-yellow-500 !text-neutral-950',
          info: '!bg-blue-400',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
