import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu as MenuIcon, Coffee } from 'lucide-react';
import { useScrollDirection } from '../hooks/useScrollDirection';
import MobileMenu from './MobileMenu';
import Button from './Button';

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isScrolled } = useScrollDirection();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'py-3.5 bg-[#140c08]/90 backdrop-blur-md border-b border-caramel-500/15 shadow-[0_8px_30px_rgba(0,0,0,0.45)]'
            : 'py-6 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group select-none outline-none"
            aria-label="PINCOF Café Home"
          >
            <div className="w-8 h-8 rounded-full border border-caramel-400/40 bg-caramel-500/10 flex items-center justify-center transition-all duration-300 group-hover:border-caramel-400 group-hover:bg-caramel-500/20">
              <Coffee className="w-4 h-4 text-caramel-400 transition-transform duration-300 group-hover:rotate-12" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl tracking-[0.25em] font-light text-cream-100 group-hover:text-caramel-300 transition-colors">
                PINCOF
              </span>
              <span className="text-[9px] tracking-[0.25em] text-caramel-400/80 uppercase font-sans -mt-1 font-medium">
                Specialty Coffee &amp; Roastery
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className="relative py-1 text-sm font-sans tracking-widest uppercase transition-colors duration-300 text-cream-200 hover:text-white group"
                >
                  <span className={isActive ? 'text-caramel-400 font-semibold' : ''}>
                    {link.name}
                  </span>
                  {/* Animated underline indicator */}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-caramel-400 transition-all duration-300 ${
                      isActive ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                    }`}
                  />
                </NavLink>
              );
            })}
          </nav>

          {/* Desktop CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <Button
                to="/contact"
                variant="primary"
                size="sm"
                showArrow={true}
                className="font-medium tracking-wider"
              >
                Visit Us
              </Button>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="md:hidden p-2.5 rounded-full bg-espresso-800/80 border border-cream-300/20 text-cream-200 hover:text-caramel-400 hover:border-caramel-400 transition-colors"
            >
              <MenuIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
};

export default Navbar;
