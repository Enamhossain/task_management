// eslint-disable-next-line no-unused-vars
import React from "react";
import {
  FaClipboardList,
  FaProjectDiagram,
  FaTasks,
  FaCalendarAlt
} from "react-icons/fa";
import Section from "./Section";
import { motion } from 'framer-motion';


const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  hover: { scale: 1.05 }
};
const ProjectSection = () => {
  return (
<div className="flex flex-col justify-center items-center bg-gray-50 p-6">
    <h1 className="text-3xl font-bold mb-4">
      Projects That{" "}
      <span className="relative inline-block">
        <span className="absolute inset-0 bg-orange-500 h-1 mt-7 bottom-0 transform translate-y-full"></span>
        Work.
      </span>
    </h1>
    <p className="text-center mb-8 w-full md:w-2/3 lg:w-1/2">
      Whether youre managing your next big project or digitalizing task
      management for your teams daily business, you need to know whos doing
      what, when.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full md:w-2/3 lg:w-1/2 mb-8">
      <motion.div
        className="border bg-white p-4 rounded-lg shadow-md"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center mb-2">
          <FaClipboardList className="text-2xl text-yellow-500 mr-2" />
          <h2 className="text-lg font-semibold">Dashboard</h2>
        </div>
        <p className="text-sm text-gray-600">Everything in one place</p>
      </motion.div>

      <motion.div
        className="border bg-white p-4 rounded-lg shadow-md"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center mb-2">
          <FaProjectDiagram className="text-2xl text-blue-500 mr-2" />
          <h2 className="text-lg font-semibold">Projects</h2>
        </div>
        <p className="text-sm text-gray-600">
          Clear overview, full efficiency
        </p>
      </motion.div>

      <motion.div
        className="border bg-white p-4 rounded-lg shadow-md"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center mb-2">
          <FaTasks className="text-2xl text-green-500 mr-2" />
          <h2 className="text-lg font-semibold">Tasks</h2>
        </div>
        <p className="text-sm text-gray-600">Where work gets done</p>
      </motion.div>

      <motion.div
        className="border bg-white p-4 rounded-lg shadow-md"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center mb-2">
          <FaCalendarAlt className="text-2xl text-red-500 mr-2" />
          <h2 className="text-lg font-semibold">Agenda</h2>
        </div>
        <p className="text-sm text-gray-600">Your own personal board</p>
      </motion.div>
    </div>
    <Section />
  </div>
  );
};

export default ProjectSection;
