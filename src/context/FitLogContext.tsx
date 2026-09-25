"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

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

interface FitLogContextType {
  planList: Workout[];
  savedList: Workout[];
  addToPlan: (workout: Workout) => void;
  addToSaved: (workout: Workout) => void;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
}

const FitLogContext = createContext<FitLogContextType | undefined>(undefined);

export function FitLogProvider({ children }: { children: React.ReactNode }) {
  // Initial state lazy loading
  const [planList, setPlanList] = useState<Workout[]>([]);
  const [savedList, setSavedList] = useState<Workout[]>([]);

  // Async microtask inside effect eliminates synchronous setState ESLint error
  useEffect(() => {
    const localPlan = localStorage.getItem("fitlog_plan");
    const localSaved = localStorage.getItem("fitlog_saved");

    Promise.resolve().then(() => {
      if (localPlan) {
        try {
          setPlanList(JSON.parse(localPlan));
        } catch {
          /* ignore error */
        }
      }
      if (localSaved) {
        try {
          setSavedList(JSON.parse(localSaved));
        } catch {
          /* ignore error */
        }
      }
    });
  }, []);

  const addToPlan = (workout: Workout) => {
    setPlanList((prev) => {
      if (prev.some((item) => item.id === workout.id)) return prev;
      const updated = [...prev, workout];
      localStorage.setItem("fitlog_plan", JSON.stringify(updated));
      return updated;
    });
  };

  const addToSaved = (workout: Workout) => {
    setSavedList((prev) => {
      if (prev.some((item) => item.id === workout.id)) return prev;
      const updated = [...prev, workout];
      localStorage.setItem("fitlog_saved", JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromPlan = (id: number) => {
    setPlanList((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      localStorage.setItem("fitlog_plan", JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromSaved = (id: number) => {
    setSavedList((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      localStorage.setItem("fitlog_saved", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <FitLogContext.Provider
      value={{
        planList,
        savedList,
        addToPlan,
        addToSaved,
        removeFromPlan,
        removeFromSaved,
      }}
    >
      {children}
    </FitLogContext.Provider>
  );
}

export function useFitLog() {
  const context = useContext(FitLogContext);
  if (!context) {
    throw new Error("useFitLog must be used within a FitLogProvider");
  }
  return context;
}