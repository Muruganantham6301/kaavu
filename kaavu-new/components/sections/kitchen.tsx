"use client";

import Image from "next/image";
import AnimateOnScroll from "../AnimatedSection/page";

// Kitchen section configuration
const kitchenConfig = {
  chefImage: "/images/chef.jpg",
  features: [
    {
      title: "Experience",
      description:
        "Years of learning, seasons of refinement, hands that know their craft",
      icon: "/images/svg/experience.svg",
    },
    {
      title: "Craft",
      description:
        "Each plate is considered. Each flavour is earned. Nothing is rushed",
      icon: "/images/svg/craft.svg",
    },
    {
      title: "Care",
      description:
        "We cook for people we know. We remember what you loved last time",
      icon: "/images/svg/care.svg",
    },
  ],
};

export default function KitchenSection() {
  return (
    <section className="py-16 md:py-24 px-6 md:px-12 lg:px-20 bg-black scroll-mt-10" id="chef">
      <div className="max-w-7xl mx-auto">
        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
          {/* Chef Image */}
          <AnimateOnScroll delay={400}>
            <div className="relative aspect-[4/4] w-full max-w-md mx-auto md:mx-0">
              <Image
                src={kitchenConfig.chefImage || "/placeholder.svg"}
                alt="Our Chef"
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </AnimateOnScroll>

          {/* Features */}
          <div className="relative">
            <div className="space-y-8 md:space-y-10 pt-6 md:pt-8">
              {kitchenConfig.features.map((feature, idx) => (
                <AnimateOnScroll key={feature.title} delay={500 + idx * 100}>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center">
                      <img 
                        src={feature.icon} 
                        alt={`${feature.title} icon`}
                        className="w-8 h-8 brightness-0 invert"
                      />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl md:text-2xl font-medium text-white tracking-normal">
                        {feature.title}
                      </h3>
                      <p className="text-base text-white">
                        {feature.description}
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