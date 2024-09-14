import React from "react";
import { NavLink } from "react-router-dom";
const NavBar = () => {
  return (
    <nav className="bg-gray-800 sticky top-0">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex items-center justify-start">
            <div className="md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink
                  to="/"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium no-underline"
                >
                  Home
                </NavLink>
                <NavLink
                  to="/login"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium no-underline"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium no-underline"
                >
                  SignUp
                </NavLink>
                <NavLink
                  to="/contact"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium no-underline"
                >
                  Contact
                </NavLink>
                <NavLink
                  to="/chat"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium no-underline"
                >
                  Chat
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
