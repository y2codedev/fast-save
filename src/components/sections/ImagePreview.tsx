import React from 'react';

interface ImagePreviewProps {
    imageSrc: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ imageSrc }) => {
    return (
        <div className="mb-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h2 className="font-medium text-sm sm:text-lg text-gray-700 dark:text-gray-300 mb-3">
                Original Image Preview
            </h2>
            <div className="">
                <img
                    src={imageSrc}
                    alt="Preview"
                    className="max-w-full h-auto max-h-64 rounded-lg"
                />
            </div>
        </div>
    );
};

export default ImagePreview;