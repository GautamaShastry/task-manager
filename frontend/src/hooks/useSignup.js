import { useState } from "react"
import useAuth from "../context/AuthContext";
import toast from "react-hot-toast";

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { setUser } = useAuth();

    const signup = async ({ firstName, lastName, username, email, password, confirmPassword }) => {
        setLoading(true);
        try {
            const success = handleErrors({ firstName, lastName, username, email, password, confirmPassword });
            if(!success) return;
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {"Content-Type": "application/json" },
                body: JSON.stringify({ firstName, lastName, username, email, password, confirmPassword }),
            });

            const data = await res.json();
            if(data.error){
                throw new Error(data.error);
            }
            localStorage.setItem("user", JSON.stringify(data));
            setUser(data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };
    return { loading, signup }
};

export default useSignup;

function handleErrors({ firstName, lastName, username, email, password, confirmPassword }) {
    if(!firstName || !lastName || !username || !email || !password || !confirmPassword){
        toast.error("Please enter all fields");
        return false;
    }
    if(password !== confirmPassword){
        toast.error("Passwords do not match");
        return false;
    }
    if(password.length < 6){
        toast.error("Passwords must be at least 6 characters");
        return false;
    }
    return true;
}