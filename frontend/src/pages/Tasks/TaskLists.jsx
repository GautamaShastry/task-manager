import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import Search from '../../components/Search'
import useTasks from '../../hooks/useTasks'
import { useNavigate } from 'react-router-dom'

const TaskLists = () => {
    const { tasks, getTasks, loading } = useTasks();
    const [filteredTasks, setFilteredTasks] = useState(tasks);
    const navigate = useNavigate();
    useEffect(() => {
        getTasks();
    }, []);
    useEffect(() => {
        setFilteredTasks(tasks);
    }, [tasks]);
    const handleClick = (id) => {
        navigate(`/tasks/${id}`);
    }
    return (
        <div className='min-h-screen bg-purple-200'>
            <Navbar />
            <div className="container mx-auto py-10 px-6 mt-8">
                <Search tasks={tasks} onSearchResults={setFilteredTasks} />
                {loading ? (
                    <p>Loading...</p>
                ) : filteredTasks.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredTasks.map((task) => (
                            <div key={task.id} className="relative bg-white shadow-md rounded-lg p-8 mb-4 hover:shadow-lg transition duration-300 ease-in-out">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-medium text-gray-800">{task.title}</h2>
                                    <button onClick={() => handleClick(task._id)} className="text-sm text-gray-600 hover:text-purple-900">
                                        View
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No tasks found. Try to create one!</p>
                )}
            </div>
        </div>
    )
}

export default TaskLists