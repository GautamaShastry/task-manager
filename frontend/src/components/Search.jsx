import React, { useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi';

const Search = ({ tasks, onSearchResults }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [tasksPerPage] = useState(12);

    useEffect(() => {
        const filteredTasks = searchQuery.trim().length > 0 ? tasks.filter(task => task.title.toLowerCase().includes(searchQuery.toLowerCase())) : tasks;
        const startIndex = (currentPage - 1) * tasksPerPage;
        const paginatedTasks = filteredTasks.slice(startIndex, startIndex + tasksPerPage);
        onSearchResults(paginatedTasks);
    }, [searchQuery, tasks, onSearchResults, currentPage]);

    const totalPages = Math.ceil(
        (searchQuery.trim().length > 0 ? tasks.filter(task => task.title.toLowerCase().includes(searchQuery.toLowerCase())).length : tasks.length) / tasksPerPage
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    return (
        <div className='relative mb-6'>
            <input 
                type="text" 
                placeholder='Search tasks...'
                className='w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                value={searchQuery}
                onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                }}
            />
            <FiSearch className='absolute top-5 right-2 transform -translate-y-1/2 text-gray-500'  size={20}/>
        </div>
    )
}

export default Search