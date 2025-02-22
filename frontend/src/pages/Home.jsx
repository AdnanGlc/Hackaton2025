import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import breakfast from '../assets/breakfast.png';
import lunch from '../assets/lunch.webp';
import dinner from '../assets/dinner.webp';

const categories = [
    { id: 1, name: 'Breakfast', image: breakfast },
    { id: 2, name: 'Lunch', image: lunch },
    { id: 3, name: 'Dinner', image: dinner },
    { id: 4, name: 'Snacks', image: breakfast },
    { id: 5, name: 'Drinks', image: lunch },
    { id: 6, name: 'Desserts', image: dinner },
];

const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);

    // Fetch the recipes from the API
    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/RecipeGetAll", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        // Add Authorization header if needed, like:
                        // "Authorization": `Bearer ${token}`
                    },
                    credentials: 'include',  // This includes cookies if needed
                });
                const data = await response.json();
                setRecipes(data);
            } catch (error) {
                console.error("Error fetching recipes:", error);
            }
        };

        fetchRecipes();
    }, []);

    const blobBaseUrl = "https://euniversitystorage.blob.core.windows.net/hackaton2025/";

    return (
        <div className="bg-gray-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-md w-full max-w-md p-4 h-screen-100vh">
                {/* Navbar */}
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-2">
                        <button
                            className="p-2 bg-gray-200 rounded-xl text-black font-bold"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
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
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-user-circle">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                                <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                                <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
                            </svg>
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
                                className="flex-shrink-0 flex p-3 gap-2 items-center rounded-full bg-gray-200 text-gray-700 font-medium shadow-lg justify-center"
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
                            <Link to={`/RecipeDetail/${recipe.id}`} key={recipe.id} className="space-y-4">
                                <div className="bg-gray-200 h-32 rounded-lg"><img
                                    src={`${blobBaseUrl}${recipe.image}`} // Assuming recipe.image contains the image file name
                                    alt={recipe.name}
                                    className="object-cover w-full h-full rounded-lg"
                                /></div>
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
            {/* Slide-in menu */}
            <div
                className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setMenuOpen(false)}
            ></div>

            <div
                className={`fixed top-0 left-0 bg-white h-full w-2/3 md:w-1/2 transition-transform duration-300 transform ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="flex justify-end p-4">
                    <button onClick={() => setMenuOpen(false)}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* User Information */}
                <div className="text-center py-8">
                    {/* User Image */}
                    <div className="w-24 h-24 rounded-full bg-gray-300 mx-auto mb-4"></div>
                    {/* User Name */}
                    <h3 className="text-xl font-medium text-gray-800">John Doe</h3>
                </div>

                {/* Menu Sections */}
                <div className="space-y-4 px-4">
                    <Link to="/AddRecipe" className="block p-4 text-gray-800 hover:bg-gray-100 rounded-lg">
                        Write a Recipe
                    </Link>
                    <Link to="/products" className="block p-4 text-gray-800 hover:bg-gray-100 rounded-lg">
                        Products
                    </Link>
                    <Link to="/profile" className="block p-4 text-gray-800 hover:bg-gray-100 rounded-lg">
                        My Profile
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default Home;
