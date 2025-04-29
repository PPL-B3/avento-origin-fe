'use client';

import { useEffect, useState } from 'react';

export const useTwBreakpoint = (breakpoint: string) => {
  const [isBreakpoint, setIsBreakpoint] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(min-width: ${breakpoint})`);
    const handleChange = () => setIsBreakpoint(mediaQuery.matches);

    handleChange();
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [breakpoint]);

  return { isBreakpoint };
};
