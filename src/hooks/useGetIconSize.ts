'use client';
import { BREAK_POINTS } from '@/lib/constants';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export const useIconSize = () => {
  const isDesktop = useMediaQuery(BREAK_POINTS.sm);
  return isDesktop ? 18 : 24;
};
