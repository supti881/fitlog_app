# 🏋️ FitLog — app

FitLog is a modern, high-performance web application designed for fitness enthusiasts to browse exercises, track daily workout routines, and save favorite lifts. Built with Next.js 15 App Router and Tailwind CSS, it features a pixel-perfect dark theme UI with seamless local state persistence.

---

## 🚀 Technologies Used

- **Framework:** [Next.js 15 (App Router)](https://nextjs.org/)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React Context API + LocalStorage
- **Icons & Typography:** Google Fonts (Oswald) & Custom SVGs
- **Deployment:** Vercel

---

## ✨ Key Features

1. **Interactive Exercise Library & Filtering**
   - Live search by exercise name or targeted muscle group.
   - Multi-criteria dynamic sorting (by Duration, Calories Burned, or ID).

2. **Detailed Workout Dynamic Routes (`/workout/[id]`)**
   - Dedicated pages with high-resolution imagery, difficulty specs, equipment requirements, and step-by-step instructions.

3. **Global State & LocalStorage Persistence**
   - Seamlessly add or remove exercises to/from "Today's Plan" and "Saved Lifts".
   - State persists across browser sessions with zero hydration errors.

4. **Real-time Metrics Dashboard (`/my-plan`)**
   - Live calculations for total exercises, total duration (minutes), and total calories burned.
   - Separate interactive tabs for "Today's Plan" and "Saved" routines.

5. **User Feedback & Notification System**
   - Context-aware top-right toast notifications for additions, duplicate warnings ("Already in your plan"), and item removals.