// eslint-disable-next-line no-unused-vars
import React, { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import axios from 'axios';

const statusList = ["To Do", "In Progress", "Completed", "On Hold", "Review"];

const Tasks = () => {
  const { register, handleSubmit, reset } = useForm();
  const { logOut, user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("https://taskmange-server.onrender.com/tasks");
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        setErrorMessage('Error fetching tasks');
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const onSubmit = async (data) => {
    try {
      const formData = {
        title: data.title,
        description: data.description,
        priority: data.priority,
        deadline: data.deadline,
        status: 'To Do'
      };

      const response = await axios.post('https://taskmange-server.onrender.com/tasks', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        setTasks([...tasks, response.data.task]);
        console.log("Item added successfully!");
        reset();
        setIsModalOpen(false);
      }
    } catch (error) {
      setErrorMessage('Failed to add item');
      console.error('Error:', error);
    }
  };

  const handleDragStart = (e, task) => {
    e.dataTransfer.setData('taskId', task._id);
   
  };

  const handleDrop = async (e, status) => {
    const taskId = e.dataTransfer.getData('taskId');
    console.log(taskId,"task id ")
    const updatedTasks = tasks.map((task) =>
      task._id === parseInt(taskId) ? { ...task, status } : task
    );
    setTasks(updatedTasks);
  
    try {
      await axios.put(`https://taskmange-server.onrender.com/tasks/${taskId}`, { status }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };
  

  const handleLogout = () => {
    logOut();
  };

  const handleDelete = async (_id) => {
    try {
      const response = await axios.delete(`https://taskmange-server.onrender.com/tasks/${_id}`);
      if (response.data.success) {
        setTasks(tasks.filter(task => task._id !== _id));
        console.log("Item deleted successfully!");
      }
    } catch (error) {
      setErrorMessage('Failed to delete item');
      console.error('Error:', error);
    }
  };

  const renderTasks = (status) => {
    return tasks
      .filter((task) => task.status === status && task.title.toLowerCase().includes(searchTerm.toLowerCase()))
      .map((task) =>(
        <div
          key={task.id}
          className="p-4 mb-2 bg-gray-200 rounded"
          draggable
          onDragStart={(e) => handleDragStart(e, task)}
        >
          <h4 className="font-bold">{task.title}</h4>
          <p>{task.description}</p>
          <p>Due: {task.deadline}</p>
          <p>Priority: {task.priority}</p>
          <button
            onClick={() => handleDelete(task._id)}
            className="text-red-500 hover:underline mt-2"
          >
            Delete
          </button>
        </div>
      ));
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 min-h-[700px] max-h-[900px]">
      <h1 className="text-3xl mb-4">Task Management Dashboard</h1>

      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {errorMessage}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg className="fill-current h-6 w-6 text-red-500" role="button" onClick={() => setErrorMessage('')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M14.348 14.849a.733.733 0 01-1.04 0L10 11.588 6.692 14.9a.733.733 0 01-1.04-1.04l3.308-3.311L5.653 7.26a.733.733 0 011.04-1.04L10 8.412l3.308-3.311a.733.733 0 111.04 1.04L11.041 10.5l3.307 3.309c.287.286.287.75 0 1.04z"/></svg>
          </span>
        </div>
      )}

      <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="flex-grow mb-4 md:mb-0 md:mr-4">
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center">
            <button
              className="bg-blue-500 hover:bg-blue-600 transition text-white px-4 py-2 rounded mr-4"
              onClick={() => setIsModalOpen(true)}
            >
              + Create Task
            </button>
            <div className="relative flex items-center gap-5">
              <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center">
                {user.initials}
              </div>
              <button onClick={handleLogout} className="px-4 py-2 bg-red-500 hover:bg-red-600 transition text-white rounded">
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-lg">
          <div className="flex mb-4">
            <div className="mr-4 p-2 rounded cursor-pointer bg-gray-200 hover:bg-gray-300 transition">
              Board View
            </div>
            <div className="p-2 rounded cursor-pointer bg-blue-500 hover:bg-blue-600 transition text-white">
              List View
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Create a new task</h3>
                  <div className="mt-2">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="mb-4">
                        <input
                          {...register('title')}
                          placeholder="Task Title"
                          className="w-full p-2 border rounded"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <textarea
                          {...register('description')}
                          placeholder="Task Description"
                          className="w-full p-2 border rounded"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <input
                          {...register('deadline')}
                          type="date"
                          className="w-full p-2 border rounded"
                          required
                        />
                      </div>
                      <div className="mb-4">
                          <select {...register('priority')} className="w-full p-2 border rounded">
                            <option value="low">Low</option>
                            <option value="moderate">Moderate</option>
                            <option value="high">High</option>
                          </select>
                        </div>
                        <div className="flex justify-end">
                          <button type="submit" className="px-4 py-2 bg-blue-500 hover:bg-blue-600 transition text-white rounded">
                            Add Task
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {statusList.map((status) => (
          <div
            key={status}
            className="p-4 bg-white shadow-md rounded-lg"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, status)}
          >
            <h3 className="text-lg font-semibold mb-2">{status}</h3>
            {renderTasks(status)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;