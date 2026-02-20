import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";

const Profile = () => {

    const { token, backendUrl } = useContext(ShopContext);

    const [isEditing, setIsEditing] = useState(false);

    const [user, setUser] = useState({
        name: "",
        dob: "",
        phone: ""
    });

    // 🔹 Fetch Profile On Load
    useEffect(() => {
        const fetchProfile = async () => {
            try {

                const response = await axios.get(
                    backendUrl + "/api/user/profile",
                    {
                        headers: { token }
                    }
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
            }
        };

        if (token) {
            fetchProfile();
        }

    }, [token]);


    // 🔹 Handle Input Change
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };


    // 🔹 Update Profile
    const handleSave = async () => {
        try {

            const response = await axios.put(
                backendUrl + "/api/user/profile",
                user,
                {
                    headers: { token }
                }
            );

            if (response.data.success) {
                setUser(response.data.user);
                setIsEditing(false);
            }

        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className="bg-white p-8 rounded-xl max-w-xl">

            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-xl">

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Profile Information</h2>

                    {!isEditing ? (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="text-blue-600"
                        >
                            Edit
                        </button>
                    ) : (
                        <button
                            onClick={handleSave}
                            className="text-green-600"
                        >
                            Save
                        </button>
                    )}
                </div>

                <div className="space-y-5">

                    <div>
                        <label className="text-gray-500 text-sm">Full Name</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="name"
                                value={user.name}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-2 mt-1"
                            />
                        ) : (
                            <p className="mt-1 font-medium">{user.name}</p>
                        )}
                    </div>

                    <div>
                        <label className="text-gray-500 text-sm">Date of Birth</label>
                        {isEditing ? (
                            <input
                                type="date"
                                name="dob"
                                value={user.dob}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-2 mt-1"
                            />
                        ) : (
                            <p className="mt-1 font-medium">{user.dob}</p>
                        )}
                    </div>

                    <div>
                        <label className="text-gray-500 text-sm">Phone Number</label>
                        {isEditing ? (
                            <input
                                type="tel"
                                name="phone"
                                value={user.phone}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-2 mt-1"
                            />
                        ) : (
                            <p className="mt-1 font-medium">{user.phone}</p>
                        )}
                    </div>

                </div>

            </div>

        </div>
    );
};

export default Profile;