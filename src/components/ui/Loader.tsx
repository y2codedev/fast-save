'use client';

import React from 'react';

interface LoaderProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    color?: string;
}

const Loader = ({ size = 'md', color = 'white' }: LoaderProps) => {
    const sizeClasses = {
        sm: 'h-6 w-6',
        md: 'h-6 w-6',
        lg: 'h-6 w-6',
        xl: 'h-6 w-6'
    };

    return (
        <div
            aria-label="Loading..."
            role="status"
            className="flex items-center justify-center"
        >
            <svg
                className={`animate-spin stroke-${color} ${sizeClasses[size]}`}
                viewBox="0 0 256 256"
            >
                {[...Array(8)].map((_, i) => {
                    const angle = (i * 45) + 22.5;
                    const x1 = 128 + Math.cos((angle - 90) * Math.PI / 180) * 96;
                    const y1 = 128 + Math.sin((angle - 90) * Math.PI / 180) * 96;
                    const x2 = 128 + Math.cos((angle - 90) * Math.PI / 180) * 64;
                    const y2 = 128 + Math.sin((angle - 90) * Math.PI / 180) * 64;

                    return (
                        <line
                            key={i}
                            x1={x1}
                            y1={y1}
                            x2={x2}
                            y2={y2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="20"
                        />
                    );
                })}
            </svg>
        </div>
    );
};

export default Loader;