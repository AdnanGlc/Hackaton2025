import React from 'react';

const Home = () => {
  return (
    <div className="bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md w-full max-w-md p-4 h-screen-100vh">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <button className="p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
            <div className="text-sm text-gray-500">
              DELIVER TO
              <select className="ml-1 bg-transparent border-none focus:outline-none">
                <option>Halal Lab office</option>
              </select>
            </div>
          </div>
          <button className="relative p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="absolute top-0 right-0 bg-orange-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              2
            </span>
          </button>
        </div>

        {/* Greeting */}
        <h1 className="text-lg font-semibold mb-4">Hey Halal, Good Afternoon!</h1>

        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search dishes, restaurants"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Categories */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-medium">All Categories</h2>
            <button className="text-orange-500 text-sm">See All &gt;</button>
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-yellow-100 rounded-full text-gray-700 font-medium">
              All
            </button>
            <button className="px-4 py-2 bg-gray-200 rounded-full text-gray-700">
              Hot Dog
            </button>
            <button className="px-4 py-2 bg-gray-200 rounded-full text-gray-700">
              Burg
            </button>
          </div>
        </div>

        {/* Open Restaurants */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-medium">Open Restaurants</h2>
            <button className="text-orange-500 text-sm">See All &gt;</button>
          </div>
          <div className="space-y-4">
            <div className="bg-gray-200 h-32 rounded-lg"></div>
            <div className="p-2">
              <h3 className="font-medium">Rose Garden Restaurant</h3>
              <p className="text-sm text-gray-600">
                Burger - Chicken - Riche - Wings
              </p>
              <div className="flex items-center justify-between text-sm text-gray-700 mt-2">
                <span className="flex items-center">
                  <svg className="w-4 h-4 fill-yellow-500 mr-1" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                  4.7
                </span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  Free
                </span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  20 min
                </span>
              </div>
            </div>
            <div className="bg-gray-200 h-32 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;