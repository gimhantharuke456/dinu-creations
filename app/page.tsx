"use client";

import { navItems } from "@/data";

import Hero from "@/components/Hero";
import DinuEventsGrid from "@/components/DinuEventsGrid";
import Footer from "@/components/Footer";
import Approach from "@/components/Approach";
import Experience from "@/components/Experience";
import GaelleryDinuCreations from "@/components/GalleryDinuCreations";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import DinuCreationsGrid from "@/components/DinuCreationsGrid";
import Reviews from "@/components/Reviews";
import GalleryEventsByDinu from "@/components/GalleryEventsByDinu";
import SiteDescriptionGrid from "@/components/SiteDescriptionGrid";

const Home = () => {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <FloatingNav navItems={navItems} />
        <Hero />
        <SiteDescriptionGrid />
        <GaelleryDinuCreations />
        <GalleryEventsByDinu />
        <Reviews />
        {/* <Approach /> */}
        <Footer />
      </div>
    </main>
  );
};

export default Home;
