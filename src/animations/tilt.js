import gsap from 'gsap';

/**
 * Attaches a 3D perspective tilt effect with dynamic glare sheen
 * 
 * @param {HTMLElement} card - Target container element
 * @param {Object} options - Configuration options
 * @returns {Function} cleanup function
 */
export const attach3DTilt = (card, options = {}) => {
  if (!card) return () => {};

  const {
    maxTilt = 12,       // Maximum rotation in degrees
    perspective = 1000, // CSS perspective in px
    scale = 1.025,      // Scale on hover
    speed = 0.4,        // Animation duration
    glare = true,       // Whether to render moving specular glare
  } = options;

  let glareElement = null;

  if (glare) {
    glareElement = card.querySelector('.tilt-glare');
    if (!glareElement) {
      glareElement = document.createElement('div');
      glareElement.className = 'tilt-glare pointer-events-none absolute inset-0 z-20 rounded-2xl opacity-0 transition-opacity duration-300';
      glareElement.style.background =
        'radial-gradient(circle at 50% 50%, rgba(200, 137, 73, 0.25) 0%, rgba(255,255,255,0) 65%)';
      card.style.position = 'relative';
      card.appendChild(glareElement);
    }
  }

  gsap.set(card, {
    transformPerspective: perspective,
    transformStyle: 'preserve-3d',
  });

  const handleMouseMove = (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    gsap.to(card, {
      rotateX,
      rotateY,
      scale,
      duration: speed,
      ease: 'power2.out',
      overwrite: 'auto',
    });

    if (glareElement) {
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      glareElement.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 235, 205, 0.22) 0%, rgba(255,255,255,0) 70%)`;
      gsap.to(glareElement, { opacity: 1, duration: 0.2, overwrite: 'auto' });
    }
  };

  const handleMouseLeave = () => {
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.6,
      ease: 'power3.out',
      overwrite: 'auto',
    });

    if (glareElement) {
      gsap.to(glareElement, { opacity: 0, duration: 0.4, overwrite: 'auto' });
    }
  };

  card.addEventListener('mousemove', handleMouseMove);
  card.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    card.removeEventListener('mousemove', handleMouseMove);
    card.removeEventListener('mouseleave', handleMouseLeave);
  };
};

export default attach3DTilt;
