import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import ListGroup from "./test/ListGroup";
import Contact from "./components/Contact";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
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
        <Route
          path="/"
          element={<ListGroup items={items} heading={heading} />}
        />
      </Routes>
    </>
  );
}

export default App;
