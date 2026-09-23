import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Animates text elements upward with a staggered fade
 * @param {HTMLElement|string} element - DOM element or selector
 * @param {object} options - Custom options
 */
export const animateTextReveal = (element, options = {}) => {
  if (!element) return;

  const {
    delay = 0,
    duration = 1.1,
    stagger = 0.08,
    yOffset = 40,
    trigger = element,
    start = 'top 85%',
  } = options;

  return gsap.fromTo(
    element,
    {
      opacity: 0,
      y: yOffset,
    },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      stagger,
      ease: 'power3.out',
      scrollTrigger: trigger
        ? {
            trigger,
            start,
            toggleActions: 'play none none none',
          }
        : undefined,
    }
  );
};

/**
 * Split text reveal for editorial headings
 */
export const animateHeadingLines = (lines, options = {}) => {
  if (!lines || lines.length === 0) return;

  return gsap.fromTo(
    lines,
    {
      y: '100%',
      opacity: 0,
      rotateX: -15,
    },
    {
      y: '0%',
      opacity: 1,
      rotateX: 0,
      duration: options.duration || 1.2,
      stagger: options.stagger || 0.12,
      ease: 'power4.out',
      delay: options.delay || 0,
    }
  );
};

/**
 * Advanced 3D Split-Word Flip Entrance with perspective
 * Words rise up with 3D rotation and spring settle
 */
export const animate3DWords = (container, options = {}) => {
  if (!container) return;

  const {
    trigger = container,
    start = 'top 85%',
    stagger = 0.06,
    duration = 1.1,
    delay = 0,
  } = options;

  const words = container.querySelectorAll('.word-split');
  if (!words || words.length === 0) return;

  gsap.set(container, { perspective: 1000 });

  return gsap.fromTo(
    words,
    {
      opacity: 0,
      yPercent: 120,
      rotateX: -65,
      transformOrigin: '50% 100%',
    },
    {
      opacity: 1,
      yPercent: 0,
      rotateX: 0,
      duration,
      delay,
      stagger,
      ease: 'power4.out',
      scrollTrigger: trigger
        ? {
            trigger,
            start,
            toggleActions: 'play none none none',
          }
        : undefined,
    }
  );
};

/**
 * Subtle wave hover interaction on brand letters
 */
export const attachLetterWave = (element) => {
  if (!element) return () => {};

  const letters = element.querySelectorAll('.brand-char');
  if (!letters || letters.length === 0) return () => {};

  const handleMouseEnter = () => {
    gsap.fromTo(
      letters,
      { y: 0 },
      {
        y: -6,
        duration: 0.25,
        stagger: {
          each: 0.04,
          yoyo: true,
          repeat: 1,
        },
        ease: 'power1.inOut',
      }
    );
  };

  element.addEventListener('mouseenter', handleMouseEnter);
  return () => element.removeEventListener('mouseenter', handleMouseEnter);
};

export default {
  animateTextReveal,
  animateHeadingLines,
  animate3DWords,
  attachLetterWave,
};
