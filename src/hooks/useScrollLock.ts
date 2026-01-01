import { useEffect } from 'react';

export const useScrollLock = (isLocked: boolean) => {
  useEffect(() => {
    if (!isLocked) return;

    // 1. Mät scrollbarens bredd
    const scrollBarWidth = window.innerWidth - document.body.clientWidth;

    // 2. Spara original-stilar för att kunna återställa
    const originalStyle = window.getComputedStyle(document.body).overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    // 3. Applicera lås och padding-kompensation
    document.body.style.overflow = 'hidden';

    // Om det fanns en scrollbar, kompensera med padding
    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;

      // OBS: Om du har en fixed header måste du kanske kompensera den också
      // Antingen via en global CSS-variabel eller genom att hämta elementet
      document.documentElement.style.setProperty(
        '--scrollbar-width',
        `${scrollBarWidth}px`
      );
    }

    // Cleanup
    return () => {
      document.body.style.overflow = originalStyle;
      document.body.style.paddingRight = originalPaddingRight;
      document.documentElement.style.removeProperty('--scrollbar-width');
    };
  }, [isLocked]);
};
