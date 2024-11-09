import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

export default function Contact() {
  const controls = useAnimation();
  const formRef = useRef(null);

  useEffect(() => {
    controls.start((i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 },
    }));
  }, [controls]);

  const handleHover = (scale: number) => {
    return {
      scale: scale,
      transition: { duration: 0.3 },
    };
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-[calc(100dvh-4rem)] min-h-max flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-red-100"
    >
      <motion.div
        ref={formRef}
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
        className="w-full max-w-md p-8 m-4 rounded-xl bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg shadow-lg"
      >
        <motion.h1
          custom={0}
          animate={controls}
          className="text-3xl font-bold text-center text-gray-800 mb-6"
        >
          Contact Us
        </motion.h1>
        <form>
          <motion.div custom={1} animate={controls} className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <motion.input
              whileHover={handleHover(1.02)}
              whileFocus={handleHover(1.02)}
              type="text"
              id="name"
              className="w-full px-3 py-2 bg-white bg-opacity-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </motion.div>
          <motion.div custom={2} animate={controls} className="mb-4">
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone Number
            </label>
            <motion.input
              whileHover={handleHover(1.02)}
              whileFocus={handleHover(1.02)}
              type="tel"
              id="phoneNumber"
              className="w-full px-3 py-2 bg-white bg-opacity-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </motion.div>
          <motion.div custom={3} animate={controls} className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <motion.input
              whileHover={handleHover(1.02)}
              whileFocus={handleHover(1.02)}
              type="email"
              id="email"
              className="w-full px-3 py-2 bg-white bg-opacity-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </motion.div>
          <motion.div custom={4} animate={controls} className="mb-6">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Message
            </label>
            <motion.textarea
              whileHover={handleHover(1.02)}
              whileFocus={handleHover(1.02)}
              id="message"
              rows={4}
              className="w-full px-3 py-2 bg-white bg-opacity-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            ></motion.textarea>
          </motion.div>
          <motion.div custom={5} animate={controls} className="text-center">
            <motion.button
              whileHover={handleHover(1.05)}
              whileTap={handleHover(0.95)}
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
            >
              Submit
            </motion.button>
          </motion.div>
        </form>
      </motion.div>
    </motion.div>
  );
}
