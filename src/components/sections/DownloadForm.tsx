'use client';

import { useState } from 'react';
import { ReelResult, Toast, InputField, Button } from '@/constants';
import { downloadVideo } from '@/app/actions/download';

export default function DownloadClient() {
  const [url, setUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [downloadData, setDownloadData] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!url.trim()) {
      Toast('error', 'Please enter a valid URL');
      return;
    }

    setIsLoading(true);

    try {
      
      const formData = new FormData();
      formData.append('url', url);
      const data = await downloadVideo(formData);
      setDownloadData(data);
      setUrl('');

    } catch (error) {
      Toast(
        'error',
        error instanceof Error ? error.message : 'Download failed. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 pt-10 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl rounded-3xl bg-gray-50 shadow-sm dark:bg-gray-800 p-6 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              label="Instagram Reel URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.instagram.com/reel/..."
            />
            <Button
              labal="Download Now"
              isProcessing={isLoading}
            />
            {downloadData && (
              <ReelResult
                data={downloadData}
                isSaving={false}
                setIsSaving={() => { }}
              />
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
