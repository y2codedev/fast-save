'use client';

import React from 'react'

const Loader = () => {
    return (
        <div className='flex items-center justify-center h-screen'>
            <div className='h-6 w-6 animate-spin border-t-2 border-blue-600 rounded-full'></div>
        </div>
    )
}

export default Loader
