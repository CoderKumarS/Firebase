import React, { useState, useEffect } from "react";
import { useFirebase } from "../module/firebase";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

interface User {
  uid: string;
  name: string;
  email: string;
  profilePicture?: string;
}

const Profile: React.FC = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const [user, setUser] = useState<User>({
    uid: "",
    name: "",
    email: "",
    profilePicture: "",
  });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const handleSignOut = async () => {
    await firebase.signOutUser();
    navigate("/");
  };

  const handleEditToggle = () => {
    setEditing(!editing);
  };

  const handleSaveChanges = async () => {
    if (newName && newEmail) {
      await firebase.updateUser(user.uid, { name: newName, email: newEmail });
      setUser((prev) => ({ ...prev, name: newName, email: newEmail }));
      setEditing(false);
    }
  };

  const handleProfilePictureChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = await firebase.uploadProfilePicture(user.uid, file);
      setUser((prev) => ({ ...prev, profilePicture: url }));
    }
  };

  useEffect(() => {
    const checkUserStatus = async () => {
      if (!firebase.isLoggedIn) {
        navigate("/");
        return;
      }

      const user = firebase.user;
      try {
        const data = await firebase.getData(user.uid);
        setUser({
          uid: user.uid,
          name: data.name,
          email: data.email,
          profilePicture: data.profilePicture || "",
        });
        setNewName(data.name);
        setNewEmail(data.email);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    checkUserStatus();
  }, [firebase, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader"></div>
      </div>
    ); // Add a spinner or loading animation here
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center">Profile</h1>
      {user.profilePicture && (
        <img
          src={user.profilePicture}
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
      )}

      {editing ? (
        <div>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Name"
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <div className="flex justify-between">
            <Button onClick={handleSaveChanges} color="primary">
              Save
            </Button>
            <Button onClick={handleEditToggle} color="secondary">
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-lg">Name: {user.name}</h2>
          <h2 className="text-lg">Email: {user.email}</h2>
          <Button onClick={handleEditToggle} color="primary">
            Edit Profile
          </Button>
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleProfilePictureChange}
        className="mt-4 mb-2"
        title="Change Profile Picture"
      />
      <Button onClick={handleSignOut} color="danger">
        Sign Out
      </Button>
    </div>
  );
};

export default Profile;
