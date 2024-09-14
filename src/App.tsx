import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import ListGroup from "./components/ListGroup";
import Contact from "./pages/Contact";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Chat from "./pages/Chat";
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
    <>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/" element={<Chat />} />
        <Route
          path="/list"
          element={<ListGroup items={items} heading={heading} />}
        />
      </Routes>
    </>
  );
}

export default App;
