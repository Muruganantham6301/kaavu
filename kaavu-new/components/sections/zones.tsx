"use client";

import Image from "next/image";
import AnimateOnScroll from "../AnimatedSection/page";
import { useRef, useState, useEffect } from "react";

export default function ZonesSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const zones = [
    {
      title: "Forest",
      description: "Open, green, and unhurried, made for easy gatherings",
      image: "/images/zones/forest.jpg",
      icon: "/images/zones/forest.svg",
      imagePosition: "top",
    },
    {
      title: "Grove",
      description: "Energetic and open,built for music and movement",
      image: "/images/zones/grove.jpg",
      icon: "/images/zones/grove.svg",
      imagePosition: "bottom",
    },
    {
      title: "Stonehenge",
      description: "Grounded and intimate, perfect for small gatherings",
      image: "/images/zones/stonehenge.jpg",
      icon: "/images/zones/stonehenge.svg",
      imagePosition: "top",
    },
    {
      title: "Cafe",
      description: "A fresh, playful, indulgent dessert and coffee brand every lover must experience",
      image: "/images/zones/kaavu-cafe.jpg",
      icon: "/images/zones/cafe.svg",
      imagePosition: "bottom",
    },
    {
      title: "Cicada",
      description: "Calm and low-lit, designed for comfort and privacy",
      image: "/images/zones/cicada.jpg",
      icon: "/images/zones/cicada.svg",
      imagePosition: "top",
    },
    {
      title: "Bristo",
      description: "Warm and welcoming, meant for lingering over food",
      image: "/images/zones/bristo.jpg",
      icon: "/images/zones/bristo.svg",
      imagePosition: "bottom",
    },
    {
      title: "Cavern",
      description: "Private and shadowed, ideal for smaller gatherings",
      image: "/images/zones/cavern.jpg",
      icon: "/images/zones/cavern.svg",
      imagePosition: "top",
    },
  ];
  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", checkScrollButtons);
      checkScrollButtons();

      window.addEventListener("resize", checkScrollButtons);

      return () => {
        scrollContainer.removeEventListener("scroll", checkScrollButtons);
        window.removeEventListener("resize", checkScrollButtons);
      };
    }
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollContainer = scrollContainerRef.current;
      const isMobile = window.innerWidth < 768;

      const card = scrollContainer.querySelector(".zone-card") as HTMLElement;
      if (!card) return;

      const cardWidth = card.offsetWidth;
      const gap = isMobile ? 20 : 24;
      const scrollAmount = cardWidth + gap;

      const newScrollLeft =
        direction === "left"
          ? scrollContainer.scrollLeft - scrollAmount
          : scrollContainer.scrollLeft + scrollAmount;

      scrollContainer.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-16 md:py-24 scroll-mt-10" id="zones">
      {/* Header */}
      <div className="mb-12 md:mb-16 text-center px-6 md:px-12 lg:px-20">
        {/* <AnimateOnScroll>
          <p className="text-sm tracking-wide text-black/90 mb-1 font-medium">Zones</p>
        </AnimateOnScroll> */}
        <AnimateOnScroll delay={200}>
          <h2 className="font-serif tracking-normal text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold mb-4  text-black mx-auto">
            Seven spaces, infinite moods
          </h2>
        </AnimateOnScroll>
        <AnimateOnScroll delay={400}>
          <p className="text-base text-black">
            Each corner of Kaavu holds its own character. Move through them as
            the day unfolds
          </p>
        </AnimateOnScroll>
      </div>

      {/* Cards Scroll Container */}
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory md:snap-none"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            scrollPaddingLeft: "1.5rem",
            scrollPaddingRight: "1.5rem",
          }}>
          <div className="flex gap-5 md:gap-6 pb-4 pl-6 pr-6 md:pl-12 md:pr-12 lg:pl-20 lg:pr-20">
            {zones.map((zone, idx) => (
              <AnimateOnScroll delay={idx * 200} key={idx}>
                <div className="group zone-card flex-shrink-0 w-[calc((100vw-3rem)/1.3)] md:w-[calc((100vw-6rem)/2.5)] lg:w-[calc((100vw-10rem)/3.5)] xl:w-[calc((100vw-10rem)/4.5)] snap-center md:snap-align-none">
                  <div className="rounded-2xl overflow-hidden transition-all duration-300 border border-black/10 bg-white h-full flex flex-col">
                    {zone.imagePosition === "top" ? (
                      <>
                        {/* Image at Top with bottom shadow */}
                        <div
                          className="relative aspect-[4/3] overflow-hidden"
                          style={{
                            boxShadow: "0 8px 16px -4px rgba(0, 0, 0, 0.15)",
                          }}>
                          <Image
                            src={zone.image}
                            alt={zone.title}
                            fill
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 22vw"
                          />
                        </div>

                        {/* Content at Bottom */}
                        <div className="p-5 flex-1 flex flex-col justify-center">
                          <div className="flex items-center gap-3 mb-3">
                            {/* Icon */}
                            <div className="w-8 h-8 border border-black/20 rounded flex items-center justify-center flex-shrink-0">
                              <img
                                src={zone.icon}
                                alt={`${zone.title} icon`}
                                className="w-8 h-8"
                              />
                            </div>
                            {/* Title */}
                            <h3 className="font-serif text-primary text-xl md:text-2xl font-medium text-black tracking-normal">
                              {zone.title}
                            </h3>
                          </div>
                          <p className="text-base text-black">
                            {zone.description}
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Content at Top */}
                        <div className="p-5 flex-1 flex flex-col justify-center">
                          <div className="flex items-center gap-3 mb-3">
                            {/* Icon */}
                            <div className="w-8 h-8 border border-black/20 rounded flex items-center justify-center flex-shrink-0">
                              <img
                                src={zone.icon}
                                alt={`${zone.title} icon`}
                                className="w-8 h-8"
                              />
                            </div>
                            {/* Title */}
                            <h3 className="font-serif text-primary text-xl md:text-2xl font-medium text-black tracking-normal">
                              {zone.title}
                            </h3>
                          </div>
                          <p className="text-base text-black">
                            {zone.description}
                          </p>
                        </div>

                        {/* Image at Bottom with top shadow */}
                        <div
                          className="relative aspect-[4/3] overflow-hidden"
                          style={{
                            boxShadow: "0 -8px 16px -4px rgba(0, 0, 0, 0.15)",
                          }}>
                          <Image
                            src={zone.image}
                            alt={zone.title}
                            fill
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 22vw"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
            {/* Spacer for last card */}
            <div className="flex-shrink-0" style={{ width: "1px" }}></div>
          </div>
        </div>

        {/* Navigation Arrows - Bottom Center */}
        <div className="flex justify-center gap-4 mt-8 px-6">
          <button
            onClick={() => handleScroll("left")}
            disabled={!canScrollLeft}
            className={`w-12 h-12 rounded-lg bg-white border border-black/10 shadow-md transition-all duration-300 flex items-center justify-center group ${
              canScrollLeft
                ? "hover:shadow-lg hover:scale-105 cursor-pointer"
                : "opacity-40 cursor-not-allowed"
            }`}
            aria-label="Previous">
            <svg
              className={`w-6 h-6 ${canScrollLeft ? "group-hover:-translate-x-0.5 transition-transform" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={() => handleScroll("right")}
            disabled={!canScrollRight}
            className={`w-12 h-12 rounded-lg bg-white border border-black/10 shadow-md transition-all duration-300 flex items-center justify-center group ${
              canScrollRight
                ? "hover:shadow-lg hover:scale-105 cursor-pointer"
                : "opacity-40 cursor-not-allowed"
            }`}
            aria-label="Next">
            <svg
              className={`w-6 h-6 ${canScrollRight ? "group-hover:translate-x-0.5 transition-transform" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
