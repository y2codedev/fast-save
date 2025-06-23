'use client';

import { ToastContainer, toast, ToastOptions } from 'react-toastify';
import { createContext, useContext } from 'react';
import 'react-toastify/dist/ReactToastify.css';

type ToastContextType = {
  toast: typeof toast;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="!w-auto !max-w-[90vw]"
        toastClassName={() => 
          "relative flex p-4 min-h-10 rounded-lg justify-between overflow-hidden cursor-pointer shadow-lg mb-2"
        }
      />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};