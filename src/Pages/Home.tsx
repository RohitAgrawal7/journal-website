// Home.jsx
import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-green-700 mb-6">
          International Journal of Experimental Research and Review
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          A peer-reviewed journal publishing high-quality research across various experimental disciplines.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-green-600 mb-3">Current Issue</h2>
            <p className="text-gray-600 mb-4">Browse the latest research articles and reviews</p>
            <a href="/current" className="text-green-600 hover:text-green-800 font-medium">View Current Issue →</a>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-green-600 mb-3">Archives</h2>
            <p className="text-gray-600 mb-4">Access our complete collection of past issues</p>
            <a href="/archives" className="text-green-600 hover:text-green-800 font-medium">Browse Archives →</a>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-green-600 mb-3">Submit Paper</h2>
            <p className="text-gray-600 mb-4">Submit your research for publication consideration</p>
            <a 
              href="https://google.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-green-600 hover:text-green-800 font-medium"
            >
              Submission Guidelines →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;