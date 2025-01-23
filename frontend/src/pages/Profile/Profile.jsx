import React, { useEffect, useState } from 'react'
import useProfile from '../../hooks/useProfile'
import Navbar from '../../components/Navbar';

const Profile = () => {
    const { profile, getUserProfile, updateUserProfile, deleteUserProfile } = useProfile();
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
    })

    useEffect(() => {
        const fetchProfile = async () => {
            await getUserProfile();
        };
        fetchProfile();
    }, []);

    useEffect(() => {
        if(profile) {
            setFormData({
                firstName: profile.firstName || "",
                lastName: profile.lastName || "",
                email: profile.email || "",
                username: profile.username || "",
                password: "",
                confirmPassword: "",
            });
        }
    }, [profile]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedProfile = {
            fullName: `${formData.firstName} ${formData.lastName}`,
            username: formData.username,
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword
        };
        await updateUserProfile(updatedProfile);
        setEditMode(false);
    }

    const handleDeleteProfile = async () => {
        const confirmation = window.confirm('Are you sure you want to delete your profile? This action cannot be undone.');
        if(confirmation) {
            await deleteUserProfile();
            window.location.href = '/login';
        }
    }

    const handleEditProfile = () => {
        setEditMode(true);
    }

    return (
        <div className='min-h-screen bg-purple-200'>
            <Navbar />
            <div className='container mx-auto py-10 px-6'>
                <div className='bg-white shadow-lg rounded-lg p-8 max-w-3xl mx-auto'>
                    <h1 className='flex text-3xl font-bold text-gray-800 mb-6 items-center justify-center'>My Profile</h1>

                    {profile ? (
                        <form onSubmit={handleSubmit}>
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                                <div>
                                    <label className='block text-gray-700 font-medium mb-2'>First Name</label>
                                    <input 
                                        type="text" 
                                        className='w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-400'
                                        name='firstName'
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        disabled={!editMode}
                                    />
                                </div>
                                <div>
                                    <label className='block text-gray-700 font-medium mb-2'>Last Name</label>
                                    <input 
                                        type="text" 
                                        className='w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-400'
                                        name='lastName'
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        disabled={!editMode}
                                    />
                                </div>
                                <div className='sm:col-span-2'>
                                    <label className='block text-gray-700 font-medium mb-2'>Username</label>
                                    <input 
                                        type="text" 
                                        className='w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-400'
                                        name='username'
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        disabled={!editMode}
                                    />
                                </div>
                                <div className='sm:col-span-2'>
                                    <label className='block text-gray-700 font-medium mb-2'>Email</label>
                                    <input 
                                        type="email" 
                                        className='w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-400'
                                        name='email'
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        disabled={!editMode}
                                    />
                                </div>
                                {editMode && (
                                    <>
                                        <div>
                                            <label className='block text-gray-700 font-medium mb-2'>Password</label>
                                            <input 
                                                type="password" 
                                                className='w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-400'
                                                name='password'
                                                value={formData.password}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div>
                                            <label className='block text-gray-700 font-medium mb-2'>Confirm Password</label>
                                            <input 
                                                type="password" 
                                                className='w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-400'
                                                name='confirmPassword'
                                                value={formData.confirmPassword}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className='mt-8 flex space-x-4'>
                                {!editMode && (
                                    <button className='bg-indigo-600 text-white py-2 px-6 border-2 border-transparent rounded-lg hover:text-gray-700 hover:border-purple-700 hover:bg-gray-200 transition' type='button' onClick={handleEditProfile}>Edit</button>
                                )}
                                {editMode && (
                                    <button className='bg-indigo-600 text-white py-2 px-6 border-2 border-transparent rounded-lg hover:border-purple-700 hover:text-gray-700 hover:bg-gray-200 transition' type='submit'>Save</button>
                                )}
                                {editMode && (
                                        
                                        <button className='text-indigo-500 hover:text-purple-700 hover:underline transition' onClick={() => setEditMode(false)}>Cancel</button>
                                )}
                                {!editMode && (
                                    <button className='text-indigo-600 hover:text-purple-700 hover:underline transition' onClick={deleteUserProfile}>Delete Account</button>
                                )}
                            </div>
                        </form>
                    ) : (
                        
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Profile