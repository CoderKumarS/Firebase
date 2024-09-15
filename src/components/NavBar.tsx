import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import "../App.css";
const NavBar = () => {
  const links = [
    { path: "/", label: "Home" },
    { path: "/login", label: "Login" },
    { path: "/signup", label: "SignUp" },
    { path: "/contact", label: "Contact" },
    { path: "/chat", label: "Chat" },
    { path: "/publish", label: "Publish" },
  ];
  let [selectedIndex, setSelectedIndex] = useState(0);
  const [search, setSearch] = useState("");
  const handleClick = (index: number) => {
    setSelectedIndex(index);
  };
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
            <div className="hidden sm:block ">
              <div className="ml-10 flex items-center content-center space-x-4">
                {links.map((link, index) => (
                  <NavLink
                    key={index}
                    to={link.path}
                    className={`text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium no-underline ${
                      selectedIndex === index
                        ? "bg-[#6366f1] text-white hover:bg-[#6366f1]"
                        : ""
                    }`}
                    onClick={() => handleClick(index)}
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
            </div>
            <div className="md:hidden">
              <div className="ml-10 flex items-center content-center space-x-4">
                {/* <select
                  className="text-gray-300 bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium no-underline"
                  value={selectedIndex}
                  onChange={(e) => setSelectedIndex(Number(e.target.value))}
                >
                  {links.map((link, index) => (
                    <option key={index} value={index}>
                      <NavLink to={link.path}>{link.label}</NavLink>
                    </option>
                  ))}
                </select> */}
              </div>
            </div>
          </div>
          <div className="basis-1/3 flex items-center content-end">
            <Form className="rounded container-sm">
              <Form.Group controlId="search">
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
