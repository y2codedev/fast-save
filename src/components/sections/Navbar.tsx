'use client';

import React from 'react';
// import { FaShareAlt } from 'react-icons/fa';
import Link from 'next/link';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-gray-50  border-b border-gray-200">
      <nav className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center space-x-2"
            aria-label="FastSave Home"
          >
            <span className="text-xl font-bold text-gray-900">
              Fast<span className="text-indigo-600">Save</span>
            </span>
          </Link>

          <div className="flex items-center space-x-6">
            <button
              type="button"
              className="p-2 text-gray-900 font-bold cursor-pointer hover:text-gray-900 transition-colors"
              aria-label="Share"
            >
              Login
              {/* <FaShareAlt className="h-5 w-5" /> */}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;