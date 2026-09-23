import gsap from 'gsap';

/**
 * Attaches a magnetic hover effect to a DOM element.
 * Pulls the element towards the cursor within a boundary radius.
 * 
 * @param {HTMLElement} element - Target DOM element
 * @param {Object} options - Configuration options
 * @returns {Function} cleanup function to remove listeners
 */
export const attachMagneticEffect = (element, options = {}) => {
  if (!element) return () => {};

  const {
    power = 0.35,      // Pull intensity (0.1 to 0.5)
    radius = 120,      // Interaction radius in pixels
    duration = 0.5,    // Return duration in seconds
    ease = 'power3.out', // Return ease
    innerSelector = null, // Optional child element to move more intensely
  } = options;

  const inner = innerSelector ? element.querySelector(innerSelector) : null;

  const handleMouseMove = (e) => {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    const distance = Math.hypot(deltaX, deltaY);

    if (distance < radius) {
      gsap.to(element, {
        x: deltaX * power,
        y: deltaY * power,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto',
      });

      if (inner) {
        gsap.to(inner, {
          x: deltaX * (power * 1.5),
          y: deltaY * (power * 1.5),
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }
    } else {
      handleMouseLeave();
    }
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration,
      ease,
      overwrite: 'auto',
    });

    if (inner) {
      gsap.to(inner, {
        x: 0,
        y: 0,
        duration,
        ease,
        overwrite: 'auto',
      });
    }
  };

  element.addEventListener('mousemove', handleMouseMove);
  element.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    element.removeEventListener('mousemove', handleMouseMove);
    element.removeEventListener('mouseleave', handleMouseLeave);
  };
};

export default attachMagneticEffect;
