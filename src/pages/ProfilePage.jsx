import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../utils/supaClient";
import Swal from "sweetalert2";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    full_name: "",
    avatar_url: "",
    website: "",
    role: "",
    phone: "",
    email: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: user } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select(
            "username, full_name, avatar_url, website, role, phone, email"
          )
          .eq("email", user.user.email)
          .single();

        if (error) console.error("Error fetching profile:", error);
        else {
          setProfile(data);
          setFormData(data);
        }
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from("profiles")
      .update(formData)
      .eq("email", profile.email);

    if (error) {
      Swal.fire("Error", "Failed to update profile", "error");
    } else {
      Swal.fire("Success", "Profile updated successfully", "success");
      setProfile(formData);
      setIsEditing(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-md text-sm hover:bg-gray-400 dark:hover:bg-gray-600"
        >
          Back
        </button>
        <div className="flex flex-col items-center space-y-4">
          <img
            src={formData.avatar_url || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-24 h-24 rounded-full border-2 border-gray-300"
          />
          {isEditing ? (
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col space-y-3"
            >
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="p-2 border rounded-md"
                placeholder="Username"
              />
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                className="p-2 border rounded-md"
                placeholder="Full Name"
              />
              <input
                type="text"
                name="avatar_url"
                value={formData.avatar_url}
                onChange={handleChange}
                className="p-2 border rounded-md"
                placeholder="Avatar URL"
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="p-2 border rounded-md"
                placeholder="Phone"
              />
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="p-2 border rounded-md bg-gray-200 cursor-not-allowed"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
              >
                Cancel
              </button>
            </form>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-gray-700 dark:text-white">
                {profile?.full_name || "No Name"}
              </h2>
              <p className="text-gray-500 dark:text-gray-300">
                @{profile?.username || "username"}
              </p>
              <p className="text-gray-500 dark:text-gray-300">
                {profile?.email}
              </p>
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Edit Profile
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
