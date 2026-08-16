import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Routers preserve scroll position across navigations, which lands you
 * mid-page when moving between the landing page and the cart. Reset on every
 * path change, but leave hash links alone so the nav anchors still work.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, hash]);

  return null;
}
