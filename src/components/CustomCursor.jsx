import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const [isTouch, setIsTouch] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isImageHover, setIsImageHover] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      const touchDetected =
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.innerWidth < 1024 ||
        window.matchMedia('(pointer: coarse)').matches;
      setIsTouch(touchDetected);
      return touchDetected;
    };

    if (checkTouch()) {
      return;
    }

    const cursor = cursorRef.current;
    const follower = followerRef.current;

    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08,
        ease: 'power2.out',
      });
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.32,
        ease: 'power3.out',
      });
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const clickable = target.closest('a, button, [role="button"], input, textarea, select, .cursor-pointer');
      const imageElement = target.closest('img, .cursor-view');

      if (imageElement && !clickable) {
        setIsImageHover(true);
        setCursorText('VIEW');
      } else if (clickable) {
        setIsHovered(true);
        setIsImageHover(false);
        setCursorText('');
      } else {
        setIsHovered(false);
        setIsImageHover(false);
        setCursorText('');
      }
    };

    const handleMouseLeave = () => {
      gsap.to([cursor, follower], { opacity: 0, duration: 0.25 });
    };

    const handleMouseEnter = () => {
      gsap.to([cursor, follower], { opacity: 1, duration: 0.25 });
    };

    const handleResize = () => {
      checkTouch();
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (isTouch) return null;

  return (
    <>
      {/* Center pinpoint */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 bg-caramel-400 rounded-full pointer-events-none z-[9999] mix-blend-difference transition-opacity duration-300"
      />
      {/* Fluid tracking follower ring */}
      <div
        ref={followerRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 pointer-events-none z-[9998] rounded-full flex items-center justify-center transition-all duration-300 ${
          isImageHover
            ? 'w-20 h-20 -ml-10 -mt-10 bg-caramel-500/90 text-espresso-950 font-sans text-[11px] font-bold tracking-widest backdrop-blur-sm'
            : isHovered
            ? 'w-12 h-12 -ml-6 -mt-6 border border-caramel-400/80 bg-caramel-400/10 backdrop-blur-[2px]'
            : 'w-8 h-8 -ml-4 -mt-4 border border-cream-300/30 bg-transparent'
        }`}
      >
        {isImageHover && <span>{cursorText}</span>}
      </div>
    </>
  );
};

export default CustomCursor;
