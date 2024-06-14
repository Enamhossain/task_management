// eslint-disable-next-line no-unused-vars
import React from 'react';
import { motion } from 'framer-motion';
import  backgroundImageUrl from '../assets/workplace-with-blue-office-supplies.jpg'
const pricingPlans = [
  {
    title: 'Basic',
    price: '$0',
    description: 'For individuals & teams just getting started with project management.',
    features: [
      'Unlimited tasks',
      'Unlimited messages',
      '2 projects',
      'File storage (500MB per file)',
      'List view projects',
      'Project Overview',
    ],
    buttonText: 'Get Started',
    color: 'bg-green-500',
  },
  {
    title: 'Premium',
    price: '$10',
    description: 'For small teams looking for advanced collaboration tools.',
    features: [
      'Timeline view',
      'Workflow Builder',
      'Dashboard',
      'Unlimited projects',
      'Advanced integrations',
      'Forms',
      'Admin Console',
    ],
    buttonText: 'Get Started',
    color: 'bg-yellow-500',
  },
  {
    title: 'Scale',
    price: '$25',
    description: 'For growing teams needing more customization and integrations.',
    features: [
      'Everything in Premium',
      'Resource Allocation',
      'Custom Role Builder',
      'Team Branding',
      'Guest Access',
      'Automation',
      'Custom Fields',
    ],
    buttonText: 'Get Started',
    color: 'bg-orange-500',
  },
  {
    title: 'Enterprise',
    price: '$25',
    description: 'For large companies with advanced needs and dedicated support.',
    features: [
      'Custom to-dos',
      'Unlimited messages',
      'File storage (10GB per file)',
      'Unlimited projects',
      'Advanced security',
      'Project Overview',
    ],
    buttonText: 'Get Started',
    color: 'bg-blue-500',
  },
];

const PricingTable = () => {
  return (
    <div  className=" bg-gray-50 p-6 md:p-12"
    style={{ backgroundImage: `url(${backgroundImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Easily organize your work. Start free.
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Access Chores features free. No credit card required.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className={`rounded-lg shadow-lg p-6 ${plan.color}`}
            >
              <h3 className="text-xl font-semibold text-white">{plan.title}</h3>
              <p className="mt-4 text-3xl font-extrabold text-white">{plan.price}</p>
              <p className="mt-2 text-white">{plan.description}</p>
              <ul className="mt-4 text-white">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="mt-2">
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="mt-6 w-full bg-white text-gray-900 font-semibold py-2 px-4 rounded-md hover:bg-gray-200">
                {plan.buttonText}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingTable;
