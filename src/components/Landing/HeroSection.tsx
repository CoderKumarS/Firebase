import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-24 md:py-32 lg:py-48 h-[calc(100dvh-4rem)]">
      <div className="container mx-auto text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
        >
          Welcome to Our Amazing Platform
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl lg:text-2xl mb-8 max-w-3xl mx-auto"
        >
          Discover endless possibilities and elevate your experience with our
          cutting-edge solutions.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <NavLink
            to="/login"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg transition duration-300 hover:bg-gray-200 hover:scale-105 transform"
          >
            Get Started
          </NavLink>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
