// login hook for authenticated users

import { useState } from "react";
import useAuth from "../context/AuthContext"
import toast from "react-hot-toast";

const useLogin = () => {
    const { setUser } = useAuth();
    const [loading, setLoading] = useState(false); // for loading state

    const login = async (username, password) => {
        setLoading(true);
        try {
            const success = handleErrors(username, password);
            if(!success) return;

            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            });

            if(!response.ok) {
                throw new Error("Invalid credentials");
            }

            const data = await response.json();
            if(data.error){
                throw new Error(data.error);
            }
            localStorage.setItem("user", JSON.stringify(data));
            setUser(data.user);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    return { login, loading };
}

export default useLogin;

function handleErrors(username, password) {
    if(!username || !password){
        toast.error("Please fill in all fields");
        return false;
    }
    return true;
}