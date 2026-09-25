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
    <header className="w-full bg-[#0b0c0e] border-b border-[#1b1e26]/80 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* brand logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-6 h-6">
            <Image
              src="/assets/logo.png"
              alt="FitLog Logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="font-[family-name:var(--font-oswald)] text-lg font-bold uppercase tracking-wider text-white group-hover:text-[#C2F800] transition">
            FITLOG
          </span>
        </Link>

        {/* nav links */}
        <nav className="flex items-center gap-6 text-xs font-medium">
          <Link
            href="/"
            className={`px-4 py-1.5 rounded-full transition ${
              isWorkoutsActive
                ? "bg-[#18240f] text-[#C2F800] font-bold"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={`px-4 py-1.5 rounded-full transition ${
              isMyPlanActive
                ? "bg-[#18240f] text-[#C2F800] font-bold"
                : "text-gray-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </nav>

        <div className="flex items-center gap-6 text-xs">
          <Link
            href="/my-plan?tab=plan"
            className="flex items-center gap-2 text-gray-300 hover:text-white transition cursor-pointer"
          >
            <span>Plan</span>
            <span className="bg-[#C2F800] text-black font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
              {planCount}
            </span>
          </Link>

          <Link
            href="/my-plan?tab=saved"
            className="flex items-center gap-2 text-gray-300 hover:text-white transition cursor-pointer"
          >
            <span>Saved</span>
            <span className="bg-[#12151d] text-white font-semibold text-[10px] w-4 h-4 rounded-full flex items-center justify-center border border-[#2b303d]">
              {savedCount}
            </span>
          </Link>
        </div>

      </div>
    </header>
  );
}