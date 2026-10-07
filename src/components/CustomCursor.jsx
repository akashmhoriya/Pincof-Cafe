import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const [isTouch, setIsTouch] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isImageHover, setIsImageHover] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

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
    if (!cursor || !follower) return;

    // Centered origin so resizing happens symmetrically around the pointer
    gsap.set([cursor, follower], {
      xPercent: -50,
      yPercent: -50,
      opacity: 0,
      force3D: true,
    });

    // Inner pinpoint dot with a subtle smooth delay
    const setCursorX = gsap.quickTo(cursor, 'x', { duration: 0.07, ease: 'power2.out' });
    const setCursorY = gsap.quickTo(cursor, 'y', { duration: 0.07, ease: 'power2.out' });

    // Outer circle with a fluid trailing delay
    const setFollowerX = gsap.quickTo(follower, 'x', { duration: 0.24, ease: 'power2.out' });
    const setFollowerY = gsap.quickTo(follower, 'y', { duration: 0.24, ease: 'power2.out' });

    let isFirstMove = true;

    const moveCursor = (e) => {
      if (isFirstMove) {
        gsap.set([cursor, follower], { x: e.clientX, y: e.clientY, opacity: 1 });
        isFirstMove = false;
      }
      setCursorX(e.clientX);
      setCursorY(e.clientY);
      setFollowerX(e.clientX);
      setFollowerY(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target || !(target instanceof Element)) return;

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

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    const handleMouseLeave = () => {
      gsap.to([cursor, follower], { opacity: 0, duration: 0.2, overwrite: 'auto' });
    };

    const handleMouseEnter = () => {
      gsap.to([cursor, follower], { opacity: 1, duration: 0.2, overwrite: 'auto' });
    };

    const handleResize = () => {
      checkTouch();
    };

    window.addEventListener('mousemove', moveCursor, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (isTouch) return null;

  return (
    <>
      {/* Precision center pinpoint */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 w-2 h-2 bg-caramel-400 rounded-full pointer-events-none z-[9999] will-change-transform transition-opacity duration-200 ${
          isHovered ? 'opacity-50' : 'opacity-100'
        }`}
      />

      {/* Crisp fluid tracking follower ring - completely sharp with zero backdrop-blur */}
      <div
        ref={followerRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 pointer-events-none z-[9998] rounded-full flex items-center justify-center will-change-transform transition-[width,height,background-color,border-color,opacity] duration-200 ease-out ${
          isMouseDown ? 'scale-90' : 'scale-100'
        } ${
          isImageHover
            ? 'w-20 h-20 bg-caramel-500 text-espresso-950 font-sans text-[11px] font-bold tracking-widest border border-caramel-300'
            : isHovered
            ? 'w-12 h-12 border-2 border-caramel-400 bg-caramel-400/10'
            : 'w-8 h-8 border border-cream-300/40 bg-transparent'
        }`}
      >
        {isImageHover && <span>{cursorText}</span>}
      </div>
    </>
  );
};

export default CustomCursor;
