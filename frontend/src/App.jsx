import React from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import Login from './pages/Login/Login'
import useAuth from './context/AuthContext';
import Home from './pages/Home/Home';
import { Toaster } from 'react-hot-toast';
import Signup from './pages/Signup/Signup';

function App() {
  const { user } = useAuth();
  return (
      <div className='min-h-screen bg-gray-50'>
        <Routes>
          <Route path="/" element={user ? <Home /> : <Navigate to="/login" replace/>} />
          <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
          <Route path='/signup' element={user ? <Navigate to="/" replace /> : <Signup />} />
        </Routes>
        <Toaster />
      </div>
  )
}

export default App
