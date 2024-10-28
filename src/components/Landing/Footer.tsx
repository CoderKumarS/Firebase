import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="py-10 bg-gray-800 text-white text-center">
      <div className="container mx-auto">
        <p className="mb-4">© 2024 Your Company Name. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mb-4">
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            Terms of Service
          </a>
          <a href="#" className="hover:underline">
            Contact
          </a>
        </div>
        <div>
          <a href="#" className="mx-2 hover:text-gray-400">
            Facebook
          </a>
          <a href="#" className="mx-2 hover:text-gray-400">
            Twitter
          </a>
          <a href="#" className="mx-2 hover:text-gray-400">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
