'use client';

import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { Loader } from '@/constants';
import { ReelResultProps } from '@/constants/types';

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
        <div className="mt-4">
            <button
                onClick={handleDownload}
                disabled={isSaving}
                className="flex items-center cursor-pointer justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 text-white shadow-sm transition-all hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-indigo-800 disabled:opacity-75 disabled:cursor-not-allowed"
            >
                {isSaving ? (
                    <div className='flex items-center justify-center gap-2'>
                        <Loader />
                        <span>Saving...</span>
                    </div>
                ) : (
                    <div className='flex items-center justify-center gap-2'>
                        <ArrowDownTrayIcon className="h-5 w-5" />
                        <span>Click Here To Save</span>
                    </div>
                )}
            </button>
        </div>
    );
}