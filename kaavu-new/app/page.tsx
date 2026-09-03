import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/sections/hero";
import AboutSection from "@/components/sections/about";
import WhatWeOfferSection from "@/components/sections/what-we-offer";
import ZonesSection from "@/components/sections/zones";
import ExperiencesSection from "@/components/sections/experiences";
import CorporateSection from "@/components/sections/corporate";
import VendorsSection from "@/components/sections/kitchen";
import ContactSection from "@/components/sections/contact";
import GallerySection from "@/components/sections/gallery";
import CTASection from "@/components/sections/ctasection";
import MomentsSection from "@/components/sections/moment";
import KitchenSection from "@/components/sections/kitchen";
import OnlineOrderSection from "@/components/sections/onlineorder";
import ChefSection from "@/components/sections/chefsection";


export default function Home() {
  return (
    <>
      <Navbar />
      <main className="bg-background text-foreground">
        <HeroSection />
        <CTASection />
        <ZonesSection />
        <ExperiencesSection />
        <ChefSection/>
        {/* <KitchenSection /> */}
        <MomentsSection />
        <CorporateSection />
        <GallerySection />
        <OnlineOrderSection/>
        <ContactSection />
        {/* <AboutSection />
        <WhatWeOfferSection /> */}
      </main>
    </>
  );
}
