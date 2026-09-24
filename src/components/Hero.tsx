"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-12">
      
      <div className="bg-[#15171D] border border-[#222630] rounded-2xl p-8 md:p-12 lg:p-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative overflow-hidden">
        
        {/* Left Info Column */}
        <div className="z-10">
          {/* Eyebrow*/}
<p className="text-[#C2F800] font-bold text-xs md:text-sm tracking-widest uppercase mb-5">
  WORKOUT LIBRARY
</p>

{/* Main Heading */}
<h1 className="font-[family-name:var(--font-oswald)] text-[36px] sm:text-[46px] md:text-[54px] font-bold uppercase text-white mt-2 mb-5 leading-[0.95] tracking-tight scale-y-110 origin-left">
  TRAIN WITH INTENT. LOG <br />
  EVERY SET.
</h1>

          {/* Subtitle */}
          <p className="text-gray-400 text-sm md:text-base mb-8 max-w-md leading-relaxed">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          {/* Primary Button */}
          <a
            href="#library"
            className="inline-flex items-center gap-2 bg-[#C2F800] text-black font-bold text-xs md:text-sm px-6 py-3.5 rounded hover:bg-opacity-90 transition duration-200 uppercase"
          >
            <span>BROWSE WORKOUTS</span>
          </a>
        </div>

        {/* Right Banner Image */}
        <div className="flex justify-center md:justify-end items-center relative h-[250px] sm:h-[320px] md:h-[380px]">
          <div className="relative w-full h-full max-w-sm">
            <Image
              src="/assets/banner.png" 
              alt="Gym Companion Banner"
              fill
              priority
              className="object-contain object-center"
            />
          </div>
        </div>

      </div>
    </section>
  );
}