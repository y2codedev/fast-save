'use client'

import { useState } from 'react'
import CategoryNav from './CategoryNav'
import { ErrorAlert, SuccessAlert } from '@/constants/index'
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
      const instagramRegex = /^https?:\/\/(www\.)?instagram\.com\/(reel|p)\/([A-Za-z0-9_-]+)\/?/
      if (!instagramRegex.test(url)) {
        throw new Error('Please enter a valid Instagram Reel URL')
      }

      await new Promise(resolve => setTimeout(resolve, 1500))
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
    <div id="download-section" className="bg-linear-to-t from-black-600 to-indigo-600 dark:bg-gray-900 py-4 px-4 sm:py-10">
      <CategoryNav />
      <div className="mx-auto max-w-7xl pt-6 ">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-100 dark:text-black sm:text-4xl">
            Download Instagram Reels & Videos
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-200 dark:text-gray-300">
            Paste your Instagram Reel URL below to download the video without watermark
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-4xl rounded-3xl bg-gray-100 shadow-sm dark:bg-gray-800 p-6 sm:p-10">
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
                  className="block w-full rounded-md border-0 py-3 px-4 text-gray-900 dark:text-white dark:bg-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                  required
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-4 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500  focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Processing...' : 'Download Now'}
              </button>
            </div>

            {error && (
              <ErrorAlert error={error} className='' />
            )}

            {success && (
              <SuccessAlert message='Download link will be available in few seconds' className='' />
            )}
          </form>
        </div>
      </div>
    </div>
  )
}