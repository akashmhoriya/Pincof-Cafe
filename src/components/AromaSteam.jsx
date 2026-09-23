import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const AromaSteam = ({ count = 14, className = '' }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const particles = containerRef.current?.querySelectorAll('.aroma-particle');
      if (!particles) return;

      particles.forEach((p, idx) => {
        const startX = (idx / count) * 100 + (Math.random() * 8 - 4);
        const startDelay = Math.random() * 4;
        const duration = 4.5 + Math.random() * 3.5;
        const driftX = (Math.random() - 0.5) * 80;

        gsap.set(p, {
          left: `${startX}%`,
          bottom: '5%',
          opacity: 0,
          scale: 0.4 + Math.random() * 0.6,
        });

        gsap.timeline({
          repeat: -1,
          delay: startDelay,
        })
        .to(p, {
          opacity: () => 0.35 + Math.random() * 0.3,
          duration: duration * 0.3,
          ease: 'sine.in',
        })
        .to(p, {
          y: '-=160',
          x: `+=${driftX}`,
          scale: '+=0.8',
          duration: duration * 0.7,
          opacity: 0,
          ease: 'power1.out',
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [count]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-10 ${className}`}
    >
      {Array.from({ length: count }).map((_, idx) => (
        <span
          key={idx}
          className="aroma-particle absolute block rounded-full blur-[2px]"
          style={{
            width: `${idx % 2 === 0 ? 12 : 18}px`,
            height: `${idx % 2 === 0 ? 12 : 18}px`,
            background:
              idx % 3 === 0
                ? 'radial-gradient(circle, rgba(200, 137, 73, 0.45) 0%, rgba(200, 137, 73, 0) 70%)'
                : 'radial-gradient(circle, rgba(245, 230, 211, 0.35) 0%, rgba(245, 230, 211, 0) 70%)',
          }}
        />
      ))}
    </div>
  );
};

export default AromaSteam;
