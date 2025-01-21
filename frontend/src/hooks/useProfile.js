import { useState } from "react"
import toast from "react-hot-toast";

const useProfile = () => {
    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState(null);

    const getUserProfile = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/users/profile", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            if(!res.ok){
                throw new Error(data.error);
            }
            setProfile(data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const updateUserProfile = async ({ firstName, lastName, username,email, password, confirmPassword }) => {
        setLoading(true);
        try {
            const res = await fetch("/api/users/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ firstName, lastName, username, email, password, confirmPassword }),
            });
            const data = await res.json();
            if(!res.ok){
                throw new Error(data.error);
            }
            setProfile(data);
            toast.success("Profile updated successfully");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const deleteUserProfile = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/users/profile", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            if(!res.ok){
                throw new Error(data.error);
            }
            setProfile(null);
            localStorage.removeItem("user");
            toast.success("Profile deleted successfully");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, profile, getUserProfile, updateUserProfile, deleteUserProfile };
}

export default useProfile;