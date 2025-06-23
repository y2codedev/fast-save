'use client';

export default function LegalDisclaimer() {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 py-16   mx-auto  max-w-7xl sm:rounded-xl my-8 rounded-none sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Legal Disclaimer</h2>
          <div className="mt-6 space-y-6 text-gray-600 dark:text-gray-300">
            <p>
              FastVideoSave.net is not affiliated with Instagram or Meta. This service is intended for personal use only.
            </p>
            <p>
              Downloading copyrighted content without permission may violate Instagram's Terms of Service and applicable copyright laws. Please ensure you have the right to download and use the content.
            </p>
            <p>
              We respect intellectual property rights and comply with the DMCA. If you believe any content infringes your copyright, please contact us with the details.
            </p>
            <p className="font-medium">
              By using our service, you agree to our <a href="/terms" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">Terms of Service</a> and <a href="/privacy" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}