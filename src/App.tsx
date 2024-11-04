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
    let animationFrameId: number;

    const updateCursorPosition = (e: MouseEvent) => {
      if (cursorCircle && cursorTail) {
        gsap.to(cursorCircle, {
          x: e.clientX + 80,
          y: e.clientY + 80,
          duration: 0.3,
        });

        tailPoints.push({ x: e.clientX, y: e.clientY });
        if (tailPoints.length > maxTailLength) {
          tailPoints.shift();
        }

        const path = `M ${tailPoints
          .map((point) => `${point.x} ${point.y}`)
          .join(" L ")}`;
        gsap.set(cursorTail, { attr: { d: path } });
      }
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
    document.addEventListener("mousemove", updateCursorPosition);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    let lastKnownMousePosition = { clientX: 0, clientY: 0 };
    document.addEventListener("mousemove", (e) => {
      lastKnownMousePosition = e;
    });

    const animate = () => {
      updateCursorPosition(lastKnownMousePosition);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      document.removeEventListener("mousemove", updateCursorPosition);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="w-full h-full relative">
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
      <div
        ref={cursorCircleRef}
        id="cursorCircle"
        className="fixed w-12 h-12 rounded-full pointer-events-none"
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
        </defs>
        <path
          ref={cursorTailRef}
          stroke="url(#tailGradient)"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </div>
  );
}

export default App;
