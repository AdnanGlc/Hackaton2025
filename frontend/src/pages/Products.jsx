import React from 'react';

const products = [
    {
      id: 1,
      title: "Product 1",
      description: "This is a short description of product 1.",
      image: "https://via.placeholder.com/150",
      price: "$40"
    },
    {
      id: 2,
      title: "Product 2",
      description: "This is a short description of product 2.",
      image: "https://via.placeholder.com/150",
      price: "$60"
    },
    {
      id: 3,
      title: "Product 3",
      description: "This is a short description of product 3.",
      image: "https://via.placeholder.com/150",
      price: "$75"
    },
    {
      id: 4,
      title: "Product 4",
      description: "This is a short description of product 4.",
      image: "https://via.placeholder.com/150",
      price: "$94"
    },
    {
      id: 5,
      title: "Product 5",
      description: "This is a short description of product 5.",
      image: "https://via.placeholder.com/150",
      price: "$45"
    },
    {
      id: 6,
      title: "Product 6",
      description: "This is a short description of product 6.",
      image: "https://via.placeholder.com/150",
      price: "$65"
    },
];

const Products = () => {
    return (
        <div className="min-h-screen bg-gray-50 p-4">
          <div className="max-w-md mx-auto">
            <div className="flex justify-between items-center mb-4">
              <button className="text-gray-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-lg font-semibold">PRODUCTS ▼</h1>
              <div className="flex space-x-2">
                <button className="text-gray-500">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
                <button className="text-gray-500">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                </button>
              </div>
            </div>

            <h2 className="text-xl font-bold mb-4">Our Products</h2>
            
            <div className="space-y-2">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between min-h-[6rem]">
                  <div className="flex items-center space-x-4">
                    <img src={product.image} alt={product.title} className="w-24 h-24 rounded" />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800">{product.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                      <p className="text-lg font-bold text-gray-900 mt-1">{product.price}</p>
                    </div>
                </div>
                <button className="w-8.5 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-2xl leading-none">
                    <span className="relative top-[-3px]">+</span>
                </button>
                </div>
              ))}
            </div>
          </div>
        </div>
    );
}

export default Products;