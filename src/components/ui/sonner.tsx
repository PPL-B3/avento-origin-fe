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
          error: 'bg-customRed-400',
          success: 'bg-[#54ba25]',
          warning: 'text-customYellow-400',
          info: 'bg-customBlue-500',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
