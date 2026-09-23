import React from 'react';
import { MapPin, Phone, Mail, Clock, Navigation } from 'lucide-react';
import { Instagram, Facebook, Twitter } from '../components/Icons';

import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { CAFE_INFO } from '../data/cafeInfo';
import SectionHeading from '../components/SectionHeading';
import ContactForm from '../components/ContactForm';

export const Contact = () => {
  useDocumentTitle(
    'Contact & Visit',
    'Visit PINCOF Specialty Coffee Cafe & Roastery in San Francisco. Reach out for table reservations, event inquiries, and beans.'
  );

  return (
    <div className="min-h-screen pt-28 pb-28 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <SectionHeading
          badge="Visit Our Roastery &amp; Specialty Café"
          title="Let's Meet Over Coffee."
          subtitle="Whether planning a private salon tasting, reserving a table for slow morning dialogue, or asking about our micro-lot bean subscriptions, we are here."
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Contact Details, Hours, Map Preview */}
        <div className="lg:col-span-5 space-y-8">
          {/* Address & Direct Inquiries Card */}
          <div className="glass-card p-8 rounded-2xl border border-cream-300/10 space-y-6">
            <h3 className="font-serif text-2xl text-cream-100 font-medium border-b border-espresso-800 pb-4">
              PINCOF Café San Francisco
            </h3>

            {/* Address */}
            <div className="flex items-start gap-4 text-sm font-sans">
              <div className="p-2.5 rounded-full bg-caramel-500/10 text-caramel-400 border border-caramel-500/20 flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs uppercase font-sans tracking-widest text-caramel-400/80 mb-1">
                  Location
                </span>
                <p className="text-cream-100 font-medium">{CAFE_INFO.address.street}</p>
                <p className="text-cream-300/70 text-xs">{CAFE_INFO.address.district}</p>
                <p className="text-cream-300/70 text-xs">
                  {CAFE_INFO.address.city}, {CAFE_INFO.address.state} {CAFE_INFO.address.zip}
                </p>
                <a
                  href={CAFE_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-caramel-400 hover:underline mt-2.5 font-medium"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Open In Google Maps</span>
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4 text-sm font-sans">
              <div className="p-2.5 rounded-full bg-caramel-500/10 text-caramel-400 border border-caramel-500/20 flex-shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs uppercase font-sans tracking-widest text-caramel-400/80 mb-1">
                  Telephone
                </span>
                <a
                  href={`tel:${CAFE_INFO.phone}`}
                  className="text-cream-100 hover:text-caramel-400 transition-colors font-medium"
                >
                  {CAFE_INFO.phone}
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4 text-sm font-sans">
              <div className="p-2.5 rounded-full bg-caramel-500/10 text-caramel-400 border border-caramel-500/20 flex-shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs uppercase font-sans tracking-widest text-caramel-400/80 mb-1">
                  Electronic Mail
                </span>
                <a
                  href={`mailto:${CAFE_INFO.email}`}
                  className="text-cream-100 hover:text-caramel-400 transition-colors font-medium block"
                >
                  {CAFE_INFO.email}
                </a>
                <span className="text-[11px] text-cream-400/60 block mt-0.5">
                  Reservations: {CAFE_INFO.reservationsEmail}
                </span>
              </div>
            </div>
          </div>

          {/* Operating Hours Card */}
          <div className="glass-card p-8 rounded-2xl border border-cream-300/10">
            <div className="flex items-center gap-3 mb-6 border-b border-espresso-800 pb-4">
              <Clock className="w-5 h-5 text-caramel-400" />
              <h3 className="font-serif text-2xl text-cream-100 font-medium">
                Operating Hours
              </h3>
            </div>

            <div className="space-y-4">
              {CAFE_INFO.hours.map((schedule, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs sm:text-sm font-sans">
                  <div>
                    <span className="text-cream-100 font-medium block">{schedule.days}</span>
                    <span className="text-cream-400/50 text-[11px]">{schedule.notes}</span>
                  </div>
                  <span className="text-caramel-300 font-semibold">{schedule.hours}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Social Follow */}
          <div className="glass-card p-6 rounded-2xl border border-cream-300/10 flex items-center justify-between">
            <span className="text-xs uppercase font-sans tracking-widest text-caramel-400 font-medium">
              Follow Our Roasts
            </span>
            <div className="flex items-center gap-3">
              <a
                href={CAFE_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-espresso-800 text-cream-200 hover:text-caramel-400 hover:bg-espresso-700 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={CAFE_INFO.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-espresso-800 text-cream-200 hover:text-caramel-400 hover:bg-espresso-700 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={CAFE_INFO.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-espresso-800 text-cream-200 hover:text-caramel-400 hover:bg-espresso-700 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Contact & Reservation Form */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default Contact;
