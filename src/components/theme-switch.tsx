'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { MoonIcon, Sun } from 'lucide-react';

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content',
        resolvedTheme === 'dark' ? '#020814' : '#f8fafd'
      );
    } else {
      const newMetaThemeColor = document.createElement('meta');
      newMetaThemeColor.setAttribute('name', 'theme-color');
      newMetaThemeColor.setAttribute(
        'content',
        resolvedTheme === 'dark' ? '#020814' : '#f8fafd'
      );
      document.head.appendChild(newMetaThemeColor);
    }
  }, [resolvedTheme]);

  if (!mounted) {
    return (
      <Image
        src='data:image/svg+xml;base64,PHN2ZyBzdHJva2U9IiNGRkZGRkYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBoZWlnaHQ9IjIwMHB4IiB3aWR0aD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB4PSIyIiB5PSIyIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSIyIj48L3JlY3Q+PC9zdmc+Cg=='
        width={36}
        height={36}
        sizes='36x36'
        alt='Loading Light/Dark Toggle'
        priority={false}
        title='Loading Light/Dark Toggle'
      />
    );
  }

  return (
    <div
      className='flex gap-1 items-center justify-between w-full'
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      <span>Theme</span>
      {resolvedTheme === 'dark' ? (
        <Sun className='size-4' />
      ) : (
        <MoonIcon className='size-4' />
      )}
    </div>
  );
}
