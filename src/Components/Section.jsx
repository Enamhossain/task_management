// eslint-disable-next-line no-unused-vars
import React from 'react'
import { FaRegLightbulb, FaRegHandshake, FaTasks, FaRegClipboard, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Section = () => {
  return (
     <div>

        <div className="relative flex flex-col md:flex-row items-center bg-gray-50 p-6 md:p-12">
     
      <div className="flex-1 md:pr-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Our features that help you be more efficient</h1>
        <p className="text-gray-600 mb-8">
          Can delegate tasks to the right people according to their abilities to ensure the team is working productively.
        </p>
        <button className="bg-green-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-green-600 focus:outline-none">
          Get Started
        </button>
      </div>
     
      <div className="flex-1 flex justify-center mt-8 md:mt-0 relative">
     
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="w-full h-full border-t border-gray-300 transform -rotate-6"></div>
          <div className="w-full h-full border-t border-gray-300 transform rotate-6"></div>
        </div>
        <div className="relative z-10">
          <img
            src="https://i.ibb.co/RBvSDzZ/6895849.jpg"
            alt="Efficient Team"
            className="rounded-xl shadow-lg  w-80"
          />
        </div>
      </div>
    </div>
       {/* section 2 */}
       <div className="relative flex flex-col md:flex-row items-center bg-gray-50 p-6 md:p-12">
      <div className="flex-1 flex justify-center mt-8 md:mt-0 relative">
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="w-full h-full border-t border-gray-300 transform -rotate-6"></div>
          <div className="w-full h-full border-t border-gray-300 transform rotate-6"></div>
        </div>
        <div className="relative z-10">
          <img
            src="https://i.ibb.co/RBvSDzZ/6895849.jpg"
            alt="Efficient Team"
            className="rounded-xl shadow-lg w-80"
          />
        </div>
      </div>
      <div className="flex-1 md:pr-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Discover Our Powerful Features</h1>
        <p className="text-gray-600 mb-8 ">
          Our platform offers an array of features designed to enhance productivity and streamline your workflow. Empower your team with tools that make task management seamless and efficient.
        </p>
        <button className="bg-[#b5d63b] hover:text-white s px-6 py-3 rounded-full shadow-md hover:bg-blue-600 focus:outline-none">
          Learn More
        </button>
      </div>
    </div>
    {/* section 3 */}
    <div className="bg-gray-100 p-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6 relative  top-32">
          <h1 className="text-4xl font-bold text-gray-800">Why use task management tool</h1>
          <p className="text-gray-600">
            Whether you're managing your next big project or digitalizing task management for your team's daily business, you need to know who's doing what, when.
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-500 text-white px-6 py-3 rounded-full flex items-center space-x-2"
          >
            <span>Get Started</span>
            <FaArrowRight />
          </motion.button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 ">
          {[
            { icon: <FaRegLightbulb className="text-orange-500" />, title: 'Productivity', description: 'With this tool, you can be more productive' },
            { icon: <FaRegHandshake className="text-green-500" />, title: 'Collaboration', description: 'Collaborating with your team is very helpful in daily activities' },
            { icon: <FaTasks className="text-yellow-500" />, title: 'Manage tasks', description: 'Managing your tasks and projects more efficiently will increase your productivity' },
            { icon: <FaRegClipboard className="text-blue-500" />, title: 'Knowledge', description: 'You can see insights easily to manage a task and project' }
          ].map((card, index) => (
            <motion.div 
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-start"
            >
              <div className="text-3xl mb-4">
                {card.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800">{card.title}</h3>
              <p className="text-gray-600">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
     </div>
  )
}

export default Section