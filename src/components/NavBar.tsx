import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useFirebase } from "../module/firebase";
import { motion, AnimatePresence } from "framer-motion";

const NavBar = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  const links = firebase.isLoggedIn
    ? [
        { path: "/", label: "Home" },
        { path: "/about", label: "About" },
        { path: "/chat", label: "Chat" },
      ]
    : [
        { path: "/", label: "Home" },
        { path: "/about", label: "About" },
        { path: "/contact", label: "Contact" },
      ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", search);
  };

  const handleProfileClick = () => {
    if (firebase.isLoggedIn) {
      navigate("/profile");
    }
  };
  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      duration: 0.5,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0, duration: 0.5 },
    visible: { y: 0, opacity: 1, duration: 0.8 },
  };

  return (
    <motion.nav
      className="bg-gray-800 sticky top-0 z-50"
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex items-center justify-between h-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex items-center">
            <motion.div className="flex-shrink-0" variants={itemVariants}>
              <NavLink to="/">
                <img className="h-16 w-16 mt-2" src="/logo.png" alt="Logo" />
              </NavLink>
            </motion.div>
            <div className="hidden md:block">
              <motion.div
                className="ml-10 flex items-baseline space-x-4"
                variants={containerVariants}
              >
                {links.map((link) => (
                  <motion.div key={link.path} variants={itemVariants}>
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `px-3 py-2 rounded-md text-sm font-medium no-underline relative overflow-hidden group ${
                          isActive
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:text-white"
                        }`
                      }
                    >
                      <motion.div
                        className="absolute inset-0 bg-gray-700"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                        style={{ originX: 0 }}
                      />
                      <span className="relative z-10">{link.label}</span>
                    </NavLink>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
          <motion.div className="hidden md:block" variants={itemVariants}>
            <div className="ml-4 flex items-center md:ml-6">
              <form onSubmit={handleSearch} className="mr-2">
                <input
                  type="text"
                  placeholder="Search"
                  className="px-3 py-1 rounded-md text-gray-900"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </form>
              {firebase.isLoggedIn ? (
                <img
                  className="h-8 w-8 rounded-full cursor-pointer"
                  src={
                    firebase.user?.photoURL || "https://via.placeholder.com/40"
                  }
                  alt="Profile"
                  onClick={handleProfileClick}
                />
              ) : (
                <>
                  <NavLink
                    to="/login"
                    className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium no-underline relative overflow-hidden group"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gray-700"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                      style={{ originX: 0 }}
                    />
                    <span className="relative z-10">Login</span>
                  </NavLink>
                  <NavLink
                    to="/signup"
                    className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium no-underline relative overflow-hidden group"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gray-700"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                      style={{ originX: 0 }}
                    />
                    <span className="relative z-10">Sign Up</span>
                  </NavLink>
                </>
              )}
            </div>
          </motion.div>
          <motion.div className="-mr-2 flex md:hidden" variants={itemVariants}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden"
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {links.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium no-underline ${
                      isActive
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-700">
              <div className="flex items-center px-5">
                {firebase.isLoggedIn ? (
                  <>
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={
                          firebase.user?.photoURL ||
                          "https://via.placeholder.com/40"
                        }
                        alt="Profile"
                        onClick={handleProfileClick}
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        {firebase.user?.displayName}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-400">
                        {firebase.user?.email}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex space-x-2">
                    <NavLink
                      to="/login"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium no-underline"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </NavLink>
                    <NavLink
                      to="/signup"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium no-underline"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </NavLink>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default NavBar;
