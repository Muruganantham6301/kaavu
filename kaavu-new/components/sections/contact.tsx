"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  X,
} from "lucide-react";
import AnimateOnScroll from "../AnimatedSection/page";

export default function ContactSection() {
  return (
    <>
      {/* Contact Section - No Background */}
      <section className="bg-white text-black scroll-mt-10" id="contact">
        <div className="py-16 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            {/* Heading */}
            <div className="mb-12">
              {/* <AnimateOnScroll>
                <p className="text-base text-black/70 font-medium mb-2">Visit</p>
              </AnimateOnScroll> */}
              <AnimateOnScroll delay={200}>
                <h2 className="font-serif tracking-normal text-2xl md:text-3xl lg:text-4xl 2xl:text5xl font-bold mb-4 max-w- text-black mb-4">
                  Visit Kaavu in person
                </h2>
              </AnimateOnScroll>
              <AnimateOnScroll delay={400}>
                <p className="text-black text-base">
                  Walk in anytime to explore Kaavu, dine, or simply linger over
                  a drink
                </p>
              </AnimateOnScroll>
            </div>

            {/* Contact Info & Map Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Left Column */}
              <div className="space-y-8">
                {/* Email */}
                <AnimateOnScroll delay={200}>
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="w-4 h-4 text-black/90" />
                    <h3 className="text-base font-medium tracking-normal">
                      Email
                    </h3>
                  </div>

                  <p className="text-black/70 text-base mb-1">Reach us at</p>

                  <a
                    href="mailto:marketing@thekaavu.in"
                    className="text-black hover:text-black transition-colors text-base">
                    marketing@thekaavu.in
                  </a>
                </AnimateOnScroll>

                {/* Phone */}
                <AnimateOnScroll delay={400}>
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="w-4 h-4 text-black/90" />
                    <h3 className="text-base font-medium tracking-normal">
                      Phone
                    </h3>
                  </div>

                  <p className="text-black/70 text-base mb-1">Call us at</p>

                  <a
                    href="tel:+919380344928"
                    className="text-black hover:text-black transition-colors text-base">
                    +91 93803 44928
                  </a>
                </AnimateOnScroll>

                {/* Location */}
                <AnimateOnScroll delay={600}>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-black/90" />
                    <h3 className="text-base font-medium tracking-normal">
                      Location
                    </h3>
                  </div>

                  <p className="text-black text-base leading-relaxed mb-2 max-w-md">
                    573/439, Pattandur Agrahara Road, Siddapura, Brookefield,
                    Bengaluru 560066
                  </p>

                  <a
                    href="https://maps.app.goo.gl/vKJLTamV8M7DFNR6A"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black/70 hover:text-black transition-colors text-base inline-flex items-center gap-2">
                    Get directions <span className="opacity-80">→</span>
                  </a>
                </AnimateOnScroll>
              </div>

              {/* Right Column - Map */}
              <AnimateOnScroll delay={800}>
                <div className="relative h-[280px] lg:h-[320px] bg-gray-200 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.164548492641!2d77.72990897454646!3d12.961320415104653!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae13b6fc2ca549%3A0xbbe22b25cc358588!2sKaavu!5e0!3m2!1sen!2sin!4v1769522449563!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="transition-all duration-300"
                  />
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section - Primary Background */}
      <footer className="bg-primary text-white">
        <div className="py-12 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            {/* Footer Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-12">
              {/* Left Side */}
              <AnimateOnScroll delay={200}>
                <div className="relative w-20 h-20 overflow-hidden flex items-center justify-center mb-3">
                  <Image
                    src="/images/kaavu-logo-white.png"
                    alt="Kaavu Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>

                {/* Tagline */}
                <div className="mb-6 max-w-md">
                  <p className="text-white text-base">
                    An acre of green in the heart of the city.For gathering,
                    celebrating, and unwinding
                  </p>
                </div>

                {/* Social Icon */}
                <div className="flex items-center gap-2">
                  <a
                    href="https://www.instagram.com/thekaavu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white hover:text-white/90 transition-colors"
                    aria-label="Instagram">
                    <Instagram className="w-5 h-5" />
                    <span className="text-sm font-medium">Instagram</span>
                  </a>
                </div>
              </AnimateOnScroll>

              {/* Right Side - Links */}
              <AnimateOnScroll
                delay={400}
                className="grid grid-cols-2 gap-8 lg:gap-12 md:mt-8">
                <ul className="space-y-3">
                  <li>
                    <a
                      href="/#zones"
                      className="text-white/90 hover:text-white transition-colors text-base">
                      Explore Kaavu
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://celebrations.thekaavu.in/"
                      target="_blank"
                      className="text-white/90 hover:text-white transition-colors text-base">
                      Celebrations
                    </a>
                  </li>
                  <li>
                    <a
                      href="/#story"
                      className="text-white/90 hover:text-white transition-colors text-base">
                      Our Story
                    </a>
                  </li>
                  <li></li>
                </ul>

                <ul className="space-y-3">
                  <li>
                    <a
                      href="/#moments"
                      className="text-white/90 hover:text-white transition-colors text-base">
                      Moments
                    </a>
                  </li>
                  <li>
                    <a
                      href="/#gallery"
                      className="text-white/90 hover:text-white transition-colors text-base">
                      Gallery
                    </a>
                  </li>
                  <li>
                    <a
                      href="#contact"
                      className="text-white/90 hover:text-white transition-colors text-base">
                      Contact Us
                    </a>
                  </li>
                    <li>
                    <a
                      href="/privacy"
                      className="text-white/90 hover:text-white transition-colors text-base">
                      Privacy Policy
                    </a>
                  </li>
                </ul>
              </AnimateOnScroll>
            </div>

            {/* Divider */}
            <div className="border-t border-white/20 mb-8"></div>

            {/* Bottom Row */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-base text-white/70">
              <div className="text-white/70 text-base">
                © {new Date().getFullYear()} WHT Hospitality LLP All rights reserved
              </div>

              {/* Right Credit */}
<div className="hover:text-white/80 transition-colors flex items-center">
  Designed by{" "}
  <Link
    href="https://bdcode.in"
    target="_blank"
    className="ml-2 inline-flex items-center transition-colors"
  >
    <Image
      src="/images/bdcode-logo-white.svg"
      alt="bdcode logo"
      width={60}
      height={20}
      priority={false}
    />
  </Link>
</div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
