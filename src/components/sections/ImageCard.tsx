'use client';

import { useEffect, useState } from 'react';

export default function ImageCard() {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchLatestImage = async () => {
            try {
                const response = await fetch('/api/generate/latest');
                if (response.ok) {
                    const data = await response.json();
                    setImageUrl(data.imageUrl);
                }
            } catch (error) {
                console.error('Failed to fetch latest image:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchLatestImage();
    }, []);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-96 rounded-xl bg-gray-100 dark:bg-gray-700 animate-pulse">
                <div className="text-gray-500 dark:text-gray-300">Loading artwork...</div>
            </div>
        );
    }

    if (!imageUrl) {
        return (
            <div className="flex flex-col items-center justify-center h-96 rounded-xl bg-gray-100 dark:bg-gray-800 p-6 text-center">
                <div className="w-16 h-16 mb-4 text-gray-400 dark:text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">No artwork generated yet</h3>
                <p className="text-gray-500 dark:text-gray-400">Create your first masterpiece by entering a prompt above</p>
            </div>
        );
    }

    return (
        <div className="rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 transition-colors duration-300">
            <div className="relative aspect-square">
                <img
                    src={imageUrl}
                    alt="Generated AI art"
                    className="w-full h-full object-cover"
                    onLoad={() => setIsLoading(false)}
                />
            </div>
            <div className="p-4 flex justify-end">
                <a
                    href={imageUrl}
                    download="ai-generated-image.png"
                    className="inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                >
                    <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download
                </a>
            </div>
        </div>
    );
}