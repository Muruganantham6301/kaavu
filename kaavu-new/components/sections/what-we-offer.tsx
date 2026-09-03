"use client";

import Image from "next/image";
import Link from "next/link";
import AnimateOnScroll from "../AnimatedSection/page";

export default function WhatWeOfferSection() {
  const features = [
    {
      icon: "/images/svg/source.svg",
      title: "Spaces",
      description:
        "From cosy corners to open lawns, URU offers spaces that feel right for every kind of get-together",
    },
    {
      icon: "/images/svg/food.svg",
      title: "Food",
      description:
        "Thoughtfully curated menus designed to suit every occasion, from shared meals to hosted dining experiences",
    },
    {
      icon: "/images/svg/bevarage.svg",
      title: "Beverages",
      description:
        "Craft beers brewed on site, along with cocktails, wines, spirits, coffee, and non-alcoholic options",
    },
    {
      icon: "/images/svg/experience.svg",
      title: "Experiences",
      description:
        "Curated add-on experiences and special touches that elevate gatherings beyond just food and space",
    },
    {
      icon: "/images/svg/scale.svg",
      title: "Scale",
      description:
        "Spaces and formats that scale easily, whether you’re hosting a small gathering or a large celebration",
    },
    {
      icon: "/images/svg/planning.svg",
      title: "Planning",
      description:
        "Support from planning through execution, with setup and service handled by the URU team",
    },
  ];

  return (
    <section className="bg-primary">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left Content */}
        <div className="py-16 md:py-24 px-6 md:px-12 lg:px-16 xl:px-20">
          <div className="max-w-xl lg:ml-auto">
            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10">
              {features.map((feature, idx) => (
                <AnimateOnScroll key={idx} delay={idx * 200}>
                <div  className="space-y-2">
                  {/* Icon */}
                  <div className="text-white/90">
                    <Image
                      src={feature.icon}
                      alt={feature.title}
                      width={28}
                      height={28}
                      className="opacity-90"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg md:text-2xl text-white font-medium">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm md:text-base text-white/80 font-light ">
                    {feature.description}
                  </p>
                </div>
                </AnimateOnScroll>
              ))}
            </div>

            {/* Explore URU */}
            <AnimateOnScroll delay={1000}>
            <div className="mt-10">
              <Link
                href="https://share.google/xAAykn6M5UZnX7czY" target="_blank"
                className="inline-flex items-center text-white/90 hover:text-white transition-colors text-sm md:text-base font-medium group"
              >
                Explore URU
                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
            </AnimateOnScroll>
          </div>
        </div>

        {/* Right Image */}
<AnimateOnScroll
  delay={400}
  className="relative h-[420px] lg:h-auto min-h-[520px] lg:min-h-[640px] overflow-hidden group"
>
  <Image
    src="/images/image10.jpg"
    alt="What we offer"
    fill
    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
    sizes="(max-width: 1024px) 100vw, 50vw"
    priority
  />
</AnimateOnScroll>

      </div>
    </section>
  );
}
