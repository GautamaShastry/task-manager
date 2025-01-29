import React from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import Login from './pages/Login/Login'
import useAuth from './context/AuthContext';
import Home from './pages/Home/Home';
import { Toaster } from 'react-hot-toast';
import Signup from './pages/Signup/Signup';
import Profile from './pages/Profile/Profile';
import TaskForm from './pages/Tasks/TaskForm';
import TaskList from './pages/Tasks/TaskList';
import TaskLists from './pages/Tasks/TaskLists';

function App() {
  const { user } = useAuth();
  return (
      <div className='min-h-screen bg-gray-50'>
        <Routes>
          <Route path="/" element={user ? <Home /> : <Navigate to="/login" replace/>} />
          <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
          <Route path='/signup' element={user ? <Navigate to="/" replace /> : <Signup />} />
          <Route path='/profile' element={user ? <Profile /> : <Navigate to="/login" replace/>}></Route>
          <Route path='/create-task' element={user ? <TaskForm /> : <Navigate to="/login" replace />}></Route>
          <Route path="/my-tasks" element={user ? <TaskLists /> : <Navigate to="/login" replace />} />
          <Route path='/tasks/:id' element={user ? <TaskList /> : <Navigate to="/login" replace/>} />
        </Routes>
        <Toaster />
      </div>
  )
}

export default App
