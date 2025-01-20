import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import useAuth from "../context/AuthContext";
import { FiSearch, FiLogOut } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import useTasks from '../hooks/useTasks';
import useLogout from '../hooks/useLogout';

const Navbar = () => {
    const { user, setUser } = useAuth(); 
    const navigate = useNavigate();
    const [dropDown, setDropDown] = useState(false);
    const { logout, loading } = useLogout(); 

    return (
        <nav className='bg-gray-800 text-white shadow-md py-4'>
            <div className='container mx-auto flex items-center justify-between px-6'>
                {/* LOGO */}
                <Link to="/" className='text-2xl font-medium tracking-wide hover:text-purple-400'>
                    Home
                </Link>
                {/* NAVIGATION LINKS */}
                <ul className='hidden md:flex space-x-6 text-sm'>
                    <li>
                        <Link to="/create-task" className='hover:text-purple-400 transition text-lg font-medium'>
                            New Task
                        </Link>
                    </li>
                    <li>
                        <Link to="/my-tasks" className='hover:text-purple-400 transition text-lg font-medium'>
                            My Tasks
                        </Link>
                    </li>
                </ul>
                {/* PROFILE DROPDOWN */}
                <div className='relative'>
                    <FaUserCircle 
                        size={28}
                        className='cursor-pointer hover:text-purple-400 transition'
                        onClick={() => setDropDown(!dropDown)}
                    />
                    {dropDown && (
                        <div className='absolute right-0 mt-2 bg-white text-black rounded shadow-md w-40'>
                            <ul>
                                <li className='px-4 py-2 hover:bg-gray-200 cursor-pointer' onClick={() => navigate("/profile")}>
                                    Profile
                                </li>
                                <li className={`px-4 py-2 hover:bg-gray-200 cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={logout}>
                                    {
                                        loading ? (
                                            <div className='flex items-center justify-center '>
                                                <span className='loader w-4 h-4 border-2 border-t-2 border-blue-500 rounded-full animate-spin'></span>
                                            </div>
                                        ) : (
                                            <>
                                                <FiLogOut size={24} className='inline-block mr-2' /> Logout
                                            </>
                                        )
                                    }
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar