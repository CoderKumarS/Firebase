import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
const NavBar = () => {
  const [search, setSearch] = useState("");
  return (
    <nav className="bg-gray-800 sticky top-0">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 ">
        <div className="relative flex items-center justify-evenly h-16">
          <div className="basis-1/12 flex items-center content-start">
            <img
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
              alt="Logo"
              className="h-8 w-8"
            />
          </div>
          <div className="basis-7/12 flex items-center justify-center">
            <div className="md:block">
              <div className="ml-10 flex items-center content-center space-x-4">
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
          <div className="basis-1/3 flex items-center content-end">
            <Form className="rounded container-sm">
              <Form.Group controlId="email">
                <Form.Control
                  type="text"
                  placeholder="Type to Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Form.Group>
            </Form>
            <Button>Search</Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
