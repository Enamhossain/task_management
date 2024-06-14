// eslint-disable-next-line no-unused-vars
import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'John Marko',
    image: 'https://picsum.photos/200/300?random=2',
    rating: 5,
    review: 'Creating software tailored games development information duration.',
  },
  {
    name: 'Irene Strong',
    image: 'https://picsum.photos/200/300?random=2',
    rating: 4,
    review: 'Creating software tailored games development information duration.',
  },
  {
    name: 'Jonas Kakaroto',
    image: 'https://picsum.photos/200/300?random=2',
    rating: 5,
    review: 'Creating software tailored games development information jonas duration.',
  },
];

const Testimonial = () => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">What do they say about us</h2>
        <p className="mt-2 text-lg text-gray-600">
          At vero eos et deleniti atque corrupti quos dolores.
        </p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <div className="flex flex-col items-center">
                <img
                  className="w-24 h-24 rounded-full"
                  src={testimonial.image}
                  alt={`${testimonial.name}'s avatar`}
                />
                <h3 className="mt-4 text-xl font-semibold text-gray-900">{testimonial.name}</h3>
                <div className="mt-2 flex items-center">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="h-5 w-5 text-yellow-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.975a1 1 0 00.95.691h4.18c.969 0 1.371 1.24.588 1.81l-3.392 2.463a1 1 0 00-.364 1.118l1.286 3.975c.3.921-.755 1.688-1.54 1.118L10 14.347l-3.393 2.463c-.784.57-1.838-.197-1.539-1.118l1.286-3.975a1 1 0 00-.364-1.118L3.598 9.403c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.691l1.286-3.975z" />
                    </svg>
                  ))}
                </div>
                <p className="mt-4 text-gray-600 text-center">{testimonial.review}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <span className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-full text-sm font-medium text-gray-500 bg-white">
            •••
          </span>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
