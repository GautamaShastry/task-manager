import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Search from "../../components/Search";
import useTasks from "../../hooks/useTasks";
import { useNavigate } from "react-router-dom";

const TaskLists = () => {
    const { tasks, getTasks, loading, totalPages, currentPage, setCurrentPage } = useTasks();
    const [filteredTasks, setFilteredTasks] = useState(tasks);
    const tasksPerPage = 12; // Set the number of tasks per page

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch tasks whenever the component mounts or the current page changes
        getTasks(currentPage);
    }, [currentPage]);

    useEffect(() => {
        // Set the filtered tasks to the entire list when no search is performed
        console.log("Total pages: ", totalPages);
        setFilteredTasks(tasks);
    }, [tasks]);

    const handleSearchResults = useCallback((results) => {
        setFilteredTasks(results);
    }, []);

    const handlePageChange = (page) =>{
        if(page >=1 && page <= totalPages){
            setCurrentPage(page);
            getTasks(page);
        }
    }

    const handleTaskClick = (id) => {
        navigate(`/tasks/${id}`);
    };

    return (
        <div className="min-h-screen bg-purple-200">
            <Navbar />
            <div className="container mx-auto py-10 px-6 mt-8">
                <Search
                    tasks={tasks}
                    onSearchResults={handleSearchResults}
                />
                {loading ? (
                    <p>Loading tasks...</p>
                ) : filteredTasks.length > 0 ? (
                    <div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredTasks.map((task) => (
                                <div
                                    key={task._id}
                                    onClick={() => handleTaskClick(task._id)}
                                    className="relative bg-white shadow-md rounded-lg p-8 mb-4 hover:shadow-lg transition duration-300 ease-in-out cursor-pointer"
                                >
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-xl font-medium text-gray-800">
                                            {task.title}
                                        </h2>
                                        <button
                                            className="text-sm text-gray-600 hover:text-purple-900"
                                        >
                                            View
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination Controls */}
                        <div className="flex justify-center mt-6 space-x-2">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                className={`px-3 py-1 rounded-lg border transition ${
                                    currentPage === 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-white text-indigo-500"
                                }`}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>

                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => handlePageChange(index + 1)}
                                    className={`px-3 py-1 rounded-lg border transition ${
                                        currentPage === index + 1 
                                            ? "bg-indigo-500 text-white"
                                            : "bg-white text-indigo-500"
                                    }`}
                                >
                                    {index + 1}
                                </button>
                            ))}

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                className={`px-3 py-1 rounded-lg border transition ${
                                    currentPage === totalPages ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-white text-indigo-500"
                                }`}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-gray-600">
                        No tasks found. Try searching or create a new task!
                    </p>
                )}
            </div>
        </div>
    );
};

export default TaskLists;
