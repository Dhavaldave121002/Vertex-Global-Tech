import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // 1. Reset standard window scroll
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });

    // 2. Reset Admin-specific scroll container if it exists
    // The admin section often has a fixed sidebar and independent main scroll area.
    const adminContainer = document.getElementById('admin-scroll-container');
    if (adminContainer) {
      adminContainer.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });
    }
  }, [location.key]); // Trigger on every unique navigation (even same pathname)

  return null;
};

export default ScrollToTop;
