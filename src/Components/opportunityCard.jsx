// eslint-disable-next-line no-unused-vars
import React from 'react';
import { FaGoogle, FaAmazon, FaApple, FaShopify } from 'react-icons/fa';

const icons = {
  google: <FaGoogle className="text-2xl" />,
  amazon: <FaAmazon className="text-2xl" />,
  apple: <FaApple className="text-2xl" />,
  shopify: <FaShopify className="text-2xl" />
};

// eslint-disable-next-line react/prop-types
const OpportunityCard = ({ company, status }) => {
  // eslint-disable-next-line react/prop-types
  const icon = icons[company.toLowerCase()] || null;

  return (
    <div className="border p-4 rounded-md flex flex-col items-start">
      <div className="flex items-center mb-2">
        {icon}
        <h2 className="ml-2 font-bold">{company} LLC</h2>
      </div>
      <p className="text-sm text-gray-600">Ecommerce</p>
      <p className="text-sm text-gray-600">+880 1778253294</p>
      <p className="text-sm text-gray-600">sahabub85@gmail.com</p>
      <div className={`mt-2 p-1 rounded ${status === 'Won' ? 'bg-green-500' : status === 'Progress' ? 'bg-yellow-500' : status === 'Processing' ? 'bg-purple-500' : 'bg-orange-500'} text-white`}>
        {status}
      </div>
    </div>
  );
};

export default OpportunityCard;
