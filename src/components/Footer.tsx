import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0b0c0f] border-t border-[#222630]/60 mt-auto py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* brand logo  */}
        <div className="flex items-center gap-2">
          <div className="relative w-5 h-5">
            <Image
              src="/assets/logo.png"
              alt="FitLog Logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="font-[family-name:var(--font-oswald)] text-lg font-bold uppercase tracking-wider text-white">
            FITLOG
          </span>
        </div>

        {/* text */}
        <p className="text-xs text-gray-500 font-medium">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
}