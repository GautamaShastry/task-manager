import React from 'react'
import Navbar from '../../components/Navbar'
import { useParams } from 'react-router-dom'
import useTasks from '../../hooks/useTasks';

const TaskList = () => {
    const { id } = useParams();
    const { getTaskById, updateTask, deleteTask, loading, getTasks, tasks } = useTasks();

    return (
        <div className='min-h-screen bg-purple-200'>
            <Navbar />
        </div>
    )
}

export default TaskList