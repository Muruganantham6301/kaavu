"use client";

import Image from "next/image";
import { ChevronRight } from "lucide-react";
import AnimateOnScroll from "../AnimatedSection/page";

// Section configuration
const exploreConfig = {
  heading: "Our Story",
  description: (
    <>
      <p className="mb-4">
        Kaavu is shaped by the quiet wisdom of Kerala's sacred groves, spaces
        once created for stillness, balance, and community
      </p>
      <p>
        Drawing from this spirit, Kaavu brings together nature, design, and
        human connection in a setting that feels both grounding and welcoming
      </p>
    </>
  ),
  ctaText: "Explore Kaavu",
  ctaLink: "#explore",
  backgroundImage: "/images/banners/image2.jpg",
};

export default function ExperiencesSection() {
  return (
    <div id="story">
      {/* Desktop/Tablet View - Overlay Layout */}
      <section className="hidden md:block relative w-full h-[90vh] min-h-[500px] overflow-hidden scroll-mt-10" >
        {/* Background Image */}
        <Image
          src={exploreConfig.backgroundImage}
          alt="Outdoor dining area with trees and seating"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />

        {/* Overlay 1: Full dark overlay */}
        <div className="absolute inset-0 bg-black/40 z-[1]" />

        {/* Overlay 2: Bottom fade overlay */}
        <div
          className="absolute inset-x-0 bottom-0 h-32 z-[2] pointer-events-none"
          style={{
            background: `
        linear-gradient(
          to top,
          rgba(0, 0, 0, 0.95) 0%,
          rgba(0, 0, 0, 0.5) 40%,
          rgba(0, 0, 0, 0.3) 70%,
          rgba(0, 0, 0, 0) 100%
        )
      `,
          }}
        />

        {/* Content */}
        <div className="absolute inset-0 z-[3] flex items-center">
          <div className="px-6 md:px-12 lg:px-20 max-w-2xl">
            <AnimateOnScroll delay={100}>
              <h2 className="font-serif tracking-normal leading-tight text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
                {exploreConfig.heading}
              </h2>
            </AnimateOnScroll>
            <AnimateOnScroll delay={200}>
              <p className="font-bold text-2xl text-white mb-4">Inspired by the sacred groves of Kerala</p>
            </AnimateOnScroll>

            <AnimateOnScroll delay={400}>
              <div className="text-white text-base leading-relaxed">
                {exploreConfig.description}
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Mobile View - Stacked Layout */}
      <section className="block md:hidden pb-16 md:pb-0 bg-black" >
        {/* Image */}
        <div className="relative w-full h-[50vh] min-h-[300px] overflow-hidden">
          <Image
            src={exploreConfig.backgroundImage}
            alt="Outdoor dining area with trees and seating"
            fill
            className="object-cover "
            style={{ objectPosition: "60% 40%" }}
            sizes="100vw"
            priority
          />

          {/* Overlay 1: Full dark overlay */}
          <div className="absolute inset-0 bg-black/30 z-[1]" />
        </div>

        {/* Content */}
        <div className="bg-black px-6 pt-10">
          <AnimateOnScroll delay={100}>
            <h2 className="font-serif leading-tight text-3xl font-bold mb-4 text-white tracking-normal">
              {exploreConfig.heading}
            </h2>
          </AnimateOnScroll>

          <AnimateOnScroll delay={200}>
            <div className="text-white text-base font-light leading-relaxed">
              {exploreConfig.description}
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  );
}