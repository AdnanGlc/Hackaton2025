import React, { useEffect, useState } from "react";
import Footer from "../components/RecipeFooter";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const BurgerBistro = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const blobBaseUrl = "https://euniversitystorage.blob.core.windows.net/hackaton2025/";

    useEffect(() => {
        const fetchRecipeDetail = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/RecipeGetById?request=${id}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                });

                if (!response.ok) throw new Error("Failed to fetch recipe details.");
                const data = await response.json();
                setRecipe(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchRecipeDetail();
    }, [id]);

    return (
        <div className="flex overflow-hidden flex-col mx-auto w-full bg-white">
            {loading ? (
                <div className="text-center p-10">Loading recipe details...</div>
            ) : error ? (
                <div className="text-center p-10 text-red-500">{error}</div>
            ) : (
                <>
                    <button
                        className="p-2 bg-gray-200 rounded-xl text-black font-bold absolute ml-5 mt-5"
                        onClick={() => navigate(-1)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M5 12l6 6M5 12l6-6" />
                        </svg>
                    </button>
                    <img
                        loading="lazy"
                        src={`${blobBaseUrl}${recipe.image}`}
                        className="object-cover w-full aspect-[1]"
                        alt={recipe.name}
                    />
                    <div className="flex flex-col items-start px-6 mt-[-20px] w-full rounded-t-4xl bg-white pt-[20px]">
                        <h2 className="text-xl font-bold text-gray-900">{recipe.name}</h2>
                        <p className="self-stretch mt-5 text-sm leading-6 text-gray-400">
                            {recipe.description}
                        </p>

                        <div className="flex justify-between mt-5 text-sm tracking-wide w-full">
                            <div className="uppercase text-neutral-700 font-semibold">Ingredients</div>
                        </div>

                        {/* ✅ INGREDIENTS DISPLAY */}
                        <ul className="grid grid-cols-3 mt-2 space-y-2">
                            {recipe.recipeProducts && recipe.recipeProducts.length > 0 ? (
                                recipe.recipeProducts.map((product, index) => (
                                    <li key={index} className="flex flex-col items-center gap-1 cursor-pointer flex-shrink-0">
                                        {product.name}
                                    </li>
                                ))
                            ) : (
                                <p className="text-gray-500">No ingredients available for this recipe.</p>
                            )}
                        </ul>
                    </div>

                </>
            )}
        </div>
    );
};

export default BurgerBistro;
