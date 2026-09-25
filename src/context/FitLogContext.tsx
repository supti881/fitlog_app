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
  // useState
  const [planList, setPlanList] = useState<Workout[]>(() => {
    if (typeof window !== "undefined") {
      const localPlan = localStorage.getItem("fitlog_plan");
      return localPlan ? JSON.parse(localPlan) : [];
    }
    return [];
  });

  const [savedList, setSavedList] = useState<Workout[]>(() => {
    if (typeof window !== "undefined") {
      const localSaved = localStorage.getItem("fitlog_saved");
      return localSaved ? JSON.parse(localSaved) : [];
    }
    return [];
  });

  // State 
  useEffect(() => {
    localStorage.setItem("fitlog_plan", JSON.stringify(planList));
  }, [planList]);

  useEffect(() => {
    localStorage.setItem("fitlog_saved", JSON.stringify(savedList));
  }, [savedList]);

  const addToPlan = (workout: Workout) => {
    if (!planList.some((item) => item.id === workout.id)) {
      setPlanList((prev) => [...prev, workout]);
    }
  };

  const addToSaved = (workout: Workout) => {
    if (!savedList.some((item) => item.id === workout.id)) {
      setSavedList((prev) => [...prev, workout]);
    }
  };

  const removeFromPlan = (id: number) => {
    setPlanList((prev) => prev.filter((item) => item.id !== id));
  };

  const removeFromSaved = (id: number) => {
    setSavedList((prev) => prev.filter((item) => item.id !== id));
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