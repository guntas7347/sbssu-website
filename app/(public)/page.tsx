import { AcademicsSection } from "@/components/homepage/AcademicsSection";
import { CampusLifeSection } from "@/components/homepage/CampusLifeSection";
import { Hero } from "@/components/homepage/Hero";
import { NoticesSection } from "@/components/homepage/NoticesSection";
import React from "react";

export default async function HomePage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 selection:bg-primary selection:text-white">
      <Hero />
      <NoticesSection />
      <AcademicsSection />
      <CampusLifeSection />
    </main>
  );
}
