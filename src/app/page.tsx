'use client';

import { HeroSection, DownloadSteps, DownloadForm, LegalDisclaimer } from "@/constants";

export default function Home() {

  return (
    <div className="min-h-screen">
        <DownloadForm />
        <HeroSection />
        <DownloadSteps />
        <LegalDisclaimer />
    </div>
  );
}