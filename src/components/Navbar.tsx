"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface NavbarProps {
  planCount?: number;
  savedCount?: number;
}

export default function Navbar({ planCount = 0, savedCount = 0 }: NavbarProps) {
  const pathname = usePathname();

  const isWorkoutsActive = pathname === "/" || pathname.startsWith("/workout");
  const isMyPlanActive = pathname === "/my-plan";

  return (
    <header className="w-full bg-[#0f1115] border-b border-[#222630]/60 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative w-7 h-7">
            <Image
              src="/assets/logo.png"
              alt="FitLog Logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="font-[family-name:var(--font-oswald)] text-xl font-bold uppercase tracking-wider text-white group-hover:text-[#C2F800] transition">
            FITLOG
          </span>
        </Link>

        {/* Center Nav Links */}
        <nav className="flex items-center gap-2 sm:gap-6 bg-[#15171D] border border-[#222630] rounded-full px-3 py-1.5 text-xs font-semibold">
          <Link
            href="/"
            className={`px-3 py-1 rounded-full transition ${
              isWorkoutsActive
                ? "bg-[#C2F800] text-black font-bold"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={`px-3 py-1 rounded-full transition ${
              isMyPlanActive
                ? "bg-[#C2F800] text-black font-bold"
                : "text-gray-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* Right Badges */}
        <div className="flex items-center gap-2 text-xs">
          <div className="bg-[#15171D] border border-[#222630] text-gray-300 px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <span>Plan</span>
            <span className="bg-[#C2F800] text-black font-extrabold w-4 h-4 rounded-full flex items-center justify-center text-[10px]">
              {planCount}
            </span>
          </div>
          <div className="bg-[#15171D] border border-[#222630] text-gray-300 px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <span>Saved</span>
            <span className="bg-[#222630] text-white font-bold w-4 h-4 rounded-full flex items-center justify-center text-[10px]">
              {savedCount}
            </span>
          </div>
        </div>

      </div>
    </header>
  );
}