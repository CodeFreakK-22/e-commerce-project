import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Profile = () => {

    const { token, backendUrl, setToken } = useContext(ShopContext);
    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState({ name: "", dob: "", phone: "" });

    const getInitials = (name) => {
        if (!name) return "?"
        const parts = name.trim().split(" ")
        return parts.length >= 2
            ? parts[0][0].toUpperCase() + parts[1][0].toUpperCase()
            : parts[0].slice(0, 2).toUpperCase()
    }

    const formatDob = (dob) => {
        if (!dob) return "—"
        const date = new Date(dob)
        return date.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
    }

    // FETCH PROFILE
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(
                    backendUrl + "/api/user/profile",
                    { headers: { token } }
                );
                if (response.data.success) {
                    const { name, dob, phone } = response.data.user;
                    setUser({
                        name: name || "",
                        dob: dob ? dob.substring(0, 10) : "",
                        phone: phone || ""
                    });
                }
            } catch (error) {
                console.log(error);
                toast.error("Failed to load profile");
            }
        };
        if (token) fetchProfile();
    }, [token]);

    const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

    // SAVE PROFILE
    const handleSave = async () => {
        try {
            const response = await axios.put(
                backendUrl + "/api/user/profile",
                user,
                { headers: { token } }
            );
            if (response.data.success) {
                setUser(response.data.user);
                setIsEditing(false);
                toast.success("Profile updated");
            }
        } catch (error) {
            console.log(error);
            toast.error("Update failed");
        }
    };

    const handleLogout = () => {
        setToken("")
        localStorage.removeItem("token")
        navigate("/")
        toast.success("Logged out successfully")
    }

    const inputClass = `w-full px-3 py-2 text-sm rounded-lg border 
        border-gray-200 dark:border-gray-600 
        bg-gray-50 dark:bg-gray-700 
        text-gray-900 dark:text-white 
        focus:outline-none focus:border-gray-400 dark:focus:border-gray-400
        transition`

    return (
        <div className="flex justify-center px-4 py-12 min-h-screen dark:bg-gray-900">
            <div className="w-full max-w-lg flex flex-col gap-4">

                {/* PROFILE CARD */}
                <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-7">

                    {/* AVATAR + NAME */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center text-xl font-semibold text-purple-700 dark:text-purple-300 flex-shrink-0">
                            {getInitials(user.name)}
                        </div>
                        <div className="flex-1">
                            <p className="text-base font-semibold dark:text-white">
                                {user.name || "Your Name"}
                            </p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                                Member since 2024
                            </p>
                        </div>
                        {!isEditing ? (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="text-sm px-4 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                            >
                                Edit profile
                            </button>
                        ) : null}
                    </div>

                    {/* DIVIDER + LABEL */}
                    <div className="border-t border-gray-100 dark:border-gray-700 pt-5">
                        <p className="text-[11px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">
                            Profile information
                        </p>

                        {/* VIEW MODE */}
                        {!isEditing ? (
                            <div className="flex flex-col divide-y divide-gray-100 dark:divide-gray-700">
                                {[
                                    { label: "Full name", value: user.name || "—" },
                                    { label: "Date of birth", value: formatDob(user.dob) },
                                    { label: "Phone number", value: user.phone ? `+91 ${user.phone}` : "—" },
                                ].map((field, i) => (
                                    <div key={i} className="py-3">
                                        <p className="text-[11px] text-gray-400 dark:text-gray-500 mb-1">
                                            {field.label}
                                        </p>
                                        <p className="text-sm font-medium dark:text-white">
                                            {field.value}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (

                            /* EDIT MODE */
                            <div className="flex flex-col gap-4">
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-[11px] text-gray-400 dark:text-gray-500 mb-1.5 block">Full name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={user.name}
                                            onChange={handleChange}
                                            className={inputClass}
                                            placeholder="Your full name"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[11px] text-gray-400 dark:text-gray-500 mb-1.5 block">Date of birth</label>
                                        <input
                                            type="date"
                                            name="dob"
                                            value={user.dob}
                                            onChange={handleChange}
                                            className={inputClass}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[11px] text-gray-400 dark:text-gray-500 mb-1.5 block">Phone number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={user.phone}
                                        onChange={handleChange}
                                        className={inputClass}
                                        placeholder="e.g. 6371961556"
                                    />
                                </div>
                                <div className="flex gap-3 pt-1">
                                    <button
                                        onClick={handleSave}
                                        className="flex-1 py-2 text-sm font-medium rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:opacity-90 transition"
                                    >
                                        Save changes
                                    </button>
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        className="px-5 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* QUICK LINKS CARD */}
                <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl px-7 py-5">
                    <p className="text-[11px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
                        Quick links
                    </p>
                    <div className="flex flex-col divide-y divide-gray-100 dark:divide-gray-700">
                        {[
                            { label: "My orders", path: "/orders" },
                            { label: "Saved addresses", path: "/addresses" },
                        ].map((link, i) => (
                            <button
                                key={i}
                                onClick={() => navigate(link.path)}
                                className="flex items-center justify-between py-3 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition text-left"
                            >
                                <span>{link.label}</span>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="9 18 15 12 9 6" />
                                </svg>
                            </button>
                        ))}
                        <button
                            onClick={handleLogout}
                            className="flex items-center justify-between py-3 text-sm text-red-500 hover:text-red-600 transition text-left"
                        >
                            <span>Sign out</span>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Profile;