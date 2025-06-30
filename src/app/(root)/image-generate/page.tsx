import GenerateForm from '@/components/sections/GenerateForm'
import ImageCard from '@/components/sections/ImageCard'
import React from 'react'

const page = () => {
    return (
        <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        {process.env.NEXT_PUBLIC_APP_NAME || 'AI Image Generator'}
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        Transform your imagination into stunning visuals
                    </p>
                </div>

                <div className="  ">
                    <div className="">
                        <GenerateForm />
                    </div>
                    <div className='mt-10'>
                        <ImageCard />
                    </div>
                </div>
            </div>
        </main>
    )
}

export default page
