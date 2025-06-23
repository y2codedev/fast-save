'use client';

import { HeroSection, DownloadSteps, DownloadForm, LegalDisclaimer } from "@/constants";

export default function Home() {

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
        <DownloadForm />
        <HeroSection />
        <DownloadSteps />
        <LegalDisclaimer />
    </div>
  );
}