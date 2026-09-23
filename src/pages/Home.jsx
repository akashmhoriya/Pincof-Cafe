import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { CAFE_INFO } from '../data/cafeInfo';
import { TESTIMONIALS } from '../data/testimonials';
import { getMenuItems } from '../services/api';

import Button from '../components/Button';
import SectionHeading from '../components/SectionHeading';
import MenuCard from '../components/MenuCard';
import StatCounter from '../components/StatCounter';
import Gallery from '../components/Gallery';
import TestimonialCard from '../components/TestimonialCard';
import AromaSteam from '../components/AromaSteam';
import RoastProfileDial from '../components/RoastProfileDial';

gsap.registerPlugin(ScrollTrigger);

export const Home = () => {
  useDocumentTitle(
    'Artisanal Specialty Coffee & Roastery',
    'A modern specialty café and roastery built around exceptional beans, crafted cuisine, and slow, mindful moments.'
  );

  const [featuredItems, setFeaturedItems] = useState([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const rootRef = useRef(null);
  const heroRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroSubRef = useRef(null);
  const heroCtaRef = useRef(null);
  const heroBgRef = useRef(null);

  const introSectionRef = useRef(null);
  const introImageWrapperRef = useRef(null);
  const introImageRef = useRef(null);
  const introTextRef = useRef(null);

  const pinnedSectionRef = useRef(null);
  const pinnedTrackRef = useRef(null);
  const pinnedMarqueeRef = useRef(null);

  const philosophyRef = useRef(null);
  const finalCtaRef = useRef(null);

  // Load Featured Items from Menu Service
  useEffect(() => {
    let isMounted = true;
    const loadFeatured = async () => {
      try {
        const items = await getMenuItems({ featured: true });
        if (isMounted) {
          setFeaturedItems(items.slice(0, 6));
          setTimeout(() => {
            ScrollTrigger.refresh();
          }, 100);
        }
      } catch (err) {
        console.error('Failed to load featured items:', err);
      }
    };
    loadFeatured();
    return () => {
      isMounted = false;
    };
  }, []);

  // GSAP Animations Setup
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // If user prefers reduced motion, set all elements visible immediately
      if (prefersReducedMotion) {
        gsap.set([heroBgRef.current, heroSubRef.current], { opacity: 1, scale: 1, y: 0 });
        gsap.set(heroTitleRef.current?.querySelectorAll('.hero-line'), { opacity: 1, y: 0 });
        gsap.set(heroCtaRef.current?.children, { opacity: 1, y: 0 });
        if (introImageWrapperRef.current) {
          gsap.set(introImageWrapperRef.current, { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' });
        }
        if (introTextRef.current) {
          gsap.set(introTextRef.current.children, { opacity: 1, y: 0 });
        }
        if (philosophyRef.current) {
          gsap.set(philosophyRef.current.querySelectorAll('.philosophy-line'), { opacity: 1, y: 0 });
        }
        return;
      }

      // 1. Hero Entrance Timeline
      const heroTl = gsap.timeline({ delay: 0.15 });

      heroTl
        .fromTo(
          heroBgRef.current,
          { scale: 1.18, opacity: 0.5 },
          { scale: 1, opacity: 1, duration: 2.2, ease: 'power2.out' }
        )
        .fromTo(
          heroTitleRef.current?.querySelectorAll('.hero-line'),
          { y: 70, opacity: 0, rotateX: -10 },
          { y: 0, opacity: 1, rotateX: 0, duration: 1.3, stagger: 0.18, ease: 'power4.out' },
          '-=1.5'
        )
        .fromTo(
          heroSubRef.current,
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
          '-=0.9'
        )
        .fromTo(
          heroCtaRef.current?.children,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'back.out(1.4)' },
          '-=0.7'
        );

      // Hero background subtle parallax on scroll
      gsap.to(heroBgRef.current, {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // 2. Editorial Split Intro Mask Reveal
      if (introImageWrapperRef.current && introImageRef.current) {
        const introTl = gsap.timeline({
          scrollTrigger: {
            trigger: introSectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        });

        introTl
          .fromTo(
            introImageWrapperRef.current,
            { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' },
            {
              clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
              duration: 1.5,
              ease: 'power4.inOut',
            }
          )
          .fromTo(
            introImageRef.current,
            { scale: 1.28 },
            { scale: 1, duration: 1.5, ease: 'power3.out' },
            0
          )
          .fromTo(
            introTextRef.current?.children,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, stagger: 0.14, ease: 'power3.out' },
            '-=0.9'
          );
      }

      // Responsive Desktop vs Mobile ScrollTrigger Pinning
      ScrollTrigger.matchMedia({
        // Desktop: Pin and scrub horizontally with counter-parallax
        '(min-width: 1024px)': function () {
          if (pinnedSectionRef.current && pinnedTrackRef.current) {
            const scrollDistance = pinnedTrackRef.current.scrollWidth - window.innerWidth + 120;

            gsap.to(pinnedTrackRef.current, {
              x: () => -scrollDistance,
              ease: 'none',
              scrollTrigger: {
                trigger: pinnedSectionRef.current,
                pin: true,
                scrub: 1.1,
                start: 'top top',
                end: () => `+=${scrollDistance}`,
                invalidateOnRefresh: true,
              },
            });

            // Parallax scrub on background giant typography
            if (pinnedMarqueeRef.current) {
              gsap.fromTo(
                pinnedMarqueeRef.current,
                { x: '10vw' },
                {
                  x: '-40vw',
                  ease: 'none',
                  scrollTrigger: {
                    trigger: pinnedSectionRef.current,
                    scrub: 0.8,
                    start: 'top top',
                    end: () => `+=${scrollDistance}`,
                  },
                }
              );
            }

            // Subtle parallax zoom on images inside panels
            const panelImages = pinnedTrackRef.current.querySelectorAll('img');
            panelImages.forEach((img) => {
              gsap.fromTo(
                img,
                { scale: 1.08 },
                {
                  scale: 1,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: pinnedSectionRef.current,
                    start: 'top top',
                    end: () => `+=${scrollDistance}`,
                    scrub: 1.5,
                  },
                }
              );
            });
          }
        },
      });

      // 4. Philosophy Oversized Typography Line-by-Line ScrollTrigger
      if (philosophyRef.current) {
        const lines = philosophyRef.current.querySelectorAll('.philosophy-line');
        lines.forEach((line) => {
          gsap.fromTo(
            line,
            { opacity: 0.12, y: 45, skewY: 1.5 },
            {
              opacity: 1,
              y: 0,
              skewY: 0,
              duration: 1.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: line,
                start: 'top 85%',
                end: 'top 45%',
                scrub: 1,
              },
            }
          );
        });
      }

      // 5. Final CTA Parallax
      if (finalCtaRef.current) {
        const bg = finalCtaRef.current.querySelector('.cta-bg');
        if (bg) {
          gsap.fromTo(
            bg,
            { yPercent: -12 },
            {
              yPercent: 12,
              ease: 'none',
              scrollTrigger: {
                trigger: finalCtaRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          );
        }
      }
    }, rootRef);

    return () => ctx.revert();
  }, [featuredItems.length]);

  // Testimonial Controls
  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  };
  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <div ref={rootRef} className="relative w-full overflow-hidden">
      {/* 1. HERO SECTION */}
      <section
        ref={heroRef}
        className="relative w-full min-h-screen flex items-center justify-center pt-24 pb-16 px-6 sm:px-8 lg:px-12 overflow-hidden"
      >
        {/* Background Image with Parallax & Dark Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            ref={heroBgRef}
            src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=2000&q=85"
            alt="PINCOF Specialty Coffee & Roastery Interior"
            className="w-full h-full object-cover brightness-[0.38] contrast-[1.1] scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#140c08] via-transparent to-[#140c08]/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#140c08]/90 via-transparent to-[#140c08]/90" />
        </div>

        {/* Ambient warm glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-caramel-500/10 rounded-full blur-[140px] pointer-events-none" />

        {/* Floating Coffee Aroma & Roasted Embers Particle System */}
        <AromaSteam count={16} />

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-[0.3em] text-caramel-400 mb-6 px-4 py-1.5 rounded-full bg-caramel-500/10 border border-caramel-500/20 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-caramel-400 animate-pulse" />
            <span>Artisan Roastery &bull; Specialty Café</span>
          </div>

          {/* Animated Line-by-Line Heading */}
          <h1
            ref={heroTitleRef}
            className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-cream-100 tracking-tight leading-[1.08] select-none"
          >
            <span className="block overflow-hidden">
              <span className="hero-line block">Coffee, Crafted</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-line block italic text-caramel-300 font-serif">
                With Character.
              </span>
            </span>
          </h1>

          {/* Subheading */}
          <p
            ref={heroSubRef}
            className="mt-6 sm:mt-8 max-w-2xl text-sm sm:text-base md:text-lg text-cream-200/80 font-sans font-light leading-relaxed tracking-wide"
          >
            {CAFE_INFO.subheading}
          </p>

          {/* Action CTAs */}
          <div
            ref={heroCtaRef}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
          >
            <Button to="/menu" variant="primary" size="lg" showArrow={true}>
              Explore Menu
            </Button>
            <Button to="/contact" variant="outline" size="lg">
              Visit Us
            </Button>
          </div>

          {/* Scroll Down Indicator */}
          <div className="mt-16 flex flex-col items-center gap-2 text-cream-400/50 hover:text-caramel-400 transition-colors animate-bounce">
            <span className="text-[10px] uppercase font-sans tracking-[0.25em]">
              Scroll To Experience
            </span>
            <ArrowDown className="w-4 h-4 text-caramel-400" />
          </div>
        </div>
      </section>

      {/* 2. INTRODUCTION — EDITORIAL SPLIT SECTION */}
      <section
        ref={introSectionRef}
        className="relative py-24 sm:py-32 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Mask-Revealed Café Photograph */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div
              ref={introImageWrapperRef}
              className="relative w-full h-[450px] sm:h-[550px] rounded-2xl overflow-hidden shadow-2xl border border-cream-300/10 cursor-view"
            >
              <img
                ref={introImageRef}
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=85"
                alt="Barista brewing single-origin pour over"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs font-sans text-cream-200">
                <span className="tracking-widest uppercase text-caramel-400">Pour Over Station</span>
                <span className="opacity-70">1:15 Brew Precision</span>
              </div>
            </div>
          </div>

          {/* Right: Editorial Typography & Story */}
          <div
            ref={introTextRef}
            className="lg:col-span-6 order-1 lg:order-2 flex flex-col items-start"
          >
            <span className="text-xs uppercase font-sans tracking-[0.25em] text-caramel-400 font-semibold mb-3">
              The PINCOF Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-cream-100 font-light leading-[1.15] mb-6">
              More Than <span className="italic text-caramel-300">Just Coffee.</span>
            </h2>
            <p className="text-base sm:text-lg text-cream-300/80 font-sans leading-relaxed mb-6 font-light">
              We founded PINCOF with a singularly obsessive conviction: that a cup of coffee is not a mere commodity or a rushed fuel stop, but a quiet, contemplative art form.
            </p>
            <p className="text-sm sm:text-base text-cream-300/60 font-sans leading-relaxed mb-8">
              From direct relationships with single-origin micro-lot growers in Yirgacheffe and Huila, to roasting on clean electric fluid-bed profiles, every note of jasmine, stone fruit, and cocoa is coaxed with uncompromising dedication.
            </p>
            <Button to="/about" variant="outline" size="md" showArrow={true}>
              Discover Our Story
            </Button>
          </div>
        </div>
      </section>

      {/* 3. FEATURED MENU SECTION */}
      <section className="relative py-24 sm:py-32 px-6 sm:px-8 lg:px-12 bg-[#100906] border-y border-espresso-800/60">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <SectionHeading
              align="left"
              badge="Seasonal Selection"
              title="Made To Be Sipped."
              subtitle="Curated from our micro-lot roasts and morning bakery ovens. Each creation balances origin terroir with bespoke culinary craftsmanship."
            />
            <Button to="/menu" variant="outline" size="md" showArrow={true} className="self-start md:self-end">
              View Full Menu
            </Button>
          </div>

          {/* 6 Featured Items Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredItems.map((item) => (
              <MenuCard key={item._id || item.name} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE SENSORY LAB — ROAST PROFILE & FLAVOR DIAL */}
      <RoastProfileDial />

      {/* 5. CINEMATIC EXPERIENCE — PINNED FULL-SCREEN SECTION */}
      <section
        ref={pinnedSectionRef}
        className="relative w-full h-screen bg-[#0d0705] flex items-center overflow-hidden"
      >
        {/* Giant Typographic Background Marquee with Parallax Scrub */}
        <div
          ref={pinnedMarqueeRef}
          aria-hidden="true"
          className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap text-[16vw] font-serif font-black tracking-widest text-cream-100/[0.035] select-none pointer-events-none z-0 will-change-transform"
        >
          PINCOF SPECIALTY ROASTERY &bull; ARTISANAL COFFEE
        </div>

        {/* Pinned horizontal scrolling track */}
        <div
          ref={pinnedTrackRef}
          className="flex items-center space-x-12 px-12 sm:px-20 will-change-transform relative z-10"
        >
          {/* Panel 1: Introductory Typography */}
          <div className="w-[85vw] sm:w-[500px] flex-shrink-0 flex flex-col justify-center pr-8">
            <span className="text-xs uppercase font-sans tracking-[0.3em] text-caramel-400 font-semibold mb-4">
              Architectural Sanctuaries
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-cream-100 font-light leading-tight mb-6">
              Not Just Coffee. <br />
              <span className="italic text-caramel-300">A Place To Stay.</span>
            </h2>
            <p className="text-sm sm:text-base text-cream-300/70 font-sans font-light leading-relaxed">
              Every curve of our coffee sanctuary is conceived as an antidote to modern sensory fatigue. Natural walnut, hand-cast concrete, botanical greenery, and an acoustic soundscape that invites slow conversations.
            </p>
          </div>

          {/* Panel 2: Large Atmosphere Photo */}
          <div className="w-[85vw] sm:w-[600px] h-[70vh] flex-shrink-0 relative rounded-2xl overflow-hidden shadow-2xl border border-cream-300/10">
            <img
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=85"
              alt="PINCOF Sunlit Café Seating"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-xs font-sans uppercase tracking-widest text-caramel-400">Morning Light &bull; 08:30 AM</span>
              <h4 className="font-serif text-2xl text-cream-100 mt-1">Sunken Walnut Reading Lounge</h4>
            </div>
          </div>

          {/* Panel 3: Pour-over slow station */}
          <div className="w-[85vw] sm:w-[540px] h-[70vh] flex-shrink-0 relative rounded-2xl overflow-hidden shadow-2xl border border-cream-300/10">
            <img
              src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=85"
              alt="Brass Pour Over Station"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-xs font-sans uppercase tracking-widest text-caramel-400">Specialty Brew Station &bull; Precision Extraction</span>
              <h4 className="font-serif text-2xl text-cream-100 mt-1">Hand-Poured Geisha Rituals</h4>
            </div>
          </div>

          {/* Panel 4: Evening salon atmosphere */}
          <div className="w-[85vw] sm:w-[600px] h-[70vh] flex-shrink-0 relative rounded-2xl overflow-hidden shadow-2xl border border-cream-300/10">
            <img
              src="https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1200&q=85"
              alt="Evening community and warm lamps"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-xs font-sans uppercase tracking-widest text-caramel-400">Acoustic Evenings &bull; 07:00 PM</span>
              <h4 className="font-serif text-2xl text-cream-100 mt-1">Intimate Gatherings &amp; Slow Tastings</h4>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ANIMATED STATISTICS SECTION */}
      <section className="relative py-24 sm:py-32 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <SectionHeading
          badge="By The Numbers"
          title="Crafted With Devotion."
          subtitle="A quantitative tribute to bean purity, barista patience, and thousands of mornings shared."
          className="mb-16"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CAFE_INFO.stats.map((stat, idx) => (
            <StatCounter
              key={idx}
              value={stat.value}
              suffix={stat.suffix}
              decimals={stat.decimals || 0}
              label={stat.label}
              description={stat.description}
            />
          ))}
        </div>
      </section>

      {/* 6. OVERSIZED PHILOSOPHY TYPOGRAPHY SECTION */}
      <section
        ref={philosophyRef}
        className="relative py-32 sm:py-44 px-6 sm:px-8 lg:px-12 bg-[#0e0805] text-center border-t border-espresso-800/80 overflow-hidden"
      >
        <div className="max-w-5xl mx-auto flex flex-col space-y-6 sm:space-y-8 select-none">
          <span className="text-xs uppercase font-sans tracking-[0.3em] text-caramel-400 font-semibold mb-4">
            Our Four Pillars
          </span>
          <div className="philosophy-line font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-cream-100 tracking-tight">
            Good coffee.
          </div>
          <div className="philosophy-line font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-caramel-300 italic tracking-tight">
            Good food.
          </div>
          <div className="philosophy-line font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-cream-100 tracking-tight">
            Good people.
          </div>
          <div className="philosophy-line font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-caramel-400 tracking-tight">
            Good moments.
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS CAROUSEL */}
      <section className="relative py-24 sm:py-32 px-6 sm:px-8 lg:px-12 max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <SectionHeading
            align="left"
            badge="Guest Impressions"
            title="Words From Our Community."
            subtitle="Thoughts shared by the writers, designers, travelers, and morning dwellers who make PINCOF their third home."
          />
          {/* Navigation buttons */}
          <div className="flex items-center space-x-3 self-start sm:self-end">
            <button
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
              className="p-3 rounded-full border border-cream-300/20 text-cream-200 hover:border-caramel-400 hover:text-caramel-400 hover:bg-caramel-500/10 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextTestimonial}
              aria-label="Next testimonial"
              className="p-3 rounded-full border border-cream-300/20 text-cream-200 hover:border-caramel-400 hover:text-caramel-400 hover:bg-caramel-500/10 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Current Active Testimonial Card */}
        <div className="transition-opacity duration-500">
          <TestimonialCard testimonial={TESTIMONIALS[currentTestimonial]} />
        </div>

        {/* Indicators */}
        <div className="flex items-center justify-center space-x-2 mt-8">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentTestimonial(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentTestimonial ? 'w-8 bg-caramel-400' : 'w-2 bg-espresso-700'
              }`}
            />
          ))}
        </div>
      </section>

      {/* 8. PHOTO GALLERY — ASYMMETRIC EDITORIAL GRID */}
      <section className="relative py-24 sm:py-32 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <SectionHeading
          badge="Atmosphere"
          title="Moments In Light &amp; Steam."
          subtitle="A visual chronicle of our roasting hall, sensory cuppings, and slow mornings."
          className="mb-16"
        />
        <Gallery />
      </section>

      {/* 9. FINAL CTA — CINEMATIC BANNER */}
      <section
        ref={finalCtaRef}
        className="relative py-32 sm:py-40 px-6 sm:px-8 lg:px-12 overflow-hidden flex items-center justify-center text-center"
      >
        {/* Parallax Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1800&q=85"
            alt="Warm café sunset vibe"
            className="cta-bg w-full h-[130%] -top-[15%] relative object-cover brightness-[0.35] contrast-[1.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#140c08] via-transparent to-[#140c08]" />
        </div>

        {/* Ambient Steam Particles */}
        <AromaSteam count={10} />

        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          <span className="text-xs uppercase font-sans tracking-[0.3em] text-caramel-400 font-semibold mb-4 px-4 py-1 rounded-full bg-caramel-500/10 border border-caramel-500/20">
            Open Daily in Historic District
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl text-cream-100 font-light leading-tight mb-6">
            Come In. <br />
            <span className="italic text-caramel-300">Stay Awhile.</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-cream-300/80 font-sans font-light leading-relaxed mb-8 max-w-xl">
            Whether you need a quiet corner for your notebook, a deep discussion over Gesha pour-overs, or a warm butter croissant fresh from the oven, our doors are open.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <Button
              href={CAFE_INFO.googleMapsUrl}
              variant="primary"
              size="lg"
              showArrow={true}
            >
              Get Directions
            </Button>
            <Button to="/contact" variant="outline" size="lg">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
