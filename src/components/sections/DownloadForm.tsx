'use client'

import { useState } from 'react'
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline'

export default function DownloadForm() {
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess(false)

    try {
      // Validate URL
      const instagramRegex = /^https?:\/\/(www\.)?instagram\.com\/(reel|p)\/([A-Za-z0-9_-]+)\/?/
      if (!instagramRegex.test(url)) {
        throw new Error('Please enter a valid Instagram Reel URL')
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      // In a real app, you would call your API here
      // const response = await fetch('/api/download', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ url }),
      // })
      // const data = await response.json()

      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div id="download-section" className="bg-white dark:bg-gray-900 py-16 sm:py-10">
      <div className="mx-auto max-w-7xl ">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Download Instagram Reels
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Paste your Instagram Reel URL below to download the video without watermark
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-3xl rounded-3xl bg-gray-50 dark:bg-gray-800 p-6 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="url" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                Instagram Reel URL
              </label>
              <div className="mt-2">
                <input
                  type="url"
                  id="url"
                  name="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://www.instagram.com/reel/..."
                  className="block w-full rounded-md border-0 py-3 px-4 text-gray-900 dark:text-white dark:bg-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-4 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Processing...' : 'Download Now'}
              </button>
            </div>

            {error && (
              <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <ExclamationCircleIcon className="h-5 w-5 text-red-400 dark:text-red-300" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800 dark:text-red-200">Error</h3>
                    <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                      <p>{error}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {success && (
              <div className="rounded-md bg-green-50 dark:bg-green-900/20 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <CheckCircleIcon className="h-5 w-5 text-green-400 dark:text-green-300" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800 dark:text-green-200">Success!</h3>
                    <div className="mt-2 text-sm text-green-700 dark:text-green-300">
                      <p>Your download will start shortly. If not, <button className="font-medium text-green-600 dark:text-green-400 hover:text-green-500">click here</button>.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}