import { CheckCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';

interface SuccessAlertProps {
  message?: string;
  className?: string;
}

export const SuccessAlert: React.FC<SuccessAlertProps> = ({
  message = 'Your download will start shortly.',
  className = '',
}) => {
  return (
    <div className={`rounded-md bg-green-50 dark:bg-green-900/20 p-4 ${className}`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <CheckCircleIcon className="h-5 w-5 text-green-400 dark:text-green-300" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-green-800 dark:text-green-200">Success!</h3>
          <div className="mt-2 text-sm text-green-700 dark:text-green-300">
            <p>
              {message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};