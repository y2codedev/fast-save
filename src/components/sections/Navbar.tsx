'use client';

import React, { useState, useEffect } from 'react';
import { FaShareAlt, FaSun, FaMoon } from 'react-icons/fa';
import Link from 'next/link';

type Theme = 'light' | 'dark';

const Navbar = () => {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(savedTheme || (systemPrefersDark ? 'dark' : 'light'));
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
      localStorage.setItem('theme', theme);
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };


  return (
    <header className="sticky top-0 z-50 w-full bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <nav className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md"
            aria-label="FastSave Home"
          >
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Fast<span className="text-indigo-600 dark:text-indigo-400">Save</span>
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-full  dark:text-gray-300 cursor-pointer text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
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
              className="p-2 rounded-full  cursor-pointer dark:text-gray-300 text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
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