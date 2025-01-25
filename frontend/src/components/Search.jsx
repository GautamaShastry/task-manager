import React, { useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi';

const Search = ({ tasks, onSearchResults }) => {
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if(searchQuery.trim().length > 0){
            const filtered = tasks.filter(task => task.title.toLowerCase().includes(searchQuery.toLowerCase()));
            onSearchResults(filtered);
        } else {
            onSearchResults(tasks);
        }
    }, [searchQuery, tasks, onSearchResults]);
    return (
        <div className='relative mb-6'>
            <input 
                type="text" 
                placeholder='Search tasks...'
                className='w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FiSearch className='absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500'  size={20}/>
        </div>
    )
}

export default Search