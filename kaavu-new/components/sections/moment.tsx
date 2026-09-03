"use client";

import Image from "next/image";
import AnimateOnScroll from "../AnimatedSection/page";

const aboutCards = [
  {
    label: "Celebrate",
    title: "A place to gather with your people",
    description: "Designed for unhurried moments, with people who matter",
    image: "/images/banners/celebrate.jpg",
    alt: "Morning Assembly Breakfast",
  },
  {
    label: "Desserts",
    title: "A pause for something sweet",
    description:
      "Desserts and coffees by P.U. Dingding, crafted to be savoured",
    image: "/images/banners/ding-ding.jpg",
    alt: "P.U. Dingding Dessert",
  },
  {
    label: "Breakfast",
    title: "A morning to unwind your day",
    description: "Breakfast coffee by Morning Assembly, made for slow mornings",
    image: "/images/banners/morning.jpg",
    alt: "Morning Assembly Breakfast",
  },
];

// Moments section configuration
// const momentsConfig = {
//   cards: [
//     {
//       title: "Morning Assembly",
//       description: "Breakfast the way it should be: unhurried, warm, shared",
//       image:
//         "/images/morning.jpg",
//     },
//     {
//       title: "P.U. Dingding",
//       description:
//         "Desserts and coffee that taste like they were made for you",
//       image:
//         "/images/bun.jpg",
//     },
//   ],
// };

export default function MomentsSection() {
  return (
    <section
      className="w-full pt-16 md:pt-24 px-6 md:px-12 lg:px-20 bg-background scroll-mt-10"
      id="moments">
      <div className="max-w-7xl mx-auto  ">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14 lg:mb-16">
          <AnimateOnScroll delay={100}>
            <h2 className="font-serif tracking-normal text-balance text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold mb-4 md:max-w-3xl max-w-lg text-black mx-auto mb-4">
              Moments brewed, shared, and savoured
            </h2>
          </AnimateOnScroll>

          <AnimateOnScroll delay={200}>
            <p className="text-base text-black">
              Somethings are worth slowing down for
            </p>
          </AnimateOnScroll>
        </div>

        {/* Image Cards Grid */}
        <div className="">
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
                    {/* Overlay – Gradient (mobile + desktop) */}
                    <div
                      className="absolute inset-0 md:hidden lg:block"
                      style={{
                        background: `
      linear-gradient(
        to top,
        rgba(0, 0, 0, 0.85) 0%,
        rgba(0, 0, 0, 0.65) 30%,
        rgba(0, 0, 0, 0.35) 55%,
        rgba(0, 0, 0, 0.1) 75%,
        rgba(0, 0, 0, 0) 100%
      )
    `,
                      }}
                    />

                    {/* Overlay – Solid black (tablet only) */}
                    <div className="absolute inset-0 hidden md:block lg:hidden bg-black/60" />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-5 lg:p-7">
                      {/* Small card label */}
                      <p className="text-sm text-white/90 mb-2">{card.label}</p>

                      <h3 className="font-serif text-2xl md:text-[22px] lg:text-3xl text-white font-semibold mb-2 tracking-normal leading-snug">
                        {card.title}
                      </h3>

                      <p className="text-sm md:text-[14px] lg:text-base text-white leading-snug">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
