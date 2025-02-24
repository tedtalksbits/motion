'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Button } from './ui/button';
import { MoonIcon, Sun } from 'lucide-react';

export const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // useEffect(() => {
  //   const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  //   if (metaThemeColor) {
  //     metaThemeColor.setAttribute(
  //       'content',
  //       resolvedTheme === 'dark' ? '#020814' : '#f8fafd'
  //     );
  //   } else {
  //     const newMetaThemeColor = document.createElement('meta');
  //     newMetaThemeColor.setAttribute('name', 'theme-color');
  //     newMetaThemeColor.setAttribute(
  //       'content',
  //       resolvedTheme === 'dark' ? '#020814' : '#f8fafd'
  //     );
  //     document.head.appendChild(newMetaThemeColor);
  //   }
  // }, [resolvedTheme]);

  if (!mounted) {
    return null;
  }

  return (
    <Button
      size={'icon'}
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      {resolvedTheme === 'dark' ? (
        <Sun className='size-4' />
      ) : (
        <MoonIcon className='size-4' />
      )}
    </Button>
  );
};
