import {useState, useEffect} from 'react';


const getCurrentBreakpoints = () => {
  const width = window.innerWidth;

  if (width < 640) return 'xs';
  if (width >= 640 && width < 768) return 'sm';
  if (width >= 768 && width < 1024) return 'md';
  if (width >= 1024 && width < 1280) return 'lg';
  if (width >= 1280 && width < 1536) return 'xl';
  return '2xl';
};

export const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState(getCurrentBreakpoints());

  useEffect(() => {
    const resizeListener = () => {
      setBreakpoint(getCurrentBreakpoints());
    };

    window.addEventListener('resize', resizeListener);
    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, []);

  return {
    current: breakpoint,
    isDesktop: ['lg', 'xl', 'xxl', 'xxxl'].includes(breakpoint),
    isMobile: ['sm', 'xs', 'xxs'].includes(breakpoint),
    isTablet: breakpoint === 'md',
  };
};
