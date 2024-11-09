import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useFirebase } from "../module/firebase";

interface EmployeeProfile {
  id: string;
  name: string;
  email: string;
  position: string;
  department: string;
  bio: string;
}

const ProfileEditPage: React.FC = () => {
  const { id } = useParams(); // Get the id from the URL
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const [profile, setProfile] = useState<EmployeeProfile>({
    id: "",
    name: "",
    email: "",
    position: "",
    department: "",
    bio: "",
  });

  // Fetch the user data from Firestore when the component mounts
  useEffect(() => {
    if (id) {
      firebase.getDataById(id).then((data: any) => {
        if (data) {
          setProfile({
            id: data.id,
            name: data.name,
            email: data.email,
            position: data.position || "", // Default empty if not set
            department: data.department || "", // Default empty if not set
            bio: data.bio || "", // Default empty if not set
          });
        }
      });
    }
  }, [id, firebase]);

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  // Handle form submission (update the profile)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(false);
    try {
      // Update the user data in Firestore
      const updated = await firebase.updateUserDataFirestore(profile.id, {
        name: profile.name,
        email: profile.email,
        position: profile.position,
        department: profile.department,
        bio: profile.bio,
      });
      if (updated) {
        setAlert({
          type: "success",
          message: "Data Updated successfully.",
        });
        setTimeout(() => {
          navigate("/profile");
        }, 2000);
      } else {
        setAlert({
          type: "error",
          message: "An error occurred. Please try again later.",
        });
      }
    } catch (error: any) {
      setAlert({ type: "error", message: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl p-8 shadow-xl"
      >
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Edit Your Profile
        </h1>
        {alert && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`mt-4 p-3 rounded-md ${
              alert.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            <p className="text-sm">{alert.message}</p>
          </motion.div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <motion.div
            className="neumorphism-input"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-white bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </motion.div>

          {/* Email Field */}
          <motion.div
            className="neumorphism-input"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-white bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </motion.div>

          {/* Position Field */}
          <motion.div
            className="neumorphism-input"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <label
              htmlFor="position"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Position
            </label>
            <input
              type="text"
              id="position"
              name="position"
              value={profile.position}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-white bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </motion.div>

          {/* Department Field */}
          <motion.div
            className="neumorphism-input"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <label
              htmlFor="department"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Department
            </label>
            <input
              type="text"
              id="department"
              name="department"
              value={profile.department}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-white bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </motion.div>

          {/* Bio Field */}
          <motion.div
            className="neumorphism-input"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 rounded-md bg-white bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white font-bold py-3 px-4 rounded-full shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isLoading ? "Updataing Data..." : "Save Changes"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default ProfileEditPage;
