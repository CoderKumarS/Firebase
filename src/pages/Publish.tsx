"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFirebase } from "../module/firebase";
import { useNavigate } from "react-router-dom";

interface Task {
  title: string;
  status: string;
  priority?: string;
  description: string;
  assigne: string;
  created: Date;
}

interface Alert {
  visible: boolean;
  message: string;
  color: string;
}

const Publish: React.FC = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [Task, setTask] = useState<Task>({
    title: "",
    priority: "low", // Default to "low"
    status: "incomplete", // Default to "incomplete"
    description: "",
    assigne: "",
    created: new Date(Date.now()),
  });
  const [alert, setAlert] = useState<Alert>({
    visible: false,
    message: "",
    color: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    if (alert.visible) {
      const timer = setTimeout(() => {
        setAlert((prev) => ({ ...prev, visible: false }));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alert.visible]);

  const handleElement = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value } = e.target;
    setTask((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Check if all required fields are filled
    if (
      !Task.status ||
      !Task.priority ||
      !Task.description ||
      !Task.title ||
      !Task.assigne
    ) {
      setAlert({
        visible: true,
        message: "All fields are required",
        color: "red",
      });
      return;
    }
    try {
      if (!firebase.isLoggedIn) {
        navigate("/login");
        return;
      }

      const element = await firebase.putDataFirestore(Task);
      if (element) {
        // On success, display success message
        setAlert({
          visible: true,
          message: "Task added successfully!",
          color: "green",
        });
        // Clear the form
        setTask({
          title: "",
          priority: "low",
          status: "incomplete",
          description: "",
          assigne: "",
          created: new Date(Date.now()),
        });
      }
    } catch (error: any) {
      // On error, display error message
      setAlert({
        visible: true,
        message: `Error: ${error.message}`,
        color: "red",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-[calc(100dvh-4rem)] min-h-max bg-gradient-to-br from-blue-100 to-purple-100 flex flex-col items-center justify-center p-4"
    >
      <AnimatePresence>
        {alert.visible && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-20 right-4 p-4 rounded-lg shadow-lg ${
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
        Create Task
      </motion.h1>

      <motion.div
        className="w-full max-w-md bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-xl"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Task Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="Enter the Task Title"
              value={Task.title}
              onChange={handleElement}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              placeholder="Enter the Task Description"
              value={Task.description}
              onChange={handleElement}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label
              htmlFor="assigne"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Assignee
            </label>
            <input
              type="text"
              id="assigne"
              placeholder="Enter the Assignee Name"
              value={Task.assigne}
              onChange={handleElement}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label
              htmlFor="priority"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Priority
            </label>
            <select
              id="priority"
              value={Task.priority}
              onChange={handleElement}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isSubmitting ? "Uploading..." : "Add Task"}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Publish;
