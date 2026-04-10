import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

const Profile = () => {

    const { token, backendUrl } = useContext(ShopContext);

    const [isEditing, setIsEditing] = useState(false);

    const [user, setUser] = useState({
        name: "",
        dob: "",
        phone: ""
    });

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

    // HANDLE INPUT
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

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

    return (
        <div className="flex justify-center mt-10 px-4 dark:bg-gray-900">

            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md w-full max-w-xl">

                {/* HEADER */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold dark:text-white">
                        Profile Information
                    </h2>

                    {!isEditing ? (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="text-blue-600 dark:text-blue-400"
                        >
                            Edit
                        </button>
                    ) : (
                        <button
                            onClick={handleSave}
                            className="text-green-600 dark:text-green-400"
                        >
                            Save
                        </button>
                    )}
                </div>

                {/* FIELDS */}
                <div className="space-y-5">

                    {/* NAME */}
                    <div>
                        <label className="text-gray-500 dark:text-gray-400 text-sm">
                            Full Name
                        </label>

                        {isEditing ? (
                            <input
                                type="text"
                                name="name"
                                value={user.name}
                                onChange={handleChange}
                                className="input-style mt-1"
                            />
                        ) : (
                            <p className="mt-1 font-medium dark:text-white">
                                {user.name || "—"}
                            </p>
                        )}
                    </div>

                    {/* DOB */}
                    <div>
                        <label className="text-gray-500 dark:text-gray-400 text-sm">
                            Date of Birth
                        </label>

                        {isEditing ? (
                            <input
                                type="date"
                                name="dob"
                                value={user.dob}
                                onChange={handleChange}
                                className="input-style mt-1"
                            />
                        ) : (
                            <p className="mt-1 font-medium dark:text-white">
                                {user.dob || "—"}
                            </p>
                        )}
                    </div>

                    {/* PHONE */}
                    <div>
                        <label className="text-gray-500 dark:text-gray-400 text-sm">
                            Phone Number
                        </label>

                        {isEditing ? (
                            <input
                                type="tel"
                                name="phone"
                                value={user.phone}
                                onChange={handleChange}
                                className="input-style mt-1"
                            />
                        ) : (
                            <p className="mt-1 font-medium dark:text-white">
                                {user.phone || "—"}
                            </p>
                        )}
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Profile;