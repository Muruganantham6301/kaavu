"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import AnimateOnScroll from "../AnimatedSection/page";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const heroSlides = [
  {
    image: "/images/banners/image1.jpg",
    title: "A sanctuary where earth and people meet",
    description:
      "Kaavu is a refuge in Whitefield where calm and celebration meet, a place to come as you are, to rest, to gather, to belong",

    primaryCta: "Explore Kaavu",
    primaryLink: "https://share.google/6M3kTMeuas40vL8DB",

    secondaryCta: "View Menu",
    secondaryLink: "/images/kaavu-menu.pdf",
  },
];
const isExternalLink = (url: string) =>
  url.startsWith("http://") || url.startsWith("https://");



export default function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const isSlider = heroSlides.length > 1;

  useEffect(() => {
    if (!isSlider) return;

    const duration = 5000;
    const timer = setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, duration);

    return () => clearInterval(timer);
  }, [isSlider]);

  const currentSlide = heroSlides[activeSlide];

  return (
    <section className="relative w-full h-screen flex flex-col overflow-hidden">
      {/* Background Images */}
      {heroSlides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 z-[1] ${
            idx === activeSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority={idx === 0}
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-[3] flex-1 flex items-center justify-center px-6 md:px-12">
        <div key={activeSlide} className="w-full text-center">
          <div className="text-balance">
          <AnimateOnScroll delay={200}>
            <h1 className="leading-tight tracking-normal font-serif text-5xl md:text-5xl lg:text-6xl 2xl:text-7xl font-bold text-white mb-4 md:mb-3 2xl:max-w-5xl max-w-3xl mx-auto">
              {currentSlide.title}
            </h1>
          </AnimateOnScroll>

          <AnimateOnScroll delay={400}>
            <p className="text-base md:text-lg font-light max-w-5xl mx-auto text-white mb-8">
              {currentSlide.description}
            </p>
          </AnimateOnScroll>
          </div>

<AnimateOnScroll delay={600}>
  <div className="flex flex-row items-center justify-center gap-3 sm:gap-4">
    
    {/* Primary Button */}
    <a
      href={currentSlide.primaryLink}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Button
        size="lg"
        className="bg-primary hover:bg-primary/90 text-white px-4 md:px-6 py-4 text-base font-bold rounded-lg transition-colors"
      >
        {currentSlide.primaryCta}
      </Button>
    </a>

    {/* Secondary Button */}
    <Button
      size="lg"
      variant="ghost"
      className="p-0 bg-transparent p-0 h-auto text-white hover:bg-transparent hover:text-white/80 font-bold text-base"
      asChild
    >
      <a
        href={currentSlide.secondaryLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 md:gap-2"
      >
        {currentSlide.secondaryCta}
        <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
      </a>
    </Button>

  </div>
</AnimateOnScroll>


        </div>
      </div>

      {/* Slide Indicators (only if multiple slides) */}
      {isSlider && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[4] flex gap-2">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === activeSlide
                  ? "bg-white w-6"
                  : "bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
