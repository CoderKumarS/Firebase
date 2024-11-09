import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const HeroSection = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const heroTexts = [
    "Welcome to Our Amazing Platform",
    "Discover Endless Possibilities",
    "Elevate Your Experience",
    "Unleash Your Potential",
  ];

  const descriptions = [
    "Discover cutting-edge solutions that transform your digital landscape.",
    "Unlock a world of opportunities with our innovative platform.",
    "Experience the future of technology, tailored just for you.",
    "Empower your journey with our state-of-the-art tools and services.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % heroTexts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[calc(100dvh-4rem)] min-h-max overflow-hidden">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-pink-200 via-orange-200 to-cyan-200"
        animate={{
          background: [
            "linear-gradient(45deg, #FFC0CB, #FFD8B1, #C1F0E3)",
            "linear-gradient(45deg, #FFD8B1, #C1F0E3, #B3E0FF)",
            "linear-gradient(45deg, #C1F0E3, #B3E0FF, #FFC0CB)",
            "linear-gradient(45deg, #B3E0FF, #FFC0CB, #FFD8B1)",
          ],
        }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity,
        }}
      />

      {/* Animated overlay pattern */}
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
        animate={{
          backgroundPosition: ["0px 0px", "100px 100px"],
        }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity,
        }}
      />

      {/* Floating orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-gradient-to-r from-yellow-200 to-orange-200 opacity-60 blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 8,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-gradient-to-r from-cyan-200 to-blue-200 opacity-30 blur-xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -40, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 10,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />

      <div className="h-[calc(100dvh-4rem)] min-h-max relative z-10 container mx-auto text-center px-4 py-24 md:py-32 lg:py-48 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.h1
            key={currentTextIndex}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-800"
          >
            {heroTexts[currentTextIndex]}
          </motion.h1>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.p
            key={currentTextIndex}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="text-lg md:text-xl lg:text-2xl mb-8 max-w-3xl mx-auto text-gray-600"
          >
            {descriptions[currentTextIndex]}
          </motion.p>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="space-y-4 sm:space-y-0 sm:space-x-4"
        >
          <NavLink
            to="/login"
            className="inline-block bg-gradient-to-r from-pink-400 to-cyan-400 text-white px-8 py-4 rounded-full font-semibold text-lg transition duration-300 hover:scale-105 transform shadow-lg hover:shadow-xl"
          >
            Get Started
          </NavLink>
          <NavLink
            to="/about"
            className="inline-block bg-white bg-opacity-20 backdrop-blur-sm text-gray-800 px-8 py-4 rounded-full font-semibold text-lg transition duration-300 hover:bg-opacity-30 hover:scale-105 transform shadow-lg hover:shadow-xl border border-gray-200"
          >
            Learn More
          </NavLink>
        </motion.div>
      </div>

      {/* Animated waves */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <motion.div
          animate={{
            x: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="relative"
        >
          <svg
            className="relative block w-[200%] h-12 sm:h-16 lg:h-24"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="fill-current text-white opacity-20"
            ></path>
          </svg>
        </motion.div>
        <motion.div
          animate={{
            x: [0, 100, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="relative -mt-6 sm:-mt-8 lg:-mt-12"
        >
          <svg
            className="relative block w-[200%] h-12 sm:h-16 lg:h-24"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              className="fill-current text-white opacity-10"
            ></path>
          </svg>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
