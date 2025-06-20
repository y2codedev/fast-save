'use client';

import React from 'react';

const Loader = () => {
    return (
        <div className="relative w-[24px] h-[24px]">
            {[...Array(12)]?.map((_, i) => (
                <div
                    key={i}
                    className="absolute w-[8%] h-[24%] bg-white left-1/2 top-[33%] opacity-0 rounded-full "
                    style={{
                        transform: `rotate(${i * 30}deg) translate(0, -130%)`,
                        animation: `fade458 1s linear ${-(1.1 - (i * 0.1))}s infinite`,
                    }}
                />
            ))}
            <style jsx>{`
            @keyframes fade458 {
            from { opacity: 1; }
            to { opacity: 0.25; }
            }
      `}</style>
        </div>
    );
};

export default Loader;