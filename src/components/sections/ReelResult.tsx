'use client';

import { Button } from '@/constants';
import { ReelResultProps } from '@/constants/types';
import Image from 'next/image';

export default function ReelResult({ data, isSaving, setIsSaving }: ReelResultProps) {

    const handleDownload = async () => {
        try {
            setIsSaving(true);
            const response = await fetch(data?.video_url);
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = `${data.title || 'instagram-reel'}.mp4`;
            document.body.appendChild(link);
            link.click();
            window.URL.revokeObjectURL(blobUrl);
            document.body.removeChild(link);
        } catch (error) {
            console.error('Download failed:', error);
            alert('Download failed. Please try again or check the URL.');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="mt-6 bg-transparent dark:bg-transparent rounded-xl  overflow-hidden">
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Preview</h3>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative w-full md:w-1/3 aspect-square rounded-lg overflow-hidden">
                        {data.thumbnail ? (
                            <Image
                                src={data.thumbnail}
                                alt={data.title || 'Instagram Reel'}
                                fill
                                className="object-cover"
                                unoptimized
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                <span className="text-gray-500">No thumbnail available</span>
                            </div>
                        )}
                    </div>

                    <div className="flex-1 space-y-3">
                        <div>
                            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Title</h4>
                            <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                {data.title || 'Untitled Reel'}
                            </p>
                        </div>
                    </div>
                </div>

                {data.video_url && (
                    <div className="mt-4 rounded-xl overflow-hidden h-80">
                        <video
                            controls
                            className="w-full h-full object-cover rounded-lg"
                            poster={data.thumbnail}
                        >
                            <source src={data.video_url} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                )}
            </div>

            <div className=" px-4  sm:px-4 flex justify-end">
                <Button
                    onClick={handleDownload}
                    isProcessing={isSaving}
                    labal='Download Reel'
                    icon={true}
                />
            </div>
        </div>
    );
}