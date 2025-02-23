import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import breakfast from "../assets/breakfast.png";
import logo from "../assets/Logo.png";
import lunch from "../assets/lunch.webp";
import dinner from "../assets/dinner.webp";
import { useParams } from "react-router-dom";

const categories = [
  { id: 1, name: "Breakfast", image: breakfast },
  { id: 2, name: "Lunch", image: lunch },
  { id: 3, name: "Dinner", image: dinner },
  { id: 4, name: "Snacks", image: breakfast },
  { id: 5, name: "Drinks", image: lunch },
  { id: 6, name: "Desserts", image: dinner },
];

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userData")) || {};
  const navigate = useNavigate();

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
          credentials: "include", // This includes cookies if needed
        });
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  const blobBaseUrl =
    "https://euniversitystorage.blob.core.windows.net/hackaton2025/";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md p-4 h-screen-100vh">
        {/* Greeting */}
        <h1 className="text-lg font-semibold mb-4">
          Hey {userData?.userName || "Guest"}, Good Morning!
        </h1>

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

          <div className="flex overflow-x-auto space-x-3 scrollbar-hide px-1 pb-7 gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                className="flex-shrink-0 flex p-3 gap-2 items-center rounded-full bg-gray-200 text-gray-700 font-medium shadow-lg justify-center"
              >
                <img
                  className="object-contain w-12"
                  src={category.image}
                  alt={category.name}
                />
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

          <div className="space-y-4 grid grid-cols-2 gap-2">
            {recipes.map((recipe) => (
              <Link
                to={`/RecipeDetail/${recipe.id}`}
                key={recipe.id}
                className="space-y-4"
              >
                <div className="bg-gray-200 h-32 rounded-lg">
                  <img
                    src={`${blobBaseUrl}${recipe.image}`} // Assuming recipe.image contains the image file name
                    alt={recipe.name}
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
                <div className="p-2">
                  <h3 className="font-medium">{recipe.name}</h3>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {recipe.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      {/* Slide-in menu */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity duration-300 ${
          menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      ></div>

      <div
        className={`fixed top-0 left-0 bg-white h-full w-2/3 md:w-1/2 transition-transform duration-300 transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setMenuOpen(false)}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* User Information */}
        <div className="text-center py-8">
          {/* User Image */}
          <div className="w-24 h-24 rounded-full bg-gray-300 mx-auto mb-4"></div>
          {/* User Name */}
          <h3 className="text-xl font-medium text-gray-800 bg-red">
            {userData?.userName || "Guest"}
          </h3>
        </div>

        {/* Menu Sections */}
        <div className="space-y-4 px-4">
          <Link
            to="/AddRecipe"
            className="block p-4 text-gray-800 hover:bg-gray-100 rounded-lg"
          >
            Write a Recipe
          </Link>
          <Link
            to="/products"
            className="block p-4 text-gray-800 hover:bg-gray-100 rounded-lg"
          >
            Products
          </Link>
          <Link
            to="/profile"
            className="block p-4 text-gray-800 hover:bg-gray-100 rounded-lg"
          >
            My Profile
          </Link>
        </div>
      </div>
      {logoutModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
            <p className="mb-6 text-gray-600">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                onClick={() => setLogoutModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
