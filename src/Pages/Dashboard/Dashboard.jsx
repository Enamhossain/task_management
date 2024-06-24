// src/components/Dashboard.js
import React, { useState, useEffect, useContext } from 'react';
import { ToastContainer } from 'react-toastify';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
 
  const [tasks, setTasks] = useState([]);
console.log(tasks)
  useEffect(() => {
    // Fetch tasks from the API
    fetch('https://taskmange-server.onrender.com/tasks')
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error('Error fetching tasks:', error));
  }, []);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.status === 'Completed').length;
  const inProgressTasks = tasks.filter((task) => task.status === 'In Progress').length;
  const toDoTasks = tasks.filter((task) => task.status === 'To Do').length;
  console.log(completedTasks)

  const data = [
    { name: 'To Do', value: toDoTasks },
    { name: 'In Progress', value: inProgressTasks },
    { name: 'Completed', value: completedTasks }
  ];

  const COLORS = ['#8884d8', '#ffbb28', '#00C49F'];

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-3xl mb-4">Task Management Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-2">Total Tasks</h2>
          <p className="text-xl">{totalTasks}</p>
        </div>

        <div className="p-6 bg-green-100 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-2">Completed Tasks</h2>
          <p className="text-xl">{completedTasks}</p>
        </div>

        <div className="p-6 bg-yellow-100 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-2">In Progress Tasks</h2>
          <p className="text-xl">{inProgressTasks}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Task Distribution</h2>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Dashboard;
