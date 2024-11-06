import { SetStateAction, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Users, X } from "lucide-react";

export default function EmployeeDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [isTaskInfoModalOpen, setIsTaskInfoModalOpen] = useState(false);
  const [isEmployeeInfoModalOpen, setIsEmployeeInfoModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const stats = [
    { title: "Total Employees", value: 145, icon: Users },
    { title: "New Hires", value: 23, icon: Plus },
    { title: "Departments", value: 8, icon: Users },
  ];

  const recentActivities = [
    {
      id: 1,
      action: "New employee onboarded",
      name: "John Doe",
      department: "Engineering",
    },
    {
      id: 2,
      action: "Promotion approved",
      name: "Jane Smith",
      department: "Marketing",
    },
    { id: 3, action: "Leave request", name: "Mike Johnson", department: "HR" },
  ];

  const topEmployees = [
    {
      id: 1,
      name: "Alice Williams",
      position: "Senior Developer",
      performance: 95,
    },
    {
      id: 2,
      name: "Bob Anderson",
      position: "Product Manager",
      performance: 92,
    },
    { id: 3, name: "Carol Taylor", position: "UX Designer", performance: 90 },
  ];

  const tasks = [
    {
      id: 1,
      title: "Implement new feature",
      assignee: "Alice Williams",
      status: "in-progress",
      description: "Develop the new user authentication system",
    },
    {
      id: 2,
      title: "Fix critical bug",
      assignee: "Bob Anderson",
      status: "completed",
      description: "Resolve the issue with data synchronization",
    },
    {
      id: 3,
      title: "Prepare project proposal",
      assignee: "Carol Taylor",
      status: "failed",
      description: "Create a detailed proposal for the upcoming client project",
    },
    {
      id: 4,
      title: "Update documentation",
      assignee: "John Doe",
      status: "in-progress",
      description: "Review and update the API documentation",
    },
  ];

  const employees = [
    {
      id: 1,
      name: "Alice Williams",
      position: "Senior Developer",
      email: "alice@example.com",
      department: "Engineering",
      joinDate: "2020-03-15",
    },
    {
      id: 2,
      name: "Bob Anderson",
      position: "Product Manager",
      email: "bob@example.com",
      department: "Product",
      joinDate: "2019-07-22",
    },
    {
      id: 3,
      name: "Carol Taylor",
      position: "UX Designer",
      email: "carol@example.com",
      department: "Design",
      joinDate: "2021-01-10",
    },
    {
      id: 4,
      name: "John Doe",
      position: "Software Engineer",
      email: "john@example.com",
      department: "Engineering",
      joinDate: "2022-05-01",
    },
  ];

  const handleCreateTask = (e:any) => {
    e.preventDefault();
    // Implement task creation logic here
    setIsCreateTaskModalOpen(false);
  };

  const handleTaskClick = (task: SetStateAction<null>) => {
    setSelectedTask(task);
    setIsTaskInfoModalOpen(true);
  };

  const handleEmployeeClick = (employee: SetStateAction<null>) => {
    setSelectedEmployee(employee);
    setIsEmployeeInfoModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 ">
      <header>
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 ">
            Employee Dashboard
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 ">Overview</h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search employees or tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300  rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white  text-gray-900 "
                />
              </div>
              <button
                onClick={() => setIsCreateTaskModalOpen(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Create Task
              </button>
            </div>
          </div>

          <motion.div
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white  overflow-hidden shadow rounded-lg"
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <stat.icon
                        className="h-6 w-6 text-gray-500"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-600  truncate">
                          {stat.title}
                        </dt>
                        <dd>
                          <div className="text-lg font-medium text-gray-900 ">
                            {stat.value}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white  overflow-hidden shadow rounded-lg"
            >
              <div className="p-5">
                <h3 className="text-lg leading-6 font-medium text-gray-900 ">
                  Recent Activities
                </h3>
                <div className="mt-5">
                  <ul className="divide-y divide-gray-200 ">
                    {recentActivities.map((activity) => (
                      <li key={activity.id} className="py-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <span className="inline-block h-10 w-10 rounded-full overflow-hidden bg-gray-100 ">
                              <svg
                                className="h-full w-full text-gray-400 "
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                              </svg>
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900  truncate">
                              {activity.action}
                            </p>
                            <p className="text-sm text-gray-600  truncate">
                              {activity.name} - {activity.department}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white  overflow-hidden shadow rounded-lg"
            >
              <div className="p-5">
                <h3 className="text-lg leading-6 font-medium text-gray-900 ">
                  Top Performing Employees
                </h3>
                <div className="mt-5">
                  <ul className="divide-y divide-gray-200 ">
                    {topEmployees.map((employee) => (
                      <li
                        key={employee.id}
                        className="py-4 cursor-pointer hover:bg-gray-50 "
                        onClick={() => handleEmployeeClick(employee)}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <span className="inline-block h-10 w-10 rounded-full overflow-hidden bg-gray-100 ">
                              <svg
                                className="h-full w-full text-gray-400 "
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                              </svg>
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900  truncate">
                              {employee.name}
                            </p>
                            <p className="text-sm text-gray-600  truncate">
                              {employee.position}
                            </p>
                          </div>
                          <div className="inline-flex items-center text-base font-semibold text-gray-900 ">
                            {employee.performance}%
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="mt-8 bg-white  shadow overflow-hidden sm:rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 ">
                Tasks
              </h3>
            </div>
            <div className="border-t border-gray-200 ">
              <table className="min-w-full divide-y divide-gray-200 ">
                <thead className="bg-gray-50 ">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-600  uppercase tracking-wider"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-600  uppercase tracking-wider"
                    >
                      Assignee
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-600  uppercase tracking-wider"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white  divide-y divide-gray-200 ">
                  {tasks.map((task) => (
                    <tr
                      key={task.id}
                      className="hover:bg-gray-50  cursor-pointer"
                      onClick={() => handleTaskClick(task)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 ">
                          {task.title}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600 ">
                          {task.assignee}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            task.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : task.status === "in-progress"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {task.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </main>

      <AnimatePresence>
        {isCreateTaskModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white  rounded-lg p-6 w-full max-w-md"
            >
              <h2 className="text-2xl font-bold mb-4 text-gray-900 ">
                Create New Task
              </h2>
              <form onSubmit={handleCreateTask}>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="task-title"
                      className="block text-sm font-medium text-gray-800 "
                    >
                      Task Title
                    </label>
                    <input
                      type="text"
                      id="task-title"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50   "
                      placeholder="Enter task title"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="task-description"
                      className="block text-sm font-medium text-gray-800 "
                    >
                      Description
                    </label>
                    <textarea
                      id="task-description"
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50   "
                      placeholder="Enter task description"
                    ></textarea>
                  </div>
                  <div>
                    <label
                      htmlFor="task-assignee"
                      className="block text-sm font-medium text-gray-800 "
                    >
                      Assignee
                    </label>
                    <select
                      id="task-assignee"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50   "
                    >
                      <option value="">Select assignee</option>
                      {employees.map((employee) => (
                        <option key={employee.id} value={employee.id}>
                          {employee.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => setIsCreateTaskModalOpen(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500   "
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Create Task
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}

        {isTaskInfoModalOpen && selectedTask && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white  rounded-lg p-6 w-full max-w-md"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900 ">
                  Task Details
                </h2>
                <button
                  onClick={() => setIsTaskInfoModalOpen(false)}
                  className="text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-600 ">Title</h3>
                  <p className="mt-1 text-sm text-gray-900 ">
                    {selectedTask.title}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-600 ">
                    Description
                  </h3>
                  <p className="mt-1 text-sm text-gray-900 ">
                    {selectedTask.description}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-600 ">
                    Assignee
                  </h3>
                  <p className="mt-1 text-sm text-gray-900 ">
                    {selectedTask.assignee}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-600 ">Status</h3>
                  <p className="mt-1 text-sm text-gray-900  capitalize">
                    {selectedTask.status}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {isEmployeeInfoModalOpen && selectedEmployee && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white  rounded-lg p-6 w-full max-w-md"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900 ">
                  Employee Details
                </h2>
                <button
                  onClick={() => setIsEmployeeInfoModalOpen(false)}
                  className="text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-600 ">Name</h3>
                  <p className="mt-1 text-sm text-gray-900 ">
                    {selectedEmployee.name}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-600 ">
                    Position
                  </h3>
                  <p className="mt-1 text-sm text-gray-900 ">
                    {selectedEmployee.position}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-600 ">Email</h3>
                  <p className="mt-1 text-sm text-gray-900 ">
                    {selectedEmployee.email}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-600 ">
                    Department
                  </h3>
                  <p className="mt-1 text-sm text-gray-900 ">
                    {selectedEmployee.department}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-600 ">
                    Join Date
                  </h3>
                  <p className="mt-1 text-sm text-gray-900 ">
                    {selectedEmployee.joinDate}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
