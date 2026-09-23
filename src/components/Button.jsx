import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { attachMagneticEffect } from '../animations/magnetic';

export const Button = ({
  children,
  to,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  showArrow = false,
  magnetic = true,
  className = '',
  type = 'button',
  disabled = false,
  ...props
}) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    if (!magnetic || disabled) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || window.innerWidth < 1024) return;

    const cleanup = attachMagneticEffect(buttonRef.current, {
      power: 0.28,
      radius: 90,
      innerSelector: '.btn-inner',
    });

    return cleanup;
  }, [magnetic, disabled]);

  const baseStyles =
    'relative inline-flex items-center justify-center font-sans font-medium tracking-wider uppercase transition-colors duration-300 group overflow-hidden select-none disabled:opacity-50 disabled:pointer-events-none';

  const sizes = {
    sm: 'text-xs px-4 py-2 gap-1.5 rounded-full',
    md: 'text-xs md:text-sm px-6 py-3.5 gap-2 rounded-full',
    lg: 'text-sm md:text-base px-8 py-4 gap-2.5 rounded-full',
  };

  const variants = {
    primary:
      'bg-caramel-500 text-espresso-950 hover:bg-caramel-400 hover:shadow-[0_0_24px_rgba(200,137,73,0.35)]',
    outline:
      'border border-cream-300/40 text-cream-100 hover:border-caramel-400 hover:text-caramel-400 hover:bg-caramel-500/10',
    secondary:
      'bg-espresso-800 text-cream-100 border border-espresso-700 hover:bg-espresso-700 hover:text-white',
    ghost:
      'text-cream-200 hover:text-caramel-400 bg-transparent p-0 tracking-widest',
  };

  const content = (
    <span className="btn-inner relative z-10 flex items-center gap-2 pointer-events-none will-change-transform">
      {children}
      {showArrow && (
        <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      )}
    </span>
  );

  const combinedClasses = `${baseStyles} ${sizes[size]} ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link ref={buttonRef} to={to} className={combinedClasses} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        ref={buttonRef}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={combinedClasses}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={buttonRef}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
      {...props}
    >
      {content}
    </button>
  );
};

export default Button;
