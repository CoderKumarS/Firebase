import React from "react";
import { NavLink } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="bg-blue-600 text-white py-72">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to Our Amazing Platform
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Discover endless possibilities and elevate your experience.
        </p>

        <NavLink
          to="/login"
          className="inline-block bg-white text-blue-600 px-6 py-3 rounded-full font-semibold transition duration-300 hover:bg-gray-200 text-decoration-none"
        >
          Get Started
        </NavLink>
      </div>
    </section>
  );
};

export default HeroSection;
