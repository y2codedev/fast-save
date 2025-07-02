import React from 'react';
import { Button } from '@/constants';

interface SVGOutputProps {
  svg: string;
  showCode: boolean;
  onDownload: () => void;
  onToggleCode: () => void;
  onCopyCode: () => void;
}

const SVGOutput: React.FC<SVGOutputProps> = ({ 
  svg, 
  showCode, 
  onDownload, 
  onToggleCode, 
  onCopyCode 
}) => {
  return (
    <div className="mt-8">
      <h2 className="font-medium text-sm sm:text-lg text-gray-700 dark:text-gray-300 mb-4">
        SVG Output
      </h2>

      <div className="mb-6 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
        <div
          dangerouslySetInnerHTML={{ __html: svg }}
          className="mx-auto flex justify-center"
        />
      </div>

      <div className="flex sm:justify-end justify-between gap-4 items-center mb-4">
        <Button
          onClick={onDownload}
          icon={true}
          labal='Download'
        />

        <button
          onClick={onToggleCode}
          className="px-5 py-2 bg-gray-200 text-sm font-medium rounded-[8px] dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white transition-all"
        >
          {showCode ? 'Hide Code' : 'Show Code'}
        </button>
      </div>

      {showCode && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm sm:text-xl text-gray-700 dark:text-gray-300">SVG Code</h3>
            <button
              onClick={onCopyCode}
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
  );
};

export default SVGOutput;