"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useFitLog } from "@/context/FitLogContext";

interface Workout {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
}

export default function WorkoutDetailsPage() {
  const params = useParams();
  const id = params?.id;

  const { planList, savedList, addToPlan, addToSaved } = useFitLog();

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    async function fetchWorkoutDetails() {
      try {
        const res = await fetch("https://api.abcz.workers.dev/api/fitlog");
        const data: Workout[] = await res.json();
        const found = data.find((item) => item.id.toString() === id);
        setWorkout(found || null);
      } catch (error) {
        console.error("Failed to fetch workout details:", error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchWorkoutDetails();
    }
  }, [id]);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // Add to plan click handler
  const handleAddToPlan = () => {
    if (!workout) return;

    const isAlreadyInPlan = planList.some((item) => item.id === workout.id);

    if (isAlreadyInPlan) {
      showToast("Already in your plan", "error");
    } else {
      addToPlan(workout);
      showToast("Added to today's plan", "success");
    }
  };

  // Save for later click handler
  const handleSaveForLater = () => {
    if (!workout) return;

    const isAlreadySaved = savedList.some((item) => item.id === workout.id);

    if (isAlreadySaved) {
      showToast("Already in your saved list", "error");
    } else {
      addToSaved(workout);
      showToast("Saved for later", "success");
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-[#C2F800] font-bold animate-pulse">
        Loading workout details...
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold text-white mb-2">Workout Not Found</h2>
        <p className="text-gray-400 text-sm mb-6">The workout you are looking for does not exist.</p>
        <Link
          href="/"
          className="bg-[#C2F800] text-black px-5 py-2.5 rounded font-bold text-sm hover:bg-opacity-90 transition"
        >
          Back to Library
        </Link>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#0f1115] text-white py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* toast notification */}
      {toast && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-2 bg-[#15171D] border border-[#222630] text-white text-xs font-semibold px-4 py-3 rounded-lg shadow-2xl transition duration-300">
          {toast.type === "success" ? (
            <span className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center text-black font-bold text-[10px]">
              ✓
            </span>
          ) : (
            <span className="w-5 h-5 bg-rose-500 rounded-full flex items-center justify-center text-white font-bold text-[10px]">
              ✕
            </span>
          )}
          <span>{toast.message}</span>
        </div>
      )}

      {/* main layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* image section */}
        <div className="lg:col-span-6 w-full aspect-square relative rounded-3xl overflow-hidden bg-[#15171D] border border-[#222630] shadow-xl">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div className="lg:col-span-6 flex flex-col justify-between">
          
          {/* header */}
          <div className="mb-6">
            <h1 className="font-[family-name:var(--font-oswald)] text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-wide text-white mb-3">
              {workout.name}
            </h1>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              {workout.description}
            </p>

            {/* group badges */}
            <div className="flex flex-wrap gap-2">
              {workout.muscleGroups.map((muscle, idx) => (
                <span
                  key={idx}
                  className="bg-[#C2F800] text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide"
                >
                  {muscle}
                </span>
              ))}
            </div>
          </div>

          {/* table card */}
          <div className="bg-[#15171D]/90 border border-[#222630] rounded-2xl p-5 mb-6 space-y-3.5 text-xs sm:text-sm">
            <div className="flex justify-between items-center border-b border-[#222630]/60 pb-2.5">
              <span className="font-bold uppercase tracking-wider text-gray-400">EQUIPMENT</span>
              <span className="font-semibold text-gray-200">{workout.equipment}</span>
            </div>
            <div className="flex justify-between items-center border-b border-[#222630]/60 pb-2.5">
              <span className="font-bold uppercase tracking-wider text-gray-400">DIFFICULTY</span>
              <span className="font-semibold text-gray-200">{workout.difficulty}</span>
            </div>
            <div className="flex justify-between items-center border-b border-[#222630]/60 pb-2.5">
              <span className="font-bold uppercase tracking-wider text-gray-400">SETS</span>
              <span className="font-semibold text-gray-200">{workout.sets}</span>
            </div>
            <div className="flex justify-between items-center border-b border-[#222630]/60 pb-2.5">
              <span className="font-bold uppercase tracking-wider text-gray-400">REPS</span>
              <span className="font-semibold text-gray-200">{workout.reps}</span>
            </div>
            <div className="flex justify-between items-center border-b border-[#222630]/60 pb-2.5">
              <span className="font-bold uppercase tracking-wider text-gray-400">DURATION</span>
              <span className="font-semibold text-gray-200">{workout.duration} min</span>
            </div>
            <div className="flex justify-between items-center border-b border-[#222630]/60 pb-2.5">
              <span className="font-bold uppercase tracking-wider text-gray-400">CALORIES</span>
              <span className="font-semibold text-gray-200">{workout.caloriesBurned} kcal</span>
            </div>
            <div className="flex justify-between items-center pt-0.5">
              <span className="font-bold uppercase tracking-wider text-gray-400">RATING</span>
              <span className="font-semibold text-gray-200">{workout.rating}</span>
            </div>
          </div>

          {/* instructions */}
          <div className="mb-6">
            <h2 className="font-[family-name:var(--font-oswald)] text-lg font-bold uppercase tracking-wide text-white mb-3">
              INSTRUCTIONS
            </h2>
            <ol className="space-y-2 text-xs sm:text-sm text-gray-300">
              {workout.instructions.map((step, index) => (
                <li key={index} className="leading-relaxed flex gap-2">
                  <span className="font-semibold text-gray-400">{index + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="flex flex-wrap items-center gap-4 pt-1">
            <button
              onClick={handleAddToPlan}
              className="bg-[#C2F800] text-black font-bold text-xs sm:text-sm px-6 py-3 rounded-xl hover:bg-opacity-90 transition flex items-center gap-2 cursor-pointer"
            >
              <span className="text-base">📅</span> Add to today&apos;s plan
            </button>
            <button
              onClick={handleSaveForLater}
              className="bg-[#15171D] border border-[#222630] hover:border-gray-500 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition flex items-center gap-2 cursor-pointer"
            >
              <span className="text-base">🔖</span> Save for later
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}