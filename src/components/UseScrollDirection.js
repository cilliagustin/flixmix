import { useState, useEffect } from 'react';


/**
 * Detects the scroll direction and changes the state accordingly
 * used in the sidebar to hide the hamburger menu on mobile
 */
export default function UseScrollDirection() {
  const [scrollUp, setScrollUp] = useState(true);

  useEffect(() => {
    let prevScrollY = window.pageYOffset;

    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;
      setScrollUp(currentScrollY < prevScrollY);
      prevScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return scrollUp;
}