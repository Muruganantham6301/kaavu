"use client";

import Image from "next/image";
import AnimateOnScroll from "../AnimatedSection/page";

const aboutCards = [
  {
    label: "Dine",
    title: "A place to eat,\ndrink, and\nunwind",
    description: "Where good food, craft beers, and open spaces come together",
    buttonText: "Reserve Table",
    href: "https://www.google.com/maps/reserve/v/dine/c/FkcIcXEB218?source=pa&opi=89978449&hl=en-IN&gei=cd5xafWvJYjx4-EP6_WpiQ4&sourceurl=https://www.google.com/search?q%3Duru%26oq%3Duru%26gs_lcrp%3DEgZjaHJvbWUqDggAEEUYJxg7GIAEGIoFMg4IABBFGCcYOxiABBiKBTIMCAEQIxgnGIAEGIoFMgoIAhAuGLEDGIAEMgcIAxAuGIAEMgYIBBBFGDwyBggFEEUYPDIGCAYQRRg8MgYIBxBFGDzSAQgyMzgxajBqN6gCALACAA%26sourceid%3Dchrome%26ie%3DUTF-8",
    "newTab": true,
    image: "/images/image2.jpg",
    alt: "A place to eat, drink and gather",
  },
  {
    label: "Order",
    title: "Get your\nfavourite meals\ndelivered",
    description: "From our kitchen to your home, without missing the flavour you love",
    buttonText: "Order Now",
    href: "#online-order",
    "newTab": false,
    image: "/images/image1.jpg",
    alt: "Get your favourite meals delivered",
  },
  {
    label: "Celebrate",
    title: "A place to gather with your people",
    description: "Designed for unhurried moments, shared together",
    buttonText: "Explore Now",
    href: "https://celebrations.urubangalore.in",
    "newTab": true,
    image: "/images/image3.jpg",
    alt: "Plan a one-of-a-kind celebration",
  },
];

export default function AboutSection() {
  return (
    <section className="bg-black py-16 md:py-24 scroll-mt-10" id="spaces">
      {/* Section Header */}
      <div className="px-6 md:px-12 lg:px-20 pb-12 md:pb-16">
        <div className="max-w-7xl mx-auto text-center">
          {/* Small subheader */}
          <AnimateOnScroll>
          <p className="text-sm tracking-wide text-white/90 mb-1 text-medium">
            Spaces
          </p>
          </AnimateOnScroll>
<AnimateOnScroll delay={200}>
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white font-light mb-4 max-w-3xl mx-auto">
            Spaces designed for every kind of gathering
          </h2>
          </AnimateOnScroll>

<AnimateOnScroll delay={400}>
          <p className="text-sm md:text-base text-white/60 font-light max-w-2xl mx-auto">
            From small, private moments to large celebrations, URU’s indoor andoutdoor spaces are designed to adapt and scale
          </p>
          </AnimateOnScroll>
        </div>
      </div>

      {/* Image Cards Grid */}
      <div className="px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {aboutCards.map((card, index) => (
              <AnimateOnScroll delay={index * 200} key={index}>
              <div className="relative group rounded-2xl overflow-hidden aspect-[3/4]">
                {/* Background Image */}
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="
                    object-cover
                    transition-transform duration-700 ease-out
                    scale-110
                    group-hover:scale-100
                  "
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-7">
                  {/* Small card label */}
                  <p className="text-sm text-white/90 mb-2">
                    {card.label}
                  </p>

                  <h3 className="font-serif text-3xl md:text-4xl text-white font-light mb-3 ">
                    {card.title}
                  </h3>

                  <p className="text-sm md:text-base text-white/80 font-light mb-5">
                    {card.description}
                  </p>

                  <a
                    href={card.href}
                    target={card.newTab ? "_blank" : undefined}
                    className="inline-flex items-center text-white/90 hover:text-white transition-colors text-sm md:text-base font-medium w-fit group/btn"
                  >
                    {card.buttonText}
                    <span className="ml-2 transition-transform duration-300 group-hover/btn:translate-x-1">
                      →
                    </span>
                  </a>
                </div>
              </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
