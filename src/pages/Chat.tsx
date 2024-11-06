"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { io, Socket } from "socket.io-client";

const Chat: React.FC = () => {
  const [message, setMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState("");
  const [alert, setAlert] = useState({
    visible: false,
    message: "",
    color: "",
  });

  const socket: Socket = io("http://localhost:3000");

  useEffect(() => {
    socket.on("reci_message", (data) => {
      setReceivedMessage(data.message);
      setMessage("");
    });
  }, [socket]);

  useEffect(() => {
    if (alert.visible) {
      const timer = setTimeout(() => {
        setAlert({ ...alert, visible: false });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const sendMessage = () => {
    if (message === "") {
      setAlert({
        visible: true,
        message: "Please enter a message",
        color: "red",
      });
      return;
    }
    socket.emit("send_message", { message });
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
        Chat
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
            sendMessage();
          }}
          className="space-y-4"
        >
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Message
            </label>
            <input
              type="text"
              id="message"
              placeholder="Enter your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <motion.button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Send Message
          </motion.button>
        </form>
      </motion.div>

      <motion.div
        className="mt-8 w-full max-w-md bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-xl"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl font-semibold mb-2 text-gray-800">
          Received Message:
        </h2>
        <p className="text-gray-600 break-words">
          {receivedMessage || "No messages yet"}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Chat;
