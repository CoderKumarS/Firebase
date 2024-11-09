import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useFirebase } from "../module/firebase"; // Assuming you're still using Firebase for other purposes
import { useNavigate } from "react-router-dom";
import { format } from "date-fns"; // For custom date formatting

interface Task {
  id: string;
  title: string;
  description: string;
  created: any;
  priority: "low" | "medium" | "high";
  status: "accepted" | "completed" | "failed";
}

interface User {
  uid: string;
  name: string;
  email: string;
  profilePicture?: string;
}

interface Props {
  user: User;
}

export default function EmployeeDashboard({ user }: Props) {
  const firebase = useFirebase(); // Assuming firebase is used for other features like sign out
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);

  // Fetch tasks from Firestore on mount
  useEffect(() => {
    // Simulate fetching tasks from Firestore
    firebase.listAllTask().then((data: any) => {
      setTasks(data.docs.map((doc: any) => ({ ...doc.data(), id: doc.id })));
      console.log(data.docs[0].data().created.toDate());
    });
  }, [firebase]);

  // Task statistics based on the tasks state
  const taskStats = {
    new: tasks.filter((t) => t.status === "accepted").length,
    completed: tasks.filter((t) => t.status === "completed").length,
    failed: tasks.filter((t) => t.status === "failed").length,
  };

  // Handle Sign Out
  const handleSignOut = async () => {
    await firebase.signOutUser();
    navigate("/");
  };

  // Handle task status update - frontend only, without Firebase updates
  const handleTaskAction = async (
    taskId: string,
    action: "complete" | "fail"
  ) => {
    const check = await firebase.updateTask(taskId, action);
    if (check) {
      // Exit if update fails
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId
            ? {
                ...task,
                status: action === "complete" ? "completed" : "failed",
              }
            : task
        )
      );
    }
  };

  // Define priority colors
  const priorityColors: any = {
    low: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800",
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-4">
      <nav className="bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-start flex-col">
              <h1 className="text-xl font-semibold text-gray-800">
                Employee Dashboard
              </h1>
              <div className="flex items-center justify-around">
                <h1 className="text-lg font-medium text-gray-600">
                  {user.name}
                </h1>
                <button
                  onClick={() => navigate(`/editProfile/${user.uid}`)}
                  className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M17.414 2.586a2 2 0 00-2.828 0L3 14.172V17h2.828l11.586-11.586a2 2 0 000-2.828zM5 15v-1.586l9.586-9.586 1.586 1.586L6.586 15H5z" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleSignOut}
                className="ml-4 px-3 py-1 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200"
          >
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900">
                Task Statistics
              </h2>
              <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                <div className="bg-blue-100 overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <dt className="text-sm font-medium text-blue-800 truncate">
                      New Tasks
                    </dt>
                    <dd className="mt-1 text-3xl font-semibold text-blue-900">
                      {taskStats.new}
                    </dd>
                  </div>
                </div>
                <div className="bg-green-100 overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <dt className="text-sm font-medium text-green-800 truncate">
                      Completed Tasks
                    </dt>
                    <dd className="mt-1 text-3xl font-semibold text-green-900">
                      {taskStats.completed}
                    </dd>
                  </div>
                </div>
                <div className="bg-red-100 overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <dt className="text-sm font-medium text-red-800 truncate">
                      Failed Tasks
                    </dt>
                    <dd className="mt-1 text-3xl font-semibold text-red-900">
                      {taskStats.failed}
                    </dd>
                  </div>
                </div>
              </div>
            </div>

            {/* Tasks List */}
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Accepted Tasks
              </h2>
              <ul className="space-y-4">
                {tasks.map((task) => {
                  return (
                    <motion.li
                      key={task.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white shadow overflow-hidden sm:rounded-md"
                    >
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg leading-6 font-medium text-gray-900">
                            {task.title}
                          </h3>
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              priorityColors[task.priority]
                            }`}
                          >
                            {task.priority}
                          </span>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                          <div className="sm:flex">
                            <p className="flex items-center text-sm text-gray-500">
                              {task.description}
                            </p>
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                            <p>
                              Created on:{" "}
                              {/* {new Date(task.created).toLocaleDateString()} */}
                              {format(task.created.toDate(), "MMMM dd, yyyy")}
                            </p>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-end space-x-3">
                          <button
                            onClick={() =>
                              handleTaskAction(task.id, "complete")
                            }
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          >
                            Mark Complete
                          </button>
                          <button
                            onClick={() => handleTaskAction(task.id, "fail")}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            Mark Failed
                          </button>
                        </div>
                      </div>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
