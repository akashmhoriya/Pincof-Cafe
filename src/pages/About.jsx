import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Heart, Bean, Droplets, Users, Compass } from 'lucide-react';

import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { TIMELINE_EVENTS } from '../data/timeline';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  useDocumentTitle(
    'About Our Café & Roastery',
    'Learn about our origin journeys, our clean roasting ethos, and our intentional architectural coffee sanctuary.'
  );

  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const timelineHeadingRef = useRef(null);
  const timelineTrackRef = useRef(null);
  const progressLineRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const cards = timelineTrackRef.current?.querySelectorAll('.timeline-card');

      if (prefersReducedMotion) {
        if (cards) {
          gsap.set(cards, { opacity: 1, x: 0, y: 0 });
        }
        if (progressLineRef.current) {
          gsap.set(progressLineRef.current, { scaleY: 1 });
        }
        return;
      }

      // 1. Heading entrance reveal
      if (timelineHeadingRef.current) {
        gsap.fromTo(
          timelineHeadingRef.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: timelineHeadingRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 2. Dynamic Glowing Spine (Scrubbed Golden Line that draws down as you scroll)
      if (progressLineRef.current && timelineTrackRef.current) {
        gsap.fromTo(
          progressLineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: timelineTrackRef.current,
              start: 'top 75%',
              end: 'bottom 85%',
              scrub: 0.8,
            },
          }
        );
      }

      // 3. Synchronized Card & Milestone Bead activations
      if (cards && cards.length > 0) {
        cards.forEach((card) => {
          const beadInner = card.querySelector('.timeline-bead-inner');
          const beadPulse = card.querySelector('.timeline-bead-pulse');
          const image = card.querySelector('.timeline-image');
          const year = card.querySelector('.timeline-year');

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: 'top 82%',
              toggleActions: 'play none none reverse',
            },
          });

          // Card slides in from right with subtle elevation
          tl.fromTo(
            card,
            { opacity: 0, x: 40, y: 20 },
            {
              opacity: 1,
              x: 0,
              y: 0,
              duration: 0.85,
              ease: 'power3.out',
            }
          );

          // Bead blooms into glowing caramel gold
          if (beadInner) {
            tl.fromTo(
              beadInner,
              {
                scale: 0.7,
                backgroundColor: '#140c08',
                borderColor: 'rgba(200, 137, 73, 0.35)',
              },
              {
                scale: 1.25,
                backgroundColor: '#d79a5b',
                borderColor: '#faf7f2',
                boxShadow: '0 0 20px rgba(215, 154, 91, 0.85)',
                duration: 0.45,
                ease: 'back.out(2)',
              },
              '-=0.6'
            );
          }

          if (beadPulse) {
            tl.fromTo(
              beadPulse,
              { scale: 0.8, opacity: 0 },
              { scale: 1.8, opacity: 0.4, duration: 0.5, ease: 'power2.out' },
              '-=0.45'
            );
          }

          // Subtle photo zoom-out reveal
          if (image) {
            tl.fromTo(
              image,
              { scale: 1.15 },
              { scale: 1, duration: 1.1, ease: 'power2.out' },
              '-=0.85'
            );
          }

          // Year label entrance
          if (year) {
            tl.fromTo(
              year,
              { opacity: 0, y: 10 },
              { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
              '-=0.75'
            );
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const storyPillars = [
    {
      icon: Bean,
      title: "Our Coffee",
      subtitle: "Micro-Lot Terroir",
      description:
        "We source solely from single-estate micro-lots above 1,700 meters. Every harvest lot undergoes rigorous sensory evaluation, roasted on clean electric fluid-bed drums to preserve organic terroir and delicate floral jasmine notes.",
      image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=800&q=80",
    },
    {
      icon: Droplets,
      title: "Our Ingredients",
      subtitle: "Botanical & Pure",
      description:
        "From organic Madagascar bourbon vanilla pods to stone-ground ceremonial matcha from Kyoto, we craft syrups, infusions, and cold extraction tonics in-house without synthetic extracts or artificial sweeteners.",
      image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80",
    },
    {
      icon: Users,
      title: "Our People",
      subtitle: "Devoted Craftspeople",
      description:
        "Our baristas are certified sensory sommeliers and welcoming storytellers. They view the espresso machine as a precision instrument, measuring brew water mineralization down to parts-per-million.",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    },
    {
      icon: Compass,
      title: "Our Space",
      subtitle: "Architectural Calm",
      description:
        "Conceived with natural materials—solid American walnut, warm sandstone, brushed brass, and natural linen. PINCOF is tuned acoustically to encourage focused contemplation and leisurely dialogue.",
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <div ref={containerRef} className="min-h-screen pt-28 pb-28">
      {/* 1. HERO SECTION */}
      <section className="px-6 sm:px-8 lg:px-12 max-w-5xl mx-auto text-center mb-24">
        <div className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-[0.3em] text-caramel-400 mb-6 px-4 py-1.5 rounded-full bg-caramel-500/10 border border-caramel-500/20">
          <Sparkles className="w-3.5 h-3.5 text-caramel-400" />
          <span>The PINCOF Journey</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-cream-100 tracking-tight leading-[1.08] mb-8">
          More Than <br />
          <span className="italic text-caramel-300">A Café.</span>
        </h1>
        <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-cream-300/80 font-sans font-light leading-relaxed">
          PINCOF was created as a deliberate response to an accelerated world. We make space for the beauty of ritual, the science of single-origin extraction, and the profound art of shared company.
        </p>
      </section>

      {/* 2. OUR STORY & PHILOSOPHY — EDITORIAL FEATURE */}
      <section className="px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Visual */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden border border-cream-300/10 shadow-2xl h-[420px] sm:h-[520px]">
              <img
                src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1200&q=85"
                alt="Harvested ripe specialty coffee cherries"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso-950 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[10px] uppercase tracking-widest text-caramel-400 font-sans">
                  Origin Direct Trade &bull; Yirgacheffe, Ethiopia
                </span>
                <h3 className="font-serif text-2xl text-cream-100 mt-1">
                  Single-Estate Micro-Lot Partnerships
                </h3>
              </div>
            </div>
          </div>

          {/* Story Text */}
          <div className="lg:col-span-5 flex flex-col items-start space-y-6">
            <span className="text-xs uppercase font-sans tracking-[0.25em] text-caramel-400 font-semibold">
              Our Story &amp; Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-cream-100 font-light leading-snug">
              Rooted In The Soil. <br />
              Refined By The Flame.
            </h2>
            <p className="text-sm sm:text-base text-cream-300/80 font-sans font-light leading-relaxed">
              We spent our formative years working harvests alongside multi-generational coffee farming families in Central America and the Ethiopian highlands. There, we learned that coffee is alive—a delicate seed carrying the climate, the rainfall, and the altitude of its birthplace.
            </p>
            <p className="text-sm sm:text-base text-cream-300/80 font-sans font-light leading-relaxed">
              When we founded PINCOF, we vowed never to drown those origins under dark, over-roasted profiles or industrial syrups. Every roast curve is tuned to honor the farmer's labor, unlocking natural sweetness and radiant florals.
            </p>
            <div className="pt-2">
              <div className="flex items-center gap-3 text-caramel-300 font-serif italic text-lg">
                <Heart className="w-5 h-5 text-caramel-400" />
                <span>"Respect the harvest, honor the hands."</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FOUR FOUNDATIONAL PILLARS (Coffee, Ingredients, People, Space) */}
      <section className="px-6 sm:px-8 lg:px-12 py-24 bg-[#0e0805] border-y border-espresso-800/80 mb-32">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            badge="The Anatomy of Quality"
            title="The Elements of PINCOF."
            subtitle="Four core pillars guiding every espresso pulled, pastry laminated, and chair selected."
            className="mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
            {storyPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl glass-card overflow-hidden border border-cream-300/10 flex flex-col sm:flex-row group transition-all duration-500 hover:border-caramel-500/40"
                >
                  <div className="sm:w-2/5 h-52 sm:h-auto relative overflow-hidden bg-espresso-900">
                    <img
                      src={pillar.image}
                      alt={pillar.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-espresso-950/40" />
                  </div>
                  <div className="sm:w-3/5 p-6 sm:p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-caramel-400 mb-2">
                        <Icon className="w-4 h-4" />
                        <span className="text-[11px] uppercase font-sans tracking-widest font-semibold">
                          {pillar.subtitle}
                        </span>
                      </div>
                      <h3 className="font-serif text-2xl text-cream-100 font-medium mb-3">
                        {pillar.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-cream-300/70 font-sans leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. ANIMATED TIMELINE SECTION */}
      <section
        ref={timelineRef}
        className="px-6 sm:px-8 lg:px-12 max-w-5xl mx-auto mb-32"
      >
        <div ref={timelineHeadingRef}>
          <SectionHeading
            badge="Milestones"
            title="The Chapters of Our Growth."
            subtitle="From a hand-cranked roaster in an abandoned brick annex to a cherished sanctuary for slow culture."
            className="mb-20"
          />
        </div>

        <div
          ref={timelineTrackRef}
          className="relative ml-4 sm:ml-8 pl-6 sm:pl-12 space-y-16"
        >
          {/* Static Background Rail Line */}
          <div
            aria-hidden="true"
            className="absolute left-0 top-5 bottom-6 w-[2px] bg-cream-300/10 rounded-full"
          />

          {/* Dynamic Scrubbed Golden Progress Line */}
          <div
            ref={progressLineRef}
            aria-hidden="true"
            className="absolute left-0 -inset-5 bottom-6 w-[2px] bg-gradient-to-b from-caramel-400 via-caramel-500 to-caramel-300 rounded-full origin-top scale-y-0 shadow-[0_0_12px_rgba(200,137,73,0.85)] will-change-transform"
          />

          {TIMELINE_EVENTS.map((event, idx) => (
            <div key={idx} className="timeline-card relative group">
              {/* Year Marker Bead */}
              <div
                aria-hidden="true"
                className="absolute -left-[31px] sm:-left-[55px] top-6 flex items-center justify-center pointer-events-none"
              >
                <div className="timeline-bead-pulse absolute w-8 h-8 rounded-full bg-caramel-400 blur-sm opacity-0 pointer-events-none" />
                <div className="timeline-bead-inner w-4 h-4 rounded-full bg-espresso-950 border-2 border-caramel-500/40 will-change-transform" />
              </div>

              <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start glass-card p-6 sm:p-8 rounded-2xl border border-cream-300/10 transition-colors group-hover:border-caramel-500/30 overflow-hidden shadow-xl">
                <div className="lg:w-1/3 w-full h-44 rounded-xl overflow-hidden bg-espresso-900 flex-shrink-0">
                  <img
                    src={event.image}
                    alt={event.title}
                    loading="lazy"
                    className="timeline-image w-full h-full object-cover will-change-transform transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="lg:w-2/3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-baseline gap-3 mb-1">
                      <span className="timeline-year font-serif text-3xl sm:text-4xl text-caramel-400 font-light will-change-transform inline-block">
                        {event.year}
                      </span>
                      <span className="text-xs uppercase font-sans tracking-widest text-cream-300/60 font-medium">
                        {event.subtitle}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl text-cream-100 font-normal mb-3">
                      {event.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-cream-300/80 font-sans leading-relaxed mb-4">
                      {event.description}
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 text-xs font-sans text-caramel-300 bg-caramel-500/10 px-3 py-1.5 rounded-lg border border-caramel-500/20 w-fit">
                    <Sparkles className="w-3 h-3 text-caramel-400" />
                    <span>{event.highlight}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. FINAL STATEMENT SECTION */}
      <section className="px-6 sm:px-8 lg:px-12 max-w-4xl mx-auto text-center pt-8">
        <div className="p-12 sm:p-16 rounded-3xl glass-card border border-caramel-500/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-caramel-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <span className="text-xs uppercase font-sans tracking-[0.3em] text-caramel-400 font-semibold mb-6 block">
            Our Continuing Belief
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-cream-100 font-light leading-tight mb-8">
            "Good coffee brings <br />
            <span className="italic text-caramel-300">people together."</span>
          </h2>
          <p className="text-sm sm:text-base text-cream-300/70 font-sans max-w-xl mx-auto leading-relaxed mb-8">
            Pull up a chair. Ask for tasting notes. Linger as long as you wish. We are honored to pour for you.
          </p>
          <Button to="/contact" variant="primary" size="lg" showArrow={true}>
            Reserve A Tasting Table
          </Button>
        </div>
      </section>
    </div>
  );
};

export default About;
