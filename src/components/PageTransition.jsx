import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { Coffee } from 'lucide-react';

export const PageTransition = () => {
  const overlayRef = useRef(null);
  const layer1Ref = useRef(null);
  const layer2Ref = useRef(null);
  const brandTextRef = useRef(null);
  const location = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip animation on initial page load to let LoadingScreen shine
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      window.scrollTo(0, 0);
      return;
    }

    window.scrollTo(0, 0);

    const overlay = overlayRef.current;
    const l1 = layer1Ref.current;
    const l2 = layer2Ref.current;
    const brand = brandTextRef.current;
    if (!overlay || !l1 || !l2) return;

    const tl = gsap.timeline();

    // 1. Reset state
    tl.set(overlay, { display: 'block' })
      .set([l1, l2], { scaleY: 0, transformOrigin: 'bottom' })
      .set(brand, { opacity: 0, y: 15, letterSpacing: '0.2em' })

      // 2. Layer 1 wipes up (espresso)
      .to(l1, {
        scaleY: 1,
        duration: 0.32,
        ease: 'power3.inOut',
      })
      // 3. Layer 2 wipes up slightly staggered (accent)
      .to(
        l2,
        {
          scaleY: 1,
          duration: 0.28,
          ease: 'power3.inOut',
        },
        '-=0.18'
      )
      // 4. Reveal glowing brand monogram
      .to(
        brand,
        {
          opacity: 1,
          y: 0,
          letterSpacing: '0.35em',
          duration: 0.25,
          ease: 'power2.out',
        },
        '-=0.12'
      )
      // 5. Exit: Flip origins to top and wipe away
      .set([l1, l2], { transformOrigin: 'top' })
      .to(brand, {
        opacity: 0,
        y: -10,
        duration: 0.18,
        ease: 'power2.in',
      })
      .to(l2, {
        scaleY: 0,
        duration: 0.35,
        ease: 'power3.inOut',
      })
      .to(
        l1,
        {
          scaleY: 0,
          duration: 0.38,
          ease: 'power3.inOut',
          onComplete: () => {
            gsap.set(overlay, { display: 'none' });
          },
        },
        '-=0.25'
      );

    return () => {
      tl.kill();
    };
  }, [location.pathname]);

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      className="fixed inset-0 z-[9990] pointer-events-none"
      style={{ display: 'none' }}
    >
      {/* Primary Espresso Layer */}
      <div
        ref={layer1Ref}
        className="absolute inset-0 bg-[#0d0705] will-change-transform"
      />

      {/* Secondary Caramel Tinted Accent Layer */}
      <div
        ref={layer2Ref}
        className="absolute inset-0 bg-gradient-to-b from-[#1e130c] via-[#140c08] to-[#0a0503] border-b-2 border-caramel-500/40 will-change-transform flex items-center justify-center"
      >
        {/* Brand Reveal Monogram */}
        <div ref={brandTextRef} className="flex flex-col items-center select-none">
          <div className="w-12 h-12 rounded-full border border-caramel-400/50 bg-caramel-500/15 flex items-center justify-center mb-3 shadow-[0_0_30px_rgba(200,137,73,0.3)]">
            <Coffee className="w-6 h-6 text-caramel-300" />
          </div>
          <span className="font-serif text-3xl sm:text-4xl text-cream-100 font-light uppercase tracking-[0.3em]">
            PINCOF
          </span>
          <span className="text-[10px] uppercase font-sans tracking-[0.3em] text-caramel-400 mt-1 font-medium">
            Artisanal Roastery
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageTransition;
