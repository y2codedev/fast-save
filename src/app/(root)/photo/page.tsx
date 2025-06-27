import Dropzone from '@/components/image-converter/dropzone'
import React from 'react'

const page = () => {
    return (
        <div className="bg-white dark:bg-gray-900  px-4 pt-10 ">
            <div className="max-w-5xl mx-auto p-4 md:p-6 bg-gray-100 dark:bg-gray-800 rounded-xl ">
                <p className="sm:text-xl text-sm  text-gray-900 dark:text-white mb-6">Free Unlimited File Converter</p>
                <Dropzone />
            </div>
        </div>
    )
}

export default page
