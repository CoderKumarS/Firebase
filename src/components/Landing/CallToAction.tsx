import React from "react";
import { NavLink } from "react-router-dom";

const CallToAction: React.FC = () => {
  return (
    <section className="py-20 bg-blue-600 text-white text-center">
      <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
      <p className="mb-6">
        Join our community today and take the first step towards better
        engagement!
      </p>
      <NavLink
        to="/signup"
        className="inline-block bg-white text-blue-600 px-6 py-3 rounded-full font-semibold transition duration-300 hover:bg-gray-200"
      >
        Sign Up Now
      </NavLink>
    </section>
  );
};

export default CallToAction;
