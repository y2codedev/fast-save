'use client';

import { FaShareAlt, FaSun, FaMoon } from 'react-icons/fa';
import Link from 'next/link';
import { useTheme } from 'next-themes';

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <nav className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center space-x-2 cursor-pointer  rounded-md"
            aria-label="FastSave Home"
          >
            <span className="text-xl font-bold text-gray-800 dark:text-gray-100">
              Fast<span className="text-indigo-600 dark:text-indigo-600">Save</span>
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full text-gray-700 dark:text-white hover:text-gray-900 dark:hover:text-white bg-gray-100 hover:bg-white dark:bg-gray-800  transition-all duration-200 cursor-pointer "
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <FaSun className="h-5 w-5" aria-hidden="true" />
              ) : (
                <FaMoon className="h-5 w-5" aria-hidden="true" />
              )}
            </button>

            <button
              type="button"
              className="p-2 rounded-full text-gray-700 dark:text-white hover:text-gray-900 dark:hover:text-white bg-gray-100 hover:bg-gray-100 dark:bg-gray-800  transition-all duration-200 cursor-pointer "
              aria-label="Share this page"
            >
              <FaShareAlt className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;