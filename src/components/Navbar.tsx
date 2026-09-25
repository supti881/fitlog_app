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
    <header className="w-full bg-[#0d0f12] border-b border-[#1f232d] sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* brand logo */}
        <Link href="/" className="flex items-center gap-2 group">
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

        {/*  Nav  container */}
        <nav className="flex items-center gap-1 bg-[#13161c] border border-[#222630] rounded-full p-1 text-xs font-semibold">
          <Link
            href="/"
            className={`px-4 py-1.5 rounded-full transition ${
              isWorkoutsActive
                ? "bg-[#C2F800] text-black font-bold"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={`px-4 py-1.5 rounded-full transition ${
              isMyPlanActive
                ? "bg-[#C2F800] text-black font-bold"
                : "text-gray-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* right badges */}
        <div className="flex items-center gap-2 text-xs">
          <Link
            href="/my-plan?tab=plan"
            className="bg-[#13161c] border border-[#222630] hover:border-gray-600 text-gray-300 px-3.5 py-1.5 rounded-full flex items-center gap-2 transition cursor-pointer"
          >
            <span>Plan</span>
            <span className="bg-[#C2F800] text-black font-extrabold text-[11px] w-4 h-4 rounded-full flex items-center justify-center">
              {planCount}
            </span>
          </Link>

          <Link
            href="/my-plan?tab=saved"
            className="bg-[#13161c] border border-[#222630] hover:border-gray-600 text-gray-300 px-3.5 py-1.5 rounded-full flex items-center gap-2 transition cursor-pointer"
          >
            <span>Saved</span>
            <span className="bg-[#222630] text-white font-bold text-[11px] w-4 h-4 rounded-full flex items-center justify-center border border-gray-700">
              {savedCount}
            </span>
          </Link>
        </div>

      </div>
    </header>
  );
}