import React, { useState, useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import gsap from "gsap";
import ListGroup from "./components/ListGroup";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Chat from "./pages/Chat";
import NavBar from "./components/NavBar";
import Publish from "./pages/Publish";
import Profile from "./pages/Profile";
import "./App.css";
import AboutPage from "./pages/About";
import ProfileEditPage from "./pages/Edit";
import PerformanceReview from "./pages/Performance";
import TimeTracking from "./pages/TimeTracking";
import TaskManagement from "./pages/TaskMangement";
import Component from "./pages/Check";

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
  const cursorCircleRef = useRef<HTMLDivElement>(null);
  const cursorTailRef = useRef<SVGPathElement>(null);
  const [isPointerOnScreen, setIsPointerOnScreen] = useState(true);

  useEffect(() => {
    const cursorCircle = cursorCircleRef.current;
    const cursorTail = cursorTailRef.current;
    let tailPoints: { x: number; y: number }[] = [];
    const maxTailLength = 20;

    const updateCursorPosition = (x: number, y: number) => {
      if (cursorCircle && cursorTail) {
        gsap.to(cursorCircle, {
          x: x + 80,
          y: y + 80,
          duration: 0.3,
        });

        tailPoints.push({ x, y });
        if (tailPoints.length > maxTailLength) {
          tailPoints.shift();
        }

        const path = `M ${tailPoints
          .map((point) => `${point.x} ${point.y}`)
          .join(" L ")}`;
        gsap.set(cursorTail, { attr: { d: path } });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      updateCursorPosition(e.clientX, e.clientY);
    };

    const handleMouseEnter = () => {
      setIsPointerOnScreen(true);
      if (cursorCircle && cursorTail) {
        gsap.to(cursorCircle, { scale: 1, duration: 0.3 });
        gsap.to(cursorTail, { opacity: 1, duration: 0.3 });
      }
    };

    const handleMouseLeave = () => {
      setIsPointerOnScreen(false);
      if (cursorCircle && cursorTail) {
        gsap.to(cursorCircle, { scale: 0, duration: 0.3 });
        gsap.to(cursorTail, { opacity: 0, duration: 0.3 });
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="w-full h-full relative bg-gray-800">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/publish" element={<Publish />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/editProfile/:id" element={<ProfileEditPage />} />
        <Route path="/check" element={<Component />} />
        {/* <Route path="/tasks" element={<TaskManagement />} /> */}
        {/* <Route path="/time-tracking" element={<TimeTracking />} /> */}
        {/* <Route path="/performance-review" element={<PerformanceReview />} /> */}
        <Route
          path="/list"
          element={<ListGroup items={items} heading={heading} />}
        />
      </Routes>
      <div
        ref={cursorCircleRef}
        id="cursorCircle"
        className="fixed w-6 h-6 rounded-full pointer-events-none sparkle-ball"
      ></div>
      <svg
        id="svgCursor"
        className="fixed top-0 left-0 w-full h-full pointer-events-none"
      >
        <defs>
          <linearGradient id="tailGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          ref={cursorTailRef}
          stroke="url(#tailGradient)"
          strokeWidth="2"
          fill="none"
          filter="url(#glow)"
          className="sparkle-tail"
        />
      </svg>
    </div>
  );
}

export default App;
