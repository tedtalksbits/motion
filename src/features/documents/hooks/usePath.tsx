'use client';
import { usePathname } from 'next/navigation';

export default function usePath() {
  const paths = usePathname();
  const pathNames = paths.split('/').filter((path) => path);

  // isActive
  const isActive = (path: string) => {
    return pathNames.includes(path);
  };

  // isLast
  const isLast = (path: string) => {
    return pathNames[pathNames.length - 1] === path;
  };

  // all links
  const allLinks = pathNames.map((link, index) => {
    let href = `/${pathNames.slice(0, index + 1).join('/')}`;
    return {
      name: link,
      href,
      isActive: isActive(link),
      isLast: isLast(link),
    };
  });

  return {
    pathNames,
    isActive,
    isLast,
    allLinks,
  };
}
