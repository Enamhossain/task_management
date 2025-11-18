import React, { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { FaTrash, FaEdit, FaSearch, FaPlus, FaUserCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { API_ENDPOINTS } from "../../config/api";

const statusList = ["To Do", "In Progress", "Completed", "On Hold", "Review"];

const Tasks = () => {
  const { register, handleSubmit, reset } = useForm();
  const { logOut, user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [viewMode, setViewMode] = useState("board");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_ENDPOINTS.TASKS);
        if (!response.ok) throw new Error('Failed to fetch tasks');
        const data = await response.json();
        setTasks(data);
        setErrorMessage("");
      } catch (error) {
        setErrorMessage("Error fetching tasks. Please try again.");
        toast.error("Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const formData = {
        title: data.title,
        description: data.description,
        priority: data.priority,
        deadline: data.deadline,
        status: "To Do",
        userId: user?.uid || user?.email,
      };

      const response = await axios.post(
        API_ENDPOINTS.TASKS,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setTasks([...tasks, response.data.task]);
        toast.success("Task created successfully!");
        Swal.fire({
          title: "Success!",
          text: "Task created successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false
        });
        reset();
      }
    } catch (error) {
      setErrorMessage("Failed to add task");
      toast.error("Failed to create task");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDragStart = (e, task) => {
    e.dataTransfer.setData("taskId", task._id);
  };

  const handleDrop = async (e, status) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    const task = tasks.find(t => t._id === parseInt(taskId) || t._id === taskId);
    
    if (!task) return;

    const updatedTasks = tasks.map((task) =>
      (task._id === parseInt(taskId) || task._id === taskId) ? { ...task, status } : task
    );
    setTasks(updatedTasks);

    try {
      await axios.put(
        API_ENDPOINTS.TASK_BY_ID(taskId),
        { status },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(`Task moved to ${status}`);
    } catch (error) {
      setTasks(tasks); // Revert on error
      toast.error("Failed to update task status");
    }
  };

  const handleLogout = () => {
    logOut();
  };

  const handleDelete = async (_id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.delete(API_ENDPOINTS.TASK_BY_ID(_id));
        if (response.data.success) {
          setTasks(tasks.filter((task) => task._id !== _id));
          toast.success("Task deleted successfully!");
          Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
        }
      } catch (error) {
        setErrorMessage("Failed to delete task");
        toast.error("Failed to delete task");
      }
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high': return 'bg-red-100 border-red-300 text-red-800';
      case 'moderate': return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'low': return 'bg-green-100 border-green-300 text-green-800';
      default: return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const renderTasks = (status) => {
    const filteredTasks = tasks.filter(
      (task) =>
        task.status === status &&
        (task.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
         task.description?.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (filteredTasks.length === 0) {
      return (
        <div className="text-center py-8 text-gray-400">
          <p>No tasks in this status</p>
        </div>
      );
    }

    return filteredTasks.map((task) => (
      <motion.div
        key={task._id || task.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="p-4 mb-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-move border-l-4 border-blue-500"
        draggable
        onDragStart={(e) => handleDragStart(e, task)}
      >
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-bold text-gray-800 text-lg">{task.title}</h4>
          <button
            onClick={() => handleDelete(task._id)}
            className="text-red-500 hover:text-red-700 transition-colors p-1"
            title="Delete task"
          >
            <FaTrash />
          </button>
        </div>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{task.description}</p>
        <div className="flex flex-wrap gap-2 items-center text-xs">
          <span className={`px-2 py-1 rounded-full border ${getPriorityColor(task.priority)}`}>
            {task.priority || 'Low'}
          </span>
          {task.deadline && (
            <span className="text-gray-500">
              📅 {new Date(task.deadline).toLocaleDateString()}
            </span>
          )}
        </div>
      </motion.div>
    ));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading tasks...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-600">Please log in to view tasks</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Task Management</h1>
          <p className="text-gray-600">Organize and manage your tasks efficiently</p>
        </div>

        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-red-100 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded mb-4 flex justify-between items-center"
            role="alert"
          >
            <div>
              <strong className="font-bold">Error: </strong>
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={() => setErrorMessage("")}
              className="text-red-700 hover:text-red-900"
            >
              ✕
            </button>
          </motion.div>
        )}

        <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div className="flex-grow w-full md:w-auto">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("board")}
                  className={`px-4 py-2 rounded transition ${
                    viewMode === "board" ? "bg-white shadow-sm" : ""
                  }`}
                >
                  Board
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-4 py-2 rounded transition ${
                    viewMode === "list" ? "bg-white shadow-sm" : ""
                  }`}
                >
                  List
                </button>
              </div>
              <div className="flex items-center gap-3">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || "User"}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <FaUserCircle className="w-10 h-10 text-gray-400" />
                )}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 transition text-white rounded-lg"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit(onSubmit)}
            className="bg-gray-50 p-4 rounded-lg"
          >
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              <input
                {...register("title", { required: true })}
                placeholder="Task Title"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <input
                {...register("description", { required: true })}
                placeholder="Description"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <input
                {...register("deadline", { required: true })}
                type="date"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <select
                {...register("priority", { required: true })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="low">Low Priority</option>
                <option value="moderate">Moderate</option>
                <option value="high">High Priority</option>
              </select>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 transition text-white rounded-lg flex items-center justify-center gap-2 font-semibold"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Adding...
                  </>
                ) : (
                  <>
                    <FaPlus /> Add Task
                  </>
                )}
              </button>
            </div>
          </motion.form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {statusList.map((status, index) => (
            <motion.div
              key={status}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-4 rounded-xl shadow-md min-h-[400px]"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, status)}
            >
              <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">{status}</h3>
                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                  {tasks.filter(t => t.status === status).length}
                </span>
              </div>
              <div className="space-y-2 max-h-[500px] overflow-y-auto">
                <AnimatePresence>
                  {renderTasks(status)}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Tasks;
