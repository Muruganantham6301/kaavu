"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // For external links, let default behavior happen
    if (href.startsWith('http')) {
      return;
    }
    
    // For internal anchor links
    e.preventDefault();
    setMobileMenuOpen(false);
    
    // Wait for menu to close, then scroll
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300); // Match the menu transition duration
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-[500] bg-black/40 backdrop-blur-sm ">
        {/* FIXED HEIGHT + CENTER ALIGN */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center">
          <div className="flex items-center justify-between w-full">
            {/* Logo - LEFT (Mobile + Desktop) */}
            <div className="flex items-center">
              <a href="/" className="relative w-22 h-16 md:w-22  md:h-18">
                <Image
                  src="/images/kaavu-logo-white.png"
                  alt="Kaavu Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </a>
            </div>

            {/* Center Navigation - Desktop */}
            <div className="hidden lg:flex items-center gap-12">
              <a
                href="/#zones"
                rel="noopener noreferrer"
                className="text-white text-base font-medium hover:opacity-70 transition-opacity"
              >
                Explore Kaavu
              </a>

              <a
                href="https://celebrations.thekaavu.in/"
                target="_blank"
                className="text-white text-base font-medium hover:opacity-70 transition-opacity"
              >
                Celebrations
              </a>

              <a
                href="/#story"
                className="text-white text-base font-medium hover:opacity-70 transition-opacity"
              >
                Our Story
              </a>
              <a
                href="/#moments"
                className="text-white text-base font-medium hover:opacity-70 transition-opacity"
              >
                Moments
              </a>

              <a
                href="/#gallery"
                className="text-white text-base font-medium hover:opacity-70 transition-opacity"
              >
                Gallery
              </a>
            </div>

            {/* Desktop Contact Button */}
<a href="#contact" className="hidden lg:block">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white px-6 py-2 text-base font-bold rounded-lg transition-colors"
              >
                Contact Us
              </Button>
            </a>

            {/* Mobile Menu Icon - RIGHT */}
<div className="lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="text-white text-2xl"
                aria-label="Open menu"
              >
                ☰
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Panel */}
      <div
        className={`fixed inset-0 z-[700] lg:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-base"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Side Panel */}
        <div
          className={`absolute right-0 top-0 h-full w-80 bg-primary shadow-2xl transform transition-transform duration-300 ease-out ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Close Button */}
          <div className="flex justify-end p-6">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-white text-3xl font-medium hover:opacity-70 transition-opacity"
              aria-label="Close menu"
            >
              ×
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex flex-col px-8 gap-6">
            <a
              href="/#zones"
              rel="noopener noreferrer"
              className="text-white text-lg font-medium hover:opacity-70 transition-opacity py-3 border-b border-white/10"
              onClick={(e) => handleMobileNavClick(e, '#zones')}
            >
              Explore Kaavu
            </a>

            <a
              href="https://celebrations.thekaavu.in/"
              target="_blank"
              className="text-white text-lg font-medium hover:opacity-70 transition-opacity py-3 border-b border-white/10"
              onClick={(e) => handleMobileNavClick(e, 'https://celebrations.thekaavu.in/')}
            >
              Celebrations
            </a>

            <a
              href="/#story"
              className="text-white text-lg font-medium hover:opacity-70 transition-opacity py-3 border-b border-white/10"
              onClick={(e) => handleMobileNavClick(e, '#story')}
            >
              Our Story
            </a>

                        <a
              href="/#moments"
              className="text-white text-lg font-medium hover:opacity-70 transition-opacity py-3 border-b border-white/10"
              onClick={(e) => handleMobileNavClick(e, '#moments')}
            >
              Moments
            </a>

            <a
              href="/#gallery"
              className="text-white text-lg font-medium hover:opacity-70 transition-opacity py-3 border-b border-white/10"
              onClick={(e) => handleMobileNavClick(e, '#gallery')}
            >
              Gallery
            </a>

            {/* Mobile Contact Button */}
            <a href="#contact" onClick={(e) => handleMobileNavClick(e, '#contact')}>
              <Button
                size="lg"
                className="bg-white flex items-center justify-center hover:bg-white/90 text-primary px-6 py-2 text-base font-bold rounded-lg transition-colors"
              >
                Contact Us
              </Button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}