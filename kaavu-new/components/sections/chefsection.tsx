"use client";

import Image from "next/image";
import AnimateOnScroll from "../AnimatedSection/page";

const chefData = {
  name: "Souvik Ray",
  title: "Corporate Executive Chef",
  company: "Kaavu",
  image: "/images/chef.png",
  paragraphs: [
    `Souvik Ray, Corporate Executive Chef at Kaavu, brings with him over 17 years of culinary experience shaped by India's most respected hospitality names, including The Leela, The Lalit, Marriott International, IHCL, V&RO Hospitality, and Hilton. Hailing from Kolkata, a city celebrated for its rich food culture, Chef Souvik blends classical training with creative expression to craft dishes that are both thoughtful and memorable. `, 
    `Mentored by Michelin-starred Chef Maximiliano Cotilli, his approach to food is rooted in technique, balance, and storytelling. At Kaavu, he leads the kitchen with a vision to create meaningful dining experiences that connect people through flavour, warmth, and intention, transforming every meal into something truly special.

`,
  ],
};

export default function ChefSection() {
  return (
    <section
      className="bg-black scroll-mt-10 py-12 md:py-16 lg:pt-16 lg:pb-0"
      id="about-chef">
      <div className="flex flex-col lg:flex-row lg:h-[600px]">
        {/* Image Section */}
        <div className="relative w-full lg:w-[52%] h-[280px] md:h-[350px] lg:h-full shrink-0">
          <Image
            src={chefData.image}
            alt={`Chef ${chefData.name}`}
            fill
            className="object-cover object-top"
            sizes="(max-width: 1024px) 100vw, 55vw"
            priority
          />

          {/* Desktop: Right fade */}
          <div
            className="hidden lg:block absolute inset-y-0 right-0 w-32 z-10 pointer-events-none"
            style={{
              background: `
                linear-gradient(
                  to left,
                  rgba(0, 0, 0, 0.95) 0%,
                  rgba(0, 0, 0, 0.7) 40%,
                  rgba(0, 0, 0, 0.4) 65%,
                  rgba(0, 0, 0, 0) 100%
                )
              `,
            }}
          />

          {/* Mobile: Bottom fade */}
          <div
            className="lg:hidden absolute inset-x-0 -bottom-1 h-36 z-10 pointer-events-none"
            style={{
              background: `
      linear-gradient(
        to top,
        rgba(0, 0, 0, 1) 0%,
        rgba(0, 0, 0, 0.65) 35%,
        rgba(0, 0, 0, 0.45) 65%,
        rgba(0, 0, 0, 0) 100%
      )
    `,
            }}
          />
        </div>

        {/* Content Section */}
        <div className="w-full lg:w-[48%] bg-black flex px-6 pt-10 md:p-8 lg:py-10 lg:pl-10 lg:pr-16 xl:py-12 xl:pl-12 xl:pr-20">
          <div className="w-full">
            {/* Heading + Name Card */}
       <div className="flex items-start justify-between gap-6 mb-6">
              <AnimateOnScroll delay={200}>
                <h2 className="font-serif tracking-normal leading-tight text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                  About
                  <br />
                  the Chef
                </h2>
              </AnimateOnScroll>

              <AnimateOnScroll delay={300}>
                <div
                  className="
                    bg-primary relative
                    px-4 py-2 lg:px-5 lg:py-3
                    rounded-lg shrink-0
                    lg:-ml-6 lg:mt-2 md:right-[0px] right-0 md:top-[3px] top-0
                  "
                >
                  <h3 className="font-serif text-base lg:text-lg xl:text-xl text-white font-medium tracking-wide">
                    {chefData.name}
                  </h3>
                  <p className="text-xs text-white/70">{chefData.title}</p>
                  <p className="text-xs text-white/90 font-bold">{chefData.company}</p>
                </div>
              </AnimateOnScroll>
            </div>

            {/* Description */}
            <div className="space-y-4">
              {chefData.paragraphs.map((paragraph, index) => (
                <AnimateOnScroll key={index} delay={400 + index * 100}>
                  <p className="text-base text-white leading-relaxed text-balance">
                    {paragraph}
                  </p>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}