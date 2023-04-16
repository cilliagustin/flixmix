import { useState, useEffect } from 'react';

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