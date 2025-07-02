'use client';

import { useRef, useState } from 'react';
import ImageTracer from 'imagetracerjs';
import { Button, Loader } from '@/constants';

export default function ImageToSVG() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [svg, setSvg] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showCode, setShowCode] = useState<boolean>(false);

  const handleFile = (file: File) => {
    setLoading(true);
    setError(null);
    setSvg(null);
    setPreview(null);

    const reader = new FileReader();

    reader.onload = () => {
      try {
        const img = new Image();
        img.src = reader.result as string;

        img.onload = () => {
          const canvas = canvasRef.current!;
          canvas.width = img.width;
          canvas.height = img.height;

          const ctx = canvas.getContext('2d')!;
          ctx.drawImage(img, 0, 0);

          const imageData = ctx.getImageData(0, 0, img.width, img.height);
          const svgString = ImageTracer.imagedataToSVG(imageData, {
            numberofcolors: 8,
            strokewidth: 1,
            scale: 1,
          });

          setSvg(svgString);
          setPreview(img.src);
          setLoading(false);
        };

        img.onerror = () => {
          throw new Error('Failed to load image.');
        };
      } catch (err: any) {
        setError('Failed to convert image to SVG.');
        setLoading(false);
      }
    };

    reader.onerror = () => {
      setError('Failed to read the image file.');
      setLoading(false);
    };

    reader.readAsDataURL(file);
  };

  const handleDownload = () => {
    if (!svg) return;

    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');

    a.href = url;
    a.download = 'converted-image.svg';
    a.click();

    URL.revokeObjectURL(url);
  };

  const handleCopyCode = () => {
    if (!svg) return;

    navigator.clipboard.writeText(svg);
    setShowCode(true);

    setTimeout(() => {
      setShowCode(false);
    }, 2000);
  }

  return (
    <div className=" mx-auto  bg-transparent dark:bg-gray-800 ">
      <h1 className="font-medium text-sm sm:text-lg text-gray-700  dark:text-gray-300 mb-6">Image to SVG Converter</h1>

      {error && (
        <div className="mb-6 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300">
          {error}
        </div>
      )}

      <div className="mb-6">
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed dark:hover:border-indigo-600 hover:border-indigo-600 border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-800  transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">PNG or JPG (MAX. 5MB)</p>
          </div>
          <input
            type="file"
            accept="image/png, image/jpeg"
            disabled={loading}
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFile(e.target.files[0]);
              }
            }}
            className="hidden"
          />
        </label>
      </div>

      {preview && (
        <div className="mb-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h2 className="font-medium text-sm sm:text-lg text-gray-700  dark:text-gray-300 mb-3">Original Image Preview</h2>
          <div className="">
            <img
              src={preview}
              alt="Preview"
              className="max-w-full h-auto max-h-64 rounded-lg"
            />
          </div>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />

      {loading && (
        <div className="flex flex-col items-center justify-center py-8">
          <Loader />
          <span className="text-gray-600 dark:text-gray-400">Converting to SVG...</span>
        </div>
      )}

      {svg && !loading && (
        <div className="mt-8">
          <h2 className="font-medium text-sm sm:text-lg text-gray-700  dark:text-gray-300 mb-4">SVG Output</h2>


          <div className="mb-6 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
            <div
              dangerouslySetInnerHTML={{ __html: svg }}
              className="mx-auto flex justify-center"
            />
          </div>

          <div className="flex  sm:justify-end justify-between gap-4 items-center mb-4">
            <Button
              onClick={handleDownload}
              icon={true}
              labal='Download'
            />

            <button
              onClick={() => setShowCode(!showCode)}
              className="px-5 py-2 bg-gray-200 text-sm font-medium rounded-[8px]  dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white  transition-all"
            >
              {showCode ? 'Hide Code' : 'Show Code'}
            </button>
          </div>

          {showCode && (
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm sm:text-xl text-gray-700 dark:text-gray-300">SVG Code</h3>
                <button
                  onClick={handleCopyCode}
                  className="text-sm px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg"
                >
                  Copy Code
                </button>
              </div>
              <pre className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm p-4 rounded-lg overflow-x-auto max-h-96 border border-gray-200 dark:border-gray-700">
                {svg}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
