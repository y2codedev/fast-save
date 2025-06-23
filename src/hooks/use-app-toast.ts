'use client';

import { useToast } from '../lib/toast-context';
import { ToastOptions } from 'react-toastify';

export const useAppToast = () => {
  const { toast } = useToast();

  const showToast = (message: string, options?: ToastOptions) => {
    toast(message, {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      ...options,
    });
  };

  const showSuccess = (message: string, options?: ToastOptions) => {
    toast.success(message, {
      className: 'bg-green-50 text-green-800 border border-green-200',
      ...options,
    });
  };

  const showError = (message: string, options?: ToastOptions) => {
    toast.error(message, {
      className: 'bg-red-50 text-red-800 border border-red-200',
      autoClose: 5000,
      ...options,
    });
  };

  const showWarning = (message: string, options?: ToastOptions) => {
    toast.warning(message, {
      className: 'bg-yellow-50 text-yellow-800 border border-yellow-200',
      ...options,
    });
  };

  const showInfo = (message: string, options?: ToastOptions) => {
    toast.info(message, {
      className: 'bg-blue-50 text-blue-800 border border-blue-200',
      ...options,
    });
  };

  return {
    showToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
};