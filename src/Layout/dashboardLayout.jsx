import React, { useState, useContext } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { RiDashboardLine, RiTaskLine, RiLogoutBoxLine, RiHomeLine } from 'react-icons/ri';
import { FaTasks } from 'react-icons/fa';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { motion } from 'framer-motion';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut()
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error('Logout error:', error);
      });
  };

  const navItems = [
    { path: '/dashboard/dashboard', icon: RiDashboardLine, label: 'Dashboard' },
    { path: '/dashboard/Tasks', icon: RiTaskLine, label: 'Tasks' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 hover:bg-blue-700 rounded-lg transition" 
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
            <Link to="/dashboard/dashboard">
              <h1 className="text-2xl font-bold">Task Manager</h1>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName || 'User'}
                className="w-10 h-10 rounded-full border-2 border-white"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-lg font-semibold">
                  {user?.email?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
            )}
            <Link
              to="/"
              className="p-2 hover:bg-blue-700 rounded-lg transition"
              title="Home"
            >
              <RiHomeLine className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className={`
          bg-white shadow-lg w-64 space-y-2 py-6 px-4
          fixed inset-y-0 left-0 transform z-40
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:relative lg:translate-x-0
          transition duration-300 ease-in-out
        `}>
          {sidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/50 lg:hidden z-30"
              onClick={() => setSidebarOpen(false)}
            />
          )}
          
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center py-3 px-4 rounded-lg transition duration-200
                    ${active 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
            
            <div className="pt-4 border-t border-gray-200">
              <button
                onClick={handleLogout}
                className="w-full flex items-center py-3 px-4 rounded-lg text-red-600 hover:bg-red-50 transition duration-200"
              >
                <RiLogoutBoxLine className="w-5 h-5 mr-3" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </nav>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet/>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
