import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Coffee, ArrowUp, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Instagram, Facebook, Twitter } from './Icons';
import { CAFE_INFO } from '../data/cafeInfo';

export const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSubscribed(false), 5000);
    }
  };

  return (
    <footer className="relative bg-[#0d0705] text-[#ede5d8] border-t border-espresso-800/80 pt-20 pb-12 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-caramel-600/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-espresso-800">
          {/* Brand Col */}
          <div className="lg:col-span-4 flex flex-col">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-10 h-10 rounded-full border border-caramel-400/40 bg-caramel-500/10 flex items-center justify-center">
                <Coffee className="w-5 h-5 text-caramel-400" />
              </div>
              <span className="font-serif text-3xl tracking-[0.25em] font-light text-cream-100">
                PINCOF
              </span>
            </Link>
            <p className="text-sm text-cream-300/70 font-sans leading-relaxed mb-6 max-w-sm">
              An artisanal specialty coffeehouse and roastery dedicated to single-origin extraction, crafted beverages, and the slow art of community conversation.
            </p>
            <div className="flex items-center space-x-3">
              <a
                href={CAFE_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full border border-cream-300/10 flex items-center justify-center text-cream-300 hover:text-caramel-400 hover:border-caramel-400/50 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={CAFE_INFO.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full border border-cream-300/10 flex items-center justify-center text-cream-300 hover:text-caramel-400 hover:border-caramel-400/50 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={CAFE_INFO.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="w-10 h-10 rounded-full border border-cream-300/10 flex items-center justify-center text-cream-300 hover:text-caramel-400 hover:border-caramel-400/50 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2 flex flex-col">
            <h3 className="text-xs uppercase font-sans tracking-[0.25em] text-caramel-400 font-semibold mb-6">
              Navigation
            </h3>
            <ul className="space-y-3.5 text-sm font-sans">
              <li>
                <Link to="/" className="text-cream-300/80 hover:text-caramel-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="text-cream-300/80 hover:text-caramel-400 transition-colors">
                  Specialty Menu
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-cream-300/80 hover:text-caramel-400 transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-cream-300/80 hover:text-caramel-400 transition-colors">
                  Find &amp; Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Operating Hours */}
          <div className="lg:col-span-3 flex flex-col">
            <h3 className="text-xs uppercase font-sans tracking-[0.25em] text-caramel-400 font-semibold mb-6">
              Café &amp; Roastery Hours
            </h3>
            <div className="space-y-3 text-sm font-sans">
              {CAFE_INFO.hours.map((item, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-cream-100 font-medium">{item.days}</span>
                  <span className="text-caramel-300/90 text-xs">{item.hours}</span>
                  <span className="text-cream-400/50 text-[11px]">{item.notes}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="lg:col-span-3 flex flex-col">
            <h3 className="text-xs uppercase font-sans tracking-[0.25em] text-caramel-400 font-semibold mb-6">
              The Morning Bulletin
            </h3>
            <p className="text-xs text-cream-300/70 leading-relaxed mb-4">
              Seasonal harvest drops, barista cupping sessions, and tasting events delivered monthly.
            </p>
            {newsletterSubscribed ? (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-caramel-500/10 border border-caramel-500/30 text-caramel-300 text-xs font-sans">
                <CheckCircle2 className="w-4 h-4 text-caramel-400" />
                <span>You're on the invite list. Welcome to PINCOF.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="relative flex items-center">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email..."
                  className="w-full bg-espresso-900 border border-cream-300/15 rounded-full py-3 pl-4 pr-12 text-xs text-cream-100 placeholder:text-cream-300/40 focus:outline-none focus:border-caramel-400 transition-colors"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="absolute right-1.5 p-2 rounded-full bg-caramel-500 text-espresso-950 hover:bg-caramel-400 transition-colors"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar: Copyright, Legal, Back to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-cream-300/50">
          <div>
            &copy; {new Date().getFullYear()} {CAFE_INFO.legalName}. All rights reserved.
          </div>
          <div className="flex items-center space-x-6">
            <Link to="/privacy-policy" className="hover:text-caramel-400 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-and-conditions" className="hover:text-caramel-400 transition-colors">
              Terms &amp; Conditions
            </Link>
          </div>
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="flex items-center gap-1.5 hover:text-caramel-400 transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
