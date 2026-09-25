"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

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

export default function Library() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("id");

  useEffect(() => {
    async function fetchWorkouts() {
      try {
        const res = await fetch("https://api.abcz.workers.dev/api/fitlog");
        const data = await res.json();
        setWorkouts(data);
      } catch (error) {
       console.error("Failed to fetch workouts:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchWorkouts();
  }, []);

  // search filter
  const filteredWorkouts = workouts.filter((item) => {
    const query = search.toLowerCase();
    const matchName = item.name.toLowerCase().includes(query);
    const matchMuscle = item.muscleGroups.some((m) =>
      m.toLowerCase().includes(query)
    );
    return matchName || matchMuscle;
  });

  // sort logic 
  const sortedWorkouts = [...filteredWorkouts].sort((a, b) => {
    if (sortBy === "id") return a.id - b.id; 
    if (sortBy === "duration") return a.duration - b.duration;
    if (sortBy === "calories") return a.caloriesBurned - b.caloriesBurned;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <section id="library" className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* header & controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h2 className="font-[family-name:var(--font-oswald)] text-3xl md:text-4xl font-bold uppercase tracking-wide text-white">
            THE LIBRARY
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {/* search & sort options */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search workout or muscle..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#15171D] border border-[#222630] text-white text-xs px-3 py-2.5 rounded focus:outline-none focus:border-[#C2F800] placeholder-gray-500"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#15171D] border border-[#222630] text-gray-300 text-xs px-3 py-2.5 rounded focus:outline-none focus:border-[#C2F800] cursor-pointer"
          >
            <option value="id">Sort By ID (Default)</option>
            <option value="duration">Sort By Duration</option>
            <option value="calories">Sort By Calories</option>
            <option value="rating">Sort By Rating</option>
          </select>
        </div>
      </div>

      
      {loading ? (
        <div className="flex justify-center items-center py-20 text-[#C2F800] text-base font-bold animate-pulse">
          Loading workouts...
        </div>
      ) : sortedWorkouts.length === 0 ? (
        <div className="text-center py-16 text-gray-400 text-sm">
          No workouts found matching &quot;{search}&quot;.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedWorkouts.map((item) => (
            <Link key={item.id} href={`/workout/${item.id}`}>
              <div className="bg-[#15171D] border border-[#222630] hover:border-[#C2F800] transition duration-200 rounded-xl p-4 flex flex-col h-full group cursor-pointer relative">

               {/* workout image */}
<div className="relative w-full h-48 rounded-lg overflow-hidden mb-4 bg-[#1a1d24]">
  <Image
    src={item.image}
    alt={item.name}
    fill
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    className="object-cover group-hover:scale-105 transition duration-300"
  />
</div>

                {/* tags */}
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {item.muscleGroups.map((muscle, index) => (
                    <span
                      key={index}
                      className="bg-[#0f1115] border border-[#222630] text-[#C2F800] text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider"
                    >
                      {muscle}
                    </span>
                  ))}
                </div>

                {/* name & equipment */}
                <h3 className="font-[family-name:var(--font-oswald)] text-lg font-bold text-white uppercase group-hover:text-[#C2F800] transition mb-1">
                  {item.name}
                </h3>
                <p className="text-gray-400 text-xs mb-4">
                  Equipment: <span className="text-gray-300">{item.equipment}</span>
                </p>

                {/* footer stats */}
                <div className="mt-auto pt-3 border-t border-[#222630] flex items-center justify-between text-xs text-gray-400 font-medium">
                  <span>⏱️ {item.duration} min</span>
                  <span>🔥 {item.caloriesBurned} kcal</span>
                  <span>⭐ {item.rating}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}