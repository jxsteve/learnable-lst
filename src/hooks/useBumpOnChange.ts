import { useEffect, useRef, useState } from 'react';

/**
 * Returns true briefly whenever `value` changes, so a counter can visibly
 * react when something is added. Skips the initial render, otherwise every
 * badge would animate on page load.
 */
export function useBumpOnChange(value: number, duration = 400): boolean {
  const [isBumping, setIsBumping] = useState(false);
  const previous = useRef(value);

  useEffect(() => {
    if (previous.current === value) return;
    previous.current = value;

    setIsBumping(true);
    const timer = setTimeout(() => setIsBumping(false), duration);
    return () => clearTimeout(timer);
  }, [value, duration]);

  return isBumping;
}
