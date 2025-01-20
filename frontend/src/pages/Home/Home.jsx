import React from 'react'
import Navbar from '../../components/Navbar'
import { motion } from 'framer-motion';

const Home = () => {
    return (
        <div className='min-h-screen bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-500 items-center justify-center relative overflow-hidden'>
            <Navbar />
            <div className='absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-full opacity-50 blur-2xl'></div>
            <div className='absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full opacity-50 blur-2xl'></div>
            {/* Add your home page content here */}
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5  }}
                className='text-center text-white z-10 px-8 flex flex-col items-center justify-center min-h-[calc(100vh-64px)]'
            >
                <h1 className='text-5xl font-bold mb-6 drop-shadow-lg'>
                    Welcome to Taskify
                </h1>
                <motion.p 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5  }}
                    className='text-lg mb-8'
                >
                    Organize your tasks, manage your priorities, and boost your productivity
                    with Taskify—your personalized task management app.
                </motion.p>
            </motion.div>
        </div>
    )
}

export default Home