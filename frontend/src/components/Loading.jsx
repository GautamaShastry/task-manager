import React from 'react'

const Loading = () => {
    return (
        <div className='flex justify-center items-center h-screen bg-purple-200'>
            <div className='flex flex-col items-center'>
                <div className='loader w-16 h-16 border-2 border-t-4 border-purple-500 rounded-full animate-spin'></div>
                <p className='text-indigo-600 text-lg font-semibold mt-4'>Loading...</p>
            </div>
            
        </div>
    )
}

export default Loading