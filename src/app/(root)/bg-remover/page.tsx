'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { Loader2, UploadCloud, Link, Image as ImageIcon } from 'lucide-react';
import { useAppToast } from '@/hooks/use-app-toast';

const BackgroundRemover = () => {
  const [mode, setMode] = useState<'upload' | 'url'>('upload');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [resultImage, setResultImage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showSuccess, showError, showWarning } = useAppToast();

  const RAPIDAPI_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '5da58acae9mshaca9e06ba0032afp175489jsn9e4219e979ab';

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImageUrl('');
    }
  };

  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
    setImageFile(null);
  };

  const removeBackground = async () => {
    if ((mode === 'upload' && !imageFile) || (mode === 'url' && !imageUrl)) {
      showWarning(mode === 'upload' ? 'Please select an image file' : 'Please enter a valid image URL');
      return;
    }

    setIsProcessing(true);
    setResultImage('');

    try {
      let body: FormData | URLSearchParams;
      const headers: Record<string, string> = {
        'x-rapidapi-host': 'remove-background18.p.rapidapi.com',
        'x-rapidapi-key': RAPIDAPI_KEY,
      };

      if (mode === 'upload' && imageFile) {
        body = new FormData();
        body.append('image_file', imageFile);
      } else {
        body = new URLSearchParams();
        body.append('image_url', imageUrl);
        headers['Content-Type'] = 'application/x-www-form-urlencoded';
      }

      const response = await fetch(
        'https://remove-background18.p.rapidapi.com/public/remove-background',
        {
          method: 'POST',
          headers,
          body,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `API error: ${response.status}`);
      }

      const data = await response.json();
      const resultUrl = data.url || (data.result && data.result.image_url);

      if (!resultUrl) {
        throw new Error('No result image URL returned from API');
      }

      setResultImage(resultUrl);
      showSuccess('Background removed successfully!');
    } catch (error) {
      console.error('Background removal failed:', error);
      showError(error instanceof Error ? error.message : 'Failed to remove background');
    } finally {
      setIsProcessing(false);
    }
  };

  const resetForm = () => {
    setImageFile(null);
    setImageUrl('');
    setResultImage('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className='min-h-screen w-full p-4 bg-white dark:bg-gray-900 flex items-center justify-center py-10'>
      <div className="max-w-7xl mx-auto p-4 md:p-6 bg-gray-100 dark:bg-gray-800 rounded-xl ">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Background Remover</h2>

        <div className="flex mb-6 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setMode('upload')}
            className={`flex-1 py-2 font-medium text-center ${mode === 'upload' ? 'text-indigo-600 border-b-2 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400' : 'text-gray-500 dark:text-gray-400'}`}
          >
            <UploadCloud className="inline-block mr-2 h-5 w-5" />
            Upload Image
          </button>
          <button
            onClick={() => setMode('url')}
            className={`flex-1 py-2 font-medium text-center ${mode === 'url' ? 'text-indigo-600 border-b-2 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400' : 'text-gray-500 dark:text-gray-400'}`}
          >
            <Link className="inline-block mr-2 h-5 w-5" />
            Image URL
          </button>
        </div>

        <div className="mb-6">
          {mode === 'upload' ? (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select an image file
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="flex-1 cursor-pointer rounded-md border-2 border-dashed border-gray-300 dark:border-gray-600 px-6 py-10 text-center hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors"
                >
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <UploadCloud className="h-12 w-12 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {imageFile ? imageFile.name : 'Click to select an image file'}
                    </span>
                  </div>
                </label>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <label htmlFor="image-url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Enter image URL
              </label>
              <div className="flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                  <Link className="h-5 w-5" />
                </span>
                <input
                  type="url"
                  id="image-url"
                  value={imageUrl}
                  onChange={handleUrlChange}
                  placeholder="https://example.com/image.jpg"
                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                />
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Original</h3>
            <div className="relative aspect-square bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
              {(mode === 'upload' && imageFile) ? (
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="Original"
                  className="object-contain w-full h-full"
                />
              ) : (mode === 'url' && imageUrl) ? (
                <img
                  src={imageUrl}
                  alt="Original"
                  className="object-contain w-full h-full"
                  onError={() => showError('Failed to load image from URL')}
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <ImageIcon className="h-12 w-12 mb-2" />
                  <span>No image selected</span>
                </div>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Result</h3>
            <div className="relative aspect-square bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
              {resultImage ? (
                <img
                  src={resultImage}
                  alt="Background removed"
                  className="object-contain w-full h-full"
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  {isProcessing ? (
                    <div className='flex items-center gap-2'>
                     <Loader2 className="h-4 w-4 animate-spin" strokeWidth={3} />
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <>
                      <ImageIcon className="h-12 w-12 mb-2" />
                      <span>Result will appear here</span>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={removeBackground}
            disabled={isProcessing || (mode === 'upload' ? !imageFile : !imageUrl)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <div className='flex items-center gap-2'>
                <Loader2 className="h-4 w-4 animate-spin" strokeWidth={3} />
                Processing...
              </div>
            ) : (
              'Remove Background'
            )}
          </button>

          {(imageFile || imageUrl) && (
            <button
              onClick={resetForm}
              disabled={isProcessing}
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700  disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Reset
            </button>
          )}

          {resultImage && (
            <a
              href={resultImage}
              download="background-removed.png"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
            >
              Download Result
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default BackgroundRemover