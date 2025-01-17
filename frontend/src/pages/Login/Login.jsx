import React, { useState } from "react"
import useLogin from "../../hooks/useLogin";
import { Link } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login, loading } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(username, password);
    }
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full opacity-50 blur-2xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-500 to-indigo-700 rounded-full opacity-50 blur-2xl"></div>
            {/* LOGIN FORM */}
            <div className="relative z-10 bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Login</h2>
                {/* form */}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600 mb-2">Username</label>
                        <input 
                            type="text" 
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            placeholder="Username..."
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-600 mb-2">Password</label>
                        <input 
                            type="password" 
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            placeholder="Password..."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <button 
                            type="submit" 
                            className={`w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 ${
                                loading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                            disabled={loading}
                        >
                            {loading? (
                                <div className="flex items-center justify-center">
                                    <span className="loader w-5 h-5 border-2 border-t-2 border-white rounded-full animate-spin"></span>
                                </div>
                            ) : (
                                'Login'
                            )}
                        </button>
                    </div>
                </form>
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600 text-center mt-4">Don't have an account?{" "}
                        <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;