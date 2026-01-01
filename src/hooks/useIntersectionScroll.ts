import { useState, useEffect, type RefObject } from 'react';

export const useIntersectionScroll = (ref: RefObject<HTMLElement | null>) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolled(!entry.isIntersecting);
      },
      { rootMargin: '-1px 0px 0px 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);

  return isScrolled;
};
