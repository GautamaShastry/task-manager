import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { useNavigate, useParams } from 'react-router-dom'
import useTasks from '../../hooks/useTasks';

const TaskList = () => {
    const { id } = useParams();
    const { getTaskById, updateTask, deleteTask, loading, getTasks, task } = useTasks();
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: '',
        dueDate: '',
        priority: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        getTaskById(id);
    }, [id]);

    useEffect(() => {
        if(task){
            setFormData({
                title: task.title,
                description: task.description,
                status: task.status,
                dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
                priority: task.priority
            });
        }
    }, [task]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleUpdate = async () => {
        await updateTask(id, formData);
        getTaskById(id); //re-render the updated task
        setEditMode(false);
    }

    const handleDelete = () => {
        deleteTask(id);
        navigate("/my-tasks");
    }

    return (
        <div className='min-h-screen bg-purple-200'>
            <Navbar />
            <div className="container mx-auto px-6 py-10 cursor-pointer">
                {loading ? (
                    <p className="text-center text-gray-600">Loading Task...</p>
                ) : task ? (
                    <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto">
                        {editMode ? (
                            <div>
                                <div className='mb-4'>
                                    <label className='block text-gray-700 font-semibold mb-2 text-lg'>Title</label>
                                    <input 
                                        type="text" 
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        className="w-full border-2 border-gray-300 rounded-lg py-2 px-4 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-600"
                                    />
                                </div>
                                <div className="mb-4">
                                    
                                    <label className='block text-gray-700 font-semibold mb-2 text-lg'>Description</label>
                                    <textarea 
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        className="w-full border-2 border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-600"
                                    />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-2">
                                    <div className="flex gap-10 mt-4">
                                        <div>
                                            
                                            <label className='block text-gray-700 font-semibold mb-2 text-lg'>Due Date</label>
                                            <input 
                                                type="date" 
                                                name="dueDate"
                                                value={formData.dueDate}
                                                onChange={handleChange}
                                                className="border-2 border-gray-300 rounded-lg py-2 px-4 focus:ring-2 focus:ring-indigo-500 hover:border-indigo-600 cursor-pointer"
                                            />
                                        </div>
                                        <div>
                                            
                                            <label className='block text-gray-700 font-semibold mb-2 text-lg'>Status</label>
                                            <select 
                                                name="status"
                                                value={formData.status}
                                                onChange={handleChange}
                                                className="border-2 border-gray-300 rounded-lg py-2 px-4 focus:ring-2 focus:ring-indigo-500 hover:border-indigo-600 cursor-pointer"
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="In Progress">In Progress</option>
                                                <option value="Completed">Completed</option>
                                            </select>
                                        </div>
                                        <div>
                                            
                                            <label className='block text-gray-700 font-semibold mb-2 text-lg'>Priority</label>
                                            <select 
                                                name="priority"
                                                value={formData.priority}
                                                onChange={handleChange}
                                                className="border-2 border-gray-300 rounded-lg py-2 px-4 focus:ring-2 focus:ring-indigo-500 hover:border-indigo-600 cursor-pointer"
                                            >
                                                <option value="Low">Low</option>
                                                <option value="Medium">Medium</option>
                                                <option value="High">High</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className='mt-8 flex justify-start space-x-4 gap-8'>
                                        <button 
                                            onClick={handleUpdate}
                                            className="px-6 py-2 border-2 border-transparent bg-purple-700 text-white rounded-lg hover:bg-gray-100 hover:text-gray-800 hover:border-purple-700 transition"
                                        >
                                            Update
                                        </button>
                                        <button 
                                            onClick={() => setEditMode(false)}
                                            className="bg-red-500 text-white px-4 py-2 border-2 border-transparent hover:bg-gray-100 hover:text-gray-800 hover:border-red-500 rounded-lg transition"
                                        >
                                            Cancel
                                        </button>
                                </div>
                                
                            </div>
                        ) : (
                            
                            <div>
                                <div>
                                    <h2 className='text-3xl font-bold text-purple-700 mb-3'>{task.title}</h2>
                                    <p className='text-gray-600 text-lg mb-6'>{task.description}</p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t pt-4">
                                        <p className='text-lg'><strong>Status: </strong><span className='text-purple-600'>{task.status}</span></p>
                                        <p className='text-lg'><strong>Priority: </strong><span className='text-red-600'>{task.priority}</span></p>
                                        <p className='text-lg'><strong>Due Date: </strong><span className='text-blue-600'>{task.dueDate? task.dueDate.split("T")[0] : "N/A"}</span></p>
                                    </div>
                                    <div className="mt-6 flex space-x-4">
                                        <button 
                                            onClick={() => setEditMode(true)}
                                            className="px-6 py-2 border-2 border-transparent bg-purple-700 text-white rounded-lg hover:bg-gray-100 hover:text-gray-800 hover:border-purple-700 transition"
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            onClick={handleDelete}
                                            className="bg-red-500 text-white px-4 py-2 border-2 border-transparent hover:bg-gray-100 hover:text-gray-800 hover:border-red-500 rounded-lg transition"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <p className="text-center text-gray-600">Task not found.</p>
                )}
            </div>
        </div>
    )
}

export default TaskList