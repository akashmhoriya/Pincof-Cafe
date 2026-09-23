import gsap from 'gsap';

/**
 * Animates a list of menu cards entering or re-rendering on category filter
 */
export const animateMenuCardsEntrance = (cardsContainer, cardsSelector = '.menu-card-item') => {
  if (!cardsContainer) return;
  const cards = cardsContainer.querySelectorAll(cardsSelector);
  if (!cards || cards.length === 0) return;

  gsap.fromTo(
    cards,
    {
      opacity: 0,
      y: 35,
      scale: 0.96,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      stagger: 0.07,
      ease: 'power3.out',
    }
  );
};

/**
 * Smooth transition for category tabs switch
 */
export const animateTabIndicator = (indicatorElement, targetTab) => {
  if (!indicatorElement || !targetTab) return;

  const { offsetLeft, offsetWidth } = targetTab;

  gsap.to(indicatorElement, {
    x: offsetLeft,
    width: offsetWidth,
    duration: 0.35,
    ease: 'power2.out',
  });
};
