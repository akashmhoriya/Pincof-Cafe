import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Flame, Droplet, Wind, Sun, Compass } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Button from './Button';

gsap.registerPlugin(ScrollTrigger);

const ROAST_PROFILES = [
  {
    id: 'light',
    name: 'Ethiopian Yirgacheffe',
    roastLevel: 'Nordic Light Roast',
    origin: 'Kochere Washing Station &bull; 2,150 MASL',
    elevation: '2,150m',
    process: 'Washed Micro-Lot',
    description:
      'Celebrated for its sparkling citrus acidity and delicate perfume. Roasted gently on electric fluid-bed to preserve aromatic jasmine florals and honeyed stone fruit.',
    tastingNotes: ['Bergamot Blossom', 'White Jasmine', 'Ripe Peach', 'Meyer Lemon'],
    metrics: [
      { label: 'Floral Aroma', value: 96, icon: Wind },
      { label: 'Bright Acidity', value: 92, icon: Sun },
      { label: 'Natural Sweetness', value: 84, icon: Droplet },
      { label: 'Velvet Body', value: 58, icon: Flame },
      { label: 'Clean Finish', value: 90, icon: Compass },
    ],
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    color: '#e6a15c',
  },
  {
    id: 'medium',
    name: 'Colombian Huila Pink Bourbon',
    roastLevel: 'Balanced Medium Roast',
    origin: 'Pitalito Valley &bull; 1,850 MASL',
    elevation: '1,850m',
    process: 'Honey Anaerobic 48h',
    description:
      'A rare heirloom varietal with luscious caramelized sweetness. Balances bright blood orange zest with rich hazelnut praline and molten milk chocolate.',
    tastingNotes: ['Blood Orange', 'Wild Mountain Honey', 'Hazelnut Praline', 'Silky Caramel'],
    metrics: [
      { label: 'Floral Aroma', value: 85, icon: Wind },
      { label: 'Bright Acidity', value: 78, icon: Sun },
      { label: 'Natural Sweetness', value: 95, icon: Droplet },
      { label: 'Velvet Body', value: 82, icon: Flame },
      { label: 'Clean Finish', value: 88, icon: Compass },
    ],
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=800&q=80',
    color: '#d48039',
  },
  {
    id: 'dark',
    name: 'Sumatran Gayo Reserve',
    roastLevel: 'Signature Dark Ember',
    origin: 'Takengon Highland &bull; 1,600 MASL',
    elevation: '1,600m',
    process: 'Wet-Hulled Organic',
    description:
      'Full-bodied and deeply contemplative with roasted cacao nibs, toasted cedar, and dark molasses. Extracted with heavy crema and virtually zero bitter astringency.',
    tastingNotes: ['Smoked Dark Cacao', 'Black Cherry', 'Toasted Cedar', 'Molasses'],
    metrics: [
      { label: 'Floral Aroma', value: 68, icon: Wind },
      { label: 'Bright Acidity', value: 44, icon: Sun },
      { label: 'Natural Sweetness', value: 76, icon: Droplet },
      { label: 'Velvet Body', value: 98, icon: Flame },
      { label: 'Clean Finish', value: 86, icon: Compass },
    ],
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80',
    color: '#b06528',
  },
];

export const RoastProfileDial = () => {
  const [activeProfile, setActiveProfile] = useState(ROAST_PROFILES[0]);
  const sectionRef = useRef(null);
  const metricsRef = useRef(null);
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const notesRef = useRef(null);

  // Animate metrics whenever active profile changes
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Image fade & subtle zoom transition
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { opacity: 0.4, scale: 1.08 },
          { opacity: 1, scale: 1, duration: 0.7, ease: 'power3.out' }
        );
      }

      // 2. Animate metric fill bars with stagger
      const metricBars = metricsRef.current?.querySelectorAll('.metric-fill-bar');
      if (metricBars) {
        gsap.fromTo(
          metricBars,
          { width: '0%' },
          {
            width: (i) => `${activeProfile.metrics[i].value}%`,
            duration: 0.9,
            stagger: 0.08,
            ease: 'power3.out',
          }
        );
      }

      // 3. Stagger tasting notes badges
      const tags = notesRef.current?.querySelectorAll('.note-pill');
      if (tags) {
        gsap.fromTo(
          tags,
          { opacity: 0, y: 12, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.06, ease: 'back.out(1.4)' }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [activeProfile]);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 sm:py-36 px-6 sm:px-8 lg:px-12 bg-[#0e0805] border-y border-espresso-800/80 overflow-hidden"
    >
      {/* Background warm radial aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-caramel-600/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          badge="Sensory Roastery Lab"
          title="The PINCOF Flavor Dial."
          subtitle="Explore the nuanced alchemy of origin terroir, density elevation, and precision roast kinetics. Every roast profile is calibrated to unlock its native botanical brilliance."
          className="mb-14"
        />

        {/* Profile Switcher Tabs */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex p-1.5 rounded-full bg-espresso-900/90 border border-cream-300/15 backdrop-blur-md">
            {ROAST_PROFILES.map((profile) => {
              const isActive = activeProfile.id === profile.id;
              return (
                <button
                  key={profile.id}
                  onClick={() => setActiveProfile(profile)}
                  type="button"
                  className={`relative px-5 sm:px-7 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-sans uppercase tracking-wider transition-all duration-300 ${
                    isActive
                      ? 'text-espresso-950 font-bold bg-caramel-400 shadow-[0_0_20px_rgba(200,137,73,0.4)]'
                      : 'text-cream-200/80 hover:text-white hover:bg-espresso-800/60'
                  }`}
                >
                  {profile.roastLevel}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Interactive Showcase Grid */}
        <div
          ref={cardRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center rounded-3xl glass-card p-8 sm:p-12 lg:p-14 border border-cream-300/15 shadow-2xl relative overflow-hidden"
        >
          {/* Left Column: Visual Photograph & Origin Stamp */}
          <div className="lg:col-span-5 relative">
            <div className="relative w-full h-[380px] sm:h-[460px] rounded-2xl overflow-hidden border border-cream-300/10 shadow-2xl bg-espresso-950">
              <img
                ref={imageRef}
                src={activeProfile.image}
                alt={activeProfile.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso-950 via-transparent to-transparent opacity-80" />

              {/* Badges */}
              <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
                <span className="text-[10px] uppercase font-sans tracking-widest font-semibold px-3 py-1 rounded-full bg-espresso-950/80 backdrop-blur-md text-caramel-300 border border-caramel-500/20">
                  {activeProfile.process}
                </span>
                <span className="text-[10px] uppercase font-sans tracking-widest text-cream-200 bg-espresso-950/80 px-2.5 py-1 rounded-full border border-cream-300/10">
                  {activeProfile.elevation}
                </span>
              </div>

              {/* Bottom Stamp */}
              <div className="absolute bottom-6 left-6 right-6">
                <span
                  className="text-xs uppercase font-sans tracking-widest font-semibold"
                  style={{ color: activeProfile.color }}
                >
                  Direct Trade Terroir
                </span>
                <h4 className="font-serif text-2xl text-cream-100 font-light mt-1">
                  {activeProfile.name}
                </h4>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Metrics & Tasting Spectrum */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-caramel-400" />
                <span className="text-xs uppercase font-sans tracking-[0.25em] text-caramel-400 font-semibold">
                  {activeProfile.roastLevel}
                </span>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl text-cream-100 font-light mb-4">
                {activeProfile.name}
              </h3>

              <p className="text-sm sm:text-base text-cream-300/80 font-sans leading-relaxed mb-6 font-light">
                {activeProfile.description}
              </p>

              {/* Tasting Notes Pills */}
              <div className="mb-8">
                <span className="block text-[11px] uppercase font-sans tracking-widest text-cream-400/60 mb-3">
                  Dominant Sensory Notes
                </span>
                <div ref={notesRef} className="flex flex-wrap gap-2.5">
                  {activeProfile.tastingNotes.map((note, idx) => (
                    <span
                      key={idx}
                      className="note-pill text-xs font-sans px-3.5 py-1.5 rounded-full bg-caramel-500/10 border border-caramel-500/30 text-caramel-300 font-medium"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Animated GSAP Metric Bars */}
              <div ref={metricsRef} className="space-y-4 pt-4 border-t border-espresso-800/80">
                <span className="block text-[11px] uppercase font-sans tracking-widest text-cream-400/60 mb-2">
                  Cupping Profile Radar
                </span>
                {activeProfile.metrics.map((metric, idx) => {
                  const Icon = metric.icon;
                  return (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-sans">
                        <span className="flex items-center gap-2 text-cream-200">
                          <Icon className="w-3.5 h-3.5 text-caramel-400" />
                          <span>{metric.label}</span>
                        </span>
                        <span className="text-caramel-400 font-semibold">{metric.value}%</span>
                      </div>
                      {/* Bar Track */}
                      <div className="w-full h-2 rounded-full bg-espresso-950 overflow-hidden border border-cream-300/10">
                        <div
                          className="metric-fill-bar h-full rounded-full bg-gradient-to-r from-caramel-600 via-caramel-400 to-amber-200 transition-all"
                          style={{ width: `${metric.value}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action CTA */}
            <div className="mt-10 pt-6 border-t border-espresso-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs font-sans text-cream-300/60">
                Freshly roasted every Tuesday &bull; Whole bean or barista ground
              </span>
              <Button to="/menu" variant="primary" size="sm" showArrow={true}>
                Taste This Roast
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoastProfileDial;
