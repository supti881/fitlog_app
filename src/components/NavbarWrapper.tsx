"use client";

import { useFitLog } from "@/context/FitLogContext";
import Navbar from "@/components/Navbar";

export default function NavbarWrapper() {
  const { planList, savedList } = useFitLog();

  return <Navbar planCount={planList.length} savedCount={savedList.length} />;
}