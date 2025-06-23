'use client';

import Link from 'next/link'
import { FEATURES } from '@/constants';
export default function HeroSection() {
  return (
    <div className="bg-white dark:bg-gray-900 px-4 ">
      <div className="relative isolate">
        <div className="mx-auto max-w-6xl py-16 sm:py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              Download Instagram Reels <span className="text-indigo-600">Without Watermark</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Fast, free, and unlimited Instagram Reels downloads in HD quality. Save videos directly to your device in seconds.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="#download-section"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline  focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Start Downloading
              </Link>
              <Link href="#how-it-works" className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl  pb-24">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES?.map((feature) => (
              <div key={feature?.id} className="bg-gray-50 hover:bg-indigo-50  dark:bg-gray-800 p-6 rounded-xl">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-lg">
                    <feature.icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
                  </div>
                  <h3 className="ml-3 text-lg font-medium text-gray-900 dark:text-white">{feature?.name}</h3>
                </div>
                <p className="mt-2 text-gray-600 dark:text-gray-400">{feature?.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}