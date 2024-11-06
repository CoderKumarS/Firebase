import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useFirebase } from "../module/firebase";
import { useNavigate, NavLink } from "react-router-dom";
import AdminDashboard from "./Admin";
import EmployeeDashboard from "./Employee";

interface Task {
  id: string;
  title: string;
  description: string;
  createdDate: string;
  priority: "low" | "medium" | "high";
  status: "accepted" | "completed" | "failed";
}

interface User {
  uid: string;
  name: string;
  email: string;
  profilePicture?: string;
}

export default function Profile() {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const [user, setUser] = useState<User>({
    uid: "",
    name: "",
    email: "",
    profilePicture: "",
  });

  const [isAdmin, setIsAdmin] = useState(false); // Track if the user is an admin
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const checkUserStatus = async () => {
      if (!firebase.isLoggedIn) {
        navigate("/");
        return;
      }

      const user = firebase.user;
      try {
        const data = await firebase.getData(user.uid);
        if (data) {
          setUser({
            uid: user.uid,
            name: data.name,
            email: data.email,
            profilePicture: data.profilePicture || "",
          });
          setIsAdmin(false); // Not an admin
        } else {
          const adminData = await firebase.getAdminData(user.uid);
          if (adminData) {
            setUser({
              uid: user.uid,
              name: adminData.name,
              email: adminData.email,
              profilePicture: adminData.profilePicture || "",
            });
            setIsAdmin(true); // It's an admin
          } else {
            navigate("/");
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false); // End loading state
      }
    };

    checkUserStatus();
  }, [firebase, navigate]);
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
      </div>
    );
  }
  if (isAdmin) {
    // If user is an admin, render the Admin Dashboard
    return <AdminDashboard user={user} />;
  } else {
    // If user is a regular employee, render the Employee Dashboard
    return <EmployeeDashboard user={user} />;
  }
}
