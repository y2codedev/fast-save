'use client';

import { useState } from 'react';
import { ReelResult, Toast, Button, InputField } from '@/constants';

export default function DownloadForm() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [downloadData, setDownloadData] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
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
      setUrl('');

    } catch (err) {
      console.error('Download error:', err);
      Toast('error', err instanceof Error ? err.message : 'Failed to fetch video. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="download-section" className="bg-white dark:bg-gray-900  pt-10  px-4 ">
      <div className="mx-auto max-w-7xl ">
        <div className="mx-auto max-w-4xl rounded-3xl bg-gray-50 shadow-sm dark:bg-gray-800 p-6 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <InputField
                label='Enter Instagram Reel URL'
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://www.instagram.com/reel/..."
              />
            </div>
            <Button
              isProcessing={isLoading}
              labal='Download Now'
            />
          </form>
          {downloadData && <ReelResult data={downloadData} isSaving={isSaving} setIsSaving={setIsSaving} />}
        </div>
      </div>
    </div>
  );
}