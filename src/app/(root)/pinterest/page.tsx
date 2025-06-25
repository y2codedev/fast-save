'use client';

import { useState, ChangeEvent } from 'react';
import { Link as LinkIcon, Image as ImageIcon, Film } from 'lucide-react';
import { Button, ResetButton, Toast } from '@/constants';
import Link from 'next/link';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

type MediaItem = {
  url: string;
  type: 'image' | 'video';
  width?: number;
  height?: number;
  title?: string;
};

const PinterestDownloader = () => {
  const [pinterestUrl, setPinterestUrl] = useState('');
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const RAPIDAPI_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '5da58acae9mshaca9e06ba0032afp175489jsn9e4219e979ab';

  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPinterestUrl(e.target.value);
  };

  const fetchPinterestData = async () => {
    if (!pinterestUrl) {
      Toast('error', 'Please enter a Pinterest URL');
      return;
    }

    setIsLoading(true);
    setMediaItems([]);

    try {
      const encodedUrl = encodeURIComponent(pinterestUrl);
      const response = await fetch(
        `https://pinterest-video-and-image-downloader.p.rapidapi.com/pinterest?url=${encodedUrl}`,
        {
          method: 'GET',
          headers: {
            'x-rapidapi-host': 'pinterest-video-and-image-downloader.p.rapidapi.com',
            'x-rapidapi-key': RAPIDAPI_KEY,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      const items: MediaItem[] = [];

      if (data.success && data.data?.url) {
        items.push({
          url: data.data.url,
          type: data.type === 'video' ? 'video' : 'image',
          width: data.data.width,
          height: data.data.height,
          title: data.data.title
        });
      } else if (data.images && Array.isArray(data.images)) {
        data.images.forEach((url: string) => {
          items.push({ url, type: 'image' });
        });
      } else if (data.videos && Array.isArray(data.videos)) {
        data.videos.forEach((url: string) => {
          items.push({ url, type: 'video' });
        });
      }

      if (items.length === 0) {
        throw new Error('No media found at this URL');
      }

      setMediaItems(items);
    } catch (err) {
      console.error('Pinterest download failed:', err);
      Toast("error", err instanceof Error ? err.message : 'Failed to fetch Pinterest content');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setPinterestUrl('');
    setMediaItems([]);
  };

  // const getFileNameFromUrl = (url: string, type: 'image' | 'video') => {
  //   try {
  //     const urlObj = new URL(url);
  //     const pathParts = urlObj.pathname.split('/');
  //     const lastPart = pathParts[pathParts.length - 1];
  //     const cleanName = lastPart.split('?')[0].split('#')[0];

  //     if (cleanName) {
  //       return `${cleanName}.${type === 'image' ? 'jpg' : 'mp4'}`;
  //     }
  //   } catch (e) {
  //     console.warn('Could not parse URL for filename', e);
  //   }

  //   return `pinterest-${type}-${Date.now()}.${type === 'image' ? 'jpg' : 'mp4'}`;
  // };

  return (
    <div className="bg-white dark:bg-gray-900  px-4  ">
      <div className='pt-10'>
        <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-gray-100 dark:bg-gray-800 rounded-xl">
          <div className="">
            <div className="flex flex-col space-y-2">
              <label htmlFor="pinterest-url" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Pinterest URL
              </label>
              <div className="flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                  <LinkIcon className="h-5 w-5" />
                </span>
                <input
                  type="url"
                  id="pinterest-url"
                  value={pinterestUrl}
                  onChange={handleUrlChange}
                  placeholder="https://www.pinterest.com/pin/123456789/"
                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  disabled={isLoading}
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Works with pins, boards, and profile URLs
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            <Button
              onClick={fetchPinterestData}
              isProcessing={isLoading}
              labal='Fetch Media'
            />

            {pinterestUrl && (
              <ResetButton
                onClick={resetForm}
                isProcessing={isLoading}
                labal='Reset'
              />
            )}
          </div>

          {mediaItems.length > 0 && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Downloadable Media
                </h2>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {mediaItems.length} item{mediaItems.length !== 1 ? 's' : ''} found
                </span>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {mediaItems?.map((item, index) => (
                  <div
                    key={`${index}`}
                    className="bg-white dark:bg-gray-800 rounded-lg  overflow-hidden border border-gray-200 dark:border-gray-600"
                  >
                    <div className="p-4">
                      {item.title && (
                        <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2 line-clamp-2">
                          {item.title}
                        </h3>
                      )}
                      <div className="relative">
                        {item.type === 'image' ? (
                          <div className="flex justify-center bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden">
                            <img
                              src={item.url}
                              alt={item.title || `Pinterest image ${index + 1}`}
                              className="max-h-96 object-contain"
                              loading="lazy"
                            />
                          </div>
                        ) : (
                          <div className="flex justify-center bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden">
                            <video
                              src={item.url}
                              className="max-h-96"
                              controls
                              playsInline
                            />
                          </div>
                        )}
                      </div>
                      <div className="mt-4 flex justify-between items-center">
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          {item.type === 'image' ? (
                            <ImageIcon className="h-4 w-4 mr-1" />
                          ) : (
                            <Film className="h-4 w-4 mr-1" />
                          )}
                          <span>{item.type.toUpperCase()}</span>
                          {item.width && item.height && (
                            <span className="ml-2">
                              {item.width}×{item.height}
                            </span>
                          )}
                        </div>

                        <Link
                          href={item.url}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                        >
                          <ArrowDownTrayIcon className="h-5 w-5 mr-2" />  Download
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {mediaItems.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <div className="mx-auto h-24 w-24 text-gray-400 dark:text-gray-500">
                <LinkIcon className="w-full h-full" />
              </div>
              <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
                No media fetched yet
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Enter a Pinterest URL and click "Fetch Media" to get started
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PinterestDownloader;