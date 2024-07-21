import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';

const blogs = [
  { name: 'Two Sum', author: 'GFG', views: '525', link: 'https://www.geeksforgeeks.org/check-if-pair-with-given-sum-exists-in-array/' },
  { name: 'Coin Change', author: 'GFG', views: '201', link: 'https://www.geeksforgeeks.org/coin-change-dp-7/' },
  { name: 'Cumulative Sum', author: 'WorkTech', views: '652', link: 'https://workat.tech/problem-solving/approach/cs/cumulative-sum' },
  // Add more blog objects here
];

const Blog = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 py-10 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900">Blog Page</h2>
        </div>
        <ul className="space-y-6">
          {blogs.map((blog, index) => (
            <li key={index} className="bg-gray-100 p-6 rounded-lg shadow-lg flex flex-col space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-semibold text-purple-600">{blog.name}</h3>
                <a href={blog.link} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-500">
                  <FaExternalLinkAlt />
                </a>
              </div>
              <p className="text-gray-700">Author: {blog.author}</p>
              <p className="text-gray-700">Views: {blog.views}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Blog;
