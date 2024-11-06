"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFirebase } from "../module/firebase";

interface Book {
  name: string;
  isbNumber: string;
  price: string;
  coverPic: string;
}

interface Alert {
  visible: boolean;
  message: string;
  color: string;
}

const Publish: React.FC = () => {
  const firebase = useFirebase();
  const [book, setBook] = useState<Book>({
    name: "",
    isbNumber: "",
    price: "",
    coverPic: "",
  });
  const [alert, setAlert] = useState<Alert>({
    visible: false,
    message: "",
    color: "",
  });

  useEffect(() => {
    if (alert.visible) {
      const timer = setTimeout(() => {
        setAlert((prev) => ({ ...prev, visible: false }));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alert.visible]);

  const handleElement = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setBook((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async () => {
    if (!book.isbNumber || !book.price || !book.name || !book.coverPic) {
      setAlert({
        visible: true,
        message: "All fields are required",
        color: "red",
      });
      return;
    }

    try {
      const element = await firebase.putDataFirestore(
        book.name,
        book.isbNumber,
        book.price,
        book.coverPic
      );
      setAlert({
        visible: true,
        message: `${element.book.name} added successfully`,
        color: "green",
      });
      setBook({ name: "", isbNumber: "", price: "", coverPic: "" });
    } catch (error: any) {
      setAlert({
        visible: true,
        message: error.message,
        color: "red",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-[calc(100dvh-4rem)]  bg-gradient-to-br from-blue-100 to-purple-100 flex flex-col items-center justify-center p-4"
    >
      <AnimatePresence>
        {alert.visible && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg ${
              alert.color === "red" ? "bg-red-500" : "bg-green-500"
            } text-white`}
          >
            {alert.message}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.h1
        className="text-4xl font-bold mb-8 text-gray-800 border-b-2 border-blue-500 pb-2"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
      >
        Publish
      </motion.h1>

      <motion.div
        className="w-full max-w-md bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-xl"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="space-y-4"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Book Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter the book name"
              value={book.name}
              onChange={handleElement}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label
              htmlFor="isbNumber"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              ISBN
            </label>
            <input
              type="text"
              id="isbNumber"
              placeholder="Enter ISBN number"
              value={book.isbNumber}
              onChange={handleElement}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              placeholder="Enter price"
              value={book.price}
              onChange={handleElement}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label
              htmlFor="coverPic"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Cover Picture
            </label>
            <input
              type="file"
              id="coverPic"
              onChange={handleElement}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              required
            />
          </div>

          <motion.button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Publish;
