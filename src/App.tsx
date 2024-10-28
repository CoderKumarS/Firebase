import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import ListGroup from "./components/ListGroup";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Chat from "./pages/Chat";
import NavBar from "./components/NavBar";
import Publish from "./pages/Publish";
import Profile from "./pages/Profile";
const items = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
];
const heading = "Cities";
function App() {
  return (
    <div className="w-full h-full">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/publish" element={<Publish />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/list"
          element={<ListGroup items={items} heading={heading} />}
        />
      </Routes>
    </div>
  );
}

export default App;
