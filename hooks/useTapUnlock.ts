import { useCallback, useEffect, useRef } from 'react';

type Options = {
  tapsRequired?: number;
  windowMs?: number;
};

export function useTapUnlock(onUnlock: () => void, options: Options = {}) {
  const { tapsRequired = 7, windowMs = 1500 } = options;

  const countRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onTap = useCallback(() => {
    countRef.current += 1;

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      countRef.current = 0;
      timerRef.current = null;
    }, windowMs);

    if (countRef.current >= tapsRequired) {
      countRef.current = 0;
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      onUnlock();
    }
  }, [tapsRequired, windowMs, onUnlock]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return onTap;
}
