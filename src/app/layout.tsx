import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "../components/NavbarWrapper";
import { FitLogProvider } from "@/context/FitLogContext";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-oswald",
});

export const metadata: Metadata = {
  title: "FitLog — Workout Library",
  description: "Train with intent. Log every set.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${oswald.variable} bg-[#0f1115] text-white min-h-screen flex flex-col antialiased`}>
        <FitLogProvider>
          <NavbarWrapper />
          <main className="flex-grow">{children}</main>
        </FitLogProvider>
      </body>
    </html>
  );
}