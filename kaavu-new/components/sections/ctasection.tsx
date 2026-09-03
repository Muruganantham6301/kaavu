"use client";

import Image from "next/image";
import { Calendar, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimateOnScroll from "../AnimatedSection/page";

export default function CTASection() {
  return (
    <section className="relative w-full scroll-mt-24" id="reserve-cta">
      {/* Floating card */}
      <div className="relative -mt-10 md:-mt-12 z-10">
        <div className="w-full bg-black rounded-2xl md:rounded-2xl shadow-[0_20px_50px_-15px_rgba(0,0,0,0.2)] py-10 md:py-12 px-6 md:px-12 lg:px-20 ">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-8">
            {/* Left - Text Content */}
            <div className="text-center md:text-left md:flex-1">
              {/* <div className="max-w-2xl"> */}
              <AnimateOnScroll>
              <h2 className="text-balance tracking-wide text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl font-serif  text-white font-bold mb-2 md:mb-3">
                Select how <br></br>
                you’d like to reserve
              </h2>
              </AnimateOnScroll>
              {/* </div> */}
              <AnimateOnScroll delay={200}>
              <p className="text-base text-white">
                Call us directly or book your table online
              </p>
              </AnimateOnScroll>
            </div>

            {/* Right - CTA Buttons */}
            <AnimateOnScroll delay={400}>
            <div className="flex flex-col gap-4 items-center md:flex-1">
              {/* Primary Actions Row */}
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center">
                {/* Reserve Table — white fill */}
                <a
                  href="https://www.google.com/maps/reserve/v/dine/c/7WvgXFEay7o"
                  target="_blank"
                  className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full sm:w-[180px] bg-white hover:bg-gray-100 text-black px-4 md:px-6 py-2 text-base font-bold rounded-lg transition-colors">
                    <Calendar className="w-4 h-4" />
                    Reserve Table
                  </Button>
                </a>

                {/* Call Now — white outline */}
                <a href="tel:+919380344928" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-transparent w-full sm:w-[180px] border-white text-white hover:text-white hover:bg-white/10 px-4 md:px-6 py-2 text-base font-bold rounded-lg transition-colors">
                    <Phone className="w-4 h-4" />
                    Call Now
                  </Button>
                </a>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3 w-full max-w-[380px]">
                <div className="flex-1 h-px bg-white/30"></div>
                <span className="text-[10px] text-white/60 font-medium tracking-wider whitespace-nowrap">
                  OR BOOK ONLINE
                </span>
                <div className="flex-1 h-px bg-white/30"></div>
              </div>

              {/* Order Online Row */}
              <div className="flex flex-row items-center gap-3 sm:gap-4 flex-wrap justify-center w-full">
                <a
                  href="https://www.zomato.com/bangalore/kaavu-whitefield-bangalore/book"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block">
                  {/* <p className="text-white text-center text-[10px] pb-0.5 font-medium tracking-wide">
                  ORDER ON
                </p> */}
                  <Image
                    src="/images/zomato.svg"
                    alt="Order on Zomato"
                    width={140}
                    height={40}
                    className="h-[36px] w-auto object-contain transition-transform duration-300 hover:scale-105"
                  />
                </a>
                <a
                  href="https://www.swiggy.com/restaurants/kaavu-brookefield-bangalore-995080/dineout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block">
                  {/* <p className="text-white text-center text-[10px] pb-0.5 font-medium tracking-wide">
                  ORDER ON
                </p> */}
                  <Image
                    src="/images/swiggy.svg"
                    alt="Order on Swiggy"
                    width={140}
                    height={40}
                    className="h-[36px] w-auto object-contain transition-transform duration-300 hover:scale-105"
                  />
                </a>
              </div>
            </div>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
