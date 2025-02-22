import React from 'react';
import { Link } from "react-router-dom";
import breakfast from '../assets/breakfast.png'
import lunch from '../assets/lunch.webp'
import dinner from '../assets/dinner.webp'

const categories = [
    { id: 1, name: 'Breakfast', image: breakfast },
    { id: 2, name: 'Lunch', image: lunch },
    { id: 3, name: 'Dinner', image: dinner },
    { id: 4, name: 'Snacks', image: breakfast },
    { id: 5, name: 'Drinks', image: lunch },
    { id: 6, name: 'Desserts', image: dinner },
];

const recipes = [
    {
        id: 1,
        name: "Rose Garden Restaurant",
        description: "Burger - Chicken - Rice - Wings",
        rating: 4.7,
        price: "Free",
        time: "20 min",
    },
    {
        id: 2,
        name: "Sunset Diner",
        description: "Pizza - Pasta - Salads",
        rating: 4.5,
        price: "$10",
        time: "30 min",
    },
    {
        id: 3,
        name: "Ocean Breeze Café",
        description: "Seafood - Sushi - Desserts",
        rating: 4.8,
        price: "Free",
        time: "15 min",
    },
];

const Home = () => {
    return (
        <div className="bg-gray-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-md w-full max-w-md p-4 h-screen-100vh">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-2">
                        <button className="p-2 bg-gray-200 rounded-xl text-black font-bold">
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
                    <Link to="/login">
                        <button className="relative p-2 bg-gray-200 rounded-xl">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-user-circle"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" /></svg>
                        </button>
                    </Link>
                </div>

                {/* Greeting */}
                <h1 className="text-lg font-semibold mb-4">Hey Halal, Good Afternoon!</h1>

                {/* Search Bar */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search dishes, restaurants"
                        className="w-full p-4 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </div>

                {/* Categories */}
                <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="font-medium">All Categories</h2>
                        <button className="text-orange-500 text-sm">See All &gt;</button>
                    </div>

                    <div className="flex overflow-x-auto space-x-3 scrollbar-hide px-1 pb-7">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                className="flex-shrink-0 flex p-3 gap-2 items-center rounded-full bg-gray-200 text-gray-700 font-medium shadow-lg w-40 justify-center"
                            >
                                <img className="object-contain w-12" src={category.image} alt={category.name} />
                                <p>{category.name}</p>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Recipes */}
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="font-medium">Recipes</h2>
                        <button className="text-orange-500 text-sm">See All &gt;</button>
                    </div>

                    <div className="space-y-4 flex flex-col gap-2">
                        {recipes.map((recipe) => (
                            <Link to="/addRecipe" key={recipe.id} className="space-y-4">
                                <div className="bg-gray-200 h-32 rounded-lg"></div>
                                <div className="p-2">
                                    <h3 className="font-medium">{recipe.name}</h3>
                                    <p className="text-sm text-gray-600">{recipe.description}</p>
                                    <div className="flex items-center justify-between text-sm text-gray-700 mt-2">
                                        {/* Rating */}
                                        <span className="flex items-center">
                                            <svg className="w-4 h-4 fill-yellow-500 mr-1" viewBox="0 0 20 20">
                                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                            </svg>
                                            {recipe.rating}
                                        </span>
                                        {/* Price */}
                                        <span className="flex items-center">
                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                            {recipe.price}
                                        </span>
                                        {/* Time */}
                                        <span className="flex items-center">
                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {recipe.time}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;