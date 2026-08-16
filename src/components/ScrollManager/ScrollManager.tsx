import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** How long to keep looking for a hash target while the new route mounts. */
const LOOKUP_TIMEOUT_MS = 1000;

/**
 * Handles scroll position across navigations.
 *
 * Without a hash, a new route starts at the top rather than inheriting the
 * previous page's scroll position. With a hash, the target section is scrolled
 * into view once it exists — the element belongs to the incoming route, so it
 * is not in the document at the moment the location changes.
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      return;
    }

    const id = decodeURIComponent(hash.slice(1));
    let frame = 0;
    const deadline = Date.now() + LOOKUP_TIMEOUT_MS;

    const scrollToTarget = () => {
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      // The section may not have mounted yet; keep looking briefly.
      if (Date.now() < deadline) frame = requestAnimationFrame(scrollToTarget);
    };

    frame = requestAnimationFrame(scrollToTarget);
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}
