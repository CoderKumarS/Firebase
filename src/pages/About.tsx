import React from "react";
import { motion } from "framer-motion";

const AboutPage: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-8">
      <motion.div
        className="max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-4xl font-bold text-center mb-8 text-gray-800"
          variants={itemVariants}
        >
          About Our Employee Management System
        </motion.h1>

        <motion.div
          className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl p-8 shadow-xl mb-8"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Our Mission
          </h2>
          <p className="text-gray-700">
            We strive to empower organizations by providing a cutting-edge
            employee management solution that enhances productivity, fosters
            collaboration, and streamlines HR processes.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
        >
          <motion.div
            className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-xl"
            variants={itemVariants}
          >
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              Key Features
            </h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Intuitive employee profiles</li>
              <li>Attendance tracking</li>
              <li>Performance management</li>
              <li>Leave management</li>
              <li>Payroll integration</li>
            </ul>
          </motion.div>

          <motion.div
            className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-xl"
            variants={itemVariants}
          >
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              Benefits
            </h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Increased efficiency</li>
              <li>Improved communication</li>
              <li>Data-driven decision making</li>
              <li>Enhanced employee experience</li>
              <li>Streamlined HR processes</li>
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-8 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-xl"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Our Team
          </h2>
          <p className="text-gray-700 mb-4">
            We are a dedicated team of HR professionals, software engineers, and
            UX designers committed to creating the best employee management
            experience.
          </p>
          <motion.button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Meet the Team
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutPage;
