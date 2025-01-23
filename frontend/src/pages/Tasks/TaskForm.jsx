import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import useTasks from '../../hooks/useTasks'

const TaskForm = () => {
    const { createTask, loading } = useTasks();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'Pending',
        dueDate: '',
        priority: 'Low'
    });
    const handleInputChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createTask(formData);
            setFormData({ title: '', description: '', status: 'Pending', dueDate: '', priority: 'Low'  });
        } catch (error) {
            toast.error("Failed to create task. Please try again later.");
        }
    }
    return (
        <div className='min-h-screen bg-purple-200'>
            <Navbar />
            <div className='container mx-auto py-10 px-6'>
                <div className='bg-white shadow-md rounded-lg p-8 max-w-3xl mx-auto'>
                    <h1 className='flex text-3xl font-bold text-gray-800 mb-6 items-center justify-center'>Create Task</h1>
                    {/* TASK FORM */}
                    <form onSubmit={handleSubmit}>
                        <div className='mb-4'>
                            <label className='block text-gray-700 font-medium mb-2 text-lg'>Title</label>
                            <input 
                                type="text"
                                placeholder='Task Title...'
                                name='title'
                                value={formData.title}
                                onChange={handleInputChange}
                                className='w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500' 
                                required
                            />
                        </div>
                        <div className='mb-4'>
                            <label className='block text-gray-700 font-medium mb-2 text-lg'>Description</label>
                            <textarea 
                                name='description'
                                placeholder='Task Description...'
                                value={formData.description}
                                onChange={handleInputChange}
                                className='w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                                required 
                            ></textarea>
                        </div>
                        <div className='mb-4'>
                            <label className='block text-gray-700 font-medium mb-2 text-lg'>Status</label>
                            <select 
                                name='status'
                                value={formData.status}
                                onChange={handleInputChange}
                                className='w-full cursor-pointer border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500' 
                            >
                                <option value='Pending'>Pending</option>
                                <option value='In Progress'>In Progress</option>
                                <option value='Completed'>Completed</option>
                            </select>
                        </div>
                        <div className='mb-4'>
                            <label className='block text-gray-700 font-medium mb-2 text-lg'>Due Date</label>
                            <input 
                                type="date"
                                name='dueDate'
                                placeholder='mm-dd-yyyy'
                                value={formData.dueDate}
                                onChange={handleInputChange}
                                className='w-full cursor-pointer border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                            />
                        </div>
                        <div className='mb-4'>
                            <label className='block text-gray-700 font-medium mb-2 text-lg'>Priority</label>
                            <select 
                                name='priority'
                                value={formData.priority}
                                onChange={handleInputChange}
                                className='w-full border cursor-pointer border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500' 
                            >
                                <option value='Low'>Low</option>
                                <option value='Medium'>Medium</option>
                                <option value='High'>High</option>
                            </select>
                        </div>
                        <div className='mt-6 flex space-x-4'>
                            <button type='submit' className={`bg-indigo-600 text-white py-2 px-4 rounded-lg hover:text-gray-800 hover:bg-gray-200 border-2 border-transparent hover:border-purple-700 transition`}>
                                {loading? (
                                    <div className="flex items-center justify-center">
                                        <span className="loader w-5 h-5 border-2 border-t-2 border-white rounded-full animate-spin mr-2"></span>
                                        Creating...
                                    </div>
                                ) : (
                                    "Create Task"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default TaskForm