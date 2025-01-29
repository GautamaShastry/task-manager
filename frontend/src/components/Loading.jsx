import React from 'react'

const Loading = () => {
    return (
        <div className='flex justify-center items-center h-screen bg-purple-200'>
            <div className='flex flex-col items-center'>
                <div className='w-12 h-12 sm:w-16 sm:h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin'></div>
                <p className='text-indigo-600 text-lg font-semibold mt-4 animate-pulse'>Loading...</p>
            </div>
            
        </div>
    )
}

export default Loading