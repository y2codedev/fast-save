'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from './Button';

export default function GenerateForm() {
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim()) {
            setError('Please enter a prompt');
            return;
        }

        setIsGenerating(true);
        setError('');

        try {
            const response = await fetch('/api/image-generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate image');
            }

            router.refresh();

        } catch (err) {
            setError('Failed to generate image. Please try again.');
            console.error(err);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="w-full  p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800 transition-colors duration-300">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label
                        htmlFor="prompt"
                        className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
                    >
                        Describe your vision
                    </label>
                    <textarea
                        id="prompt"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg  bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-300 transition-colors duration-300"
                        placeholder="A futuristic city at night, cyberpunk style..."
                    />
                </div>

                {error && (
                    <div className="text-red-500 text-sm dark:text-red-400">{error}</div>
                )}

                <Button
                    isProcessing={isGenerating}
                    labal='Create Artwork'
                />
            </form>
        </div>
    );
}