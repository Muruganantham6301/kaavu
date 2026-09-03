"use client";

import Image from "next/image";
import AnimateOnScroll from "../AnimatedSection/page";

export default function OnlineOrderSection() {
  return (
    <section
      className="relative w-full min-h-[600px] lg:h-[90vh] overflow-hidden scroll-mt-24"
      id="online-order">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/online-background.jpg"
          alt="Restaurant interior"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-8 md:py-16 lg:py-20 lg:h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-center w-full">
          {/* Left - Content & Buttons */}
          <div className="text-white text-center lg:text-left">
            <AnimateOnScroll>
              <h2 className="font-serif tracking-normal text-3xl md:text-5xl lg:text-6xl text-white font-bold mb-4 max-w-xl md:max-w-3xl mx-auto">
                Simple way to <br></br> order your food
              </h2>
            </AnimateOnScroll>

            <AnimateOnScroll delay={200}>
              <p className="text-sm sm:text-base md:text-lg text-white/90 font-light mb-4 md:mb-8 lg:mb-10 max-w-lg mx-auto lg:mx-0">
                Get your favourite dishes delivered right to your doorstep
              </p>
            </AnimateOnScroll>

            {/* Buttons */}
            <AnimateOnScroll delay={400}>
              <div className="flex flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 lg:gap-5 flex-wrap">
                <a
                  href="https://www.zomato.com/bangalore/kaavu-whitefield-bangalore/order"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block">
                  {/* <p className="text-white text-center text-xs pb-1 font-medium tracking-wide">
                ORDER ON
              </p> */}
                  <Image
                    src="/images/zomato.svg"
                    alt="Order on Zomato"
                    width={160}
                    height={50}
                    className="h-[41px] w-auto object-contain transition-transform duration-300 hover:scale-105"
                  />
                </a>
                <a
                  href="https://www.swiggy.com/city/bangalore/kaavu-whitefield-rest1001796"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block">
                  {/* <p className="text-white text-center text-xs pb-1 font-medium tracking-wide">
                ORDER ON
              </p> */}
                  <Image
                    src="/images/swiggy.svg"
                    alt="Order on Swiggy"
                    width={160}
                    height={50}
                    className="h-[41px] w-auto object-contain transition-transform duration-300 hover:scale-105"
                  />
                </a>
              </div>
            </AnimateOnScroll>
          </div>

          {/* Single Image - Desktop */}
          <div className="relative hidden lg:flex h-[80vh] items-center justify-center">
            <AnimateOnScroll delay={300}>
              <div
                className="
        relative w-[340px] h-[650px] 
        rounded-3xl shadow-2xl overflow-hidden
        animate-[float_4s_ease-in-out_infinite]
        hover:scale-[1.03]
        transition-transform duration-700
      ">
                <Image
                  src="/images/onlinescreen.png"
                  alt="Food ordering app"
                  fill
                  className="object-contain"
                  sizes="340px"
                />
              </div>
            </AnimateOnScroll>
          </div>

          {/* Single Image - Mobile */}
          <div className="relative lg:hidden flex items-center justify-center mt-6">
            <AnimateOnScroll delay={300}>
              <div
                className="
        relative w-[220px] h-[300px]
        rounded-2xl shadow-2xl overflow-hidden
        animate-[float_4s_ease-in-out_infinite]
        hover:scale-[1.02]
        transition-transform duration-700
      ">
                <Image
                  src="/images/onlinescreen.png"
                  alt="Food ordering app"
                  fill
                  className="object-contain"
                  sizes="220px"
                />
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
