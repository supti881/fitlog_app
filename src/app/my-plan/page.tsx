"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useFitLog } from "@/context/FitLogContext";

function MyPlanContent() {
  const searchParams = useSearchParams();
  const { planList, savedList, removeFromPlan, removeFromSaved } = useFitLog();
  
  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
  const [sortBy, setSortBy] = useState<"duration" | "calories" | "id">("duration");
  const [completedItems, setCompletedItems] = useState<number[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  // sync tab with url
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    Promise.resolve().then(() => {
      if (tabParam === "saved") {
        setActiveTab("saved");
      } else if (tabParam === "plan") {
        setActiveTab("plan");
      }
    });
  }, [searchParams]);

  const currentList = activeTab === "plan" ? planList : savedList;

  // sort workouts
  const sortedList = [...currentList].sort((a, b) => {
    if (sortBy === "duration") return b.duration - a.duration;
    if (sortBy === "calories") return b.caloriesBurned - a.caloriesBurned;
    return a.id - b.id;
  });

  // calculate live metrics
  const totalExercises = currentList.length;
  const totalMinutes = currentList.reduce((acc, item) => acc + item.duration, 0);
  const totalCalories = currentList.reduce((acc, item) => acc + item.caloriesBurned, 0);

  const toggleMarkAsDone = (id: number) => {
    if (completedItems.includes(id)) {
      setCompletedItems(completedItems.filter((itemId) => itemId !== id));
    } else {
      setCompletedItems([...completedItems, id]);
    }
  };

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 2500);
  };

  const handleRemove = (id: number, name: string) => {
    if (activeTab === "plan") {
      removeFromPlan(id);
      showToast(`Removed "${name}" from today's plan`);
    } else {
      removeFromSaved(id);
      showToast(`Removed "${name}" from saved list`);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0f1115] text-white py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* remove toast */}
      {toast && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-2 bg-[#15171D] border border-[#222630] text-white text-xs font-semibold px-4 py-3 rounded-lg shadow-2xl transition duration-300">
          <span className="w-5 h-5 bg-rose-500 rounded-full flex items-center justify-center text-white font-bold text-[10px]">
            ✕
          </span>
          <span>{toast}</span>
        </div>
      )}

      {/* header */}
      <div className="mb-8">
        <h1 className="font-[family-name:var(--font-oswald)] text-3xl sm:text-4xl font-bold uppercase tracking-wide text-white">
          MY PLAN
        </h1>
        <p className="text-gray-400 text-xs sm:text-sm mt-1">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* stats banner */}
      <div className="bg-[#15171D] border border-[#222630] rounded-2xl p-6 mb-8 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:divide-x sm:divide-[#222630]">
        <div className="sm:pr-6">
          <span className="text-xs font-semibold text-gray-400 block mb-2">Exercises</span>
          <span className="font-[family-name:var(--font-oswald)] text-4xl font-bold text-[#C2F800]">
            {totalExercises}
          </span>
        </div>
        <div className="sm:px-6">
          <span className="text-xs font-semibold text-gray-400 block mb-2">Minutes</span>
          <span className="font-[family-name:var(--font-oswald)] text-4xl font-bold text-white">
            {totalMinutes}
          </span>
        </div>
        <div className="sm:pl-6">
          <span className="text-xs font-semibold text-gray-400 block mb-2">Calories</span>
          <span className="font-[family-name:var(--font-oswald)] text-4xl font-bold text-white">
            {totalCalories}
          </span>
        </div>
      </div>

      {/* controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        
        {/* tab toggle */}
        <div className="bg-[#15171D] border border-[#222630] p-1 rounded-xl flex items-center gap-1">
          <button
            onClick={() => setActiveTab("plan")}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeTab === "plan"
                ? "bg-[#222630] text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Today&apos;s Plan
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeTab === "saved"
                ? "bg-[#222630] text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Saved
          </button>
        </div>

        {/* sorting */}
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span>Sort By</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "duration" | "calories" | "id")}
            className="bg-[#15171D] border border-[#222630] text-gray-200 px-3 py-1.5 rounded-lg focus:outline-none focus:border-[#C2F800] cursor-pointer"
          >
            <option value="duration">Duration</option>
            <option value="calories">Calories</option>
            <option value="id">ID</option>
          </select>
        </div>

      </div>

      {/* list grid */}
      {sortedList.length === 0 ? (
        <div className="bg-[#15171D] border border-[#222630] rounded-2xl p-12 text-center my-6 flex flex-col items-center">
          <p className="text-gray-400 text-sm mb-4">
            No workouts in {activeTab === "plan" ? "Today's Plan" : "Saved list"}.
          </p>
          <Link
            href="/"
            className="bg-[#C2F800] text-black font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-opacity-90 transition"
          >
            Browse Workouts
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedList.map((item) => {
            const isDone = completedItems.includes(item.id);

            return (
              <div
                key={item.id}
                className={`bg-[#15171D] border ${
                  isDone ? "border-emerald-500/50 opacity-75" : "border-[#222630]"
                } rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition duration-200`}
              >
                {/* card meta */}
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="relative w-28 h-20 sm:w-36 sm:h-24 rounded-xl overflow-hidden bg-[#1a1d24] flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="150px"
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <h3 className="font-[family-name:var(--font-oswald)] text-lg sm:text-xl font-bold uppercase tracking-wide text-white">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-400 mb-2">{item.equipment}</p>
                    
                    <div className="flex items-center gap-3 text-xs text-gray-300">
                      <span className="flex items-center gap-1">⏱️ {item.duration} min</span>
                      <span className="flex items-center gap-1 text-[#C2F800]">🔥 {item.caloriesBurned} kcal</span>
                      <span className="flex items-center gap-1">⭐ {item.rating}</span>
                    </div>
                  </div>
                </div>

                {/* action buttons */}
                <div className="flex items-center justify-end gap-3 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-[#222630]">
                  <Link
                    href={`/workout/${item.id}`}
                    className="bg-transparent border border-[#222630] hover:border-gray-500 text-white font-semibold text-xs px-4 py-2 rounded-xl transition"
                  >
                    View Details
                  </Link>

                  {activeTab === "plan" && (
                    <button
                      onClick={() => toggleMarkAsDone(item.id)}
                      className={`${
                        isDone
                          ? "bg-emerald-600 text-white"
                          : "bg-[#C2F800] text-black hover:bg-opacity-90"
                      } font-bold text-xs px-4 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer`}
                    >
                      ✓ {isDone ? "Done" : "Mark as Done"}
                    </button>
                  )}

                  <button
                    onClick={() => handleRemove(item.id, item.name)}
                    className="text-gray-400 hover:text-white p-2 text-sm transition cursor-pointer"
                    title="Remove"
                  >
                    ✕
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}

export default function MyPlanPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-400">Loading plan...</div>}>
      <MyPlanContent />
    </Suspense>
  );
}