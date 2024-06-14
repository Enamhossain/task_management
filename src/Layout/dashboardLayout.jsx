import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { RiDashboardLine, RiTaskLine, RiSettingsLine } from 'react-icons/ri';
import { FaTasks, FaTrash } from 'react-icons/fa';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <Link to="/"><h1 className="text-2xl font-bold">Task Management Dashboard</h1></Link>
        <button 
          className="lg:hidden p-2" 
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </header>
      <div className="flex flex-1">
        <aside className={`bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 transition duration-200 ease-in-out`}>
          <nav>
            <Link to="/dashboard/dashboard" className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
              <RiDashboardLine className="w-6 h-6 mr-2" /> Dashboard
            </Link>
            <Link to="/dashboard/tasks" className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
              <RiTaskLine className="w-6 h-6 mr-2" /> Tasks
            </Link>
            <Link to="/dashboard/task details" className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
              <FaTasks className="w-6 h-6 mr-2" /> Task Details
            </Link>
            <Link to="/dashboard/task details" className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
              <FaTrash className="w-6 h-6 mr-2" /> Trash
            </Link>
          </nav>
        </aside>
        <main className="flex-1 p-10">
          <Outlet/>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
