"use client";

import { FiUpload } from "react-icons/fi";

interface FileUploaderProps {
  videoFile: File | null;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function FileUploader({ videoFile, handleFileChange }: FileUploaderProps) {
  return (
    <div className="mb-6">
      <label className="block sm:text-sm text-xs font-medium text-gray-700 dark:text-gray-300 mb-3">
        Select Video File
      </label>
      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 sm:p-10 text-center transition-colors duration-200 hover:border-indigo-500 dark:hover:border-indigo-400 bg-gray-50 dark:bg-gray-700/50">
        <input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          className="hidden"
          id="video-upload"
        />
        <label htmlFor="video-upload" className="cursor-pointer flex flex-col items-center justify-center space-y-3">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
            <FiUpload className="text-xl sm:text-2xl text-indigo-600 dark:text-indigo-400" />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {videoFile ? (
              <span className="font-medium text-indigo-600 dark:text-indigo-400 truncate max-w-xs">{videoFile?.name?.slice(0,35)}...</span>
            ) : (
              <>
                <span className="font-medium text-gray-700 dark:text-gray-300">Drag & drop files or</span>{' '}
                <span className="text-indigo-600 dark:text-indigo-400 underline">browse</span>
              </>
            )}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            MP4, WebM, AVI, MOV (Max 100MB)
          </p>
        </label>
      </div>
    </div>
  );
}