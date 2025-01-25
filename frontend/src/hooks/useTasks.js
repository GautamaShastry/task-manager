import { useState } from "react"
import toast from "react-hot-toast";

const useTasks = () => {
    const [loading, setLoading] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState(null);
    const [searchResults, setSearchResults] = useState([]);

    const getTasks = async (page = 1, limit = 10) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/tasks?page=${page}&limit=${limit}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            if(!res.ok){
                throw new Error(data.error);
            }
            setTasks(data.tasks);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const createTask = async({ title, description, status, dueDate, priority }) => {
        setLoading(true);
        try {
            const success = validateTask({ title, description, status, dueDate, priority });
            if(!success) return;
            const res = await fetch("/api/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, description, status, dueDate, priority }),
            });
            const data = await res.json();
            if(!res.ok){
                throw new Error(data.error);
            }
            setTasks((prev) => [...prev, data]);
            toast.success("Task created successfully");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const getTaskById = async (id) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/tasks/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            if(!res.ok){
                throw new Error(data.error);
            }
            setTask(data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    const updateTask = async ( id, { title, description, status, dueDate, priority }) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/tasks/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, description, status, dueDate, priority }),
            });
            const data = await res.json();
            if(!res.ok){
                throw new Error(data.error);
            }
            setTasks((prev) => prev.map((task) => task._id === id? {...task, title, description, status, dueDate, priority } : task));
            toast.success("Task updated successfully");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    const deleteTask = async (id) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/tasks/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            if(!res.ok){
                throw new Error(data.error);
            }
            setTasks((prev) => prev.filter((task) => task._id!== id));
            toast.success("Task deleted successfully");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    const updateTaskStatus = async ( id, { status }) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/tasks/${id}/status`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status }),
            });
            const data = await res.json();
            if(!res.ok){
                throw new Error(data.error);
            }
            setTasks((prev) => prev.map((task) => task._id === id? {...task, status } : task));
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return { loading, getTasks, createTask, getTaskById, updateTask, deleteTask, updateTaskStatus, tasks };
}

export default useTasks;

function validateTask({ title, description, status, dueDate, priority }) {
    if(!title || !description){
        toast.error("Title and description are required");
        return false;
    }
    return true;
}