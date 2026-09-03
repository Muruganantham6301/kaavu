"use client";

import Image from "next/image";
import AnimateOnScroll from "../AnimatedSection/page";
import { useState, useEffect } from "react";
import { PawPrint, Clock, Heart, Armchair, Coffee, UsersRound } from "lucide-react";

// Configuration
const welcomeConfig = {
  heading: "You are welcome here, exactly as you are",
  description:
    "Kaavu is built for people. For strays and seekers, for families and strangers becoming friends. This is a place where you belong",
  images: [
    "/images/banners/pets.jpg", // Coffee shop ambiance
    "/images/banners/coffee.jpg", // Pet-friendly cafe
    "/images/banners/come.jpg", // People gathering
    "/images/banners/yoga.jpg", // Cozy corner
  ],
};

const features = [
  {
    title: "Pet inclusive",
    description:
      "Forest and Cafe zones welcome four-legged friends like family",
    icon: PawPrint,
    position: "top-left",
  },
  {
    title: "Stay awhile",
    description:
      "Linger over coffee. Spread out. Let time move at its own pace here",
    icon: Coffee,
    position: "top-right",
  },
  {
    title: "Come as you are",
    description:
      "No dress codes, no pretence. Just people, food, and the ease of being known",
    icon: UsersRound,
    position: "bottom-left",
  },
  {
    title: "Find your corner",
    description:
      "Whether you need silence or celebration, Kaavu has a space with your name on it",
    icon: Armchair,
    position: "bottom-right",
  },
];

function ImageSlider({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1500 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={image}
            alt={`Kaavu atmosphere ${index + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 380px"
            priority={index === 0}
          />
        </div>
      ))}
    </div>
  );
}

export default function CorporateSection() {
  const leftFeatures = features.filter((f) => f.position.includes("left"));
  const rightFeatures = features.filter((f) => f.position.includes("right"));

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-background px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <AnimateOnScroll delay={100}>
            <h2 className="font-serif tracking-normal text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold mb-4 max-w-2xl text-black mx-auto mb-4">
              {welcomeConfig.heading}
            </h2>
          </AnimateOnScroll>

          <AnimateOnScroll delay={200}>
            <p className="text-black text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed">
              {welcomeConfig.description}
            </p>
          </AnimateOnScroll>
        </div>

        {/* Mobile Layout - Stack everything */}
        <div className="block lg:hidden">
          {/* Image Slider */}
          <AnimateOnScroll delay={300}>
            <div className="relative w-full max-w-sm mx-auto aspect-[4/5] rounded-2xl overflow-hidden mb-12">
              <ImageSlider images={welcomeConfig.images} />
            </div>
          </AnimateOnScroll>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-6 sm:gap-8 md:gap-10">
            {features.map((feature, idx) => {
              const IconComponent = feature.icon;
              return (
                <AnimateOnScroll key={feature.title} delay={400 + idx * 100}>
                  <div className="text-center">
                    <div className="flex justify-center mb-3">
                      <IconComponent className="w-10 h-10 text-black" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-serif text-xl md:text-2xl font-medium text-black tracking-normal">
                      {feature.title}
                    </h3>
                    <p className="text-black text-base">
                      {feature.description}
                    </p>
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>

        {/* Desktop Layout - 3 columns: Left features | Image Slider | Right features */}
        <div className="hidden lg:flex items-center justify-center gap-10 xl:gap-16">
          {/* Left Column - 2 stacked features */}
          <div className="flex flex-col justify-between gap-20 w-full max-w-[330px]">
            {leftFeatures.map((feature, idx) => {
              const IconComponent = feature.icon;
              return (
                <AnimateOnScroll key={feature.title} delay={300 + idx * 100}>
                  <div className="text-center">
                    <div className="flex justify-center mb-3">
                      <IconComponent className="w-10 h-10 text-black" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-serif text-xl md:text-2xl font-medium text-black tracking-normal mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-black text-base">
                      {feature.description}
                    </p>
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>

          {/* Center Image Slider */}
          <AnimateOnScroll delay={400}>
            <div className="relative w-[320px] xl:w-[380px] aspect-[3/4] rounded-2xl overflow-hidden flex-shrink-0">
              <ImageSlider images={welcomeConfig.images} />
            </div>
          </AnimateOnScroll>

          {/* Right Column - 2 stacked features */}
          <div className="flex flex-col justify-between gap-20 w-full max-w-[330px]">
            {rightFeatures.map((feature, idx) => {
              const IconComponent = feature.icon;
              return (
                <AnimateOnScroll key={feature.title} delay={300 + idx * 100}>
                  <div className="text-center">
                    <div className="flex justify-center mb-3">
                      <IconComponent className="w-10 h-10 text-black" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-serif text-xl md:text-2xl font-medium text-black tracking-normal mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-black text-base">
                      {feature.description}
                    </p>
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}