'use client';

import { useState, useEffect } from 'react';
import { ErrorAlert, SuccessAlert, Loader, ReelResult, CategoryNav } from '@/constants/index';

export default function DownloadForm() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [downloadData, setDownloadData] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess(false);

    try {
      const instagramReelRegex = /^https?:\/\/(www\.)?instagram\.com\/(reel|p)\/([A-Za-z0-9_-]+)\/?/;
      if (!instagramReelRegex.test(url)) {
        throw new Error('Please enter a valid Instagram Reel URL');
      }

      const response = await fetch('/api/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to process video');
      }

      setDownloadData(data);
      setSuccess(true);
      setUrl('');
      setError('');

    } catch (err) {
      console.error('Download error:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch video. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="download-section" className="bg-linear-to-t from-black-600 to-indigo-600 dark:bg-gray-900 py-4 px-4 sm:py-10">
      <CategoryNav />
      <div className="mx-auto max-w-7xl pt-6">
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
                  className="block w-full rounded-md border-2 border-gray-300 py-3 px-4 text-gray-900 dark:text-white dark:bg-gray-700 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none focus:border-indigo-600"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full justify-center cursor-pointer rounded-md bg-indigo-600 px-4 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500  disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader />
                  Processing...
                </span>
              ) : 'Download Now'}
            </button>
            {error && <ErrorAlert error={error} />}
            {success && <SuccessAlert message="Download successful!" />}
          </form>
          {downloadData && <ReelResult data={downloadData} isSaving={isSaving} setIsSaving={setIsSaving} />}
        </div>
      </div>
    </div>
  );
}