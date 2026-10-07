import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook to initialize and manage Lenis smooth scrolling across the entire site.
 * Seamlessly integrates with GSAP ScrollTrigger for pinned sections, parallax, and reveals.
 * 
 * @param {boolean} enabled - Whether smooth scrolling is currently active (e.g. false during initial loader)
 * @returns {React.MutableRefObject<Lenis|null>}
 */
export const useSmoothScroll = (enabled = true) => {
  const lenisRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Initialize Lenis with refined luxury damping
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;
    window.lenis = lenis;

    // Synchronize Lenis scroll position with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Update Lenis in GSAP's central ticker
    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    // Disable lag smoothing to keep ScrollTrigger and Lenis in perfect lockstep
    gsap.ticker.lagSmoothing(0);

    // Initial recalculation
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
      window.lenis = null;
    };
  }, []);

  // Pause scrolling while initial loading screen is active, then resume and refresh
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    if (!enabled) {
      lenis.stop();
    } else {
      lenis.start();
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }
  }, [enabled]);

  // Reset scroll to top on route change
  useEffect(() => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return lenisRef;
};

export default useSmoothScroll;
