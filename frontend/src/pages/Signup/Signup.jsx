import { useState } from "react";
import useSignup from "../../hooks/useSignup"
import { Link } from "react-router-dom";

const Signup = () => {
    const { signup, loading } = useSignup();
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(userData);
    }

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden ">
            <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full opacity-50 blur-2xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-500 to-indigo-700 rounded-full opacity-50 blur-2xl"></div>
            {/* SIGNUP FORM */}
            <div className="relative z-10 bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Sign up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600 mb-2">First Name</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            placeholder="First Name..."
                            value={userData.firstName}
                            onChange={(e) => setUserData({...userData, firstName: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600 mb-2">Last Name</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            placeholder="Last Name..."
                            value={userData.lastName}
                            onChange={(e) => setUserData({...userData, lastName: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600 mb-2">Username</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            placeholder="Username..."
                            value={userData.username}
                            onChange={(e) => setUserData({...userData, username: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600 mb-2">Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            placeholder="Email..."
                            value={userData.email}
                            onChange={(e) => setUserData({...userData, email: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600 mb-2">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            placeholder="Password..."
                            value={userData.password}
                            onChange={(e) => setUserData({...userData, password: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-600 mb-2">Confirm Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            placeholder="Confirm Password..."
                            value={userData.confirmPassword}
                            onChange={(e) => setUserData({...userData, confirmPassword: e.target.value })}
                            required
                        />
                    </div>
                    {/* SUBMIT BUTTON */}
                    <div>
                        <button 
                            type="submit"
                            className={`w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 ${
                                loading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                            disabled={loading}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <span className="loader w-5 h-5 border-2 border-t-2 border-white rounded-full animate-spin"></span>
                                </div>
                            ) : (
                                "Sign Up"
                            )}
                        </button>
                    </div>
                </form>
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-500 hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;