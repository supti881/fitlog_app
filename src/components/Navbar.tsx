"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();

  const planCount = 2;
  const savedCount = 3;

  return (
    <nav className="border-b border-gray-800 bg-[#0f1115] sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
      
     {/* Logo Section */}
<Link href="/" className="flex items-center gap-2 font-black text-xl tracking-wider text-white">
  <Image 
    src="/assets/logo.png" 
    alt="FitLog Logo" 
    width={28}  
    height={28} 
    className="object-contain"
  />
  <span>FITLOG</span>
</Link>
  
      <div className="flex gap-6 font-medium text-sm">
        <Link
          href="/"
          className={
            pathname === "/"
              ? "text-[#ccff00] font-bold border-b-2 border-[#ccff00] pb-1"
              : "text-gray-400 hover:text-white transition"
          }
        >
          Workout
        </Link>
        <Link
          href="/my-plan"
          className={
            pathname === "/my-plan"
              ? "text-[#ccff00] font-bold border-b-2 border-[#ccff00] pb-1"
              : "text-gray-400 hover:text-white transition"
          }
        >
          My Plan
        </Link>
      </div>

      
      <div className="flex items-center gap-3">
       
        <Link
          href="/my-plan"
          className="bg-[#ccff00] text-black font-semibold text-xs px-3.5 py-1.5 rounded-full flex items-center gap-2 hover:bg-opacity-90 transition"
        >
          <span>Plan</span>
          <span className="bg-black text-[#ccff00] text-[10px] font-bold px-2 py-0.5 rounded-full">
            {planCount}
          </span>
        </Link>

        
        <Link
          href="/my-plan"
          className="border border-gray-700 text-gray-300 font-semibold text-xs px-3.5 py-1.5 rounded-full flex items-center gap-2 hover:border-gray-500 hover:text-white transition"
        >
          <span>Saved</span>
          <span className="bg-gray-800 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            {savedCount}
          </span>
        </Link>
      </div>
    </nav>
  );
}