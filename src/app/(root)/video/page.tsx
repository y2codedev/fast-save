'use client';
import { useState } from 'react';
import Image from 'next/image';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { Loader2 } from 'lucide-react';

interface MediaItem {
  url: string;
  type: 'video' | 'image';
  quality?: string;
  label?: string;
  width?: number;
  height?: number;
  ext?: string;
  bitrate?: number;
  fps?: number;
}

interface SocialMediaResponse {
  success: boolean;
  platform: string;
  title?: string;
  thumbnail?: string;
  author?: string;
  duration?: number;
  medias: MediaItem[];
  error?: string;
}

export default function SocialMediaDownloader() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<SocialMediaResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const fetchMedia = async () => {
    if (!url) {
      setError('Please enter a valid social media URL');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('https://social-download-all-in-one.p.rapidapi.com/v1/social/autolink', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-rapidapi-host': 'social-download-all-in-one.p.rapidapi.com',
          'x-rapidapi-key': '5da58acae9mshaca9e06ba0032afp175489jsn9e4219e979ab',
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch media');
      }

      const transformedData: SocialMediaResponse = {
        success: true,
        platform: data.source || 'unknown',
        title: data.title,
        thumbnail: data.thumbnail,
        author: data.author,
        duration: data.duration,
        medias: data.medias?.map((item: any) => ({
          url: item.url,
          type: item.type || 'video',
          quality: item.quality,
          label: item.label,
          width: item.width,
          height: item.height,
          ext: item.ext,
          bitrate: item.bitrate,
          fps: item.fps,
        })) || [],
      };

      setResult(transformedData);
    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch media');
    } finally {
      setLoading(false);
    }
  };

const handleDownload = async (downloadUrl: string) => {
  setIsSaving(true);
  try {
    const response = await fetch(downloadUrl, {
      headers: {
        Referer: "https://www.youtube.com/",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      },
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "video.mp4"; // Set a valid filename
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (err) {
    console.error('Download failed:', err);
    setError('Download failed. URL may be expired or restricted.');
  } finally {
    setIsSaving(false);
  }
};

  const formatDuration = (seconds: number | undefined) => {
    if (!seconds) return '';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };


  console.log(result?.thumbnail, "result");

  return (
    <div  className="bg-white dark:bg-gray-900  px-4 mt-10 ">
      <div className="max-w-5xl mx-auto sm:p-10 p-4 bg-gray-100 rounded-xl">
        <div className="flex gap-2">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste social media URL here"
            className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <button
            onClick={fetchMedia}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" strokeWidth={3} />
                Fetching...
              </>
            ) : 'Get Media'}
          </button>
        </div>

        {error && (
          <div className="p-3 mb-6 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-6 bg-transparent dark:bg-transparent rounded-xl overflow-hidden">
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Media Preview</h3>
              <div className="flex flex-col md:flex-row gap-6 mb-6">
                <div className="relative w-full md:w-1/3 aspect-square rounded-lg overflow-hidden">
                  {result?.thumbnail ? (
                    <Image
                      src={result?.thumbnail}
                      alt={result?.title || 'Media thumbnail'}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <span className="text-gray-500 dark:text-gray-400">No thumbnail available</span>
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Title</h4>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
                      {result.title || 'Untitled Media'}
                    </p>
                  </div>

                  {result.author && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Author</h4>
                      <p className="text-base text-gray-900 dark:text-white">
                        {result.author}
                      </p>
                    </div>
                  )}

                  {result.duration && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Duration</h4>
                      <p className="text-base text-gray-900 dark:text-white">
                        {formatDuration(result.duration)}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {result.medias.map((item, index) => (
                <div key={index} className="mb-6">
                  <div className="rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-800/50 p-4">
                    {item.type === 'video' && (
                      <video
                        controls
                        className="w-full rounded-lg mb-4"
                        src={item.url}
                        poster={result.thumbnail}
                      />
                    )}

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="space-y-1">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {item.label || `Quality ${index + 1}`}
                        </h4>
                        <div className="flex flex-wrap gap-2 text-sm text-gray-500 dark:text-gray-400">
                          {item.width && item.height && (
                            <span>{item.width}x{item.height}</span>
                          )}
                          {item.bitrate && (
                            <span>{Math.round(item.bitrate / 1000)}kbps</span>
                          )}
                          {item.fps && (
                            <span>{item.fps}fps</span>
                          )}
                          {item.ext && (
                            <span className="uppercase">{item.ext}</span>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => handleDownload(item.url)}
                        disabled={isSaving}
                        className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {isSaving ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" strokeWidth={3} />
                            Downloading...
                          </>
                        ) : (
                          <>
                            <ArrowDownTrayIcon className="h-5 w-5" />
                            Download {item.type === 'video' ? 'Video' : 'Image'}
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
              <p>Platform: {result.platform}</p>
              <p className="mt-1">Note: Downloaded content is for personal use only. Respect copyright laws.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}