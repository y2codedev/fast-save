import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';

interface ErrorAlertProps {
  error: string;
  className?: string;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ error, className = '' }) => {
  return (
    <div className={`rounded-md bg-red-100 dark:bg-red-900/20 p-4 ${className}`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationCircleIcon className="h-5 w-5 text-red-800 dark:text-red-500" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800 dark:text-red-200">Error</h3>
          <div className="mt-2 text-sm text-red-700 dark:text-red-300">
            <p>{error}</p>
          </div>
        </div>
      </div>
    </div>
  );
};