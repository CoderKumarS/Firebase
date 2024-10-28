import React from "react";

const BlogResources: React.FC = () => {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Blog & Resources</h2>
        <ul className="space-y-4">
          <li>
            <a href="#" className="text-blue-600 hover:underline">
              5 Tips for Engaging Your Community
            </a>
          </li>
          <li>
            <a href="#" className="text-blue-600 hover:underline">
              The Importance of Community Feedback
            </a>
          </li>
          <li>
            <a href="#" className="text-blue-600 hover:underline">
              How to Organize Successful Events
            </a>
          </li>
          <li>
            <a href="#" className="text-blue-600 hover:underline">
              Best Practices for Community Management
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default BlogResources;
