'use client';

import { HeroSection, DownloadSteps, DownloadForm, LegalDisclaimer } from "@/constants";

export default function Home() {
  return (
    <>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl min-h-screen">
        <DownloadForm />
        <HeroSection />
        <DownloadSteps />
        <div className="py-10">
          <LegalDisclaimer />
        </div>
      </div>
    </>
  );
}
