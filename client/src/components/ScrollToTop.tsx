import { useEffect } from 'react';
import { useLocation } from 'wouter';

const ScrollToTop = () => {
  const [pathname] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null; // This component does not render anything
};

export default ScrollToTop;
