import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { API_ENDPOINTS } from '../../config/api';
import { motion } from 'framer-motion';
import { FaTasks, FaCheckCircle, FaSpinner, FaClock } from 'react-icons/fa';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_ENDPOINTS.TASKS);
        if (!response.ok) throw new Error('Failed to fetch tasks');
        const data = await response.json();
        setTasks(data);
        setError(null);
      } catch (error) {
        setError('Failed to load tasks. Please try again later.');
        toast.error('Failed to load tasks');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.status === 'Completed').length;
  const inProgressTasks = tasks.filter((task) => task.status === 'In Progress').length;
  const toDoTasks = tasks.filter((task) => task.status === 'To Do').length;
  const onHoldTasks = tasks.filter((task) => task.status === 'On Hold').length;
  const reviewTasks = tasks.filter((task) => task.status === 'Review').length;

  const pieData = [
    { name: 'To Do', value: toDoTasks, color: '#8884d8' },
    { name: 'In Progress', value: inProgressTasks, color: '#ffbb28' },
    { name: 'Completed', value: completedTasks, color: '#00C49F' },
    { name: 'On Hold', value: onHoldTasks, color: '#ff7300' },
    { name: 'Review', value: reviewTasks, color: '#82ca9d' }
  ].filter(item => item.value > 0);

  const barData = [
    { name: 'To Do', tasks: toDoTasks },
    { name: 'In Progress', tasks: inProgressTasks },
    { name: 'Completed', tasks: completedTasks },
    { name: 'On Hold', tasks: onHoldTasks },
    { name: 'Review', tasks: reviewTasks }
  ];

  const stats = [
    { label: 'Total Tasks', value: totalTasks, icon: FaTasks, color: 'bg-blue-500', textColor: 'text-blue-600' },
    { label: 'Completed', value: completedTasks, icon: FaCheckCircle, color: 'bg-green-500', textColor: 'text-green-600' },
    { label: 'In Progress', value: inProgressTasks, icon: FaSpinner, color: 'bg-yellow-500', textColor: 'text-yellow-600' },
    { label: 'To Do', value: toDoTasks, icon: FaClock, color: 'bg-purple-500', textColor: 'text-purple-600' }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-6 bg-red-50 rounded-lg">
          <p className="text-red-600">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
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
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.displayName || user?.email || 'User'}!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`${stat.color} p-6 rounded-xl shadow-lg text-white transform hover:scale-105 transition-transform duration-200`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-sm font-medium">{stat.label}</p>
                    <p className="text-3xl font-bold mt-2">{stat.value}</p>
                  </div>
                  <Icon className="text-4xl opacity-80" />
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Task Distribution</h2>
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-500">
                <p>No tasks to display</p>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Tasks by Status</h2>
            {totalTasks > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="tasks" fill="#8884d8" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-500">
                <p>No tasks to display</p>
              </div>
            )}
          </motion.div>
        </div>

        {totalTasks === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white p-8 rounded-xl shadow-lg text-center"
          >
            <FaTasks className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No tasks yet</h3>
            <p className="text-gray-500 mb-4">Start by creating your first task!</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Dashboard;
