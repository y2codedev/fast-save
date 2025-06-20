'use client';

import React from 'react';

interface LoaderProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    color?: 'white' | 'gray' | 'indigo';
}

const Loader = ({ size = 'md', color = 'white' }: LoaderProps) => {
    const sizeClasses = {
        sm: 'h-4 w-4 border-2',
        md: 'h-6 w-6 border-[3px]',
        lg: 'h-8 w-8 border-4',
        xl: 'h-10 w-10 border-[5px]'
    };

    const colorClasses = {
        white: 'border-white border-t-transparent',
        gray: 'border-gray-400 border-t-transparent',
        indigo: 'border-indigo-500 border-t-transparent'
    };

    return (
        <div
            aria-label="Loading..."
            role="status"
            className="flex items-center justify-center"
        >
            <div className={`rounded-full animate-spin ${sizeClasses[size]} ${colorClasses[color]}`} />
        </div>
    );
};

export default Loader;