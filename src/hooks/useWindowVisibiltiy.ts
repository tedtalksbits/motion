'use client';

import { useEffect } from 'react';

interface TabVisibilityOptions {
  onVisible?: () => void;
  onHidden?: () => void;
}
function useTabVisibility({ onVisible, onHidden }: TabVisibilityOptions) {
  useEffect(() => {
    const handleVisibilityChange = () => {
      console.log('visibility change', document.visibilityState);
      if (document.hidden) {
        console.log('hidden');
        onHidden && onHidden();
      }
      if (document.visibilityState === 'visible') {
        onVisible && onVisible();
      } else {
        onHidden && onHidden();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [onVisible, onHidden]);
}

interface WindowFocusOptions {
  onFocus?: () => void;
  onBlur?: () => void;
}
function useWindowFocus({ onBlur, onFocus }: WindowFocusOptions) {
  useEffect(() => {
    const handleFocusChange = () => {
      if (document.hasFocus()) {
        onFocus && onFocus();
      } else {
        onBlur && onBlur();
      }
    };

    window.addEventListener('focus', handleFocusChange);
    window.addEventListener('blur', handleFocusChange);

    return () => {
      window.removeEventListener('focus', handleFocusChange);
      window.removeEventListener('blur', handleFocusChange);
    };
  }, [onFocus, onBlur]);
}
export { useTabVisibility, useWindowFocus };
